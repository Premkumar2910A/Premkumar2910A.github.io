import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Mic, Square, Captions, ArrowUp, ArrowUpRight, X } from 'lucide-react';
import { boundedWait, generateAvatarSpeech, voiceFailureMessage } from '../lib/avatar-speech';
import { MAIN_QUESTIONS, replyForTopics } from '../lib/answer-videos';
import { prefersReducedMotion } from '../lib/browser-preferences';
import MiniAvatar from './MiniAvatar';
import { guideTo, localReply, navigationIntent, navigationReply, serviceReply } from '../lib/site-guide';

const endpoint = import.meta.env.VITE_PORTFOLIO_ASSISTANT_URL || '';
// Generated lip-sync depends on shared free GPU demos that are often out of
// quota, so it is opt-in. Text answers and recorded clips never wait for it.
const liveVideo = import.meta.env.VITE_LIVE_AVATAR_VIDEO === 'true';
const questions = MAIN_QUESTIONS;
const GUIDE_SUGGESTIONS = ['What do you do at AlphaTales?', 'Show me Refacta', 'How can I contact you?'];
// What the mini avatar offers depends on the section the visitor is reading.
const SECTION_PROMPTS = {
  work: ['Curious what I built at AlphaTales?', 'What did you build at AlphaTales?'],
  experience: ['Want to know what I do day to day?', 'What do you do at AlphaTales?'],
  skills: ['Ask which tools I use most', 'Which technologies do you use most?'],
  about: ['Want my background in 10 seconds?', 'What did you do before AlphaTales?'],
  journey: ['Want my background in 10 seconds?', 'What did you do before AlphaTales?'],
  certifications: ['Want my background in 10 seconds?', 'What did you do before AlphaTales?'],
  contact: ['Want the fastest way to reach me?', 'How can I contact you?'],
};
const DEFAULT_PROMPT = ['Want a quick tour of my work?', 'Show me your work'];

function QuestionForm({ id, onAsk, disabled, placeholder = 'Ask about my work, projects, or stack…' }) {
  const [value, setValue] = useState('');
  const submit = e => {
    e.preventDefault();
    if (!value.trim() || disabled) return;
    onAsk(value);
    setValue('');
  };
  return <form className="guide-form" onSubmit={submit}>
    <label htmlFor={id} className="sr-only">Your question about Premkumar</label>
    <input id={id} value={value} onChange={e=>setValue(e.target.value)} maxLength={500} placeholder={placeholder} autoComplete="off" enterKeyHint="send"/>
    <button type="submit" disabled={disabled || !value.trim()} aria-label="Send question"><ArrowUp size={18}/></button>
  </form>;
}

function ReplyText({ reply }) {
  // Each word fades in once; the full sentence is in the DOM for screen readers.
  return <p className="guide-reply-text" key={reply.id}>{reply.text.split(/\s+/).map((word,i)=><span key={i} style={{'--i':Math.min(i,60)}}>{word} </span>)}</p>;
}

export default function PortfolioAssistant({ captions = false, onToggleCaptions }) {
  const [pending, setPending] = useState(false);
  const [listening, setListening] = useState(false);
  const [supported, setSupported] = useState(false);
  const [ready, setReady] = useState(false);
  const [notice, setNotice] = useState('');
  const [reply, setReply] = useState(null);
  const [heroVisible, setHeroVisible] = useState(true);
  const [guideOpen, setGuideOpen] = useState(false);
  const [guidedTo, setGuidedTo] = useState('');
  // The mini avatar's speech bubble greets once, then shows only on hover.
  const [greeted, setGreeted] = useState(false);
  const [guideSide, setGuideSide] = useState('right');
  const [section, setSection] = useState('');
  const [bubble, setBubble] = useState(false);
  const [sectionPrompt, sectionQuestion] = SECTION_PROMPTS[section] || DEFAULT_PROMPT;
  useEffect(()=>{
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)setSection(entry.target.id);}),{rootMargin:'-45% 0px -50% 0px'});
    document.querySelectorAll('main section[id]').forEach(el=>observer.observe(el));
    return()=>observer.disconnect();
  },[]);
  useEffect(()=>{
    // Each new section briefly shows its prompt; hovering shows it again.
    if(heroVisible||guideOpen||!section)return;
    setBubble(true);
    const timer=setTimeout(()=>setBubble(false),4000);
    return()=>clearTimeout(timer);
  },[section,heroVisible,guideOpen]);
  // The mini avatar nods when a new answer arrives in the guide.
  const [nodding, setNodding] = useState(false);
  useEffect(()=>{
    if(!reply)return;
    setNodding(true);
    const timer=setTimeout(()=>setNodding(false),1400);
    return()=>clearTimeout(timer);
  },[reply]);
  const replyBox = useRef(null), root = useRef(null), recognition = useRef(null), request = useRef(null), videoRequest = useRef(null);
  const turn = useRef(0), history = useRef([]), topic = useRef(''), askRef = useRef(null);
  const busy = useRef(false);
  const speech = useRef({timer:null, requested:false, received:false, failed:false});
  const cancelInput = () => {
    clearTimeout(speech.current.timer);
    speech.current.requested=false;
    recognition.current?.abort();
  };
  const stopVoice = () => { document.querySelector('.character-answer-video')?.pause(); };
  const stopVideo = () => { videoRequest.current?.abort(); videoRequest.current=null; };
  const stopAll = () => {
    turn.current++; request.current?.abort(); request.current=null; stopVideo();
    cancelInput(); stopVoice(); setListening(false); setPending(false); busy.current=false;
  };
  const remember = (question, answer) => {
    topic.current=answer.topic||'';
    history.current=[...history.current.slice(-4),{role:'user',content:question},{role:'assistant',content:answer.text}];
  };
  const show = (question, answer) => setReply({...answer, question, id:Date.now()});
  const guide = target => { guideTo(target); setGuidedTo(target.id); setGuideOpen(true); };
  const speakGenerated = async text => {
    const controller=new AbortController();videoRequest.current=controller;
    try {
      const src=await boundedWait(generateAvatarSpeech(text,{signal:controller.signal,onStage:()=>{}}),controller.signal,120000,'Avatar reply');
      if(videoRequest.current===controller)window.dispatchEvent(new CustomEvent('portfolio-answer-video',{detail:{src,text}}));
    } catch(error) {
      if(!controller.signal.aborted)setNotice(voiceFailureMessage(error));
    } finally { if(videoRequest.current===controller)videoRequest.current=null; }
  };
  const ask = async (question, selectedTopic = '', from = 'hero') => {
    const text=question.trim().slice(0,500);
    if(!text || (busy.current && !selectedTopic))return;
    if(selectedTopic && busy.current)stopAll();
    stopVoice(); stopVideo(); cancelInput();setListening(false);setNotice('');
    if(from==='hero'){
      window.dispatchEvent(new Event('portfolio-question-start'));
      document.querySelectorAll('video').forEach(v=>v.pause());
    }
    const current=++turn.current;
    if(selectedTopic){
      const answer=replyForTopics([selectedTopic]);
      remember(text,answer);setReply(null);
      window.dispatchEvent(new CustomEvent('portfolio-answer-video',{detail:{topics:answer.topics}}));
      return;
    }
    const destination=navigationIntent(text);
    if(destination){
      const answer=navigationReply(destination);
      remember(text,answer);show(text,answer);guide(destination);
      return;
    }
    busy.current=true;setPending(true);
    const controller=new AbortController();request.current=controller;
    let answer;
    try {
      if(!endpoint)throw new Error('No answer service');
      const url=new URL(endpoint);url.pathname='/answer';
      const response=await boundedWait(fetch(url,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({question:text,previousTopic:topic.current,history:history.current.slice(-6)}),signal:controller.signal}),controller.signal,20000,'Answer service');
      if(!response.ok)throw new Error('AI answer unavailable');
      const data=await boundedWait(response.json(),controller.signal,5000,'Answer response');
      if(typeof data.text!=='string'||!data.text.trim()||data.text.length>300)throw new Error('Invalid answer');
      answer=serviceReply(data);
    } catch {
      controller.abort();
      if(turn.current!==current)return;
      // The verified recording scripts still answer common questions offline.
      answer=localReply(text,topic.current);
    } finally {
      if(turn.current===current){request.current=null;setPending(false);busy.current=false;}
    }
    if(turn.current!==current)return;
    // Text-only replies are revealed on screen; a recorded clip brings the avatar into view instead.
    remember(text,answer);show(text,{...answer,reveal:from==='hero'&&!answer.recorded});
    if(from!=='hero')return;
    if(answer.recorded)window.dispatchEvent(new CustomEvent('portfolio-answer-video',{detail:{topics:answer.recorded}}));
    else if(liveVideo&&answer.mode==='conversation')speakGenerated(answer.text);
  };
  askRef.current=ask;
  useEffect(()=>{
    const Recognition=window.SpeechRecognition || window.webkitSpeechRecognition;
    setSupported(!!Recognition && window.isSecureContext);
    setReady(true);
    if(Recognition){
      const r=new Recognition();recognition.current=r;
      r.lang='en-IN';r.interimResults=false;r.continuous=false;r.maxAlternatives=1;
      r.onresult=e=>{
        if(!speech.current.requested)return;
        const text=e.results?.[0]?.[0]?.transcript?.trim();
        if(text){speech.current.received=true;clearTimeout(speech.current.timer);askRef.current(text);}
      };
      r.onend=()=>{
        clearTimeout(speech.current.timer);setListening(false);
        if(speech.current.requested && !speech.current.received && !speech.current.failed)
          setNotice('No question was recognised. Check your microphone, then tap Ask by voice to try again.');
        speech.current.requested=false;
      };
      r.onerror=e=>{
        clearTimeout(speech.current.timer);speech.current.failed=true;speech.current.requested=false;
        setListening(false);
        // Switching to an answer, a recording, or another tab intentionally
        // cancels recognition. That is not a microphone or API failure.
        if(e.error==='aborted')return;
        if(root.current)root.current.dataset.voiceInputError=e.error;
        const messages={
          'not-allowed':'Microphone access is blocked. Allow the microphone in this page’s browser settings, or type your question.',
          'audio-capture':'The microphone could not be read. Check your microphone and system permissions, or type your question.',
          'network':'The browser’s speech service could not connect. Try Google Chrome, or type your question.',
          'service-not-allowed':'This browser blocked speech recognition. Type your question instead.',
          'no-speech':'I didn’t hear a question. Tap Ask by voice and try again.',
          'language-not-supported':'This browser could not recognise the selected language. Tap Ask by voice to try English again.',
        };
        if(e.error==='language-not-supported')r.lang='en-US';
        setNotice(messages[e.error]||'The browser could not recognise your question. Please type it or choose a topic.');
      };
    }
    // Leaving the avatar stops listening and video generation. Text answers
    // continue, because the guide follows the visitor down the page.
    const observer=new IntersectionObserver(entries=>{
      const visible=entries[0].isIntersecting;
      setHeroVisible(visible);
      if(!visible){cancelInput();stopVoice();stopVideo();setListening(false);}
    },{threshold:0,rootMargin:'-120px 0px 0px 0px'});
    const hero=root.current?.closest('#hero');
    if(hero)observer.observe(hero);
    const videoPlay=()=>{cancelInput();setListening(false);};
    // Capture play events on the hero so replacement answer videos are covered too.
    hero?.addEventListener('play',videoPlay,true);
    const hidden=()=>{if(document.hidden)stopAll();};document.addEventListener('visibilitychange',hidden);
    const videoError=()=>setNotice('The video could not play. Please try again.');
    window.addEventListener('portfolio-answer-error',videoError);
    return()=>{observer.disconnect();cancelInput();request.current?.abort();stopVideo();stopVoice();hero?.removeEventListener('play',videoPlay,true);document.removeEventListener('visibilitychange',hidden);window.removeEventListener('portfolio-answer-error',videoError);};
  },[]);
  useEffect(()=>{
    if(!reply?.reveal)return;
    const frame=requestAnimationFrame(()=>replyBox.current?.scrollIntoView({block:'nearest',behavior:prefersReducedMotion()?'instant':'smooth'}));
    return()=>cancelAnimationFrame(frame);
  },[reply]);
  useEffect(()=>{
    if(heroVisible||greeted)return;
    const timer=setTimeout(()=>setGreeted(true),4500);
    return()=>clearTimeout(timer);
  },[heroVisible,greeted]);
  useEffect(()=>{
    if(guideOpen&&!reply)document.getElementById('guide-question')?.focus();
    // Only on opening; later replies keep focus where the visitor left it.
  },[guideOpen]);
  useEffect(()=>{
    if(!guideOpen)return;
    const close=e=>{if(e.key==='Escape'&&!e.defaultPrevented&&e.target.closest?.('.site-guide'))setGuideOpen(false);};
    addEventListener('keydown',close);
    return()=>removeEventListener('keydown',close);
  },[guideOpen]);
  const listen=()=>{
    if(listening){recognition.current?.stop();return;}
    if(busy.current)return;
    stopVoice();stopVideo();document.querySelectorAll('video').forEach(v=>v.pause());setNotice('');
    window.dispatchEvent(new Event('portfolio-question-start'));
    speech.current={timer:null,requested:true,received:false,failed:false};
    speech.current.timer=setTimeout(()=>{
      if(!speech.current.requested)return;
      cancelInput();setListening(false);
      setNotice('No question was recognised. Check your microphone, then tap Ask by voice to try again.');
    },20000);
    try{setListening(true);recognition.current.start();}catch{cancelInput();setListening(false);setNotice('Could not start the microphone. Type your question or choose a topic.');}
  };
  const canGuide = reply?.target && reply.target.id!=='hero';
  const showButton = (hidden=false) => canGuide && !hidden && <button className="guide-show" onClick={()=>guide(reply.target)} aria-label={`Take me to ${reply.target.label}`}>Take me there <span className="mono">{reply.target.label}</span> <ArrowUpRight size={15}/></button>;
  return <div className="character-assistant" ref={root} aria-label="Ask Premkumar’s portfolio assistant">
    <div className="character-voice-controls">
      <button className={`character-mic ${listening?'is-listening':''} ${pending?'is-answering':''}`} disabled={!supported && !pending} onClick={pending?stopAll:listen} aria-pressed={listening} aria-label={pending?'Cancel reply':listening?'Listening. Stop listening':'Ask by voice: ask a question using your microphone'}>
        {pending?<><span className="voice-wait" aria-hidden="true"><i/><i/><i/><i/></span><span>Cancel reply</span><Square size={13}/></>:<><Mic size={19}/><span>{listening?'Listening…':'Ask by voice'}</span></>}
      </button>
      {onToggleCaptions && <button className="caption-control" onClick={onToggleCaptions} aria-label={captions ? 'Hide captions' : 'Show captions'} aria-pressed={captions}><Captions size={20}/></button>}
    </div>
    <div className="character-question-chips" aria-label="Questions about Premkumar">{questions.map(q=><button key={q.topic} onClick={()=>ask(q.question,q.topic)}>{q.label}</button>)}</div>
    <QuestionForm id="hero-question" onAsk={text=>ask(text)} disabled={pending}/>
    {pending && <span role="status" className="sr-only">Thinking about your question. You can cancel or choose a recorded topic.</span>}
    <div className="guide-reply-region" aria-live="polite">
      {reply && <div className="guide-reply" ref={replyBox}>
        <p className="guide-reply-question mono">You asked · {reply.question}</p>
        <ReplyText reply={reply}/>
        {reply.reveal && <p className="guide-reply-note">Text reply · I haven’t recorded a video answer for this yet.</p>}
        {showButton()}
      </div>}
    </div>
    {notice && <p role="status" className="character-status">{notice}</p>}
    {ready && !supported && <p className="character-status">Voice input isn’t supported in this browser. Type a question or use a topic.</p>}
    <details className="character-privacy"><summary>Privacy</summary><p className="character-voice-note">The microphone starts only when you tap. Your browser may process voice online.{endpoint?' Typed and spoken questions, with recent replies, go to the portfolio’s answer service on Cloudflare Workers AI, with OpenRouter as a backup. Questions are logged without personal details to improve the answers.':''}{liveVideo?' Reply text and the avatar sample go to Hugging Face for voice and lip sync.':''} Topic buttons play existing recordings.</p></details>
    {!heroVisible && createPortal(<MiniAvatar greeting={!greeted||bubble} prompt={sectionPrompt} open={guideOpen} mood={pending?'thinking':nodding?'nodding':''} onToggle={()=>setGuideOpen(open=>!open)} onSide={setGuideSide}/>, document.body)}
    {guideOpen && !heroVisible && createPortal(<aside className={`site-guide has-avatar${guideSide==='left'?' is-left':''}`} aria-label="Premkumar’s site guide">
      <div className="site-guide-head">
        <span className="site-guide-live" aria-hidden="true"/>
        <span><strong>Premkumar</strong><span className="mono">SITE GUIDE</span></span>
        <a href="#hero" className="site-guide-back">Back to avatar</a>
        <button className="site-guide-close" onClick={()=>setGuideOpen(false)} aria-label="Close guide"><X size={16}/></button>
      </div>
      <div aria-live="polite">{pending?<p className="guide-reply-text guide-thinking"><span className="voice-wait" aria-hidden="true"><i/><i/><i/><i/></span> Thinking…</p>:reply?<ReplyText reply={reply}/>:<p className="guide-reply-text">Hi, I’m Premkumar. Ask about my work, or tell me where to take you. Try this one:</p>}</div>
      {!pending && reply && showButton(reply.target?.id===guidedTo)}
      {!reply && !pending && <div className="guide-suggestions">{[sectionQuestion,...GUIDE_SUGGESTIONS.filter(q=>q!==sectionQuestion)].slice(0,3).map(q=><button key={q} onClick={()=>ask(q,'','guide')}>{q}</button>)}</div>}
      <QuestionForm id="guide-question" onAsk={text=>ask(text,'','guide')} disabled={pending} placeholder="Ask, or say “show me Refacta”…"/>
    </aside>, document.body)}
  </div>;
}
