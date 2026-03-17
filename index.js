require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.POLLINATIONS_API_KEY;

if (!API_KEY || API_KEY === 'your_sk_key_here') {
  console.warn('⚠️  Warning: POLLINATIONS_API_KEY is not set in your .env file');
}

app.use(express.static(path.join(__dirname, '../public')));

// Proxy route — keeps the API key server-side
app.get('/api/image', async (req, res) => {
  const { prompt, width = 512, height = 512, seed } = req.query;

  if (!prompt) {
    return res.status(400).json({ error: 'prompt is required' });
  }

  try {
    const encodedPrompt = encodeURIComponent(prompt);
    const seedParam = seed ? `&seed=${seed}` : '';
    const url = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${width}&height=${height}&nologo=true${seedParam}&key=${API_KEY}`;

    const response = await fetch(url);

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Pollinations API error' });
    }

    res.setHeader('Content-Type', response.headers.get('content-type') || 'image/jpeg');
    response.body.pipe(res);
  } catch (err) {
    console.error('Image proxy error:', err);
    res.status(500).json({ error: 'Failed to fetch image' });
  }
});

app.listen(PORT, () => {
  console.log(`🌸 Guess the Flower running at http://localhost:${PORT}`);
});
