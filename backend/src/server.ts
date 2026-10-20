import express from "express";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    message: "API do Simulador de Empréstimo Consignado funcionando!",
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);

  app.get("/health", (_req, res) => {
    res.status(200).json({
      status: "ok",
      message: "API disponível",
    });
  });
});
