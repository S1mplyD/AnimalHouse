import React, {useState, useEffect} from 'react';

function Quiz(){

    useEffect(()=>{
        console.log("here")
        getQuestion();
    }, [])

    const [questions, setQuestions] = useState([]);

    const getQuestion = async () =>{
        console.log("here2")
        const rawData = await fetch("http://localhost:8000/api/getTrivia/medium")
        const data = await rawData.json()
        setQuestions(data)
    } 

    return(
        <div>
            
            {console.log(questions)
            /* {
            questions.map(question =>{
                console.log(question.question)
            })} */}
        </div>
        

    )
}

export default Quiz