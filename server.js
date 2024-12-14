import express from "express";
import schedule from "node-schedule";
import coletarDadosLotoFacil from "./jobs/cronJob.js";
import proxy from "./utils/proxy.js";

const app = express();

// Middleware para JSON
app.use(express.json());

// Middleware do Proxy
app.use(proxy);

// Rota de teste
app.get("/", (req, res) => {
  res.send("Servidor rodando! Cron job configurado.");
});

// Configurando o cron job
schedule.scheduleJob("0 3 * * *", async () => {
  console.log("Executando o cron job às 03:00 AM...");
  try {
    const novosDados = await coletarDadosLotoFacil();
    console.log("Dados coletados com sucesso:", novosDados);
  } catch (error) {
    console.error("Erro ao executar o cron job:", error.message);
  }
});

// Inicializando o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
