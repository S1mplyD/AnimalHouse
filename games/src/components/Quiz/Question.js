import React, { useEffect, useState } from "react";
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
  setGame,
  setOptions,
}) => {
  const [selected, setSelected] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    console.log(questions[currentQuestion]);
    setOptions(
      questions &&
        handleShuffle([
          questions[currentQuestion].correct_answer,
          ...questions[currentQuestion].incorrect_answers,
        ])
    );
  }, [currentQuestion]);

  const handleShuffle = (options) => {
    return options.sort(() => Math.random() - 0.5);
  };

  const handleSelect = (i) => {
    if (selected === i && selected === correct) return "bg-green-500";
    else if (selected === i && selected !== correct) return "bg-red-600";
    else if (i === correct) return "bg-green-500";
    else return "";
  };

  const handleCheck = (i) => {
    setSelected(i);
    if (i === correct) {
      switch (questions[currentQuestion].difficulty) {
        case "easy":
          setScore(score + 1);
          break;
        case "medium":
          setScore(score + 2);
          break;
        case "hard":
          setScore(score + 3);
          break;
        default:
          break;
      }
    }
  };

  const handleNext = () => {
    if (currentQuestion > 3) {
      navigate("/games/result");
    } else if (selected) {
      setCurrentQuestion(currentQuestion + 1);
      setSelected();
    }
  };

  const handleQuit = () => {
    setGame("");
    setCurrentQuestion(0);
    // setQuestions();
    navigate("/games");
  };

  return (
    <div
      className="flex flex-col items-center bg-white rounded p-2 mt-5"
      aria-live={"assertive"}
    >
      <h1 className="bg-white text-2xl">Question {currentQuestion + 1}</h1>
      <div
        aria-live={"assertive"}
        className="m-3 p-3 md:p-20 flex flex-col items-center rounded border-solid border-2 border-gray-400
       bg-white"
      >
        <p className="bg-white text-lg my-4">
          {decode.decode(questions[currentQuestion].question)}
        </p>
        <div className="md:grid md:grid-cols-2 md:gap-10 my-7 flex md:p-3 md:m-3 flex-col flex-wrap items-center content-evenly bg-white w-full">
          {options &&
            options.map((i) => (
              <button
                className={` border-solid border-black border-2 rounded-md p-3 w-full m-1 ${
                  selected && handleSelect(i)
                } `}
                key={i}
                onClick={() => handleCheck(i)}
                disabled={selected}
              >
                {decode.decode(i)}
              </button>
            ))}
        </div>
        <div className="flex bg-white rounded content-evenly items-center md:mt-10">
          <button
            className="border-solid border-black border-2 rounded w-50 p-2 m-1"
            onClick={() => {
              handleQuit();
            }}
          >
            Quit
          </button>

          <button
            className="border-solid border-black border-2 rounded w-50 p-2 m-1"
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
