import {useNavigate} from "react-router-dom";
import React, {useState, useEffect} from "react";
import axios from "axios";
import Ads from "./ADs";
import Services from "./Services";

export default function Home({
                                 getQuestions,
                                 setScore,
                                 setQuestions,
                                 images,
                                 getImages,
                                 getWords,
                                 setGame,
                                 ads,
                                 loading,
                                 currentAd,
                                 setCurrentAds
                             }) {
    const navigate = useNavigate();
    const [lo, setLo] = useState(true)
    const [services, setServices] = useState([])
    useEffect(()=>{
        async function fetchServices(){
            let rawData = await getServices()
            console.log(rawData.data)
            setServices(rawData.data)
        }
        fetchServices().then(()=>{
            setLo(false)
        })
    },[])
    const getServices = async ()=>{
        let data = await axios.get("/api/services")
        return data
    }

    const handleQuiz = async () => {
        setGame("quiz");
        await getQuestions();
        if (currentAd < ads.length - 1) {
            setCurrentAds(currentAd + 1)
        } else {
            setCurrentAds(0)
        }
        navigate("/games/quiz");
    };
    const handleMemory = async () => {
        setGame("memory");
        if (currentAd < ads.length - 1) {
            setCurrentAds(currentAd + 1)
        } else {
            setCurrentAds(0)
        }
        await getImages();
        navigate("/games/memory");
    };
    const handleHangMan = async () => {
        setGame("hangman");
        if (currentAd < ads.length - 1) {
            setCurrentAds(currentAd + 1)
        } else {
            setCurrentAds(0)
        }
        await getWords();
        navigate("/games/hangman");
    };


    const setPet = async (specie, name, gender, age, medical) => {
        console.log("set pet");
    };
    if(!lo){
        return( <>
            <div className="m-5 p-2 bg-white rounded ">
            <form className="bg-white flex flex-col items-center text-center">
                <div className="m-2 p-2 bg-white flex flex-col">
                    <label htmlFor="specie" className="bg-white">
                        Animal species:
                    </label>
                    <input
                        type="text"
                        name="specie"
                        id="specie"
                        className="form-input rounded-xl"
                        placeholder="Enter animal species"
                    />
                </div>
                <div className="m-2 p-2 bg-white flex flex-col">
                    <label htmlFor="name" className="bg-white">
                        Animal name:
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        className="form-input rounded-xl"
                        placeholder="Enter animal name"
                    />
                </div>
                <div className="m-2 p-2 bg-white flex flex-col">
                    <label htmlFor="gender" className="form-label bg-white">
                        Animal gender:
                    </label>
                    <select
                        name="gender"
                        id="gender"
                        className="form-select rounded-xl mx-2"
                        defaultValue="M"
                    >
                        <option value="M" className="bg-white">
                            Male
                        </option>
                        <option value="F" className="bg-white">
                            Female
                        </option>
                    </select>
                </div>
                <div className="m-2 p-2 bg-white flex flex-col">
                    <label htmlFor="age" className="form-label bg-white">
                        Animal age:
                    </label>
                    <input
                        type="number"
                        name="age"
                        id="age"
                        className="form-control rounded-xl"
                        placeholder="Enter animal age"
                    />
                </div>
                <div className="m-2 p-2 bg-white flex flex-col">
                    <label htmlFor="medical" className="form-label bg-white">
                        Enter eventual medical condition:
                    </label>
                    <textarea
                        name="medicalCondition"
                        id="medical"
                        cols="30"
                        rows="4"
                        placeholder="Insert eventual medical conditions (MUST be separated by ';')"
                        className="form-textarea rounded-xl"
                    ></textarea>
                </div>
                <div className="m-2 p-2 bg-white ">
                    <input
                        type="button"
                        value="Submit"
                        className="p-2 rounded-xl hover:bg-blue-700 bg-cyan-400 text-white"
                        onClick={() => {
                            let medicalConditions = document.getElementById("medical").value.split(";")
                            sessionStorage.setItem("specie", document.getElementById("specie").value)
                            sessionStorage.setItem("name", document.getElementById("name").value)
                            sessionStorage.setItem("gender", document.getElementById("gender").value)
                            sessionStorage.setItem("age", document.getElementById("age").value)
                            sessionStorage.setItem("medicalCondition", medicalConditions)
                        }}
                    />
                </div>
            </form>
        </div>
        <div className="m-5 rounded flex flex-col md:flex-row items-center md:justify-evenly  bg-blue-500">
            <div className=" p-2 ">
                <img
                    className="w-80 h-80 object-cover bg-white cursor-pointer rounded-xl"
                    src="/archLogo.png"
                    alt="quiz game"
                    onClick={handleQuiz}
                />
            </div>
            <div className=" p-2">
                <img
                    className=" w-80 h-80 object-cover bg-white cursor-pointer rounded-xl"
                    src="/memoryImage.png"
                    alt="memory game"
                    onClick={handleMemory}
                />
            </div>
            <div className="p-2">
                <img
                    className="w-80 h-80 object-cover bg-white cursor-pointer rounded-xl"
                    src="/hangmanGame.jpg"
                    alt="hangman game"
                    onClick={handleHangMan}
                />
            </div>
        </div>
        <div>
            {/*<Ads*/}
            {/*    ad={ads[currentAd]}*/}
            {/*></Ads>*/}
            <Services service={services}>

            </Services>
        </div>
    </>)
    }
    // return (<div>
    //     {lo ? null : (<>
    //     {loading ? null : (<>
    //
    //         {console.log(ads)}
    //             {console.log(services)}
    //         <div className="m-5 p-2 bg-white rounded ">
    //             <form className="bg-white flex flex-col items-center text-center">
    //                 <div className="m-2 p-2 bg-white flex flex-col">
    //                     <label htmlFor="specie" className="bg-white">
    //                         Animal species:
    //                     </label>
    //                     <input
    //                         type="text"
    //                         name="specie"
    //                         id="specie"
    //                         className="form-input rounded-xl"
    //                         placeholder="Enter animal species"
    //                     />
    //                 </div>
    //                 <div className="m-2 p-2 bg-white flex flex-col">
    //                     <label htmlFor="name" className="bg-white">
    //                         Animal name:
    //                     </label>
    //                     <input
    //                         type="text"
    //                         name="name"
    //                         id="name"
    //                         className="form-input rounded-xl"
    //                         placeholder="Enter animal name"
    //                     />
    //                 </div>
    //                 <div className="m-2 p-2 bg-white flex flex-col">
    //                     <label htmlFor="gender" className="form-label bg-white">
    //                         Animal gender:
    //                     </label>
    //                     <select
    //                         name="gender"
    //                         id="gender"
    //                         className="form-select rounded-xl mx-2"
    //                         defaultValue="M"
    //                     >
    //                         <option value="M" className="bg-white">
    //                             Male
    //                         </option>
    //                         <option value="F" className="bg-white">
    //                             Female
    //                         </option>
    //                     </select>
    //                 </div>
    //                 <div className="m-2 p-2 bg-white flex flex-col">
    //                     <label htmlFor="age" className="form-label bg-white">
    //                         Animal age:
    //                     </label>
    //                     <input
    //                         type="number"
    //                         name="age"
    //                         id="age"
    //                         className="form-control rounded-xl"
    //                         placeholder="Enter animal age"
    //                     />
    //                 </div>
    //                 <div className="m-2 p-2 bg-white flex flex-col">
    //                     <label htmlFor="medical" className="form-label bg-white">
    //                         Enter eventual medical condition:
    //                     </label>
    //                     <textarea
    //                         name="medicalCondition"
    //                         id="medical"
    //                         cols="30"
    //                         rows="4"
    //                         placeholder="Insert eventual medical conditions (MUST be separated by ';')"
    //                         className="form-textarea rounded-xl"
    //                     ></textarea>
    //                 </div>
    //                 <div className="m-2 p-2 bg-white ">
    //                     <input
    //                         type="button"
    //                         value="Submit"
    //                         className="p-2 rounded-xl hover:bg-blue-700 bg-cyan-400 text-white"
    //                         onClick={() => {
    //                             let medicalConditions = document.getElementById("medical").value.split(";")
    //                             sessionStorage.setItem("specie", document.getElementById("specie").value)
    //                             sessionStorage.setItem("name", document.getElementById("name").value)
    //                             sessionStorage.setItem("gender", document.getElementById("gender").value)
    //                             sessionStorage.setItem("age", document.getElementById("age").value)
    //                             sessionStorage.setItem("medicalCondition", medicalConditions)
    //                         }}
    //                     />
    //                 </div>
    //             </form>
    //         </div>
    //         <div className="m-5 rounded flex flex-col md:flex-row items-center md:justify-evenly  bg-blue-500">
    //             <div className=" p-2 ">
    //                 <img
    //                     className="w-80 h-80 object-cover bg-white cursor-pointer rounded-xl"
    //                     src="/archLogo.png"
    //                     alt="quiz game"
    //                     onClick={handleQuiz}
    //                 />
    //             </div>
    //             <div className=" p-2">
    //                 <img
    //                     className=" w-80 h-80 object-cover bg-white cursor-pointer rounded-xl"
    //                     src="/memoryImage.png"
    //                     alt="memory game"
    //                     onClick={handleMemory}
    //                 />
    //             </div>
    //             <div className="p-2">
    //                 <img
    //                     className="w-80 h-80 object-cover bg-white cursor-pointer rounded-xl"
    //                     src="/hangmanGame.jpg"
    //                     alt="hangman game"
    //                     onClick={handleHangMan}
    //                 />
    //             </div>
    //         </div>
    //         <div>
    //             <Ads
    //                 ad={ads[currentAd]}
    //             ></Ads>
    //             <Services service={services}>
    //
    //             </Services>
    //         </div>
    //         </>)}
    //     </>)}
    // </div>);
}
