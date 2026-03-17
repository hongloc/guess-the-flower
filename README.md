# 🌸 Guess the Flower

An AI-powered flower guessing game built with [pollinations.ai](https://pollinations.ai).

## Run locally

### Step 1 — Install Netlify CLI
```bash
npm install -g netlify-cli
```

### Step 2 — Set up your API key
```bash
cp .env.example .env
```
Edit `.env` and paste your real key from [enter.pollinations.ai](https://enter.pollinations.ai):
```
POLLINATIONS_API_KEY=sk_your_real_key_here
```

### Step 3 — Start the dev server
```bash
netlify dev
```

Open [http://localhost:8888](http://localhost:8888) in your browser.

> ⚠️ Don't open `index.html` directly in the browser — the image function won't work without `netlify dev` running.

### Debugging
If images fail, check your terminal output. The function logs the exact status code and error from pollinations.ai so you can see what's going wrong.

---

## Deploy to Netlify

### Step 1 — Push to GitHub
```bash
git init
git add .
git commit -m "initial commit"
git remote add origin https://github.com/YOUR_USERNAME/guess-the-flower.git
git push -u origin main
```

### Step 2 — Connect to Netlify
1. Go to [netlify.com](https://netlify.com) and log in
2. Click **"Add new site" → "Import an existing project"**
3. Choose **GitHub** and select your repo
4. Build settings are auto-detected from `netlify.toml` — just click **Deploy**

### Step 3 — Add your API key
1. In Netlify dashboard go to **Site configuration → Environment variables**
2. Click **"Add a variable"**
3. Key: `POLLINATIONS_API_KEY`
   Value: your `sk_...` key from [enter.pollinations.ai](https://enter.pollinations.ai)
4. Click **Save** then **Trigger redeploy**

That's it — your site is live! 🎉

---

## Project structure

```
guess-the-flower/
├── index.html                  ← game frontend
├── netlify.toml                ← Netlify config
├── .env                        ← your secret key (never commit!)
├── .env.example                ← template (safe to commit)
├── .gitignore                  ← excludes .env and node_modules
└── netlify/
    └── functions/
        └── image.js            ← serverless proxy (key lives here)
```

## How the key stays hidden

```
Browser → /.netlify/functions/image?prompt=... → Netlify Function → gen.pollinations.ai (with sk_ key)
```

The `sk_` key only exists in your `.env` locally and as a Netlify environment variable in production — it never touches the frontend.

## Built with
- [pollinations.ai](https://pollinations.ai) — AI image generation
- Netlify Functions — serverless backend
- Vanilla JS + HTML/CSS — frontend