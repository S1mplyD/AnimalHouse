import React, { useState } from "react";
import { useNavigate } from "react-router";
import "../componentsCss/Question.css";
import decode from "html-encoder-decoder";

const Question = ({
  currentQuestion,
  setCurrentQuestion,
  questions,
  options,
  correct,
  setScore,
  score,
  setQuestions,
}) => {
  const [selected, setSelected] = useState();
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleSelect = (i) => {
    if (selected === i && selected === correct) return "select";
    else if (selected === i && selected !== correct) return "wrong";
    else if (i === correct) return "select";
  };

  const handleCheck = (i) => {
    setSelected(i);
    if (i === correct) setScore(score + 1);
    setError(false);
  };

  const handleNext = () => {
    if (currentQuestion > 3) {
      navigate("/result");
    } else if (selected) {
      setCurrentQuestion(currentQuestion + 1);
      setSelected();
    } else setError("Please select an option first");
  };

  const handleQuit = () => {
    setCurrentQuestion(0);
    setQuestions();
  };

  return (
    <div className="question">
      <h1 className="questionNumber">Question {currentQuestion + 1} :</h1>
      <div className="singleQuestion">
        <h2 className="questionNumber">
          {decode.decode(questions[currentQuestion].question)}
        </h2>
        <div className="options">
          {options &&
            options.map((i) => (
              <button
                className={`singleOption  ${selected && handleSelect(i)}`}
                key={i}
                onClick={() => handleCheck(i)}
                disabled={selected}
              >
                {i}
              </button>
            ))}
        </div>
        <div className="controls">
          <button
            className="btnControl"
            onClick={() => {
              window.location.href = "/";
              handleQuit();
            }}
          >
            Quit
          </button>

          <button className="btnControl" onClick={handleNext}>
            {currentQuestion > 3 ? "Submit" : "Next Question"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Question;
