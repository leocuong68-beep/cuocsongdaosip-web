// Sổ tay A-Z: mỗi mục là một việc người Việt mới sang Síp hay hỏi, tự gom các bài trên blog có từ khoá khớp tiêu đề.
export type AZ = { letter: string; term: string; id: string; line: string; keys: string[]; href?: string };

export const AZ_LIST: AZ[] = [
  { letter: 'A', term: 'An cư năm đầu', id: 'an-cu', line: 'Những việc nhà mình làm trong mấy tháng đầu: giấy tờ, chỗ ở, trường cho con, xe cộ.', keys: ['an cư', 'sống ở paphos', 'sống ở limassol', '1 năm', 'năm đầu', 'hỗ trợ gia đình'] },
  { letter: 'B', term: 'Bằng lái xe', id: 'bang-lai', line: 'Dùng bằng Việt Nam được bao lâu, đổi hay thi lại; học 170 biển báo và làm trắc nghiệm.', keys: ['bằng lái'], href: '/hoc/bang-lai/' },
  { letter: 'B', term: 'Bảo hiểm xã hội', id: 'bao-hiem', line: 'Mức đóng cho người làm thuê, tự doanh và chủ công ty.', keys: ['bảo hiểm xã hội'] },
  { letter: 'C', term: 'Chi phí sinh hoạt', id: 'chi-phi', line: 'Một tháng ở Síp tốn bao nhiêu: đi chợ, siêu thị, điện nước, xăng xe.', keys: ['chi phí sinh hoạt', 'chi phí', 'siêu thị', 'chợ trời', '100 euro'] },
  { letter: 'C', term: 'Cho thuê nhà', id: 'cho-thue', line: 'Thuê dài hạn, ngắn hạn, Airbnb, giá thuê theo thành phố và thuế cho thuê.', keys: ['cho thuê', 'thuê nhà', 'airbnb'] },
  { letter: 'D', term: 'Du lịch, đi chơi', id: 'du-lich', line: 'Cuối tuần nhà mình hay đi đâu: biển, núi Troodos, Ayia Napa, phố cổ.', keys: ['có gì chơi', 'đi chơi', 'ayia napa', 'troodos', 'nhà thờ', 'cung thiên văn', 'lên núi'] },
  { letter: 'Đ', term: 'Định cư, thẻ thường trú', id: 'dinh-cu', line: 'Các con đường ở lại Síp dài hạn và những điều kiện cần biết.', keys: ['định cư', 'thẻ pr', 'thường trú', 'golden visa'] },
  { letter: 'G', term: 'Giá nhà, thị trường nhà đất', id: 'gia-nha', line: 'Giá nhà, số giao dịch, người nước ngoài mua nhiều ở đâu.', keys: ['giá nhà', 'nhà đất', 'mua bán nhà', 'nhà cũ'] },
  { letter: 'H', term: 'Học tiếng Hy Lạp', id: 'hy-lap', line: 'Khu Học trên blog: bảng chữ cái và 4 tuần A1 đầu, bài mới thêm dần.', keys: ['tiếng hy lạp'], href: '/hoc/' },
  { letter: 'K', term: 'Khí hậu, thời tiết', id: 'khi-hau', line: 'Mùa hè nóng khô, mùa đông ấm, chuyện thiếu nước.', keys: ['khí hậu', 'thời tiết'] },
  { letter: 'L', term: 'Lương, việc làm', id: 'luong', line: 'Mức lương thực tế và ai được đi làm hợp pháp.', keys: ['lương', 'đi làm', 'làm việc'] },
  { letter: 'M', term: 'Mua nhà', id: 'mua-nha', line: 'Quy trình, hợp đồng, phí chuyển nhượng, nhà mới hay nhà cũ.', keys: ['mua nhà', 'hợp đồng mua', 'phí chuyển nhượng', 'sổ đỏ', 'vay mua'] },
  { letter: 'N', term: 'Ngân hàng', id: 'ngan-hang', line: 'Mở tài khoản cần gì, mất bao lâu, vì sao hay bị hỏi kỹ.', keys: ['ngân hàng'] },
  { letter: 'Ô', term: 'Ô tô, xăng dầu', id: 'o-to', line: 'Mua xe, thuế đường bộ, kiểm định, bảo hiểm, giá xăng.', keys: ['ô tô', 'mua xe', 'xăng'] },
  { letter: 'Q', term: 'Quốc tịch', id: 'quoc-tich', line: 'Điều kiện nhập tịch, thời gian cư trú, bài thi tiếng và kiến thức; có bài thi thử.', keys: ['quốc tịch'], href: '/hoc/quoc-tich/' },
  { letter: 'S', term: 'Schengen', id: 'schengen', line: 'Síp chưa vào Schengen; tiến độ và ảnh hưởng tới người đang ở Síp.', keys: ['schengen'] },
  { letter: 'S', term: 'Sự kiện, lễ hội', id: 'su-kien', line: 'Lễ hội, chợ phiên và hoạt động cuối tuần trên đảo.', keys: ['lễ hội'], href: '/su-kien/' },
  { letter: 'T', term: 'Trường học cho con', id: 'truong-hoc', line: 'Trường công, trường quốc tế, học phí, du học đại học.', keys: ['trường học', 'đi học', 'du học'] },
  { letter: 'T', term: 'Thuế', id: 'thue', line: 'Cư trú thuế, non-dom, thuế cổ tức, VAT, khai thuế cá nhân.', keys: ['thuế', 'vat', 'non-dom', '60 ngày'] },
  { letter: 'T', term: 'Tin tức Síp', id: 'tin-tuc', line: 'Tin mới đáng chú ý cho người Việt.', keys: [], href: '/tin-tuc/' },
  { letter: 'V', term: 'Việt Nam – Síp', id: 'viet-nam-sip', line: 'Hiệp định thuế, chuyển tiền, giấy tờ từ Việt Nam.', keys: ['việt nam', 'chuyển tiền'] },
  { letter: 'Y', term: 'Y tế, GESY', id: 'y-te', line: 'GESY là hệ thống bảo hiểm y tế quốc gia của Síp: đăng ký, bác sĩ gia đình, chi phí.', keys: ['y tế', 'gesy'] },
];

export function postsFor<T extends { title: string; slug: string }>(a: AZ, posts: T[]) {
  if (!a.keys.length) return [];
  return posts.filter((p) => a.keys.some((k) => p.title.toLowerCase().includes(k)));
}
