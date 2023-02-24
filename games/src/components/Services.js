import React from "react";
import { Link } from "react-router-dom";

export default function Services(service) {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white flex flex-col items-center">
      <Link to={`/games/services/${service.service[0]._id}`}>
        <img
          src={`/${service.service[0].pictures[0]}`}
          alt={service.service[0].name}
          className="w-80 h-80"
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">
            {service.service[0].name}
          </div>
          <p className="text-gray-700 text-base">{service.service[0].info}</p>
        </div>
      </Link>
    </div>
  );
}
