import React from "react";
import { Link } from "react-router-dom";

export default function Ads(ad) {
  const random = Math.floor(Math.random() * ad.ad.length);
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white flex flex-col items-center">
      <Link to={`/games/shop/${ad.ad[random]._id}`}>
        <img
          src={`/${ad.ad[random].mainPhoto}`}
          alt={ad.ad[random].title}
          className="w-80 h-80"
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{ad.ad[random].title}</div>
          <p className="text-gray-700 text-base">{ad.ad[random].info}</p>
        </div>
      </Link>
    </div>
  );
}
