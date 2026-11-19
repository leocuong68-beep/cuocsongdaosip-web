// Khu Học (/hoc/): thành viên xin quyền, nhân viên (staff) duyệt mới học được.
// Bài học nằm trong Supabase (bảng hoc_lessons), RLS chỉ trả cho tài khoản đã duyệt; web tĩnh không chứa nội dung bài.
import { sb, session } from './member';

export type HocStatus = 'guest' | 'none' | 'pending' | 'approved' | 'rejected';
export type HocState = { status: HocStatus; staff: boolean; uid: string | null; name: string };

let cached: Promise<HocState> | null = null;
export function hocState(): Promise<HocState> {
  return (cached ??= (async () => {
    const s = await session();
    if (!s) return { status: 'guest', staff: false, uid: null, name: '' };
    const [{ data: p }, { data: a }] = await Promise.all([
      sb.from('profiles').select('full_name, role, is_reviewer').eq('id', s.user.id).maybeSingle(),
      sb.from('hoc_access').select('status').eq('user_id', s.user.id).maybeSingle(),
    ]);
    const staff = p?.role === 'staff' && !p?.is_reviewer;
    const status = (staff ? 'approved' : ((a?.status as HocStatus) ?? 'none')) as HocStatus;
    return { status, staff, uid: s.user.id, name: p?.full_name ?? '' };
  })());
}

export async function requestAccess(note: string) {
  const s = await session();
  if (!s) return 'Bạn cần đăng nhập trước.';
  const { error } = await sb.from('hoc_access').insert({ user_id: s.user.id, note: note.trim().slice(0, 500) || null });
  cached = null;
  return error && error.code !== '23505' ? 'Chưa gửi được yêu cầu, bạn thử lại sau ít phút nhé.' : '';
}

export const GREEK_STAGES = [
  { id: 's0', name: 'Chặng 0 · Bảng chữ cái và phát âm' },
  { id: 'a1w1', name: 'A1 · Tuần 1 · Làm quen' },
  { id: 'a1w2', name: 'A1 · Tuần 2 · Đời sống hằng ngày' },
  { id: 'a1w3', name: 'A1 · Tuần 3 · Nhà cửa, giấy tờ' },
  { id: 'a1w4', name: 'A1 · Tuần 4 · Sức khoẻ, đi lại' },
];

// Cổng vào cho các trang học (bằng lái, quốc tịch...): hiện trạng thái tài khoản trong `box`.
// Trả về true khi tài khoản đã được duyệt; trang tự tải bài bằng loadHoc().
const esc = (s: string) => s.replace(/[<>&"]/g, '');
export async function renderGate(box: HTMLElement, back: string, what: string): Promise<boolean> {
  const { loginHref } = await import('./member');
  const s = await hocState();
  const hi = s.name ? `Chào ${esc(s.name)}. ` : '';
  box.hidden = false;
  if (s.status === 'approved') { box.hidden = true; return true; }
  if (s.status === 'guest') {
    box.innerHTML = `<h3>Đăng ký để ${what}</h3><p>Khu Học miễn phí cho người Việt ở Síp và người đang chuẩn bị sang Síp. Bạn đăng ký (họ tên, nơi ở, email, số điện thoại), gửi yêu cầu, mình duyệt xong là vào học được.</p><p><a class="btn" href="${loginHref(back)}">Đăng ký hoặc đăng nhập</a></p>`;
  } else if (s.status === 'none') {
    box.innerHTML = `<h3>${hi}Gửi yêu cầu vào Khu Học</h3><p>Mình xem và duyệt từng tài khoản. Một lần duyệt là học được cả tiếng Hy Lạp, bằng lái và thi thử quốc tịch.</p><textarea id="g-note" maxlength="500" placeholder="Ví dụ: nhà mình ở Limassol, đang ôn thi bằng lái."></textarea><p class="err" id="g-err" role="alert"></p><button class="btn" id="g-req" type="button">Gửi yêu cầu</button>`;
    box.querySelector<HTMLButtonElement>('#g-req')!.onclick = async (e) => {
      const b = e.currentTarget as HTMLButtonElement; b.disabled = true;
      const err = await requestAccess(box.querySelector<HTMLTextAreaElement>('#g-note')!.value);
      if (err) { box.querySelector('#g-err')!.textContent = err; b.disabled = false; return; }
      cached = null; renderGate(box, back, what);
    };
  } else if (s.status === 'pending') {
    box.innerHTML = `<h3>${hi}Yêu cầu của bạn đang chờ duyệt</h3><p>Mình sẽ duyệt sớm nhất có thể. Cần gấp thì nhắn mình qua WhatsApp/Zalo +357 94 100 091.</p>`;
  } else {
    box.innerHTML = `<h3>Tài khoản chưa được mở Khu Học</h3><p>Bạn nhắn mình qua WhatsApp/Zalo +357 94 100 091 nhé.</p>`;
  }
  return false;
}

export async function loadHoc<T>(id: string): Promise<T | null> {
  const { data } = await sb.from('hoc_lessons').select('data').eq('id', id).maybeSingle();
  return (data?.data as T) ?? null;
}
