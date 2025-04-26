import express from 'express';
import cors from 'cors';
const app = express();
const port = 10000;

// Configuração do CORS para permitir requisições do domínio do GitHub Pages
const corsOptions = {
  origin: 'https://lvvlopes.github.io', // Substitua pelo domínio do seu GitHub Pages
  methods: ['GET', 'POST'],
};

app.use(cors(corsOptions)); // Aplicando a configuração de CORS

// Rota de ping para verificar a disponibilidade de um site
app.get('/ping', (req, res) => {
  const { url } = req.query;
  
  if (!url) {
    return res.status(400).json({ error: 'URL não fornecida.' });
  }

  // Faz a requisição para verificar o status do site
  fetch(url, { method: 'HEAD', mode: 'no-cors' })
    .then(() => {
      return res.json({ status: 'Site verificado', url });
    })
    .catch((error) => {
      console.error('Erro ao verificar o site:', error);
      return res.status(500).json({ error: 'Erro ao verificar o site.' });
    });
});

// Iniciando o servidor na porta 3000
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
