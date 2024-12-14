const axios = require("axios");
require("dotenv").config();

const BASE_URL = process.env.LOTTO_API_BASE_URL;

async function fetchLotoFacilData(id) {
  try {
    const response = await axios.get(`${BASE_URL}/${id}.json`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar dados para o ID ${id}:`, error.message);
    throw error;
  }
}

module.exports = { fetchLotoFacilData };
