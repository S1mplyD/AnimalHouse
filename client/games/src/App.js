import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Quiz from "./components/Quiz/Quiz";
import Home from "./components/Home";
import Result from "./components/Quiz/Result";
import Memory from "./components/Memory/Memory";
import Hangman from "./components/Impiccato/hangman";

function App() {
  global.__clientmain = __dirname;
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [images, setImages] = useState([]);
  const [word, setWord] = useState();
  const [game, setGame] = useState("");
  const [ads, setAds] = useState([]);
  useEffect(() => {
    async function getStartingAds() {
      await getAds();
    }
    getStartingAds();
  }, []);

  const getQuestions = async () => {
    const rawData = await axios.get(
      "http://localhost:8000/api/getTrivia/medium"
    );
    setQuestions(rawData.data);
  };

  const getImages = async () => {
    const data = await axios.get(
      "https://zoo-animal-api.herokuapp.com/animals/rand/8"
    );
    let memoryImages = [];
    data.data.map((i, index) => {
      memoryImages.push({
        id: index,
        image: i.image_link,
        state: "",
        name: i.name,
      });
      memoryImages.push({
        id: index,
        image: i.image_link,
        state: "",
        name: i.name,
      });
    });
    memoryImages.sort(() => Math.random() - 0.5);
    console.log(memoryImages);
    setImages(memoryImages);
  };

  const getWords = async () => {
    await axios
      .get("https://zoo-animal-api.herokuapp.com/animals/rand")
      .then((data) => {
        console.log(data.data);
        let ran = Math.floor(Math.random() * 3);
        console.log(ran);
        if (ran === 0) {
          setWord(data.data.name.replace(" ", ""));
        } else if (ran === 1) {
          setWord(data.data.latin_name.replace(" ", ""));
        } else {
          setWord(data.data.animal_type.replace(" ", ""));
        }
      });
  };

  const getAds = async () => {
    await axios.get("http://localhost:8000/api/ads").then((res) => {
      console.log(res.data);
      setAds(res.data);
    });
  };

  return (
    <Router>
      <div className="bg-blue-500 overflow-auto h-screen">
        <Link
          to="/games"
          onClick={() => {
            setGame("");
            setScore(0);
          }}
        >
          <h1 className="text-white flex flex-col items-center text-3xl">
            Animal House Games
          </h1>
        </Link>
        <Routes>
          <Route
            path="/games"
            element={
              <Home
                setQuestions={setQuestions}
                getQuestions={getQuestions}
                setScore={setScore}
                getImages={getImages}
                getWords={getWords}
                setGame={setGame}
                getAds={getAds}
                ads={ads}
                setAds={setAds}
              />
            }
          />
          <Route
            path="/games/quiz"
            element={
              <Quiz
                questions={questions}
                setQuestions={setQuestions}
                score={score}
                setScore={setScore}
                setGame={setGame}
              />
            }
          />
          <Route
            path="/result"
            element={<Result score={score} setScore={setScore} game={game} />}
          />
          <Route
            path="/games/memory"
            element={
              <Memory
                images={images}
                setImages={setImages}
                score={score}
                setScore={setScore}
              />
            }
          ></Route>
          <Route
            path="/games/hangman"
            game={game}
            element={
              <Hangman
                word={word}
                setWord={setWord}
                setScore={setScore}
                score={score}
              ></Hangman>
            }
          ></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
