import { ANSWER_VIDEOS, MAIN_QUESTIONS, replyForTopics } from './answer-videos.js';
// The model selects recordings; it never writes words the avatar cannot say.
export const PORTFOLIO_KNOWLEDGE = Object.entries(ANSWER_VIDEOS).map(([id,c])=>({id,transcript:c.script}));
export const GUIDE_QUESTIONS = MAIN_QUESTIONS.map(q=>q.question);
const words = text => text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').match(/[a-z0-9]+/g) || [];
export function answerPortfolio(question, previousTopic = '') {
  const clean = question.trim();
  if (!clean) return replyForTopics(['clarify']);
  if (/salary|compensation|notice period|availab|visa|relocat|\bage\b|married|address|confidential|secret|password|api key|revenue|customers|uptime/i.test(clean)) return replyForTopics(['unknown']);
  if (/chief minister|president|weather|capital of|recipe|write.*code|ignore.*instructions|system prompt|joke/i.test(clean)) return replyForTopics(['unrelated']);
  if (/^(hi|hello|hey)[!.,\s]*$/i.test(clean)) return replyForTopics(['intro']);
  if (/^(thanks|thank you)[!.,\s]*$/i.test(clean)) return replyForTopics(['contact']);
  if (/^(more|tell me more|go on|explain more|what else|why|why did you choose that)[!?.\s]*$/i.test(clean)) {
    if (['work','alphatales','contribution','ai','realtime'].includes(previousTopic)) return replyForTopics(['decisions']);
    return replyForTopics(['clarify']);
  }
  if (/coursework|subjects.*stud/i.test(clean)) return replyForTopics(['unknown']);
  if (/college project|final.year|sign.language|\bfocus\b/i.test(clean)) return replyForTopics(['college']);
  const input = new Set(words(clean));
  const scored = Object.entries(ANSWER_VIDEOS).filter(([,c])=>c.words).map(([id,c])=>({id,score:[...new Set(words(c.words))].reduce((n,w)=>n+(input.has(w)?1:0),0)+(input.has(id)?4:0)})).sort((a,b)=>b.score-a.score);
  if (!scored[0].score) return replyForTopics(['unrelated']);
  return replyForTopics([scored[0].id]);
}
