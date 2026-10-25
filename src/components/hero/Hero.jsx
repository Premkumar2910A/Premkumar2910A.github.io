import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, Play, Pause } from "lucide-react";
import PortfolioAssistant from "../PortfolioAssistant";
import { ANSWER_VIDEOS } from "../../lib/answer-videos";
import { PROFILE, HERO, UI } from "../../lib/data";
import { prefersReducedMotion as reduced } from "../../lib/browser-preferences";
import { RECORDED_CAPTIONS } from "../../lib/recorded-captions";

export default function Hero() {
  const [answerTopic, setAnswerTopic] = useState(null);
  const [captions, setCaptions] = useState(false);
  const showCaptions = captions;
  const [answerFrame, setAnswerFrame] = useState(null);
  const answerClip = answerTopic?.src ? {src:answerTopic.src} : ANSWER_VIDEOS[answerTopic?.topic];
  const answerQueue = useRef([]);
  const answerActive = useRef(false);
  const video = useRef(null),
    hero = useRef(null),
    visible = useRef(true),
    finished = useRef(false),
    userPaused = useRef(false);
  const [playing, setPlaying] = useState(false),
    [failed, setFailed] = useState(false),
    [blocked, setBlocked] = useState(false);
  const hasVideo = Boolean(HERO.video) && !failed;
  const captionCues = answerTopic?.src ? [] : RECORDED_CAPTIONS[answerTopic?.topic || 'intro'] || [];
  const configureCaptions = () => {
    const media = video.current;
    if (!media || !Number.isFinite(media.duration) || !window.VTTCue) return;
    const track = [...media.textTracks].find(track => track.label === 'Portfolio captions') || media.addTextTrack('captions', 'Portfolio captions', 'en');
    track.mode = 'hidden';
    [...(track.cues || [])].forEach(cue => track.removeCue(cue));
    captionCues.forEach(({start, end, text}) => {
      const cue = new VTTCue(start, Math.min(end, media.duration), text);
      cue.size = 85;
      cue.line = -2;
      track.addCue(cue);
    });
    track.mode = showCaptions ? 'showing' : 'hidden';
  };
  useEffect(() => {
    const track = [...(video.current?.textTracks || [])].find(track => track.label === 'Portfolio captions');
    if (track) track.mode = showCaptions ? 'showing' : 'hidden';
    // Pre-rendered video can load its metadata before hydration attaches
    // onLoadedMetadata, so build the captions here when that happened.
    else if (video.current?.readyState >= 1) configureCaptions();
  }, [showCaptions, answerTopic]);
  useEffect(() => {
    const chooseAnswer = (e) => {
      const generated=e.detail?.src;
      if(generated && (!generated.startsWith('https://henrybit-musetalk-1-5.hf.space/')||typeof e.detail?.text!=='string'))return;
      const topics=e.detail?.topics || [e.detail?.topic];
      if(!generated && (!Array.isArray(topics)||topics.length>2||!topics.length||topics.some(id=>!ANSWER_VIDEOS[id]?.src)))return;
      userPaused.current = false;
      video.current?.pause();
      setPlaying(false);
      setBlocked(false);
      answerActive.current = true;
      finished.current = false;
      answerQueue.current=generated?[]:topics.slice(1);
      const stage = video.current?.closest('.character-stage');
      if (stage && (stage.getBoundingClientRect().top < 100 || stage.getBoundingClientRect().bottom > innerHeight)) {
        stage.scrollIntoView({behavior: reduced() ? 'instant' : 'smooth', block: 'center'});
      }
      setAnswerTopic(generated?{topic:'generated',src:generated,text:e.detail.text,request:Date.now()}:{topic:topics[0],request:Date.now()});
    };
    addEventListener('portfolio-answer-video', chooseAnswer);
    return () => removeEventListener('portfolio-answer-video', chooseAnswer);
  }, []);
  useEffect(() => {
    if (!hasVideo) return;
    const v = video.current;
    let disposed = false;
    let starting = false;
    // Each document load gets one automatic introduction; replay stays explicit.
    finished.current = false;
    const play = async () => {
      if (
        (reduced() && !answerActive.current) ||
        !visible.current ||
        document.hidden ||
        finished.current ||
        userPaused.current
        || disposed || starting
        // Re-triggering a playing intro would retry sound and stutter it.
        || !v.paused
      )
        return;
      try {
        starting = true;
        // The intro only ever plays with sound. If the browser holds sound back
        // until the visitor interacts, it waits; the first click or key press starts it.
        v.muted = false;
        await v.play();
        if (disposed) return;
        if (userPaused.current || !visible.current || document.hidden) v.pause();
        setBlocked(false);
      } catch (error) {
        if (!disposed && error.name !== 'AbortError') setBlocked(true);
      } finally {
        starting = false;
      }
    };
    const unlock = (e) => {
      if (e.target.closest?.('.character-assistant')) return;
      play();
    };
    const assistantStart = () => { userPaused.current = true; v.pause(); setPlaying(false); setAnswerFrame(null); };
    addEventListener('portfolio-question-start', assistantStart);
    const ob = new IntersectionObserver(
      ([e]) => {
        visible.current = e.intersectionRatio >= 0.35;
        if (visible.current) play();
        else {
          v.pause();
        }
      },
      { threshold: [0, 0.35, 1] },
    );
    const changed = () => {
      if (document.hidden) {
        v.pause();
      } else play();
    };
    ob.observe(v.closest('.character-stage') || hero.current);
    play();
    document.addEventListener("visibilitychange", changed);
    addEventListener("pointerdown", unlock);
    // On touch screens only a completed tap grants sound permission, so listen for it too.
    addEventListener("click", unlock);
    addEventListener("keydown", unlock);
    return () => {
      disposed = true;
      ob.disconnect();
      v.pause();
      document.removeEventListener("visibilitychange", changed);
      removeEventListener("pointerdown", unlock);
      removeEventListener("click", unlock);
      removeEventListener("keydown", unlock);
      removeEventListener('portfolio-question-start', assistantStart);
    };
  }, [hasVideo, answerTopic]);
  const toggle = async () => {
    const v = video.current;
    if (!v.paused) {
      userPaused.current = true;
      v.pause();
      return;
    }
    userPaused.current = false;
    if (v.ended || finished.current) v.currentTime = 0;
    finished.current = false;
    v.muted = false;
    try {
      await v.play();
      setBlocked(false);
    } catch {
      setBlocked(true);
    }
  };
  return (
    <section id="hero" className="hero" ref={hero} aria-labelledby="hero-title">
      <div className="hero-topline">
        <span className="mono hero-location">CHENNAI, INDIA ↗</span>
      </div>
      <div className="hero-layout">
        <div className="hero-copy">
          <p className="hero-hello">
            <span className="tiny-star">✳</span> Hello, I’m Premkumar
          </p>
          <h1 id="hero-title" aria-label="Premkumar A — Full Stack Engineer">
            Full Stack
            <br />
            <em>Engineer.</em>
          </h1>
          <p className="hero-description">{UI.aboutLine}</p>
          <div className="hero-actions">
            <a className="button primary" href="#work">
              Explore my work <ArrowUpRight size={17} />
            </a>
            <a className="text-link" href={PROFILE.resume} download>
              Resume <ArrowDown size={16} />
            </a>
          </div>
          <dl className="hero-proof" aria-label="Engineering experience">
            {UI.heroProof.map(([value, label]) => (
              <div key={label}>
                <dt>{value}</dt>
                <dd>{label}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="hero-character-column">
        <div className={`character-stage ${playing ? "is-playing" : ""} ${answerTopic && answerFrame === answerTopic.request ? "has-answer-frame" : ""}`}>
          {hasVideo && (
            <img
              className="character-still"
              src={HERO.still}
              alt=""
              aria-hidden="true"
              width="768"
              height="960"
              fetchPriority="high"
            />
          )}
          {hasVideo ? (
            <video
              key={answerTopic ? `${answerTopic.topic}-${answerTopic.request}` : 'intro'}
              className={answerClip?.src ? 'character-answer-video' : undefined}
              ref={video}
              muted
              playsInline
              preload="metadata"
              poster={HERO.image}
              onLoadedMetadata={configureCaptions}
              onPlaying={() => {
                setPlaying(true);
                if (answerTopic) setAnswerFrame(answerTopic.request);
              }}
              onWaiting={() => setPlaying(false)}
              onPause={() => setPlaying(false)}
              onEnded={() => {
                setPlaying(false);
                if(answerQueue.current.length){setAnswerTopic({topic:answerQueue.current.shift(),request:Date.now()});return;}
                finished.current = true;
                setPlaying(false);
                setBlocked(false);
              }}
              onError={(e) => {
                if (e.target === video.current) {
                  if (answerClip?.src) { answerQueue.current=[]; setAnswerTopic(null); window.dispatchEvent(new Event('portfolio-answer-error')); }
                  else setFailed(true);
                }
              }}
              aria-label={answerTopic?.src ? `Generated portfolio answer by ${PROFILE.name}` : answerClip?.src ? `Recorded portfolio answer by ${PROFILE.name}` : `Animated introduction by ${PROFILE.name}`}
              aria-describedby={answerTopic?.src?'generated-answer-transcript':'intro-transcript'}
            >
              {answerClip?.src ? <source src={answerClip.src} type="video/mp4" /> : <><source
                media="(max-width: 760px)"
                src="/hero/hero-mobile.mp4"
                type="video/mp4"
              />
              {HERO.webm && <source src={HERO.webm} type="video/webm" />}
              <source src={HERO.video} type="video/mp4" />
              </>}
            </video>
          ) : (
            <img
              className="hero-character"
              src={HERO.image}
              alt="A 3D character of Premkumar in his charcoal suit and white shirt"
              width="1672"
              height="941"
              fetchPriority="high"
            />
          )}
          {hasVideo && (
            <button
              onPointerDown={(e) => e.stopPropagation()}
              onKeyDown={(e) => e.stopPropagation()}
              className={`sound-control ${blocked ? "ping" : ""}`}
              onClick={toggle}
              title={playing ? "Pause video" : "Play video"}
              aria-label={
                playing ? "Pause video" : answerTopic?.src ? "Play answer with sound" : answerClip?.src ? "Play recorded answer with sound" : "Play introduction with sound"
              }
              aria-pressed={playing}
            >
              {playing ? (
                <Pause size={18} fill="currentColor" />
              ) : (
                <Play size={18} fill="currentColor" />
              )}
            </button>
          )}
          {answerTopic?.src && <p id="generated-answer-transcript" className="sr-only">{answerTopic.text}</p>}
          <p id="intro-transcript" className="sr-only">
            {answerClip?.script || PROFILE.intro}
          </p>
          {/* Spoken status for screen readers; the controls below show it visually. */}
          <span id="character-status" className="sr-only" aria-live="polite">
            {answerClip?.src
              ? playing ? (answerTopic?.src ? "ANSWER" : "RECORDED ANSWER") : blocked ? "PLAY ANSWER · TAP FOR SOUND" : "REPLAY ANSWER"
              : hasVideo
              ? playing
                ? "A SHORT INTRODUCTION"
                : blocked
                  ? "PLAY INTRO · SOUND REQUIRES A TAP"
                  : "MEET PREMKUMAR · PLAY INTRO"
              : "THE PERSON BEHIND THE CODE"}
          </span>
        </div>
         <PortfolioAssistant captions={captions} onToggleCaptions={hasVideo && captionCues.length ? () => setCaptions(value => !value) : undefined}/>
        </div>
        <div className="hero-aside" hidden>
          <div className="orbit-mark" aria-hidden="true">
            ✳
          </div>
          <p>
            Backend systems.
            <br />
            AI workflows.
            <br />
            <strong>Real products.</strong>
          </p>
          <a
            className="round-link"
            href="#work"
            aria-label="Explore selected work"
          >
            <ArrowDown size={21} />
          </a>
        </div>
      </div>
      <div className="hero-bottom">
        <a className="mono" href="#work">
          SCROLL TO EXPLORE <ArrowDown size={13} />
        </a>
        <span className="mono">01 — INTRODUCTION</span>
      </div>
    </section>
  );
}
