import html from './index.html';
import css from './styles.css';
import ceremony from './connection-ceremony.js';
import artwork from './assets/connection-spark.jpeg';

// Serve the ceremony release atomically; existing assets retain their normal routes.
const files = new Map([
  ['/', [html, 'text/html; charset=utf-8']],
  ['/index.html', [html, 'text/html; charset=utf-8']],
  ['/styles.css', [css, 'text/css; charset=utf-8']],
  ['/connection-ceremony.js', [ceremony, 'text/javascript; charset=utf-8']],
  ['/assets/connection-spark.jpeg', [artwork, 'image/jpeg']],
]);
export default {
  async fetch(request, env) {
    const file = files.get(new URL(request.url).pathname);
    if (!file) return env.ASSETS.fetch(request);
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return new Response('Method Not Allowed', { status: 405, headers: { Allow: 'GET, HEAD' } });
    }
    return new Response(request.method === 'HEAD' ? null : file[0], {
      headers: {
        'Content-Type': file[1],
        'Cache-Control': 'no-cache',
        'X-Content-Type-Options': 'nosniff',
        'X-BIT-Release': 'connection-spark-20261103',
      },
    });
  },
};
