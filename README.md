# 🌸 Guess the Flower

An AI-powered flower guessing game built with [pollinations.ai](https://pollinations.ai).

Each round generates a unique photorealistic flower image via the pollinations.ai image API. Guess the flower name from 4 choices, earn streaks, and score up to 100 points!

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Add your API key
Copy the example env file and fill in your key from [enter.pollinations.ai](https://enter.pollinations.ai):
```bash
cp .env.example .env
```
Then edit `.env`:
```
POLLINATIONS_API_KEY=sk_your_real_key_here
PORT=3000
```

### 3. Run the app
```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

For development with auto-reload:
```bash
npm run dev
```

## How it works

The API key is kept **server-side only**. The frontend calls `/api/image` on your Express server, which proxies the request to pollinations.ai with the secret key attached — the key is never exposed to the browser.

```
Browser → /api/image?prompt=... → Express server → pollinations.ai (with sk_ key)
```

## Project structure

```
guess-the-flower/
├── .env              # your secret key (never commit this!)
├── .env.example      # template for others
├── .gitignore        # excludes .env and node_modules
├── package.json
├── server/
│   └── index.js      # Express server + image proxy
└── public/
    └── index.html    # game frontend
```

## Built with
- [pollinations.ai](https://pollinations.ai) — AI image generation
- Express.js — backend server
- Vanilla JS + HTML/CSS — frontend

[![Built With pollinations.ai](https://image.pollinations.ai/prompt/pollinations%20ai%20logo?width=120&height=30&nologo=true)](https://pollinations.ai)
