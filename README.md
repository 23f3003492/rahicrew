# Rahi Crew — Website

Your website is a static site — plain HTML, CSS, and JavaScript. No database, no build step, no server-side code. That makes it fast and simple to host anywhere.

## What's inside
```
index.html              → the whole site (one page, sections linked by nav)
assets/css/style.css    → all styling (colours, layout, responsive rules)
assets/js/main.js       → nav behaviour, scroll animations, gallery filter + lightbox, enquiry form
assets/images/          → all photos, logo, and favicon (already compressed for web)
assets/fonts/           → Fraunces (headings) & Jost (body) font files, self-hosted
```

## How to put it live on your domain

You already own **rahicrew** as a domain — you just need hosting to connect it to. Easiest free/cheap options:

**Option A — Netlify or Vercel (recommended, free, 5 minutes)**
1. Go to netlify.com (or vercel.com) → sign up free.
2. Drag and drop this whole folder onto the "Deploy" area.
3. It gives you a live URL immediately. Then in "Domain settings," add your purchased domain and follow their instructions to point your domain's DNS to them (they'll give you exact records to add at GoDaddy/Namecheap/wherever you bought the domain).

**Option B — Any standard web hosting (Hostinger, GoDaddy hosting, etc.)**
1. Log into your hosting control panel → File Manager (or use FTP).
2. Upload everything inside this folder into the `public_html` (or `www`) directory, keeping the folder structure intact.
3. Your domain will show the site automatically once DNS is pointed at that hosting.

## The enquiry form
The "Reserve Your Crew" form on the Contact section doesn't need a backend — when someone submits it, it opens WhatsApp (to +91 95402 59307) with their details pre-filled as a message. If you'd rather receive enquiries by email instead (or in addition), let your developer know — that's a small change to `assets/js/main.js`.

## Editing content later
- **Text**: open `index.html` in any text editor and edit directly — it's organised by section with comments like `<!-- ================= HERO ================= -->`.
- **Colours**: all colours are defined once at the top of `assets/css/style.css` under `:root{...}` — change a value there and it updates everywhere.
- **Photos**: swap files in `assets/images/` (keep the same filename, or update the filename in `index.html`).

## Notes
- Fully responsive — tested down to mobile.
- No tracking/analytics installed. Add Google Analytics or Meta Pixel later if you want to measure visits.
- Contact details currently on the site: +91 95402 59307 · teamrahicrew@gmail.com · @rahicrew
