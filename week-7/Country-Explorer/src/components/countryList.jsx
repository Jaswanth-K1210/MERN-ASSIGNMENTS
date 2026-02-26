import CountryCard from "./countryCard.jsx";
import React from "react";

function CountryList(props) {
    // state 
    let countries = props.countries;

    // return a react element
    return(
        <div className="text-2xl p-4 m-4 rounded-b-lg grid grid-cols-4 gap-8">
            {
                countries.map((country, index) => <CountryCard key={index} country={country} />)
            }
        </div>
    )
}

export default CountryList;
