import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [game, setGame] = useState();
  const handleQuiz = async () => {
    setGame("quiz");
    // await getQuestions();
    router.push("/games/quiz");
  };
  const handleMemory = async () => {
    setGame("memory");
    // await getImages();
    router.push("/games/memory");
  };
  const handleHangMan = async () => {
    setGame("hangman");
    // await getWords();
    router.push("/games/hangman");
  };

  return (
    <div>
      <div className="m-5 p-2 bg-blue-500 rounded ">
        <form className="bg-blue-500 flex flex-col items-center text-center">
          <div className="m-2 p-2 flex flex-col">
            <label htmlFor="specie" className="bg-blue-500">
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
          <div className="m-2 p-2 bg-blue-500 flex flex-col">
            <label htmlFor="name" className="bg-blue-500">
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
          <div className="m-2 p-2 flex flex-col">
            <label htmlFor="gender" className="form-label bg-blue-500">
              Animal gender:
            </label>
            <select
              name="gender"
              id="gender"
              className="form-select rounded-xl mx-2"
              defaultValue="M"
            >
              <option value="M" className="bg-blue-500">
                Male
              </option>
              <option value="F" className="bg-blue-500">
                Female
              </option>
            </select>
          </div>
          <div className="m-2 p-2  flex flex-col">
            <label htmlFor="age" className="form-label bg-blue-500">
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
          <div className="m-2 p-2  flex flex-col">
            <label htmlFor="medical" className="form-label bg-blue-500">
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
          <div className="m-2 p-2  ">
            <input
              type="button"
              value="Subimt"
              className="p-2 rounded-xl hover:bg-cyan-700 bg-cyan-400 text-white"
              onClick={() => {}}
            />
          </div>
        </form>
      </div>
      <div className="m-5 rounded flex flex-col md:flex-row items-center md:justify-evenly  bg-blue-500">
        <div className=" p-2 ">
          <img
            className="w-80 h-80 object-cover bg-white cursor-pointer rounded-xl"
            width="1000"
            height="1000"
            src="/1652541244672.png"
            alt="quiz game"
            onClick={handleQuiz}
          />
        </div>
        <div className=" p-2">
          <img
            className=" w-80 h-80 object-cover bg-white cursor-pointer rounded-xl"
            width="1000"
            height="1000"
            src="/animali-selvatici.jpg"
            alt="memory game"
            onClick={handleMemory}
          />
        </div>
        <div className="p-2">
          <img
            className="w-80 h-80 object-cover bg-white cursor-pointer rounded-xl"
            width="1000"
            height="1000"
            src="/hangmanGame.jpg"
            alt="hangman game"
            onClick={handleHangMan}
          />
        </div>
      </div>
      {/* {loading ? "null" : <ADs ads={ads}></ADs>} */}
    </div>
  );
}
