import React, { useState } from "react";
import "./App.css";
import "h8k-components";

import { Movieform, Movieslist, Search } from "./components";

const title = "Favorite Movie Directory";

function App() {
  const [movieList, setMovieList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [searchText, setSearchText] = useState("");

  const addMovie = (movie) => {
    setMovieList([...movieList, movie]);
  };

  const searchMovies = (text) => {
    setSearchText(text);
    let filteredList = movieList.filter((movie) => movie.name.includes(text));
    setFilteredList(filteredList);
  };

  return (
    <div>
      <h8k-navbar header={title} />
      <div className="layout-row justify-content-center mt-100">
        <div className="w-30 mr-75">
          <Movieform addToMovieDirectory={addMovie} />
        </div>
        <div className="layout-column w-30">
          <Search movieList={movieList} searchTextChanged={searchMovies} />
          <Movieslist
            movieList={filteredList.length > 0 ? filteredList : movieList}
          />
          {searchText.length > 2 && filteredList.length === 0 && (
            <div data-testid="noResult">
              <h3 className="text-center">No Results Found</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
