import express from "express";
import cors from "cors";
import fetch from "node-fetch"; // Adicionar node-fetch
import https from "https";

const app = express();
const PORT = process.env.PORT || 8080;

// Permite requisições de qualquer origem (CORS)
app.use(cors());

// Criar um agente HTTPS que ignora erros de certificado (opcional, cuidado em produção)
const agent = new https.Agent({ rejectUnauthorized: false });

app.get("/ping", async (req, res) => {
  const url = req.query.url;

  if (!url) {
    return res.status(400).send("URL ausente");
  }

  try {
    const response = await fetch(url, {
      method: "GET",
      agent: url.startsWith('https') ? agent : undefined,
      timeout: 5000, // 5 segundos de timeout
    });

    if (response.ok) {
      res.status(200).send("Online");
    } else {
      res.status(response.status).send("Offline");
    }
  } catch (error) {
    console.error("Erro ao acessar:", error.message);
    res.status(500).send("Offline");
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
