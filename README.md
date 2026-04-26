# FusionPrep AI Website

FusionPrep AI is a static content site for original Oracle HCM Cloud interview prep,
implementation notes, AI Agent Studio guidance, business use cases, and release-readiness links.

## What Is Included

- `index.html`, `styles.css`, and `app.js` create the website.
- `data/posts.json` stores original posts and official reference links.
- `tools/generate-daily-post.mjs` adds one new original post per day.
- `.github/workflows/daily-post.yml` runs the generator daily for a GitHub Pages style deployment.
- `netlify.toml`, `vercel.json`, `.nojekyll`, `robots.txt`, and `sitemap.xml` prepare the site for common static hosts.

## Legal And Ethical Rules

Write original educational content only. Do not copy Oracle documentation, release notes, screenshots,
training materials, certification questions, My Oracle Support content, or client-confidential material.
Use short summaries in your own words and link to official Oracle pages for the source details.

Oracle, Java, and related marks belong to Oracle and/or its affiliates. FusionPrep AI is independent
and is not affiliated with, endorsed by, or sponsored by Oracle.

## Run Locally

Open `index.html` in a browser, or run a small local server:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Daily Posting

To test the daily post generator:

```bash
node tools/generate-daily-post.mjs
```

For real automatic publishing, place this project in a GitHub repository, enable GitHub Pages, and keep
the included workflow enabled. It runs daily at 03:30 UTC, which is 09:00 in India Standard Time.

I also created a Codex app automation named `FusionPrep AI Daily Post` that runs daily at 09:00 and
updates this workspace with a new original post when needed.

See `DEPLOY.md` for the shortest path to make the site public.
