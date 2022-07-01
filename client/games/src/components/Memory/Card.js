import React from "react";
import "../../componentsCss/Memory/Memory.css";

export default function Card({ item, id, handleClick, handleLoad }) {
  const itemClass = item.state ? " active " + item.state : "";

  return (
    <div className={"card" + itemClass} onClick={() => handleClick(id)}>
      <img src={item.image} alt={item.name} onLoad={handleLoad} />
    </div>
  );
}
