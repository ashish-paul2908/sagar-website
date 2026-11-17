# sagar-website

Official website for **Sagar Verma** — singer-songwriter, Mumbai. Built around the debut solo EP *aakhri tohfa* (19 November 2026).

## Stack

- **Frontend:** Vite + React + TypeScript, plain CSS (`src/styles.css`)
- **Backend:** Supabase (Postgres + Row Level Security), project `Sagar`
- **Hosting:** GitHub Pages, deployed automatically by `.github/workflows/deploy.yml` on every push to `main`

## Editing content

Almost everything you'd want to change — bio, highlights, releases, EP chapters, links — lives in `src/content.ts`.

- When the EP is live on Spotify, set `EP.listenUrl` to the album URL.
- Tour dates come from the `shows` table in Supabase (only rows with `published = true` are shown).

## Database

Schema lives in `supabase/migrations/`.

| Table       | What it holds                         | Public access          |
|-------------|---------------------------------------|------------------------|
| `daisies`   | Fan-community sign-ups                | insert only            |
| `enquiries` | Booking / press / collab enquiries    | insert only            |
| `shows`     | Tour dates                            | read published rows    |

## Local development

```bash
npm install
npm run dev
```
