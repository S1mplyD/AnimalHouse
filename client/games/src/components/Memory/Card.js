import React from "react";
import "../../componentsCss/Memory/Memory.css";

export default function Card({ item, id, handleClick, handleLoad }) {
  const itemClass = item.state ? " active " + item.state : "";

  return (
    <div
      className={
        "bg-yellow-600 flex flex-col items-center m-auto rounded-md card" +
        itemClass
      }
      onClick={() => handleClick(id)}
    >
      <img
        className="max-w-08 max-h-08 w-20 h-20 md:w-44 md:h-44 rounded-xl"
        src={item.image}
        alt={item.name}
        onLoad={handleLoad}
      />
    </div>
  );
}
