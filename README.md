# Rapid Response Care Management — Website

## Project Structure

```
rapid-response/
├── index.html          # Main page (all sections, single-page layout)
├── css/
│   └── styles.css      # All styles — design tokens, layout, components
├── js/
│   └── main.js         # Nav scroll, fade animations, payment modal logic
├── assets/
│   └── images/         # Drop local images here (Sarah's photo, OG image, etc.)
└── README.md
```

## Stripe Payment Setup

Each service card opens a payment modal. To activate real payments:

1. Create a free Stripe account at https://stripe.com
2. Go to **Dashboard → Payment Links → Create Payment Link**
3. Create three links:
   - **Concierge**: Recurring subscription, $1,800/month
   - **Discharge**: One-time payment, $450 (or custom amount)
   - **Hourly**: One-time payment, $125/hour
4. Open `js/main.js` and replace the placeholder values:
   ```js
   stripeUrl: 'https://buy.stripe.com/YOUR_CONCIERGE_LINK'
   stripeUrl: 'https://buy.stripe.com/YOUR_DISCHARGE_LINK'
   stripeUrl: 'https://buy.stripe.com/YOUR_HOURLY_LINK'
   ```

## Deploying to Vercel

```bash
npm install -g vercel
cd rapid-response
vercel
```

Follow the prompts. Vercel will detect a static site automatically.
To set a custom domain, go to your Vercel project → Settings → Domains.

## SEO Notes

The Geographic Authority document contains 25 long-tail keyword variations
and full page copy. Key metadata is already in index.html:
- Meta title: "Concierge Nursing Care Austin TX | Rapid Response Care Management"
- Meta description: 158 characters, keyword-optimized
- Canonical URL: update to match the real domain before launch

## Local Development

No build step needed. Just open `index.html` in a browser.
For the contact form to actually send emails, you'll need a backend or
a service like Formspree (https://formspree.io) — drop in their action URL.

## Images

Sarah's photo currently loads from the previous contractor's CDN.
Download it and save to `assets/images/sarah-mckinnon.webp` for self-hosting.
Update the two `<img src="...">` tags in index.html accordingly.
