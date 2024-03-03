import React, { useState, useEffect } from "react";
import Reel from "./Reel";

const SearchBar = () => {
  //setear los hooks useState
  const [reels, setReels] = useState([]);
  const [search, setSearch] = useState("");

  //función para buscar los reels
  const BASE_URL = "http://localhost:3000";

  const searchReels = async () => {
    const response = await fetch(`${BASE_URL}/`);
    const { data } = await response.json();
    console.log(data);
    setReels(data);
  };

  //función de búsqueda
  const searcher = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    searchReels();
  }, []);

  //método de filtrado
  const searchFilter = (reels, search) => {
    if (!search) {
      return reels;
    } else {
      const filteredReels = reels.filter((data) =>
        data.text.toLowerCase().includes(search.toLowerCase())
      );
      return filteredReels.length > 0 ? filteredReels : [];
    }
  };

  //renderizamos la vista
  return (
    <div>
      <input
        value={search}
        onChange={searcher}
        type="text"
        placeholder="Search"
        className="form-control"
      ></input>

      {/*renderizamos la vista de reels filtrados*/}
      {searchFilter(reels, search).length > 0 ? (
      <ul>
        {searchFilter(reels, search).map((reel) => (
          <Reel key={reel.id} reel={reel} />
        ))}
      </ul>
    ) : (
      <p>No results found</p>
    )}
  </div>
);
};

export default SearchBar;