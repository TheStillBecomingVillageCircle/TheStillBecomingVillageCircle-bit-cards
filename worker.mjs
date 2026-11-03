import html from './index.html';
import css from './styles.css';
import ceremony from './connection-ceremony.js';
import script0 from './auth-options.js';
import script1 from './connection-names.js';
import script2 from './memory-journal.js';
import script3 from './memory-sharing.js';
import script4 from './notifications.js';
import artwork from './assets/connection-platinum.jpeg';

// Serve one atomic release from the same source files committed to GitHub.
const files = new Map([
  ['/', [html, 'text/html; charset=utf-8']],
  ['/index.html', [html, 'text/html; charset=utf-8']],
  ['/styles.css', [css, 'text/css; charset=utf-8']],
  ['/connection-ceremony.js', [ceremony, 'text/javascript; charset=utf-8']],
  ['/assets/connection-platinum.jpeg', [artwork, 'image/jpeg']],
  ['/auth-options.js', [script0, 'text/javascript; charset=utf-8']],
  ['/connection-names.js', [script1, 'text/javascript; charset=utf-8']],
  ['/memory-journal.js', [script2, 'text/javascript; charset=utf-8']],
  ['/memory-sharing.js', [script3, 'text/javascript; charset=utf-8']],
  ['/notifications.js', [script4, 'text/javascript; charset=utf-8']],

]);
export default {
  async fetch(request) {
    const file = files.get(new URL(request.url).pathname);
    if (!file) return new Response('Not Found', { status: 404 });
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return new Response('Method Not Allowed', { status: 405, headers: { Allow: 'GET, HEAD' } });
    }
    return new Response(request.method === 'HEAD' ? null : file[0], {
      headers: {
        'Content-Type': file[1],
        'Cache-Control': 'no-cache',
        'X-Content-Type-Options': 'nosniff',
        'X-BIT-Release': 'aquamarine-platinum-20261103',
      },
    });
  },
};
