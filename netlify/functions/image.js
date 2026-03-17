const https = require('https');

exports.handler = async (event) => {
  const { prompt, width = 512, height = 512, seed } = event.queryStringParameters || {};

  if (!prompt) {
    return { statusCode: 400, body: JSON.stringify({ error: 'prompt is required' }) };
  }

  const API_KEY = process.env.POLLINATIONS_API_KEY;
  if (!API_KEY || API_KEY === 'your_sk_key_here') {
    return { statusCode: 500, body: JSON.stringify({ error: 'POLLINATIONS_API_KEY is not set in .env' }) };
  }

  const seedParam = seed ? `&seed=${seed}` : '';

  // Updated to new unified endpoint: gen.pollinations.ai
  const url = `https://gen.pollinations.ai/image/${encodeURIComponent(prompt)}?model=flux&width=${width}&height=${height}&nologo=true${seedParam}&key=${API_KEY}`;

  console.log('Fetching:', url.replace(API_KEY, 'REDACTED'));

  try {
    const result = await new Promise((resolve, reject) => {
      https.get(url, (res) => {
        console.log('Status:', res.statusCode, 'Content-Type:', res.headers['content-type']);
        const chunks = [];
        res.on('data', chunk => chunks.push(chunk));
        res.on('end', () => {
          const buffer = Buffer.concat(chunks);
          const contentType = res.headers['content-type'] || '';
          if (!contentType.startsWith('image/')) {
            console.error('Non-image body:', buffer.toString('utf8').slice(0, 500));
          }
          resolve({ buffer, contentType, statusCode: res.statusCode });
        });
        res.on('error', reject);
      }).on('error', reject);
    });

    if (result.statusCode !== 200) {
      return {
        statusCode: result.statusCode,
        body: JSON.stringify({
          error: `Pollinations returned ${result.statusCode}`,
          detail: result.buffer.toString('utf8').slice(0, 300)
        })
      };
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': result.contentType || 'image/jpeg' },
      body: result.buffer.toString('base64'),
      isBase64Encoded: true,
    };
  } catch (err) {
    console.error('Image fetch error:', err.message);
    return { statusCode: 500, body: JSON.stringify({ error: 'Failed to fetch image', detail: err.message }) };
  }
};