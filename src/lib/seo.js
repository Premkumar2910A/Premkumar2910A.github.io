import { PROFILE } from './data.js';

export const SITE_URL = 'https://premkumar2910a.github.io/';
export const SEO = {
  title: `${PROFILE.name} | ${PROFILE.role} & AI Product Development`,
  description: 'Premkumar A, founding engineer at AlphaTales. Explore Python APIs, React interfaces, AI agent workflows, developer tools, and my contributions.',
  image: new URL('og.jpg', SITE_URL).href,
};

export const PROFILE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  '@id': `${SITE_URL}#profile`,
  url: SITE_URL,
  name: SEO.title,
  mainEntity: {
    '@type': 'Person',
    '@id': `${SITE_URL}#person`,
    name: PROFILE.name,
    url: SITE_URL,
    image: new URL('portrait-bust.webp', SITE_URL).href,
    jobTitle: PROFILE.role,
    description: SEO.description,
    sameAs: [PROFILE.github, PROFILE.linkedin],
  },
};

export function seoTags() {
  const meta = (attrs) => ({ tag: 'meta', attrs, injectTo: 'head' });
  return [
    { tag: 'title', children: SEO.title, injectTo: 'head' },
    meta({ name: 'description', content: SEO.description }),
    { tag: 'link', attrs: { rel: 'canonical', href: SITE_URL }, injectTo: 'head' },
    ...Object.entries({ title: SEO.title, description: SEO.description, image: SEO.image, 'image:alt': `${PROFILE.name}, ${PROFILE.role}`, url: SITE_URL, type: 'profile', 'site_name': `${PROFILE.name} Portfolio` }).map(([key, content]) => meta({ property: `og:${key}`, content })),
    ...Object.entries({ card: 'summary_large_image', title: SEO.title, description: SEO.description, image: SEO.image, 'image:alt': `${PROFILE.name}, ${PROFILE.role}` }).map(([key, content]) => meta({ name: `twitter:${key}`, content })),
    { tag: 'script', attrs: { type: 'application/ld+json' }, children: JSON.stringify(PROFILE_SCHEMA).replace(/</g, '\\u003c'), injectTo: 'head' },
  ];
}
