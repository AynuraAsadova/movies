import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchBar from "./SearchBar";
import MoviesList from "./MoviesList";
import AddMovie from "./AddMovie";
import EditMovie from "./EditMovie";
import axios from "axios";
import { filter } from "lodash";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios.get("https://my-json-server.typicode.com/aynuraasadova/movies/movies").then(({ data }) => {
      setMovies(data);
    });
  }, []);

  // delete movie
  const deleteMovie = (movie) => {
    axios.delete(`https://my-json-server.typicode.com/aynuraasadova/movies/movies/${movie.id}`);
    const newMovieList = movies.filter((m) => m.id !== movie.id);
    setMovies(newMovieList);
  };

  //  search movie
  const searchMovie = (event) => {
    setSearchQuery(event.target.value);
  };

  // add movie
  const addMovie = (name, rating, imageURL, overview) => {
    const movie = {
      name,
      rating,
      imageURL,
      overview,
    };

    axios.post(`https://my-json-server.typicode.com/aynuraasadova/movies/movies`, movie).then(({ data }) => {
      setMovies((previous) => [...previous, data]);
    });
  };

  const filteredMovies = filter(movies, (movie) => {
    return movie.name?.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1;
  });

  return (
    <BrowserRouter>
      <div className='container' style={{ maxWidth: "960px" }}>
        <Routes>
          <Route
            path='/movies/'
            exact
            element={
              <React.Fragment>
                <div className='row mt-4'>
                  <div className='col-lg-12'>
                    <SearchBar searchMovieProp={searchMovie} />
                  </div>
                </div>

                <MoviesList movies={filteredMovies} deleteMovie={deleteMovie} />
              </React.Fragment>
            }
          ></Route>

          <Route path='movies/add' element={<AddMovie addMovie={addMovie} />} />

          <Route
            path='movies/edit/:id'
            element={<EditMovie setMovies={setMovies} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
