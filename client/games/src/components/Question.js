import React, { useEffect } from "react";
const htmlDecoder = require("html-encoder-decoder").decode;

function Question({ questions, setQuestions, score, setScore }) {
  useEffect(() => {
    console.log(questions);
  }, [questions]);
  return (
    //  question.question, question.correct_answer, question.incorrect_answers
    //  TODO: ordine risposte casuale, trasformare simboli in caratteri
    <div>
      <p>test</p>
      {/* <h2 id="question">{htmlDecoder(question.question)}</h2>
      <p id="answers">{htmlDecoder(question.correct_answer)}</p>
      <p id="answers">{htmlDecoder(question.incorrect_answers[0])}</p>
      <p id="answers">{htmlDecoder(question.incorrect_answers[1])}</p>
      <p id="answers">{htmlDecoder(question.incorrect_answers[2])}</p> */}
    </div>
  );
}

export default Question;
