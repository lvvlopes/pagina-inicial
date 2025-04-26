import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());

app.get("/ping", async (req, res) => {
  const url = req.query.url;

  if (!url) return res.status(400).send("URL ausente");

  try {
    const response = await fetch(url, { method: "GET" });
    if (!response.ok) {
      return res.status(response.status).send("Offline");
    }

    res.status(200).send("Online");
  } catch (error) {
    res.status(500).send("Erro ao tentar acessar o site");
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
