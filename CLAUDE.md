# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Tushar Chawla's personal portfolio/resume site, deployed via GitHub Pages at `chawlatushar5.github.io`
(repo `chawlatushar5/chawlatushar5.github.io`, served from the `master` branch root — no custom domain
currently configured, despite CNAME having been added/removed in history).

It's a static site built on the **Start Bootstrap "Grayscale"** template (Bootstrap 3 + jQuery +
Font Awesome), with a Gulp/LESS pipeline for compiling theme assets. `_config.yml` declares
`theme: jekyll-theme-slate`, but that Jekyll theme is **not** what's actually rendered — the live
page is the custom `index.html` built on the Grayscale/Bootstrap theme. Treat `_config.yml` as
legacy/likely-vestigial rather than authoritative.

## Commands

There is no `node_modules/` checked in (gitignored), so install devDependencies before running gulp:

```bash
npm install
```

Note `package.json` pins very old tooling (gulp 3.9.1, gulp-less, jquery 1.x) — these may need an
older Node version or `--legacy-peer-deps` to install cleanly on modern Node.

Gulp tasks (defined in `gulpfile.js`):

```bash
npx gulp           # default: compile LESS → CSS, minify CSS/JS, copy vendor libs from node_modules
npx gulp dev       # browserSync dev server + watch (LESS, CSS, JS, *.html) with live reload
npx gulp less      # compile less/grayscale.less → css/grayscale.css
npx gulp minify-css
npx gulp minify-js
npx gulp copy      # copies bootstrap/jquery/font-awesome from node_modules into vendor/
```

There is no test suite, linter, or CI — this is a static site with no build verification beyond
visually checking the rendered HTML.

To preview without Gulp, just open `index.html` directly or serve the directory with any static
file server — the page only references already-compiled assets (`css/grayscale.min.css`,
`js/grayscale.min.js`, `vendor/...`).

## Architecture / structure

- **`index.html`** — the live single-page site: a Bootstrap "Grayscale" one-pager with sections
  `#about` (skills table), `#projects` (links to GitHub repos / external project pages), and
  `#contact` (email + social links + résumé download). Navigation uses in-page scroll anchors.
- **`less/grayscale.less`** (and `sass/grayscale.scss`, kept in parallel) — theme source styles;
  compiled output lives in `css/grayscale.css` / `css/grayscale.min.css`. Edit the LESS (or SCSS)
  source and recompile rather than hand-editing the generated CSS.
- **`js/grayscale.js`** / **`js/grayscale.min.js`** — theme JS (scroll behavior, nav highlighting);
  minified via the `minify-js` gulp task.
- **`vendor/`** — third-party libs (bootstrap, jquery, font-awesome) copied in by `gulp copy`;
  don't hand-edit, regenerate via the gulp `copy` task after `npm install`.
- **`img/`** — site images (background images, profile picture).
- **Résumé PDFs** (`Resume.pdf`, `Resume AI.pdf`, `Resume Android.pdf`, `Resume Software Dev.pdf`,
  `Resume_old.pdf`) live at the repo root and are linked directly from the Contact section
  (`<a href="Resume.pdf">`). Replacing these in place is how the downloadable résumé gets updated.
- **`tys.html`** + **`TYS – Apps on Google Play_files/`** — a large saved snapshot of an external
  "Apps on Google Play" page, linked from the Projects section as "TYS (Beta Page)". It's an
  inert saved artifact, not something to maintain as live code.
- **`index2.html`** — an unrelated, untracked placeholder ("Coming Soon...") page with content
  about a third party ("Swapnil Rege"); it is not linked from `index.html` and is not part of the
  live site. Don't assume it's meant to be deployed.

## Notes

- This repo is separate from `Career/Resume/HTML Resume/` (the `/resume-tailor` system) — that
  system produces tailored résumé HTML/PDF outputs; this repo is the public portfolio site that
  happens to also host downloadable résumé PDFs.
- The working tree commonly shows large binary diffs in `Resume*.pdf` and the
  `TYS – Apps on Google Play_files/` saved-page assets — these churn from re-saves/exports rather
  than meaningful code changes.
