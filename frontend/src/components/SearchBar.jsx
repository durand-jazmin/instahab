import React, { useState, useEffect } from "react";
import Reel from "./Reel";
import "./SearchBar.css";

const SearchBar = ({ removeReel }) => {
  const [reels, setReels] = useState([]);
  const [search, setSearch] = useState("");

  const BASE_URL = "http://localhost:3000";

  const searchReels = async () => {
    const response = await fetch(`${BASE_URL}/`);
    const { data } = await response.json();
    setReels(data);
  };

  const searcher = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    searchReels();
  }, []);

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

  const removeReelFromState = (id) => {
    setReels(reels.filter((reel) => reel.id !== id));
  };

  return (
    <div>
      <input
        value={search}
        onChange={searcher}
        type="text"
        placeholder="Search"
        className="search-bar"
      ></input>

      {searchFilter(reels, search).length > 0 ? (
        <ul>
          {searchFilter(reels, search).map((reel) => (
            <Reel
              key={reel.id}
              reel={reel}
              removeReel={() => removeReelFromState(reel.id)}
              removeReelFromParent={removeReel}
            />
          ))}
        </ul>
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
};

export default SearchBar;