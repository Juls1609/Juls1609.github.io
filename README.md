# Julieta Schwartz Cerveny - Portfolio

Personal portfolio for a Football Data Scientist, built with Astro and designed for GitHub Pages.

## Run locally

Use Node 24 or newer, then run:

```bash
pnpm install
pnpm dev
```

Open the local address printed by Astro, usually `http://localhost:4321`.

Build the production version with:

```bash
pnpm build
pnpm preview
```

## Add a project

Add one object to `src/data/projects.ts`. Required fields are `slug`, `title`, `eyebrow`, `year`, `summary`, `challenge`, `approach`, `outcomes`, `technologies`, and `dataset`.

The homepage shows up to six projects in the order they appear in the file. The dynamic route at `src/pages/projects/[slug].astro` automatically creates the project-detail page from its `slug`.

Optional fields:

- `image`, `imageAlt`, `imageCaption`: a wide image for the project page, saved under `public/images/`. It is also the preview image when the project page is shared.
- `cardImage`: a separate image for the homepage card (useful when the wide image would crop badly). Defaults to `image`.
- `demo`: `{ label, url }` for the main link, such as a live app or published analysis. It is shown on the card and the project page.
- `repository`: `{ label, url }` for the code link on the project page.

## Customise

- Profile photo: `public/images/julieta-schwartz-cerveny.jpg`
- CV download: `public/julieta-schwartz-cerveny-cv.pdf`
- Colours and typography: `src/styles/global.css`
- Contact links: `src/pages/index.astro`

## Deploy to GitHub Pages

1. Create a GitHub repository, for example `julieta-portfolio`.
2. Push this project to the repository's `main` branch.
3. In GitHub: **Settings → Pages → Build and deployment → Source**, select **GitHub Actions**.
4. The included `.github/workflows/deploy.yml` will build and publish on each push to `main`.

The Astro configuration determines the GitHub Pages `base` path automatically during Actions builds. If you name the repository `Juls1609.github.io`, the portfolio will publish at `https://juls1609.github.io/`; otherwise it publishes at `https://juls1609.github.io/<repository-name>/`.

For a custom domain later, update `site` in `astro.config.mjs` and add a `public/CNAME` file containing only your domain name.
