import image from "../1652541244672.png";
import { useNavigate, Link } from "react-router-dom";
import React from "react";

function Home({ getQuestions, setScore, setQuestions }) {
  const history = useNavigate();
  const handleQuiz = async () => {
    await getQuestions();
    history("/quiz");
  };
  const score = () => {
    setScore(10);
  };
  return (
    <div className="games">
      <img src={image} alt="quiz" onClick={handleQuiz} />
    </div>
  );
}

export default Home;
