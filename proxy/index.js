const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');


const app = express();
const port = process.env.PORT || 8080;

app.use(cors());

app.get("/ping", async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).send('URL não fornecida.');
  }

  try {
    const response = await fetch(url, { method: 'HEAD', headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
  }, timeout: 10000 });
    if (response.ok) {
      res.status(200).send('Online');
    } else {
      res.status(503).send('Offline');
    }
  } catch (error) {
    console.error(error);
    res.status(503).send('Offline');
  }
});

app.get("/", (req, res) => {
  res.send("Servidor de proxy rodando!");
});

app.listen(port, () => {
  console.log("Servidor rodando na porta ${port}");
});
