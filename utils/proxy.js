import express from "express";
import axios from "axios";
import cors from "cors";

const router = express.Router();

// Middleware para habilitar CORS
router.use(cors());

// Rota para proxy
router.get("/api/lotofacil/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(
      `https://www.gigasena.com.br/data/lotofacil/${id}.json`
    );
    res.json(response.data);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json({ error: "Erro ao obter os dados" });
  }
});

export default router;
