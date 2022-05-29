import React, { useState, useEffect } from "react";
import Question from "./Question";
import decode from "html-encoder-decoder";

function Quiz({ questions, setQuestions, score, setScore }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [options, setOptions] = useState([]);
  useEffect(() => {
    setOptions(
      questions &&
        handleShuffle([
          questions[currentQuestion].correct_answer,
          ...questions[currentQuestion].incorrect_answers,
        ])
    );
  }, [currentQuestion, questions]);
  const handleShuffle = (options) => {
    return options.sort(() => Math.random() - 0.5);
  };

  return (
    <div>
      {decode.decode(questions[currentQuestion].question)}
      <div>
        {options.map((i) => (
          <p>{i}</p>
        ))}
      </div>
    </div>
  );
}

export default Quiz;
