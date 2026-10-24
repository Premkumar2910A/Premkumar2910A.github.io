import { PROJECTS } from './data.js';

// A failed voice service can still lead to the verified written information.
// Never substitute an unrelated recording for a specific question.
export function actionForSources(sources = []) {
  for (const source of sources) {
    const project = PROJECTS.find(project => project.id === source);
    if (project) return { label: `Explore ${project.title}`, href: `#project-${project.id}` };
    const sections = {
      profile: ['About me', '#about'],
      skills: ['Explore my stack', '#skills'],
      'skill-context': ['Explore my stack', '#skills'],
      education: ['Read my education', '#journey'],
      experience: ['Read my experience', '#experience'],
      'college-projects': ['Read my college projects', '#college-projects'],
      certifications: ['View my certificates', '#certifications'],
      unknown: ['Contact me', '#contact'],
    };
    if (sections[source]) return { label: sections[source][0], href: sections[source][1] };
  }
  return null;
}
