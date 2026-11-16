import { getPosts } from '../lib/db';
const x = (s: string) => s.replace(/[<>&'"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[c]!));
export async function GET() {
  const site = 'https://www.cuocsongdaosip.com';
  const items = (await getPosts()).slice(0, 40).map((p) => `<item><title>${x(p.title)}</title><link>${site}/${p.slug}/</link><guid>${site}/${p.slug}/</guid><pubDate>${new Date(p.published_at).toUTCString()}</pubDate><description>${x(p.excerpt || '')}</description></item>`).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Cuộc Sống Đảo Síp A-Z</title><link>${site}/</link><description>Kinh nghiệm thực tế cho người Việt ở Síp</description><language>vi</language>${items}</channel></rss>`, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
