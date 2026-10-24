import { StrictMode, createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { readFileSync, writeFileSync } from 'node:fs';
import Portfolio from '../src/App.jsx';
import * as sections from '../src/components/sections/index.server.js';
import { SITE_URL } from '../src/lib/seo.js';

// Render the same components used by the browser; no second content catalogue.
const path = 'dist/index.html';
const html = readFileSync(path, 'utf8');
if (!html.includes('<div id="root"></div>')) throw new Error('Missing root placeholder');
const markup = renderToString(createElement(StrictMode, null, createElement(Portfolio, { sections })));
writeFileSync(path, html.replace('<div id="root"></div>', `<div id="root">${markup}</div>`));
writeFileSync('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${SITE_URL}</loc></url></urlset>\n`);
writeFileSync('dist/robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}sitemap.xml\n`);
console.log('Pre-rendered portfolio HTML, sitemap, and robots.txt.');
