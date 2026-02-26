import React from "react";
import { useState, useEffect } from "react";

function SearchBar(props) {
    // state 
    let [text, setText] = useState("");

    // auto-focus on page load
    useEffect(() => {
        document.getElementById("search-input").focus();
    }, []);

    // debounce using useEffect + cleanup
    useEffect(() => {
        let timer = setTimeout(() => {
            props.onSearch(text);
        }, 500);

        return () => {
            clearTimeout(timer);
        };
    }, [text]);

    // handeler
    function handleChange(e) {
        setText(e.target.value);
    }

    // return a react element
    return(
        <div className="p-4 m-4">
            <input
                id="search-input"
                type="text"
                value={text}
                onChange={handleChange}
                placeholder="Search for a country..."
                className="w-full border-2 border-gray-300 rounded-lg p-3 text-lg"
            />
        </div>
    )
}

export default SearchBar;
