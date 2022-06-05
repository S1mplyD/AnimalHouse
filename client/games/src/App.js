import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import Quiz from "./components/Quiz";
import Home from "./components/Home";
import Result from "./components/Result";

function App() {
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const getQuestions = async () => {
    const rawData = await axios.get(
      "http://192.168.8.176:8000/api/getTrivia/medium"
    );
    setQuestions(rawData.data);
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
