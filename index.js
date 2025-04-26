// index.js
const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors()); // permite que qualquer site acesse este backend

app.get("/verificar", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).json({ error: "URL obrigatória" });

  try {
    const response = await fetch(url, { method: "HEAD" });
    res.json({ status: response.status });
  } catch (err) {
    res.json({ status: 0, error: "Falha na requisição" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
