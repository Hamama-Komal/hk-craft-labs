# HK Craft Labs

The studio page for **HK Craft Labs**, where Hamama Komal takes on outside work: Flutter apps and practical AI tools.

The page explains who is behind the studio, lists work that is live on Google Play, walks through how a project starts, and gives visitors a short brief form. The form writes a message and opens it in the visitor's email or WhatsApp.

- Portfolio: https://hamama-komal.vercel.app/
- Contact: hamama.komal.00@gmail.com

## Stack

Plain HTML, CSS and a little JavaScript. There is no build step and no framework. Fonts come from Google Fonts (Fraunces, IBM Plex Sans, IBM Plex Mono).

```
index.html   page content
styles.css   layout and theme (light and dark)
script.js    scroll reveal and brief form
favicon.svg  site icon
og.png       social share image (1200×630)
```

## Run locally

```bash
python -m http.server 5173
```

Then open http://localhost:5173.

## Deploy

Deployed on Vercel as a static site. Every push to `main` redeploys automatically.
