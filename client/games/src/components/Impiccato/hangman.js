import React, { useEffect } from "react";
import { useState } from "react";

export default function Hangman({ word, setWord }) {
  const correctWord = word;
  const [hangmanState, setHangmanState] = useState(0);
  useEffect(() => {
    console.log(word);
    document.getElementById("hiddenWord").innerText = hidWord();
  });

  const checkInput = () => {
    let inputWord = document.getElementById("inputWord");
    console.log(inputWord.value);
    if (inputWord.value.length > 1) {
      if (inputWord.value === word) {
        alert("giusto");
      } else {
        alert("sbagliato");
        setHangmanState(hangmanState + 1);
      }
    } else {
      if (word.includes(inputWord.value)) {
        showLetter(inputWord.value);
      } else {
        setHangmanState(hangmanState + 1);
      }
    }
  };

  const hidWord = () => {
    return word.split("");
  };

  const showLetter = (letter) => {
    let i = word.indexOf(letter);
    console.log(i);
    let hidden = document.getElementById("hiddenWord");
    console.log(hidden.innerText);
    let newWord =
      hidden.innerText.substring(0, i) +
      letter +
      hidden.innerText.substring(i + 1);
    console.log(newWord);
    hidden.innerText = newWord;
  };
  return (
    <div className="d-flex flex-column align-items-center">
      <div className="m-5 p-2 bg-white rounded w-50 ">
        <div className="card ">
          <img
            src={require(`./Images/${hangmanState}.png`)}
            className="card-img-top"
            alt=""
          ></img>
          <div className="card-body">
            <p
              className="card-text text-white text-center fs-2"
              id="hiddenWord"
            ></p>
            <div className="input-group">
              <input
                type="text"
                name="inputWord"
                id="inputWord"
                placeholder="Insert a character or an entire word here"
                className="form-control"
              />
              <button
                type="button"
                className="btn btn-light"
                onClick={checkInput}
              >
                Check letter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
