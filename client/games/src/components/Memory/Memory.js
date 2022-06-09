import React, { useState } from "react";
import "../../componentsCss/Memory/Memory.css";

function Memory({ images }) {
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
  return (
    <div
      className="container"
      style={{ visibility: show ? "visible" : "hidden" }}
    >
      <h1 style={{ display: show ? "none" : "initial", visibility: "visible" }}>
        Loading
      </h1>
      <div className="canvas">
        {images.map((i, index) => (
          <img
            key={index}
            src={i.image}
            alt="img"
            className="memoryImage"
            onLoad={handleLoad}
          />
        ))}
      </div>
    </div>
  );
}

export default Memory;
