import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getAds, getServices, getImages, getFunFact } from "../../apiCalls";
import Ads from "../ADs";
import Services from "../Services";
import Card from "./Card";

function Memory({ score, setScore, setGame }) {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [ads, setAds] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  //-1 nessuna carta selezionata, altrimenti id della carta
  const [prec, setPrec] = useState(-1);
  const [clickable, setClickable] = useState(true);
  const [correct, setCorrect] = useState(-1);
  const [funFact, setFunFact] = useState([]);
  const [funFactLoad, setFunFactLoad] = useState(false);
  const [random, setRandom] = useState(0);
  useEffect(() => {
    async function fetchData() {
      const rawServices = await getServices();

      setServices(rawServices.data);
      const rawAds = await getAds(
        sessionStorage.getItem("specie"),
        sessionStorage.getItem("name"),
        sessionStorage.getItem("gender"),
        sessionStorage.getItem("age"),
        sessionStorage.getItem("medicalCondition")
      );
      setAds(rawAds.data);
      const rawFunFact = await getFunFact(
        sessionStorage.getItem("name"),
        sessionStorage.getItem("specie")
      );
      setRandom(Math.floor(Math.random() * rawFunFact.data.length));
      setFunFact(rawFunFact.data);
      const images = await getImages();
      setImages(images);
    }

    fetchData().then(() => {
      setFunFactLoad(true);
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    });
  }, []);
  let loaded = 0;
  const handleLoad = () => {
    if (loaded >= 15) {
      setShow(true);
      console.log("end");
    } else {
      console.log(loaded);

      loaded++;
    }
  };

  const handleClick = (index) => {
    console.log("prec: " + prec + " state: " + images[index].state);
    console.log("correct: " + correct);
    if (prec === -1) {
      if (images[index].state !== "correct") {
        images[index].state = "active";
        setImages([...images]);
        setPrec(index);
      }
    } else {
      checkCard(index);
    }
  };

  const handleWin = () => {
    alert("you win");
    setGame("memory");
    console.log("handle win");
    navigate("/games/result");
  };

  const checkCard = async (id) => {
    //stessa immagine
    console.log("id: " + id);
    console.log("score: " + score);
    if (images[id].id === images[prec].id) {
      if (images[id].state !== "active") {
        images[id].state = images[prec].state = "correct";
        setImages([...images]);
        setPrec(-1);
        setScore(score + 2);
        setCorrect(correct + 1);
      }
    }

    //carta sbagliata
    else {
      if (images[id].state !== "correct") {
        images[id].state = images[prec].state = "wrong";
        setImages([...images]);
        setClickable(false);
        if (score > 0) {
          setScore(score - 1);
        }
        setTimeout(() => {
          images[id].state = images[prec].state = "";
          setImages([...images]);
          setPrec(-1);
          setClickable(true);
        }, 1000);
      }
    }
  };

  if (!loading) {
    return (
      <div
        className="flex flex-col justify-evenly items-center"
        style={{ visibility: show ? "visible" : "hidden" }}
      >
        {services.length > 0 ? (
          <div className={"flex flex-row justify-evenly"}>
            <Services service={services}></Services>
          </div>
        ) : null}

        <div
          className="grid grid-cols-4 grid-rows-4 gap-2 p-8 border-2 border-solid rounded-3xl bg-white mt-10"
          style={{ pointerEvents: clickable ? "" : "none" }}
        >
          {images.map((i, index) => (
            <Card
              key={index}
              item={i}
              id={index}
              handleClick={() => handleClick(index)}
              handleLoad={handleLoad}
            ></Card>
          ))}
          {correct > 6 ? handleWin() : null}
        </div>
        {ads.length > 0 ? (
          <div className={"flex flex-row justify-evenly"}>
            <Ads ad={ads}></Ads>
          </div>
        ) : null}
      </div>
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

export default Memory;
