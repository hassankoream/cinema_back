const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors');

app.use(cors()); // Enable CORS for all requests

// Add this basic route
app.get('/', (req, res) => {
  res.send('Node.js Server is running!');
});

app.get('/image-proxy', async (req, res) => {
  const imageUrl = req.query.url;

  console.log('Received request to proxy:', imageUrl);

  try {
    const response = await axios.get(imageUrl, {
      responseType: 'arraybuffer',
    });
    const buffer = Buffer.from(response.data, 'binary');

    res.set('Content-Type', response.headers['content-type']);
    res.send(buffer);
  } catch (err) {
    console.error('Error fetching the image:', err);
    res.status(500).send('Error fetching the image');
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
