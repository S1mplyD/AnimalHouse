import React from "react";

export default function Services(service){
    return(
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
            {console.log(service)}
            <a href={`/servizi/${service.service[0]._id}`}>
                <img src={`/${service.service[0].pictures[0]}`} alt={service.service[0].name} className="w-full" />
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{service.service[0].name}</div>
                    <p className="text-gray-700 text-base">{service.service[0].info}</p>
                </div>
            </a>
        </div>
    )
}