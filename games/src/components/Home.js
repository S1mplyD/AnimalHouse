import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Services from "./Services";
import { getAds, getServices } from "../apiCalls";
import Ads from "./ADs";

export default function Home() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState([]);
  const [ads, setAds] = useState([]);
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
    }

    fetchData().then(() => {
      setLoading(false);
    });
  }, []);

  const handleQuiz = async () => {
    navigate("/games/quiz");
  };
  const handleMemory = async () => {
    navigate("/games/memory");
  };
  const handleHangMan = async () => {
    navigate("/games/hangman");
  };

  if (!loading) {
    return (
      <>
        <div className={"flex flex-row justify-evenly"}>
          <Services service={services}></Services>
        </div>
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
                defaultValue="Male"
              >
                <option value="Male" className="bg-white">
                  Male
                </option>
                <option value="Female" className="bg-white">
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

              <input
                type={"text"}
                name="medicalCondition"
                id="medical"
                placeholder="MUST be separated by ';'(semicolon)"
                className="form-textarea rounded-xl"
              ></input>
            </div>
            <div className="m-2 p-2 bg-white ">
              <input
                type="button"
                value="Submit"
                className="p-2 rounded-xl hover:bg-blue-700 bg-cyan-400 text-white"
                onClick={() => {
                  let medicalConditions = document
                    .getElementById("medical")
                    .value.split(";");
                  sessionStorage.setItem(
                    "specie",
                    document.getElementById("specie").value
                  );
                  sessionStorage.setItem(
                    "name",
                    document.getElementById("name").value
                  );
                  sessionStorage.setItem(
                    "gender",
                    document.getElementById("gender").value
                  );
                  sessionStorage.setItem(
                    "age",
                    document.getElementById("age").value
                  );
                  sessionStorage.setItem("medicalCondition", medicalConditions);
                  window.location.reload();
                }}
              />
            </div>
          </form>
        </div>
        <div className="m-5 rounded flex flex-col md:flex-row items-center md:justify-evenly ">
          <div className=" p-2 ">
            <input
              type={"image"}
              className="w-80 h-80 object-cover bg-white cursor-pointer rounded-xl"
              src="/quizImage.png"
              alt="quiz game"
              onClick={handleQuiz}
            />
          </div>
          <div className=" p-2">
            <input
              type={"image"}
              className=" w-80 h-80 object-cover bg-white cursor-pointer rounded-xl"
              src="/memoryImage.png"
              alt="memory game"
              onClick={handleMemory}
            />
          </div>
          <div className="p-2">
            <input
              type={"image"}
              src={"/hangmanGame.jpg"}
              alt={"hangman game"}
              onClick={handleHangMan}
              className={
                "w-80 h-80 object-cover bg-white cursor-pointer rounded-xl"
              }
            />
          </div>
        </div>
        <div className={"flex flex-row justify-evenly"}>
          <Ads ad={ads}></Ads>
        </div>
      </>
    );
  }
}
