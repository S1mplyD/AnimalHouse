import React from "react";
import axios from "axios";
import "../../componentsCss/Quiz/Result.css";

function Result({ score }) {
  const submitScore = async () => {
    await axios.post("http://localhost:8000/api/leaderboard", {
      playerName: document.getElementById("username").value,
      score: score,
    });
  };

  return (
    <div className="container">
      test
      <div className="submitForm">
        <div className="score">Your score is: {score}</div>
        <div className="submitScore">
          <h1 className="text">Save your score</h1>
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
