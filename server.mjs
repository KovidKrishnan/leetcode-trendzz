import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const PORT = 3000;

const corsOptions = {
  origin: ['127.0.0.1:5173', '192.168.29.83:5173']
}

app.use(cors()); // Use cors middleware with options

app.use(express.json());

app.get('/connect', async(req, res) => {
  res.json({data: 'Connected Successfully'})
}

app.post('/graphql', async (req, res) => {
  const body = req.body;

  fetch('https://leetcode.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Referer: 'https://leetcode.com'
    },
    body: JSON.stringify(body),
  })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      res.json(data);
    })
    .catch(error => {
      console.error('Error fetching or processing data:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
