# Uruguay Relocation Companion

Marketing site for [relocationuy.com](https://relocationuy.com). React 19, Vite, TypeScript, Tailwind CSS with daisyUI, React Router. Hosted on Netlify.

## Run it

```bash
npm install
npm run dev      # local dev server
npm run build    # typecheck, build and prerender every page into dist/
npm run lint
```

Netlify runs `npm run build` and publishes `dist` (see `netlify.toml`, Node 22).

## Where things live

- `src/content/siteCopy.ts` has most of the site text: nav, home, pricing, contact form labels and options.
- `src/content/packages.ts` is the one place the three packages, prices and features are written. Home, Pricing and the contact form dropdown all read from it.
- `src/content/blog/*.md` are the blog posts.
- `src/content/resourcesData.ts` is the Resources guides.
- `src/routes/` has one file per page. `src/components/` has the shared pieces.
- `src/lib/trackingData.ts` loads the client progress page data.

## Contact form

The form sends through [EmailJS](https://www.emailjs.com/). The service ID, template ID and public key are set at the top of `src/routes/Contact.tsx`. The public key is meant to be public. In the EmailJS dashboard, restrict allowed domains to relocationuy.com.

The template can use these variables: `{{name}}`, `{{email}}`, `{{whatsapp}}`, `{{package}}`, `{{timeline}}`, `{{travelers}}`, `{{stage}}`, `{{source}}`, `{{message}}`.

## Environment variables

Set these in Netlify under Site configuration, Environment variables. They are read at build time, so redeploy after changing them. See `.env.example`.

- `VITE_SCHEDULER_URL`: link to the booking page for the free call. Leave empty to hide the "Pick a time" card.
- `VITE_SHEET_CSV_URL`: published CSV of the client tracking sheet.

## Notes

- Pages are built ahead of time. `npm run build` builds the site twice (browser version and a server version), then `scripts/prerender.mjs` writes a finished HTML file for every page into `dist/`. Visitors, search engines and link scrapers get real content straight away, and React takes over in the browser. The list of pages is `routes()` in `src/entry-server.tsx`. Add new pages there.
- `/tracking` and unknown URLs are not prerendered. Netlify serves them `spa.html` (see `public/_redirects`) and the browser renders them.
- Anything that reads the browser (localStorage, window, today's date, the visitor's timezone) must wait until after the first render, or the prebuilt HTML and the browser will disagree.
