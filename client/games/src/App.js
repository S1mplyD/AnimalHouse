import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import Quiz from "./components/Quiz";
import Home from "./components/Home";

function App() {
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const getQuestions = async () => {
    const rawData = await axios.get(
      "http://localhost:8000/api/getTrivia/medium"
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
