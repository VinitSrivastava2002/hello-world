# GitHub Repository Explorer

Search a GitHub username and browse their public repositories. React + Vite, Tailwind CSS, native `fetch`.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:5173. Production build: `npm run build` (preview with `npm run preview`).

## Notes
- Uses the public, unauthenticated GitHub REST API (60 requests/hour per IP). No tokens in the code.
- Profile and repos are fetched in parallel; obsolete requests are cancelled with `AbortController`.
- Search, language filter, sorting and pagination (9 per page) are all client-side.
- Only the first 100 repos (most recently updated) are fetched; a notice appears if the user has more.
