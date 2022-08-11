import { useNavigate } from "react-router-dom";
import React from "react";
import "../componentsCss/Home.css";

function Home({
  getQuestions,
  setScore,
  setQuestions,
  images,
  getImages,
  getWords,
}) {
  const navigate = useNavigate();
  const handleQuiz = async () => {
    await getQuestions();
    navigate("/games/quiz");
  };
  const handleMemory = async () => {
    await getImages();
    navigate("/games/memory");
  };
  const handleHangMan = async () => {
    await getWords();
    navigate("/games/hangman");
  };

  return (
    <div>
      <div className="m-5 p-2 bg-white rounded">
        <form>
          <div className="m-2 p-2 bg-white">
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
          <div className="m-2 p-2 bg-white">
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
          <div className="m-2 p-2 bg-white">
            <label htmlFor="gender" className="form-label bg-white">
              Animal gender:
            </label>
            <select
              name=""
              id="gender"
              className="form-select rounded-xl"
              defaultValue="M"
            >
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>
          </div>
          <div className="m-2 p-2 bg-white">
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
          <div className="m-2 p-2 bg-white">
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
      <div className="m-5 p-2 bg-white rounded">
        <div className="card-group bg-white">
          <div className="card">
            <img
              className="card-img game-selection"
              src={require("../1652541244672.png")}
              alt="quiz game"
              onClick={handleQuiz}
            />
          </div>
          <div className="card">
            <img
              className="card-img game-selection"
              src={require("../animali-selvatici.jpg")}
              alt="memory game"
              onClick={handleMemory}
            />
          </div>
          <div className="card">
            <img
              className="card-img game-selection"
              src={require("../hangmanGame.jpg")}
              alt="hangman game"
              onClick={handleHangMan}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
