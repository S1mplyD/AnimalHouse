import React from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import "../../componentsCss/Quiz/Result.css";

function Result({ score, setScore }) {
  const navigate = useNavigate();
  const submitScore = async () => {
    await axios.post("http://localhost:8000/api/leaderboard", {
      playerName: document.getElementById("username").value,
      score: score,
    });
    setScore(0);
  };

  return (
    <div className="container">
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
            <input
              type="submit"
              className="submit"
              value="submit"
              onClick={() => {
                submitScore();
                navigate("/games");
              }}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Result;
