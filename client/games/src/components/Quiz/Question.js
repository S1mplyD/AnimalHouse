import React, { useState } from "react";
import { useNavigate } from "react-router";
import "../../componentsCss/Quiz/Question.css";
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
    if (selected === i && selected === correct) return "btn-success";
    else if (selected === i && selected !== correct) return "btn-danger";
    else if (i === correct) return "btn-success";
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
    <div className="d-flex flex-column align-items-center bg-white rounded p-2 mt-5">
      <h1 className="bg-white">Question {currentQuestion + 1} :</h1>
      <div
        className="m-5 p-5 d-flex flex-column align-items-center justify-content-around border border-3 border-secondary
       rounded bg-white"
      >
        <h2 className="bg-white">
          {decode.decode(questions[currentQuestion].question)}
        </h2>
        <div className="d-flex flex-wrap align-items-center justify-content-evenly bg-white w-100 m-1">
          {options &&
            options.map((i) => (
              <button
                className={`btn btn-primary m-1 ${
                  selected && handleSelect(i)
                } `}
                key={i}
                onClick={() => handleCheck(i)}
                disabled={selected}
              >
                {i}
              </button>
            ))}
        </div>
        <div className="d-flex bg-white rounded justify-content-evenly ">
          <button
            className="btn btn-primary rounded w-50 p-2 m-1"
            onClick={() => {
              window.location.href = "/games";
              handleQuit();
            }}
          >
            Quit
          </button>

          <button
            className="btn btn-primary rounded w-50 p-2 m-1"
            onClick={handleNext}
          >
            {currentQuestion > 3 ? "Submit" : "Next Question"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Question;
