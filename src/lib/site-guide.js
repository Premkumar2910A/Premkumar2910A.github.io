import { CASE_PRESENTATION, PROJECTS } from './data.js';
import { ANSWER_VIDEOS } from './answer-videos.js';
import { answerPortfolio } from './portfolio-guide.js';
import { actionForSources } from './portfolio-actions.js';

// Places the guide may take a visitor. Only these anchors are reachable, so a
// model answer can never send someone to an arbitrary address.
const SECTIONS = [
  { id: 'work', label: 'Selected work', words: ['work', 'projects', 'portfolio', 'case studies'], topic: 'projects' },
  { id: 'experience', label: 'Current role', words: ['experience', 'current role', 'role', 'job', 'alphatales role'], topic: 'work' },
  { id: 'skills', label: 'My stack', words: ['skills', 'stack', 'technologies', 'tech', 'tools'], topic: 'skills' },
  { id: 'about', label: 'About me', words: ['about you', 'about yourself', 'about me', 'about section', 'yourself', 'id card'], topic: 'intro' },
  { id: 'college-projects', label: 'College projects', words: ['college projects', 'college project', 'focus', 'sign language'], topic: 'college' },
  { id: 'journey', label: 'Earlier experience', words: ['earlier experience', 'internships', 'internship', 'education', 'journey', 'background', 'timeline'], topic: 'experience' },
  { id: 'certifications', label: 'Certifications', words: ['certifications', 'certificates', 'courses', 'credentials'], topic: 'certifications' },
  { id: 'contact', label: 'Contact', words: ['contact', 'email', 'hire', 'reach', 'get in touch'], topic: 'contact' },
  { id: 'hero', label: 'the avatar', words: ['top', 'start', 'home', 'avatar'], topic: '' },
];

export const GUIDE_TARGETS = [
  ...PROJECTS.filter(p => CASE_PRESENTATION[p.id]).map(p => ({
    id: `project-${p.id}`, label: p.title, words: [p.title.toLowerCase(), p.id], topic: p.id,
  })),
  ...SECTIONS,
];

const NAVIGATE = /^(?:please\s+|can you\s+|could you\s+)?(?:show(?: me)?|take me(?: to)?|bring me(?: to)?|go(?: to)?|jump(?: to)?|open(?! to\b)|navigate(?: to)?|scroll(?: to)?|where (?:is|are|can i (?:find|see))|i want to see|let me see)\b/i;

const normal = text => ` ${text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, ' ').trim()} `;

// Explicit "show me …" requests are answered locally and instantly.
export function navigationIntent(question) {
  const text = question.trim();
  if (!NAVIGATE.test(text)) return null;
  const input = normal(text);
  let best = null;
  for (const target of GUIDE_TARGETS) {
    for (const word of target.words) {
      // Prefer the longest alias so "AlphaTales Agents" beats "AlphaTales".
      if (input.includes(normal(word)) && (!best || word.length > best.length)) best = { target, length: word.length };
    }
  }
  return best?.target || null;
}

export function targetForHref(href) {
  const id = typeof href === 'string' ? href.replace(/^#/, '') : '';
  return GUIDE_TARGETS.find(target => target.id === id) || null;
}

export function navigationReply(target) {
  const script = target.topic && ANSWER_VIDEOS[target.topic]?.script;
  return { text: script || `Here’s ${target.label}.`, target, mode: 'navigate' };
}

// Used when the answer service is unavailable: the verified recording scripts
// still answer common questions as text. Keyword matching is too coarse to pick
// a spoken clip ("technologies you work with" matches the role clip), so none plays.
export function localReply(question, previousTopic = '') {
  const local = answerPortfolio(question, previousTopic);
  return {
    text: local.text,
    topic: local.topic,
    sources: local.topics,
    recorded: null,
    target: targetForHref(local.actions?.[0]?.href),
    mode: 'local',
  };
}

export function serviceReply(answer) {
  // A chosen recording is spoken by the avatar, so the text shows its exact words.
  const clip = typeof answer.clip === 'string' && ANSWER_VIDEOS[answer.clip]?.src ? answer.clip : null;
  return {
    text: clip ? ANSWER_VIDEOS[clip].script : answer.text,
    topic: clip || answer.sources?.[0] || '',
    sources: answer.sources || [],
    recorded: clip ? [clip] : null,
    target: targetForHref(actionForSources(answer.sources)?.href || (clip && ANSWER_VIDEOS[clip].target)),
    mode: 'conversation',
  };
}

export function guideTo(target) {
  if (!target) return;
  window.dispatchEvent(new CustomEvent('portfolio-navigate', { detail: { id: target.id } }));
}
