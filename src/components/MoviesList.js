import React from "react";
import { Link } from "react-router-dom";

const MoviesList = (props) => {
  const truncateOverview = (string, maxLength) => {
    if (!string) {
      return null;
    } else if (string.length <= maxLength) {
      return string;
    } else {
      return `${string.substring(0, maxLength)}...`;
    }
  };

  return (
    <div className='row mb-5'>
      {props.movies.map((movie, i) => (
        <div className='col-sm-6 col-md-4 mb-4' key={i}>
          <div className='card shadow-sm h-100'>
            <img
              src={movie.imageURL}
              alt='Sample img'
              className='card-img-top'
            />
            <div className='card-body'>
              <h5 className='card-title'>{movie.name}</h5>
              <p className='card-text'>
                {truncateOverview(movie.overview, 95)}
              </p>
              <div className='d-flex justify-content-between align-items-center'>
                <button
                  type='button'
                  onClick={() => props.deleteMovie(movie)}
                  className='btn btn-md btn-outline-danger'
                >
                  Delete
                </button>
                <Link
                  to={`/movies/edit/${movie.id}`}
                  className='btn btn-outline-primary'
                >
                  Edit
                </Link>
                <h3 className='m-0'>
                  <span className='badge bg-info'>{movie.rating}</span>
                </h3>
              </div>
            </div>
          </div>
        </div>
      )).sort((a,b) => {return a.id < b.id ? 1 : -1})}
    </div>
  );
};

export default MoviesList;
