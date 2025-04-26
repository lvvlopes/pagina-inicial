import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import https from "https";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());

const agent = new https.Agent({ rejectUnauthorized: false });

app.get("/ping", async (req, res) => {
  const url = req.query.url;

  if (!url) {
    console.error("[ERRO] URL não fornecida!");
    return res.status(400).json({ error: "URL ausente" });
  }

  console.log(`[LOG] Verificando site: ${url}`);

  try {
    const response = await fetch(url, {
      method: "GET",
      agent: url.startsWith('https') ? agent : undefined,
      timeout: 5000, 
    });

    console.log(`[LOG] Status de ${url}: ${response.status}`);

    if (response.ok) {
      res.status(200).json({ status: "Online" });
    } else {
      res.status(response.status).json({ status: "Offline" });
    }
  } catch (error) {
    console.error(`[ERRO] Falha ao acessar ${url}:`, error.message);
    res.status(500).json({ error: "Erro ao acessar site" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
