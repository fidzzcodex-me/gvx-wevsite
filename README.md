# gvx

Dashboard pribadi untuk GitHub dan Vercel. Bukan SaaS — satu pengguna, satu browser, tanpa backend penyimpanan token.

## Fitur

- Statistik akun GitHub: repos, followers, gists, rate limit
- Repo terbaru dan deployment Vercel terbaru
- Uploader: commit/update file ke repo GitHub langsung dari browser (tulis manual atau upload file, maks 500KB)
- Deploy: lihat project Vercel, status deployment terakhir, trigger deploy baru
- Profil read-only untuk akun GitHub dan Vercel
- Dark mode, hapus token kapan saja

## Cara kerja token

Token GitHub dan Vercel disimpan **hanya** di `localStorage` browser kamu. Semua request API dikirim langsung dari browser ke `api.github.com` dan `api.vercel.com` — tidak pernah melewati server aplikasi ini.

## Membuat token

### GitHub Personal Access Token

1. Buka [github.com/settings/tokens](https://github.com/settings/tokens?type=beta) (Fine-grained token) atau classic token
2. Beri scope minimal: `repo`, `read:user`
3. Salin token, tempel di halaman `/auth`

### Vercel Token

1. Buka [vercel.com/account/tokens](https://vercel.com/account/tokens)
2. Buat token baru dengan scope akun personal kamu
3. Salin token, tempel di halaman `/auth`

## Menjalankan lokal

```bash
npm install
npm run dev
```

Buka `http://localhost:3000`.

## Catatan keamanan

- Token tidak pernah dikirim ke server aplikasi ini, hanya ke API resmi GitHub/Vercel
- Token tidak pernah di-log ke console pada build production
- Hapus token kapan saja lewat halaman Settings
- Karena token disimpan di localStorage, jangan pakai di komputer/browser yang dipakai bersama orang lain

## Tech stack

Next.js 14 (App Router) · React 18 · TypeScript · Tailwind CSS · Zustand · Framer Motion · AOS · Font Awesome React · React Hook Form + Zod · Sonner · date-fns
