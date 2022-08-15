const axios = require("axios").default;
require("dotenv").config();

/**
 *
 * @param day
 * @param month
 * @param year
 * @returns true se è un giorno festivo, false altrimenti
 */
async function getHolidays(day, month, year) {
  try {
    const response = await axios.get(
      "https://calendarific.com/api/v2/holidays",
      {
        params: {
          api_key: process.env.HOLIDAY_API_KEY,
          country: "IT",
          year: year,
          month: month,
          day: day,
          type: "national",
        },
      }
    );
    return response.data.response.holidays.length > 0 ? true : false;
  } catch (error) {
    throw error;
  }
}

module.exports = { getHolidays };
