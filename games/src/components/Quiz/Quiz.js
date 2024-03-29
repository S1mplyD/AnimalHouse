import React, { useState, useEffect } from "react";
import Question from "./Question";
import { CircularProgress } from "@mui/material";
import "../../componentsCss/Quiz/Quiz.css";
import Ads from "../ADs";
import Services from "../Services";
import {
  getAds,
  getQuestions,
  getServices,
  get,
  getFunFact,
} from "../../apiCalls";

export default function Quiz({ score, setScore, setGame }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true); //page is loading
  const [ads, setAds] = useState([]);
  const [services, setServices] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [funFact, setFunFact] = useState([]);
  const [funFactLoad, setFunFactLoad] = useState(false);
  const [random, setRandom] = useState(0);
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
      let rawQuestions = await getQuestions();
      setQuestions(rawQuestions.data);
      const rawFunFact = await getFunFact(
        sessionStorage.getItem("name"),
        sessionStorage.getItem("specie")
      );
      setRandom(Math.floor(Math.random() * rawFunFact.data.length));
      setFunFact(rawFunFact.data);
    }

    fetchData().then(() => {
      setFunFactLoad(true);
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    });
  }, []);

  if (!loading) {
    return (
      <>
        <div className="flex flex-col items-center ">
          {services.length > 0 ? (
            <div className={"flex flex-row justify-evenly"}>
              <Services service={services}></Services>
            </div>
          ) : null}
          <Question
            currentQuestion={currentQuestion}
            setCurrentQuestion={setCurrentQuestion}
            questions={questions}
            options={options}
            setOptions={setOptions}
            correct={questions[currentQuestion].correct_answer}
            score={score}
            setScore={setScore}
            setGame={setGame}
          />
          {ads.length > 0 ? (
            <div className={"flex flex-row justify-evenly"}>
              <Ads ad={ads}></Ads>
            </div>
          ) : null}
        </div>
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
