import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Hangman({ word, setWord, setScore, score, setGame }) {
  const [correctWord, setCorrectWord] = useState(word.split(""));
  const [wordarr, setWordArr] = useState(word.split(""));
  const navigate = useNavigate();
  const handleQuit = () => {
    setWord("");
    setScore(0);
    navigate("/games");
  };
  const [hangmanState, setHangmanState] = useState(0);
  useEffect(() => {
    console.log(wordarr);
    let arr = [];
    wordarr.forEach((el, i) => {
      arr[i] = "_";
    });
    setWordArr(arr);
    document.getElementById("hiddenWord").innerText = arr;
  }, []);

  const handleLose = () => {
    setScore(0);
    console.log("handle lose");
    alert("you lose");
    navigate("/result");
  };
  //TODO sistemare punteggi
  const checkInput = () => {
    let inputWord = document.getElementById("inputWord");
    if (hangmanState >= 6) {
      console.log("check input");
      alert("You lose");
      setScore(0);
      navigate("/result");
    } else {
      if (inputWord.value.length > 1) {
        if (
          word.localeCompare(inputWord.value, "en", { sensitivity: "base" }) ===
          0
        ) {
          alert("You found the correct word");
          setScore(word.length);
          setGame("hangman");
          navigate("/result");
        } else {
          alert("wrong word");
          document.getElementById("inputWord").value = "";
          setHangmanState(hangmanState + 1);
        }
      } else {
        console.log("input: " + inputWord.value);
        if (word.toLowerCase().includes(inputWord.value.toLowerCase())) {
          showLetter(inputWord.value);
          document.getElementById("inputWord").value = "";
          setScore(score + 1);
          if (!wordarr.includes("_")) {
            navigate("/result");
          }
        } else {
          document.getElementById("inputWord").value = "";
          setHangmanState(hangmanState + 1);
        }
      }
    }
  };

  const showLetter = (letter) => {
    let correct = 0;
    correctWord.forEach((el, index) => {
      if (el.localeCompare(letter, "en", { sensitivity: "base" }) === 0) {
        wordarr[index] = el;
        console.log("inside showLetter: " + wordarr);
        correct++;
      }
      // setScore(score + correct);
      document.getElementById("hiddenWord").innerText = wordarr;
    });
  };
  return (
    <div className="flex flex-col items-center bg-white rounded m-2 my-20 md:mx-52">
      <img src={require(`./Images/${hangmanState}.png`)} alt=""></img>

      <p className=" text-center fs-2" id="hiddenWord">
        {wordarr}
      </p>
      {hangmanState >= 6 ? handleLose() : null}
      <input
        type="text"
        name="inputWord"
        id="inputWord"
        placeholder="Insert a character or an entire word here"
        className=" my-10"
      />
      <div>
        <button
          type="button"
          className="p-3 m-3 border-solid border-4 rounded-xl border-black"
          onClick={checkInput}
        >
          Check letter
        </button>
        <button
          type="button"
          className="p-3 m-3 border-solid border-4 rounded-xl border-black"
          onClick={handleQuit}
        >
          Quit
        </button>
      </div>
    </div>
  );
}
