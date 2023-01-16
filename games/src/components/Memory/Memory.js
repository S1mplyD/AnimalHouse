import React, {useState} from "react";
import {useNavigate} from "react-router";
import Card from "./Card";
import ADs from "../ADs";
import Ads from "../ADs";

function Memory({images, setImages, score, setScore, setGame, currentAd, setCurrentAds, ads}) {
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
    const [correct, setCorrect] = useState(-1);
    // let correct = 0

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

    const handleWin = ()=>{
        console.log("handle win")
        if (currentAd < ads.length -1) {
            setCurrentAds(currentAd + 1)
        } else {
            setCurrentAds(0)
        }
        navigate("/result");
    }

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
                setCorrect(correct + 1)
            }
        }

        //carta sbagliata
        else {
            if (images[id].state !== "correct") {
                images[id].state = images[prec].state = "wrong";
                setImages([...images]);
                setClickable(false);
                if(score > 0) {
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

    return (
        <div className="" style={{visibility: show ? "visible" : "hidden"}}>
            <h1
                className="text-xl text-center m-auto"
                style={{display: show ? "none" : "initial", visibility: "visible"}}
            >
                Loading
            </h1>
            {correct > 6 ? handleWin() : null}
            <div
                className="grid grid-cols-4 grid-rows-4 gap-2 p-8 border-2 border-solid rounded-3xl bg-white mt-10"
                style={{pointerEvents: clickable ? "" : "none"}}
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
            {/* ads */}
            <Ads
                ad={ads[currentAd]}
            ></Ads>
        </div>
    );
}

export default Memory;
