import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
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
        if (ran == 0) {
          setWord(data.data.name.replace(" ", ""));
        } else if (ran == 1) {
          setWord(data.data.latin_name.replace(" ", ""));
        } else {
          setWord(data.data.animal_type.replace(" ", ""));
        }
      });
  };

  return (
    <Router>
      <div>
        <Link to="/games">
          <h1 className="text-white flex flex-col items-center">
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
              />
            }
          />
          <Route
            path="/result"
            element={<Result score={score} setScore={setScore} />}
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
            element={<Hangman word={word} setWord={setWord}></Hangman>}
          ></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
