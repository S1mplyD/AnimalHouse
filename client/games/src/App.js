import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import Quiz from "./components/Quiz/Quiz";
import Home from "./components/Home";
import Result from "./components/Quiz/Result";
import Memory from "./components/Memory/Memory";

function App() {
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [images, setImages] = useState([]);
  const getQuestions = async () => {
    const rawData = await axios.get(
      "http://192.168.8.176:8000/api/getTrivia/medium"
    );
    setQuestions(rawData.data);
  };

  const getImages = async () => {
    const data = await axios.get(
      "https://zoo-animal-api.herokuapp.com/animals/rand/8"
    );
    let memoryImages = [];
    data.data.map((i) => {
      memoryImages.push({ image: i.image_link, state: "" });
      memoryImages.push({ image: i.image_link, state: "" });
    });
    memoryImages.sort(() => Math.random() - 0.5);
    setImages(memoryImages);
  };

  return (
    <Router>
      <div>
        <Link to="/">
          <h1 id="title">Animal House Games</h1>
        </Link>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                setQuestions={setQuestions}
                getQuestions={getQuestions}
                setScore={setScore}
                getImages={getImages}
              />
            }
          />
          <Route
            path="/quiz"
            element={
              <Quiz
                questions={questions}
                setQuestions={setQuestions}
                score={score}
                setScore={setScore}
              />
            }
          />
          <Route path="/result" element={<Result score={score} />} />
          <Route path="/memory" element={<Memory images={images} />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
