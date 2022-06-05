import image from "../1652541244672.png";
import { useNavigate, Link } from "react-router-dom";
import React from "react";
import "../componentsCss/Home.css";

function Home({ getQuestions, setScore, setQuestions }) {
  const navigate = useNavigate();
  const handleQuiz = async () => {
    await getQuestions();
    navigate("/quiz");
  };

  return (
    <div className="games">
      <img className="image" src={image} alt="quiz" onClick={handleQuiz} />
    </div>
  );
}

export default Home;
