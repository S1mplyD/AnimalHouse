import { useNavigate } from "react-router-dom";
import React from "react";
import "../componentsCss/Home.css";

function Home({ getQuestions, setScore, setQuestions, images, getImages }) {
  const navigate = useNavigate();
  const handleQuiz = async () => {
    await getQuestions();
    navigate("/quiz");
  };
  const handleMemory = async () => {
    await getImages();
    navigate("/memory");
  };

  return (
    <div className="games">
      <img
        className="image"
        src={require("../1652541244672.png")}
        alt="quiz"
        onClick={handleQuiz}
      />
      <img
        className="image"
        src={require("../animali-selvatici.jpg")}
        alt="memory"
        onClick={handleMemory}
      />
    </div>
  );
}

export default Home;
