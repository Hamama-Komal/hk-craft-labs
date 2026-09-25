# HK Craft Labs

The website for **HK Craft Labs**, a studio for Android apps and AI tools founded by Hamama Komal, a solo founder based in Bhakkar, Pakistan.

The page is built for conversation. Visitors can share an idea, ask whether AI could help them, or just say hi. They can pick a topic, write a message and send it through WhatsApp or email, or reach the studio on Instagram and TikTok.

## Stack

Plain HTML, CSS and a little JavaScript, with no build step and no framework. Fonts come from Google Fonts (Bricolage Grotesque, Figtree and Caveat).

```
index.html   page content
styles.css   layout and theme (light and dark)
script.js    scroll reveal, topic buttons and the message form
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
