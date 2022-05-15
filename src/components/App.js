import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchBar from "./SearchBar";
import MoviesList from "./MoviesList";
import AddMovie from "./AddMovie";
import EditMovie from "./EditMovie";
import axios from "axios";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const sortedMovies = movies.sort((a, b) => {
    return a.id < b.id ? 1 : -1;
  });

  useEffect(() => {
    axios
      .get("http://localhost:3002/movies/")
      .then((response) => setMovies(response.data));
  }, []);

  // delete movie
  const deleteMovie = (movie) => {
    axios.delete(`http://localhost:3002/movies/${movie.id}`);
    const newMovieList = movies.filter((m) => m.id !== movie.id);
    setMovies(newMovieList);
  };

  //  search movie
  const searchMovie = (event) => {
    setSearchQuery(event.target.value);
  };

  // add movie
  const addMovie = (name, rating, imageURL, overview) => {
    axios.post(`http://localhost:3002/movies`, {
      name,
      rating,
      imageURL,
      overview,
    });

    const addMovie = [...movies, { name, rating, imageURL, overview }];
    setMovies(addMovie);
  };

  // edit movie
  const editMovie = (id, updateMovie) => {
    axios.put(`http://localhost:3002/movies/${id}`, updateMovie);
  };

  const filteredMovies = movies.filter((movie) => {
    return movie.name?.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1;
  });

  return (
    <BrowserRouter>
      <div className='container' style={{ maxWidth: "960px" }}>
        <Routes>
          <Route
            path='/'
            exact
            element={
              <React.Fragment>
                <div className='row mt-4'>
                  <div className='col-lg-12'>
                    <SearchBar searchMovieProp={searchMovie} />
                  </div>
                </div>

                <MoviesList
                  movies={filteredMovies}
                  deleteMovie={deleteMovie}
                  sortedMovies={sortedMovies}
                />
              </React.Fragment>
            }
          ></Route>

          <Route path='/add' element={<AddMovie addMovie={addMovie} />} />

          <Route
            path='/edit/:id'
            element={<EditMovie editMovie={editMovie} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
