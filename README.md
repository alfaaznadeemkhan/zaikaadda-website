# ZaikaAdda — Premium WhatsApp Ordering Website

React + Vite website with Framer Motion effects, a swipeable auto-advancing food menu carousel, responsive layout, light/dark mode, and WhatsApp order enquiries.

## Run locally
```bash
npm install
npm run dev
```

## Production build
```bash
npm run build
npm run preview
```

## Current features
- WhatsApp order link uses `+91 93367 40942` (international link format: `919336740942`).
- Selected menu items and quantities are included in a customised WhatsApp message.
- Light mode is the default; visitors can switch to dark mode.
- Menu carousel auto-advances, supports swipe, arrows, and page dots; pauses while hovered/focused.
- Food images fill their card frames with edge-to-edge `object-fit: cover` styling.
- Footer showcases the ANK logo and The Advertisers logo with `alfaaznadeemkhan.in` and `theadvertisers.in` links.
- Technical SEO metadata, FoodEstablishment JSON-LD, `robots.txt`, `sitemap.xml`, and web manifest are included.
- No extra personal mobile number is displayed outside the requested WhatsApp contact.

## Important SEO launch step
ZaikaAdda's live domain has not been supplied. Replace `YOUR-ZAIKAADDA-DOMAIN` in `public/robots.txt` and `public/sitemap.xml` with the actual domain before deployment. See `SEO-SETUP.md` for the complete checklist. Google ranking position cannot be guaranteed.

## Footer developer branding
The footer shows two separate animated brand links side-by-side: Alfaaz Nadeem Khan (`alfaaznadeemkhan.in`) and The Advertisers (`theadvertisers.in`), using the supplied circular The Advertisers logo.
