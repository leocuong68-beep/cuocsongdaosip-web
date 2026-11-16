// Đọc Supabase (project ditrusip, dùng chung với web/app Di Trú Síp) bằng khoá công khai lúc build. RLS chỉ trả bài đã đăng.
export const SUPABASE_URL = 'https://egbxinegjmhcdqfprsds.supabase.co';
export const SUPABASE_KEY = 'sb_publishable_y4mpI552GpVya7-rm2GRzw_VUiCM_k0';
export const DTS = 'https://ditrusip.com';

export async function q<T = any>(path: string): Promise<T[]> {
  const r = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } });
  if (!r.ok) throw new Error(`Supabase ${path}: ${r.status} ${await r.text()}`);
  return r.json();
}

export type Section = 'tin-tuc' | 'kinh-nghiem' | 'su-kien' | 'hoc-tap' | 'video';
export type Post = {
  slug: string; title: string; excerpt: string; content_html: string; category: string | null; section: Section;
  cover_url: string | null; seo_title: string | null; seo_description: string | null; youtube_id: string | null;
  author: string; published_at: string; updated_at: string;
};
export type Ev = {
  id: string; category: string | null; title: string; description: string | null; city: string | null; venue: string | null;
  starts_on: string; ends_on: string | null; time_label: string | null; price_label: string | null; source_name: string | null; source_url: string | null;
};

const cache: Record<string, Promise<any[]>> = {};
const once = <T,>(k: string, path: string) => (cache[k] ??= q<T>(path)) as Promise<T[]>;

export const getPosts = () => once<Post>('posts', 'posts?select=slug,title,excerpt,content_html,category,section,cover_url,seo_title,seo_description,youtube_id,author,published_at,updated_at&status=eq.published&order=published_at.desc');
export const bySection = async (s: Section) => (await getPosts()).filter((p) => p.section === s);
export const getEvents = () => once<Ev>('events', 'events?select=*&is_visible=eq.true&order=starts_on.desc');

export const SECTIONS: Record<Section, { label: string; href: string; blurb: string }> = {
  'tin-tuc': { label: 'Tin tức', href: '/tin-tuc/', blurb: 'Tin Síp mấy ngày gần đây mà người Việt mình nên biết: giá cả, nhà đất, thuế, chính sách.' },
  'kinh-nghiem': { label: 'Kinh nghiệm sống', href: '/kinh-nghiem/', blurb: 'Giá cả, điện nước, ngân hàng, trường cho con, giấy tờ. Chuyện nhà mình đã làm, kèm nguồn chính thức.' },
  'su-kien': { label: 'Sự kiện', href: '/su-kien/', blurb: 'Lễ hội, chợ phiên, hoạt động cuối tuần ở Paphos, Limassol và các nơi khác trên đảo.' },
  'hoc-tap': { label: 'Học & thi', href: '/hoc/', blurb: 'Học tiếng Hy Lạp, thi bằng lái, thi quốc tịch.' },
  video: { label: 'Video', href: '/video/', blurb: 'Video trên kênh Cường Đảo Síp, kèm mô tả và mục lục.' },
};
export const CATS: Record<string, string> = { 'doi-song': 'Đời sống', 'an-cu': 'An cư', 'di-tru': 'Di trú', bds: 'Nhà cửa', 'kinh-te': 'Tiền & thuế' };

export const fmtDate = (s: string) => new Date(s).toLocaleDateString('vi-VN', { day: 'numeric', month: 'numeric', year: 'numeric', timeZone: 'Asia/Nicosia' });
export const postHref = (p: { slug: string }) => `/${p.slug}/`;
export const readMins = (html: string) => Math.max(1, Math.round(html.replace(/<[^>]+>/g, ' ').split(/\s+/).length / 230));

// Bài cũ viết cho ditrusip.com: link tới trang dịch vụ, dự án, chi phí… chuyển về ditrusip.com; link tới bài viết giữ trên blog.
const LOCAL = new Set(['tin-tuc', 'kinh-nghiem', 'su-kien', 'hoc', 'video', 'a-z', 'gioi-thieu', 'dang-nhap', 'blog']);
export function fixLinks(html: string, slugs: Set<string>) {
  return html
    .replace(/href="https?:\/\/(?:www\.)?ditrusip\.com\/([^"/?#]+)\/?"/g, (m, s) => (slugs.has(s) ? `href="/${s}/"` : m))
    .replace(/href="\/(?!\/)([^"]*)"/g, (m, path: string) => {
      const first = path.split(/[/?#]/)[0];
      if (!first || slugs.has(first) || LOCAL.has(first)) return m;
      return `href="${DTS}/${path}"`;
    })
    .replace(/<a href="https?:\/\/(?!www\.cuocsongdaosip)/g, '<a rel="noopener" target="_blank" href="https://');
}
