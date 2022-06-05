import React from "react";
import axios from "axios";
import "../componentsCss/Result.css";

function Result({ score }) {
  const submitScore = async () => {
    await axios.post("http://192.168.8.176:8000/api/leaderboard", {
      playerName: document.getElementById("username").value,
      score: score,
    });
  };

  return (
    <div className="container">
      test
      <div className="submitForm">
        <div className="score">Il tuo punteggio è {score}</div>
        <div className="submitScore">
          <h1 className="text">Salva il tuo punteggio</h1>
          <form className="submitF">
            <input
              type="text"
              name="username"
              placeholder="username"
              id="username"
              className="submit"
            />
            <button
              className="submit"
              onClick={() => {
                submitScore();
              }}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Result;
