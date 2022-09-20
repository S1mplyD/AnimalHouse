import React from "react";
import axios from "axios";

export default function ADs(products) {
  console.log(products.products);
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-white">{products.products[0].info}</h1>
    </div>
  );
}
