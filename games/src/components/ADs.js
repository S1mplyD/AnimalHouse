import React from "react";

export default function Ads(title, image, info) {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img src={`/${title.image}`} alt={title.title} className="w-full" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title.title}</div>
        <p className="text-gray-700 text-base">{title.info}</p>
      </div>
    </div>
  );
}
