import React, {useState, useEffect} from "react";
import Question from "./Question";
import {CircularProgress} from "@mui/material";
import "../../componentsCss/Quiz/Quiz.css";
import Ads from "../ADs";

export default function Quiz({
                                 questions,
                                 setQuestions,
                                 score,
                                 setScore,
                                 setGame,
                                 currentAd,
                                 setCurrentAds,
                                 ads
                             }) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [options, setOptions] = useState([]);
    useEffect(() => {
        setOptions(
            questions &&
            handleShuffle([
                questions[currentQuestion].correct_answer,
                ...questions[currentQuestion].incorrect_answers,
            ])
        );
    }, [currentQuestion, questions]);
    const handleShuffle = (options) => {
        return options.sort(() => Math.random() - 0.5);
    };

    return (
        <div className="flex flex-col items-center ">
            {questions ? (
                <>
                    {console.log(questions[currentQuestion].correct_answer)}
                    <Question
                        currentQuestion={currentQuestion}
                        setCurrentQuestion={setCurrentQuestion}
                        questions={questions}
                        options={options}
                        correct={questions[currentQuestion].correct_answer}
                        score={score}
                        setScore={setScore}
                        setQuestions={setQuestions}
                        setGame={setGame}
                        currentAd={currentAd}
                        setCurrentAds={setCurrentAds}
                        ads={ads}
                    />
                </>
            ) : (
                <CircularProgress
                    style={{margin: 100}}
                    color="inherit"
                    size={150}
                    thickness={1}
                />
            )}
            <Ads
                title={ads[currentAd].title}
                image={ads[currentAd].mainPhoto}
                info={ads[currentAd].info}
            ></Ads>
        </div>
    );
}
