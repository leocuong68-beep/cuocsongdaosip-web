import { defineConfig } from 'astro/config';
// Blog Cuộc Sống Đảo Síp A-Z: web tĩnh, dữ liệu đọc từ Supabase "ditrusip" lúc build (chung bảng posts với app/web Di Trú Síp).
export default defineConfig({
  site: 'https://www.cuocsongdaosip.com',
  trailingSlash: 'always',
  build: { format: 'directory' },
});
