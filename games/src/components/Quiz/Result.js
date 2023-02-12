import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Ads from "../ADs";
import { getAds, getServices } from "../../apiCalls";
import Services from "../Services";

function Result({ score, setScore, setGame, game }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState([]);
  const [ads, setAds] = useState([]);
  const submitScore = async () => {
    await axios.post("http://localhost:8000/api/leaderboard", {
      playerName: document.getElementById("username").value,
      score: score,
      game: game,
    });
    setScore(0);
    setGame("");
    navigate("/games");
  };

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
  if (!loading) {
    return (
      <>
        <div className={"flex flex-row justify-evenly"}>
          <Services service={services}></Services>
        </div>
        <div
          className="flex flex-col items-center bg-white rounded w-fit m-auto mt-10"
          aria-live={"assertive"}
        >
          <div
            className="m-10 w-fit h-80 flex flex-col items-center content-around border-gray-400 border-solid border-4 p-5 rounded-xl"
            aria-live={"assertive"}
          >
            <div className="text-center" aria-live={"assertive"}>
              <label htmlFor={"score"}>Your score is: </label>
              <p id={"score"}>{score}</p>
            </div>
            <div className="text-center my-5 flex flex-col items-center">
              <label htmlFor={"username"}>Save your score</label>
              <input
                type="text"
                name="username"
                placeholder="username"
                id="username"
                className="mt-5 rounded-md"
              />
              <input
                type="submit"
                className="mt-5 rounded-lg bg-cyan-400 p-2 hover:bg-blue-500"
                value="submit"
                onClick={() => {
                  submitScore();
                }}
              />
            </div>
          </div>
        </div>
        <div className={"flex flex-row justify-evenly"}>
          <Ads ad={ads}></Ads>
        </div>
      </>
    );
  }
}

export default Result;
