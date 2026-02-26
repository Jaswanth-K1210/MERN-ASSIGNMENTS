import "./App.css"
import React from "react";
import { useState, useEffect } from "react";
import SearchBar from "./components/searchBar.jsx";
import CountryList from "./components/countryList.jsx";


function App(){

  // state 
  let [countries, setCountries] = useState([]);
  let [loading, setLoading] = useState(true);
  let [err, setErr] = useState(null);
  let [query, setQuery] = useState("");

  // fetch all countries on page load
  useEffect(() => {
    fetchCountries();
  }, []);

  // fetch when query changes
  useEffect(() => {
    fetchCountries();
  }, [query]);

  // handeler
  async function fetchCountries() {
    setLoading(true);
    setErr(null);

    try {
      let url = query.trim()
        ? `https://restcountries.com/v3.1/name/${query}`
        : "https://restcountries.com/v3.1/all?fields=name,capital,currencies,flags";

      let response = await fetch(url);

      if (!response.ok) {
        throw new Error("Country not found");
      }

      let data = await response.json();
      setCountries(data);
    } catch (error) {
      setErr(error.message);
      setCountries([]);
    } finally {
      setLoading(false);
    }
  }

  function handleSearch(value) {
    setQuery(value);
  }

  return (
    <div className="text-3xl mt-11 text-center">
      <h1 className="font-black"> Country Explorer </h1>

      <SearchBar onSearch={handleSearch} />

      {loading && <p className="text-lg text-blue-500 mt-6">Loading countries...</p>}

      {err && <p className="text-lg text-red-500 mt-6">Error: {err}</p>}

      {!loading && !err && countries.length === 0 && (
        <p className="text-lg text-gray-400 mt-6">No countries found.</p>
      )}

      {!loading && !err && countries.length > 0 && (
        <CountryList countries={countries} />
      )}
      
    </div>
            
  )
}

export default App;
