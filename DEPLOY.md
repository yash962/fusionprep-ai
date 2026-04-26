# Make FusionPrep AI Live

This site is a static website, so it can go live on GitHub Pages, Netlify, Vercel, Cloudflare Pages,
or any normal web host.

## Fastest Public Hosting Options

### GitHub Pages

1. Create a new GitHub repository named `fusionprep-ai`.
2. Push this folder to that repository.
3. In GitHub, open Settings, then Pages.
4. Choose GitHub Actions or deploy from the `main` branch.
5. Keep `.github/workflows/daily-post.yml` enabled for daily original posts.

### Netlify

1. Open Netlify and choose Add new site.
2. Import the GitHub repository or drag this whole folder into Netlify.
3. The included `netlify.toml` publishes the site root.

### Vercel

1. Import the repository in Vercel.
2. Keep the project as a static site.
3. No build command is required.

## Before Using A Real Domain

Replace `fusionprep-ai.example.com` in `robots.txt` and `sitemap.xml` with your real domain.

## Legal Reminder

Keep posts original. Link to official Oracle pages, but do not copy Oracle docs, screenshots, tables,
release-note text, training material, certification questions, My Oracle Support content, or client data.
