import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Ads from "../ADs";
import { getAds, getFunFact, getServices, getWords } from "../../apiCalls";
import Services from "../Services";

export default function Hangman({ setGame, score, setScore }) {
  const [correctWord, setCorrectWord] = useState("");
  const [wordarr, setWordArr] = useState("");
  const [word, setWord] = useState("");
  const [loading, setLoading] = useState(true);
  const [first, setFirst] = useState(true);
  const [ads, setAds] = useState([]);
  const [services, setServices] = useState([]);
  const [hangmanState, setHangmanState] = useState(0);
  const [funFact, setFunFact] = useState([]);
  const [funFactLoad, setFunFactLoad] = useState(false);
  const [random, setRandom] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      let rawServices = await getServices();
      setServices(rawServices.data);
      const rawAds = await getAds(
        sessionStorage.getItem("specie"),
        sessionStorage.getItem("name"),
        sessionStorage.getItem("gender"),
        sessionStorage.getItem("age"),
        sessionStorage.getItem("medicalCondition")
      );
      setAds(rawAds.data);
      const rawFunFact = await getFunFact(
        sessionStorage.getItem("name"),
        sessionStorage.getItem("specie")
      );
      setRandom(Math.floor(Math.random() * rawFunFact.data.length));
      setFunFact(rawFunFact.data);
      let words = await getWords();
      let arr = words.split("");
      console.log(arr);
      setWord(words);
      setCorrectWord(words.split(""));
      arr.forEach((el, i) => {
        arr[i] = "_";
      });
      setWordArr(arr);
    }

    fetchData().then(() => {
      setFunFactLoad(true);
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    });
  }, []);

  const handleQuit = () => {
    setScore(0);
    navigate("/games");
  };

  const handleLose = () => {
    alert("you lose");
    setScore(0);
    setGame("");
    console.log("handle lose");
    navigate("/games");
  };

  const checkInput = () => {
    let inputWord = document.getElementById("inputWord");
    if (inputWord.value.length > 1) {
      if (
        word.localeCompare(inputWord.value, "en", { sensitivity: "base" }) === 0
      ) {
        alert("You found the correct word");
        setScore(word.length);
        setGame("hangman");
        navigate("/games/result");
      } else {
        alert("wrong word");
        document.getElementById("inputWord").value = "";
        setHangmanState(hangmanState + 1);
      }
    } else {
      if (word.toLowerCase().includes(inputWord.value.toLowerCase())) {
        showLetter(inputWord.value);
        document.getElementById("inputWord").value = "";
        setScore(score + 1);
        if (!wordarr.includes("_")) {
          setGame("hangman");
          navigate("/games/result");
        }
      } else {
        document.getElementById("inputWord").value = "";
        setHangmanState(hangmanState + 1);
      }
    }
  };

  const showLetter = (letter) => {
    let correct = 0;
    console.log(correctWord);
    correctWord.forEach((el, index) => {
      if (el.localeCompare(letter, "en", { sensitivity: "base" }) === 0) {
        wordarr[index] = el;
        correct++;
      }
      setScore(score + correct);
      document.getElementById("hiddenWord").innerText = wordarr;
    });
  };

  if (!loading) {
    return (
      <>
        {services.length > 0 ? (
          <div className={"flex flex-row justify-evenly"}>
            <Services service={services}></Services>
          </div>
        ) : null}
        <div className="flex flex-col items-center bg-white rounded m-2 my-20 md:mx-52">
          <img
            src={require(`./Images/${hangmanState}.png`)}
            id={"hangmanImg"}
            alt={`error ${hangmanState}`}
          ></img>

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
        {ads.length > 0 ? (
          <div className={"flex flex-row justify-evenly"}>
            <Ads ad={ads}></Ads>
          </div>
        ) : null}
      </>
    );
  } else if (funFactLoad) {
    return (
      <div
        role={"alert"}
        className={"flex flex-col items-center justify-center h-full"}
      >
        <div className={"bg-white rounded"}>
          <h1
            aria-live={"assertive"}
            role={"heading"}
            aria-level={1}
            className={"text-3xl text-center m-auto"}
          >
            {funFact[random].name}: {funFact[random].funFact}
          </h1>
        </div>
      </div>
    );
  }
}
