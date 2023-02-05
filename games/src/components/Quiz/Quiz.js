import React, {useState, useEffect} from "react";
import Question from "./Question";
import {CircularProgress} from "@mui/material";
import "../../componentsCss/Quiz/Quiz.css";
import Ads from "../ADs";
import Services from "../Services";
import {getAds, getQuestions, getServices} from "../../apiCalls";

export default function Quiz({
                                 score,
                                 setScore,
                                 setGame
                             }) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(true) //page is loading
    const [ads, setAds] = useState([])
    const [services, setServices] = useState([])
    const [questions, setQuestions] = useState([])
    useEffect(() => {
        async function fetchData (){
            let rawServices = await getServices()
            setServices(rawServices.data)
            const rawAds = await getAds(
                sessionStorage.getItem("specie"),
                sessionStorage.getItem("name"),
                sessionStorage.getItem("gender"),
                sessionStorage.getItem("age"),
                sessionStorage.getItem("medicalCondition")
            )
            setAds(rawAds.data)
            let rawQuestions = await getQuestions()
            setQuestions(rawQuestions.data)
        }

        fetchData().then(()=>{
            setLoading(false)
        })

    }, []);

    if(!loading){
        return (<>
            <div className="flex flex-col items-center ">
                <Services service={services}></Services>
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
                <Ads
                    ad={ads}
                ></Ads>
            </div>
            </>
        );
    }

// : (
//         <CircularProgress
//             style={{margin: 100}}
//             color="inherit"
//             size={150}
//             thickness={1}
//         />
//     )
}
