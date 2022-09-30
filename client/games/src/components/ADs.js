import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ADs(ads) {
  console.log(ads.ads);
  const ad = ads.ads[0];
  let randomAd = ads.ads[Math.floor(Math.random() * ads.ads.length)];
  console.log(randomAd.photos);

  return (
    <div className="flex flex-col items-center">
      {/* <img
        src={require("/home/luca/Documents/GitHub/AnimalHouse/server/Images/" +
          randomAd.photos[0])}
        alt={randomAd.title}
      ></img> */}
      <h1 className="text-white">{randomAd.info}</h1>
    </div>
  );
}
