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
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [images, setImages] = useState([]);
  const [word, setWord] = useState();
  const [game, setGame] = useState("");
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function ads() {
      await getAds();
    }
    ads();
  }, []);

  const getAds = async () => {
    await axios.get("/api/ads").then((res) => {
      if (res.data != null) {
        for (let i = res.data.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [res.data[i], res.data[j]] = [res.data[j], res.data[i]];
        }
        setAds(res.data);
        setLoading(false);
      }
    });
  };

  const getQuestions = async () => {
    const rawData = await axios.get("/api/getTrivia/medium");
    setQuestions(rawData.data);
  };

  const getImages = async () => {
    const data = await axios.get("/api/animals/memory");
    let memoryImages = [];
    data.data.map((i, index) => {
      memoryImages.push({
        id: index,
        image: i.image,
        state: "",
        name: i.name,
      });
      memoryImages.push({
        id: index,
        image: i.image,
        state: "",
        name: i.name,
      });
    });
    memoryImages.sort(() => Math.random() - 0.5);
    console.log(memoryImages);
    setImages(memoryImages);
  };

  const getWords = async () => {
    await axios.get("/api/animals/hangman").then((data) => {
      console.log(data.data);

      setWord(data.data.replace(" ", ""));
    });
  };

  return (
    <Router>
      <div className="bg-blue-500 overflow-auto h-screen">
        <div className="flex flex-row  justify-evenly">
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
          <a href="/">
            <h1 className="text-white flex flex-col items-center text-3xl">
              Front Office
            </h1>
          </a>
        </div>

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
                ads={ads}
                loading={loading}
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
            element={
              <Result
                score={score}
                setScore={setScore}
                setGame={setGame}
                game={game}
              />
            }
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
