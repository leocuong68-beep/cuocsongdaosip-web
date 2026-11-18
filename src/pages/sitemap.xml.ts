import { getPosts } from '../lib/db';
export async function GET() {
  const site = 'https://www.cuocsongdaosip.com';
  const u: [string, string?][] = [['/'], ['/tin-tuc/'], ['/kinh-nghiem/'], ['/su-kien/'], ['/hoc/'], ['/hoc/bang-lai/'], ['/video/'], ['/a-z/'], ['/gioi-thieu/']];
  for (const p of await getPosts()) u.push([`/${p.slug}/`, p.updated_at]);
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${u.map(([l, m]) => `  <url><loc>${site}${l}</loc>${m ? `<lastmod>${m.slice(0, 10)}</lastmod>` : ''}</url>`).join('\n')}\n</urlset>\n`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
