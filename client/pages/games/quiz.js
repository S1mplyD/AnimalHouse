import Question from "../../components/question";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Quiz({ questions }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);

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
    <div className="flex flex-col items-center ">
      {questions ? (
        <>
          {console.log(questions)}
          <Question
            currentQuestion={currentQuestion}
            setCurrentQuestion={setCurrentQuestion}
            questions={questions}
            options={options}
            correct={questions[currentQuestion].correct_answer}
            score={score}
            setScore={setScore}
          />
        </>
      ) : (
        <CircularProgress
          style={{ margin: 100 }}
          color="inherit"
          size={150}
          thickness={1}
        />
      )}
    </div>
  );
}

export async function getServerSideProps() {
  const rawData = await axios.get("http://localhost:8000/api/getTrivia/medium");
  const questions = rawData.data;

  return { props: { questions } };
}
