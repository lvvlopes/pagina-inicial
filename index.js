import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get("/check", async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).send("Missing URL");

  try {
    const response = await fetch(url, { method: "HEAD" });
    res.status(response.status).send(response.statusText);
  } catch (error) {
    res.status(500).send("Erro ao acessar o site");
  }
});

app.listen(PORT, () => {
  console.log(`Servidor proxy rodando na porta ${PORT}`);
});
