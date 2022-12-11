import decode from "html-encoder-decoder";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Question({
  currentQuestion,
  setCurrentQuestion,
  questions,
  options,
  correct,
  score,
  setScore,
  setGame,
}) {
  const [selected, setSelected] = useState();

  const router = useRouter();

  const handleSelect = (i) => {
    if (selected === i && selected === correct) return "bg-green-500";
    else if (selected === i && selected !== correct) return "bg-red-600";
    else if (i === correct) return "bg-green-500";
    else return "";
  };

  const handleCheck = (i) => {
    setSelected(i);
    if (i === correct) setScore(score + 1);
  };

  const handleNext = () => {
    if (currentQuestion > 3) {
      router.push("/games/result");
    } else if (selected) {
      setCurrentQuestion(currentQuestion + 1);
      setSelected();
    }
  };

  const handleQuit = () => {
    setGame("");
    setCurrentQuestion(0);
    router.push("/");
  };
  return (
    <div className="flex flex-col items-center bg-blue-500 rounded p-2 mt-5">
      <h1 className="bg-blue-500 text-2xl">Question {currentQuestion + 1} :</h1>
      <div
        className="m-3 p-3 md:p-20 flex flex-col items-center rounded border-solid border-2 border-gray-400
           bg-blue-500"
      >
        <h2 className="bg-blue-500 text-lg my-4">
          {decode.decode(questions[currentQuestion].question)}
        </h2>
        <div className="md:grid md:grid-cols-2 md:gap-10 my-7 flex md:p-3 md:m-3 flex-col flex-wrap items-center content-evenly bg-blue-500 w-full">
          {options &&
            options.map((i) => (
              <button
                className={` bg-cyan-400 hover:bg-cyan-600 border-solid border-black border-2 rounded-md p-3 w-full m-1 ${
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
        <div className="flex bg-blue-500 rounded content-evenly items-center md:mt-10">
          <button
            className="bg-cyan-400 hover:bg-cyan-600 border-solid border-black border-2 rounded w-50 p-2 m-1"
            onClick={() => {
              handleQuit();
            }}
          >
            Quit
          </button>

          <button
            className=" bg-cyan-400 hover:bg-cyan-600 border-solid border-black border-2 rounded w-50 p-2 m-1"
            onClick={handleNext}
          >
            {currentQuestion > 3 ? "Submit" : "Next Question"}
          </button>
        </div>
      </div>
    </div>
  );
}
