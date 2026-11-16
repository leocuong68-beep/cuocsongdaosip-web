# Blog Cuộc Sống Đảo Síp A-Z (www.cuocsongdaosip.com)

Blog cá nhân của Leo Cường, tách từ mục Tin tức/blog và Khu Học của ditrusip.com (sếp chốt 16/11/2026). Giọng chia sẻ, xưng "mình", gọi "các bác/các bạn", không bán hàng.

- Astro 7, web tĩnh, host GitHub Pages. Dữ liệu đọc lúc build từ Supabase `ditrusip` (egbxinegjmhcdqfprsds), **chung bảng `posts`** với web/app Di Trú Síp.
- Cột `posts.section`: `tin-tuc` · `kinh-nghiem` · `su-kien` · `hoc-tap` · `video`. Cột `category` là chủ đề lọc (doi-song, an-cu, di-tru, bds, kinh-te). `youtube_id` cho bài video.
- Video: Edge Function `yt-sync` (pg_cron `yt-sync-hourly`, phút 17) đọc RSS kênh Cường Đảo Síp, bỏ Shorts (link /shorts/ trong RSS), bỏ phần quảng cáo cuối mô tả, thêm bài `section='video'`, slug `video-<tiêu đề>`.
- Sự kiện: bảng `events` (chung với app).
- Khu Học: `/hoc/`, `/hoc/tieng-hy-lap/`, `/hoc/quan-tri/`, đăng nhập `/dang-nhap/` (mã email, tài khoản chung Di Trú Síp; đăng ký từ blog ghi lead `source='blog'`). Bài học ở bảng `hoc_lessons` (RLS), máy chạy bài `public/hoc/hy-lap.js`.
- Sổ tay A-Z: `src/lib/az.ts` (mục + từ khoá khớp tiêu đề bài).
- Build lại mỗi 2 giờ và 05:55/06:55 UTC (sau bài 7:47 giờ Síp). `npm ci && npm run build` → `dist/`.
- Link trong bài cũ trỏ tới trang dịch vụ/dự án/chi phí của Di Trú Síp được đổi thành link tuyệt đối về ditrusip.com (`fixLinks` trong `src/lib/db.ts`).
- ditrusip.com: các URL bài cũ, `/blog/`, `/hoc/*` chuyển (meta refresh + canonical) về đúng trang trên blog.
