import React from "react";

export default function Ads(ad) {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
        {console.log(ad.ad)}
        <a href={`/shop/${ad.ad._id}`}>
      <img src={`/${ad.ad.image}`} alt={ad.ad.title} className="w-full" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{ad.ad.title}</div>
        <p className="text-gray-700 text-base">{ad.ad.info}</p>
      </div>
        </a>
    </div>
  );
}
