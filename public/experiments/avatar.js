// Original experiment: reuse mouth pixels from the existing intro, without modifying identity.
const canvas=document.querySelector('#avatar'), ctx=canvas.getContext('2d');
const closeup=document.querySelector('#closeup'), closeCtx=closeup.getContext('2d');
const status=document.querySelector('#status'), video=document.querySelector('#source');
const poster=new Image();poster.src='/hero/poster.webp';await poster.decode();
const knowledge=await fetch('./knowledge.json').then(r=>r.json());
const buttons=[...document.querySelectorAll('button[data-topic]')];
buttons.forEach(b=>b.disabled=true);
let frames=[],animation=0,speaking=false,start=0,boundary=0,lastBoundary=0,lastAnswer='';
let recognition=null;
function render(shape=-1){
  ctx.clearRect(0,0,768,960);ctx.drawImage(poster,0,0,768,960);
  if(shape>=0 && frames[shape])ctx.drawImage(frames[shape],358,138);
  closeCtx.clearRect(0,0,300,360);closeCtx.drawImage(canvas,310,40,150,180,0,0,300,360);
}
render();
async function sample(time,x,y){
  if(video.readyState<2)await new Promise((resolve,reject)=>{video.addEventListener('loadeddata',resolve,{once:true});video.addEventListener('error',reject,{once:true});});
  video.currentTime=time;await new Promise(resolve=>video.addEventListener('seeked',resolve,{once:true}));
  const patch=document.createElement('canvas');patch.width=54;patch.height=32;
  const p=patch.getContext('2d');p.drawImage(video,x-27,y-16,54,32,0,0,54,32);
  // Restrict the blend to the lips, keeping cheek and jaw pixels from the original portrait.
  const pixels=p.getImageData(0,0,54,32);
  for(let y=0;y<32;y++)for(let x=0;x<54;x++){
    const radius=Math.hypot((x-27)/27,(y-16)/16);
    const alpha=Math.max(0,Math.min(1,(1-radius)/.3));
    pixels.data[(y*54+x)*4+3]=Math.round(pixels.data[(y*54+x)*4+3]*alpha);
  }
  p.putImageData(pixels,0,0);
  return patch;
}
try{
  // Face positions manually checked in this particular source; replacing the clip requires recalibration.
  frames.push(await sample(2.2,382,155),await sample(5.2,387,158),await sample(1.3,378,151),await sample(3.6,386,155));
  status.textContent='Choose a question to test the voice and mouth motion.';
}catch{status.textContent='Mouth frames could not load. Spoken answers can still play.';}
buttons.forEach(b=>b.disabled=false);
function stop(){speaking=false;cancelAnimationFrame(animation);recognition?.abort();render();status.textContent='Stopped.';}
function tick(now){
  if(!speaking){render();return;}
  // Boundary events are not guaranteed. The fallback is a timed approximation, not exact audio alignment.
  const elapsed=(now-start)/1000;
  const pulse=Math.sin(elapsed*18);
  const phase=now-lastBoundary<500 ? boundary : Math.floor(elapsed*2.5);
  const shape=pulse<-.5?-1:phase%4;
  render(shape);animation=requestAnimationFrame(tick);
}
function speak(answer){
  stop();const text=answer.text || answer.answer;lastAnswer=text;
  document.querySelector('#reply').textContent=text;
  const links=document.querySelector('#links');links.replaceChildren();
  for(const action of answer.actions){const a=document.createElement('a');a.textContent=action.label;a.href=action.href.startsWith('#')?'/'+action.href:action.href;a.addEventListener('click',stop);links.append(a);}
  status.textContent='Browser voice has been removed. A matching recorded answer is not available yet.';
}
buttons.forEach(b=>b.addEventListener('click',()=>speak(knowledge.find(k=>k.id===b.dataset.topic))));
document.querySelector('#stop').addEventListener('click',stop);
const Recognition=window.SpeechRecognition || window.webkitSpeechRecognition;
const mic=document.querySelector('#mic');
if(!Recognition || !window.isSecureContext){mic.disabled=true;mic.title='Voice input is not supported here';}
else{
  recognition=new Recognition();recognition.lang='en-IN';recognition.continuous=false;
  recognition.onresult=e=>{
    const q=e.results[0][0].transcript.toLowerCase();
    const id=/college|study|studied|education|degree|cgpa/.test(q)?'education':/contact|email|phone|hire/.test(q)?'contact':/backend|python|api|database/.test(q)?'backend':/frontend|react/.test(q)?'frontend':/experience|internship|career/.test(q)?'experience':/alpha|work|project|build|built/.test(q)?'alphatales':null;
    speak(id?knowledge.find(k=>k.id===id):{text:'I don’t have a verified answer to that in this prototype. Please ask Premkumar directly.',actions:[{label:'Contact Premkumar',href:'#contact'}]});
  };
  recognition.onerror=()=>{status.textContent='Could not hear the question. Try a question button.';};
  mic.addEventListener('click',()=>{stop();status.textContent='Listening…';try{recognition.start();}catch{status.textContent='Could not start the microphone.';}});
}
document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});
window.addEventListener('pagehide',stop);

