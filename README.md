## Uruguay Relocation Companion

This repository contains a bilingual marketing site for Uruguay Relocation Companion, built with **React + Vite**, **Tailwind CSS** (with daisyUI), and **React Router**. It highlights relocation packages, services, resources, and a Netlify-backed contact form while keeping a floating call-to-action visible across the site.

### Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Build for production:
   ```bash
   npm run build
   ```

### Key Features

- Bilingual content (EN/ES) with language preference persisted in `localStorage`.
- Responsive layout components (`SiteHeader`, `FloatingCTA`, `Section`, etc.) styled with Tailwind CSS, daisyUI, and a custom gradient theme.
- React Router pages for Home, About, Pricing & Services, Resources (with placeholder articles), and Contact.
- Netlify-ready contact form (`form-name="contact"`) featuring honeypot spam protection and custom success/error handling.
- SEO/meta tags managed via `react-helmet-async`, with OpenGraph defaults provided in `index.html`.
- Floating CTA linking to the contact page, respecting safe-area insets for mobile devices.

### Deploying to Netlify

1. Push this repository to GitHub (or another Git provider).
2. In Netlify, create a new site from your repository.
3. Use the default build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. Deploy. Netlify will automatically detect and process the `contact` form thanks to the `data-netlify` attributes.
5. (Optional) Enable form notifications or automations from the Netlify dashboard under **Forms** → **contact**.

### Project Structure

```
src/
  components/    Shared UI components and layout helpers
  routes/        React Router pages
  i18n/          Language dictionaries and context provider
  styles/        Tailwind entry point and custom layers
public/
  icon.png
  logo.png
```

Feel free to adjust copy, add new resources, or expand services in the i18n dictionaries (`src/i18n/index.tsx`). The Tailwind theme lives in `tailwind.config.cjs`; update it if you need additional colors or typography choices.
