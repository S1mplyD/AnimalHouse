import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

function Home({
  getQuestions,
  setScore,
  setQuestions,
  images,
  getImages,
  getWords,
  setGame,
}) {
  const navigate = useNavigate();
  const handleQuiz = async () => {
    setGame("quiz");
    await getQuestions();
    navigate("/games/quiz");
  };
  const handleMemory = async () => {
    setGame("memory");
    await getImages();
    navigate("/games/memory");
  };
  const handleHangMan = async () => {
    setGame("hangman");
    await getWords();
    navigate("/games/hangman");
  };

  return (
    <div>
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
              type="submit"
              value="Subimt"
              className="p-2 rounded-xl hover:bg-blue-700 bg-cyan-400 text-white"
            />
          </div>
        </form>
      </div>
      <div className="m-5 rounded flex flex-col md:flex-row items-center md:justify-evenly  bg-blue-500">
        <div className=" p-2 ">
          <img
            className="w-80 h-80 object-cover bg-white cursor-pointer rounded-xl"
            src={require("/home/luca/Documents/GitHub/AnimalHouse/client/games/src/1652541244672.png")}
            alt="quiz game"
            onClick={handleQuiz}
          />
        </div>
        <div className=" p-2">
          <img
            className=" w-80 h-80 object-cover bg-white cursor-pointer rounded-xl"
            src={require("/home/luca/Documents/GitHub/AnimalHouse/client/games/src/animali-selvatici.jpg")}
            alt="memory game"
            onClick={handleMemory}
          />
        </div>
        <div className="p-2">
          <img
            className="w-80 h-80 object-cover bg-white cursor-pointer rounded-xl"
            src={require("/home/luca/Documents/GitHub/AnimalHouse/client/games/src/hangmanGame.jpg")}
            alt="hangman game"
            onClick={handleHangMan}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
