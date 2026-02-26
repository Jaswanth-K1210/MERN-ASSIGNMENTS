import React from "react";

function CountryCard(props) {
    // state 
    let { name, capital, flags, currencies } = props.country;

    // return a react element
    return(
        <div className="text-2xl border-2 border-gray-300 rounded-lg p-4 m-5 ">
            <img src={flags.png} alt={flags.alt || name.common} className="mb-4 w-full h-40 object-cover rounded" />
            <h2 className="font-black">{name.common}</h2>
            <p className="font-bold">Capital: {capital ? capital[0] : "N/A"}</p>
            <p className="text-amber-900">
                Currency: {currencies ? Object.values(currencies).map(c => c.name).join(", ") : "N/A"}
            </p>
        </div>
    )
}

export default CountryCard;
