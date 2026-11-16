// Tài khoản thành viên (chạy ở trình duyệt), dùng chung tài khoản với web và app Di Trú Síp. Blog chỉ dùng cho Khu Học.
import { createClient, type Session } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_KEY } from './db';

export const sb = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: false, storageKey: 'csds.auth' },
});

let cached: Promise<Session | null> | null = null;
export function session() {
  return (cached ??= sb.auth.getSession().then((r) => r.data.session).catch(() => null));
}
export const loginHref = (next = location.pathname + location.search) => '/dang-nhap/?next=' + encodeURIComponent(next);
export const esc = (s: unknown) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]!));
