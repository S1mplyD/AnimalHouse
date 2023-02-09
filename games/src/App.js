import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import React, {useState} from "react";
import Quiz from "./components/Quiz/Quiz";
import Home from "./components/Home";
import Result from "./components/Quiz/Result";
import Memory from "./components/Memory/Memory";
import Hangman from "./components/Impiccato/hangman";
import ProductPage from "./components/ProductPage";
import ServicePage from "./components/ServicePage"

function App() {
    const [game, setGame] = useState("")
    const [score, setScore] = useState(0)
    return (
        <BrowserRouter>
            <div className="bg-blue-500 overflow-auto h-screen">
                <div className="flex flex-row justify-evenly">
                    <Link
                        to="/games"
                    >
                        <h1 className="text-white flex flex-col items-center text-3xl">
                            Animal House Games
                        </h1>
                    </Link>
                    <a href="/shop">
                        <h1 className="text-white flex flex-col items-center text-3xl">
                            Visit our shop!
                        </h1>
                    </a>
                    <Link to={"/games/test"}><h1>test</h1></Link>
                </div>
                <Routes>
                    <Route
                        path="/games"
                        element={<Home/>}
                    />
                    <Route
                        path="games/quiz"
                        element={<Quiz setScore={setScore} setGame={setGame} score={score}/>}
                    />
                    <Route
                        path="games/result"
                        element={<Result setGame={setGame} game={game} score={score} setScore={setScore}/>}
                    />
                    <Route
                        path="games/memory"
                        element={<Memory setScore={setScore} setGame={setGame} score={score}/>}
                    ></Route>
                    <Route
                        path="games/hangman"
                        element={<Hangman setScore={setScore} setGame={setGame} score={score}/>}
                    ></Route>
                    <Route path="games/shop/:id" element={<ProductPage/>}></Route>
                    <Route path="games/services/:id" element={<ServicePage/>}></Route>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
