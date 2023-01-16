const axios = require("axios");
require("dotenv").config();

/**
 * GET
 * Funzione che ritorna 20 domande di difficoltà casuale sugli animali
 */
async function getTrivia() {
  try {
    const response = await axios.get("https://opentdb.com/api.php", {
      params: {
        amount: 5,
        category: 27,
        type: "multiple",
      },
    });
    return response.data.results;
  } catch (error) {
    throw error;
  }
}

module.exports = { getTrivia };
