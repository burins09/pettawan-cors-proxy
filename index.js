const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/proxy', async (req, res) => {
  const targetUrl = req.query.url;
  const bearerToken = process.env.BEARER_TOKEN;

  if (!targetUrl) {
    return res.status(400).json({ error: 'Missing ?url=' });
  }

  try {
    const response = await fetch(targetUrl, {
      headers: {
        Authorization: `Bearer ${bearerToken}`
      }
    });

    const data = await response.json();

    res.set('Access-Control-Allow-Origin', '*');
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 CORS Proxy running at http://localhost:${PORT}`);
});
