import React, { useState } from "react";
import { useNavigate } from "react-router";
import "../../componentsCss/Memory/Memory.css";
import Card from "./Card";

function Memory({ images, setImages }) {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
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
  //-1 nessuna carta selezionata, altrimenti id della carta
  const [prec, setPrec] = useState(-1);
  const [clickable, setClickable] = useState(true);
  //TODO metterlo in App e passarlo a result
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState(-1);

  const handleClick = (index) => {
    console.log("prec: " + prec + " state: " + images[index].state);
    console.log(correct);
    if (correct >= 7) {
      console.log("endgame");

      navigate("/result");
    } else if (prec === -1) {
      if (images[index].state != "correct") {
        images[index].state = "active";
        setImages([...images]);
        setPrec(index);
      }
    } else {
      checkCard(index);
    }
  };

  const checkCard = async (id) => {
    //stessa immagine
    console.log("id: " + id);
    console.log("score: " + score);
    if (images[id].id == images[prec].id) {
      if (images[id].state != "active") {
        images[id].state = images[prec].state = "correct";
        setImages([...images]);
        setPrec(-1);
        setScore(score + 1);
        setCorrect(correct + 1);
      }
    }

    //carta sbagliata
    else {
      if (images[id].state != "correct") {
        images[id].state = images[prec].state = "wrong";
        setImages([...images]);
        setClickable(false);
        setScore(score - 1);
        setTimeout(() => {
          images[id].state = images[prec].state = "";
          setImages([...images]);
          setPrec(-1);
          setClickable(true);
        }, 1000);
      }
    }
  };

  return (
    <div
      className="container"
      style={{ visibility: show ? "visible" : "hidden" }}
    >
      <h1 style={{ display: show ? "none" : "initial", visibility: "visible" }}>
        Loading
      </h1>
      <div
        className="canvas"
        style={{ pointerEvents: clickable ? "" : "none" }}
      >
        {
          images.map((i, index) => (
            <Card
              key={index}
              item={i}
              id={index}
              handleClick={() => handleClick(index)}
              handleLoad={handleLoad}
            ></Card>
          ))

          /* {images.map((i, index) => (
          <img
            key={index}
            src={i.image}
            alt="img"
            className="memoryImage"
            onLoad={handleLoad}
            onClick={() => handleClick(index)}
          />
        ))} */
        }
      </div>
    </div>
  );
}

export default Memory;
