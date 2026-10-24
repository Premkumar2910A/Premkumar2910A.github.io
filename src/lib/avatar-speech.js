// Public free demos only: no credentials, paid endpoints, or browser speech.
const VOICE_HOST = 'https://resembleai-chatterbox-turbo-demo.hf.space';
const LIP_HOST = 'https://henrybit-musetalk-1-5.hf.space';
const recentClips = new Map();
// SDK connection/queue promises can stay pending even after cancellation.
// Bound every wait independently so the interface always settles.
export function boundedWait(promise, signal, milliseconds, label) {
  return new Promise((resolve,reject)=>{
    let timer;
    const clean=()=>{clearTimeout(timer);signal.removeEventListener('abort',abort);};
    const abort=()=>{clean();reject(signal.reason||new DOMException('Cancelled','AbortError'));};
    Promise.resolve(promise).then(value=>{clean();resolve(value);},error=>{clean();reject(error);});
    if(signal.aborted){abort();return;}
    signal.addEventListener('abort',abort,{once:true});
    timer=setTimeout(()=>{clean();reject(new Error(`${label} timed out`));},milliseconds);
  });
}
export function mediaUrl(value, host) {
  const media = value?.video || value;
  const url = typeof media === 'string' ? media : media?.url;
  if (!url) throw new Error('The avatar service returned no media.');
  const parsed = new URL(url, host);
  if (parsed.origin !== host) throw new Error('Unexpected media source.');
  return parsed.href;
}
async function run(client, payload, signal, timeout, label) {
  signal.throwIfAborted();
  const job = client.submit('/generate', payload);
  const abort = () => {try{Promise.resolve(job.cancel()).catch(()=>{});}catch{}};
  signal.addEventListener('abort', abort, {once:true});
  let data;
  try {
    await boundedWait((async()=>{
      for await (const event of job) {
        signal.throwIfAborted();
        if (event.type==='status' && (event.stage==='error'||event.success===false)) throw new Error(event.message || 'Generation failed.');
        if (event.type==='data') data=event.data;
      }
    })(),signal,timeout,label);
    signal.throwIfAborted();
    if (!Array.isArray(data) || !data.length) throw new Error('No media returned.');
    return data;
  } catch(error){abort();throw error;}
  finally {signal.removeEventListener('abort',abort);}
}
export async function generateAvatarSpeech(text, {signal,onStage}) {
  if(typeof text!=='string'||!text.trim()||text.length>300)throw new Error('Spoken answer too long.');
  signal.throwIfAborted();
  const cached=recentClips.get(text);
  if(cached && Date.now()-cached.time<300000)return cached.src;
  const {Client,handle_file}=await boundedWait(import('@gradio/client'),signal,12000,'Voice module');
  signal.throwIfAborted();
  const [reference,motion]=await boundedWait(Promise.all(['/hero/avatar-reference.wav','/hero/avatar-motion.mp4'].map(path=>fetch(path,{signal}).then(r=>{if(!r.ok)throw new Error('Reference unavailable.');return r.blob();}))),signal,15000,'Avatar reference');
  let voice,lips;
  try {
    onStage('Preparing the avatar’s voice…');
    voice=await boundedWait(Client.connect(VOICE_HOST,{events:['data','status']}),signal,12000,'Voice connection');
    const audio=await run(voice,{text,audio_prompt_path:handle_file(new File([reference],'avatar-reference.wav',{type:'audio/wav'})),temperature:0.7,seed_num:42,min_p:0,top_p:0.95,top_k:1000,repetition_penalty:1.2,norm_loudness:true},signal,45000,'Voice generation');
    onStage('Matching the avatar’s lip movements…');
    lips=await boundedWait(Client.connect(LIP_HOST,{events:['data','status']}),signal,12000,'Avatar connection');
    const clip=await run(lips,{audio_path:handle_file(mediaUrl(audio[0],VOICE_HOST)),video_path:handle_file(new File([motion],'avatar-motion.mp4',{type:'video/mp4'})),bbox_shift:0,extra_margin:10,parsing_mode:'jaw',left_cheek_width:90,right_cheek_width:90},signal,90000,'Lip sync');
    const src=mediaUrl(clip[0],LIP_HOST);
    if(recentClips.size>=10)recentClips.delete(recentClips.keys().next().value);
    recentClips.set(text,{src,time:Date.now()});
    return src;
  } finally {
    // Release queue streams after success, rejection, timeout or cancellation.
    for(const client of [voice,lips]) {
      try {client?.close?.();} catch { /* Cleanup must preserve the original result. */ }
    }
  }
}
export function voiceFailureMessage(error) {
  const message=String(error?.message||error);
  if(/timed out/i.test(message))return 'The voice service did not respond in time. Try again later or choose a recorded topic.';
  if(/quota/i.test(message)) {
    const budget=message.match(/([\d.]+)s requested vs\.\s*([\d.]+)s left/i);
    return `The free avatar voice allowance is used up${budget ? ` (${budget[2]} seconds left; ${budget[1]} needed)` : ''}. Choose a recorded topic or try after the allowance resets.`;
  }
  if(/authenticat|unauthori[sz]ed|sign.?in|log.?in/i.test(message))return 'The avatar service requires Hugging Face authentication. The portfolio’s answer API key does not provide that access. Recorded topics still work.';
  if(/rate.?limit|too many requests/i.test(message))return 'The avatar service is receiving too many requests. Try later or choose a recorded topic.';
  return 'The avatar reply could not be generated right now. Please try again. The recorded chips still work.';
}
