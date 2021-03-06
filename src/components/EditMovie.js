import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditMovie = ({ setMovies }) => {
  let { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [rating, setRating] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [overview, setOverview] = useState("");

  useEffect(() => {
    axios.get(`https://my-json-server.typicode.com/aynuraasadova/movies/movies/${id}`).then((response) => {
      setName(response.data.name);
      setRating(response.data.rating);
      setImageURL(response.data.imageURL);
      setOverview(response.data.overview);
    });
  }, [id]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const movie = { name, rating, imageURL, overview };

    axios.put(`https://my-json-server.typicode.com/aynuraasadova/movies/movies/${id}`, movie).then(({ data }) => {
      setMovies((prev) => {
        const index = prev?.findIndex((m) => m.id === id);
        prev.splice(index, 1, data);
        return [...prev.slice(0, index), data, ...prev.slice(index + 1)];
      });
      navigate("/movies/");
    });
  };

  return (
    <div className='container'>
      <form className='mt-5' onSubmit={handleFormSubmit}>
        <input
          className='form-control'
          id='disabledInput'
          type='text'
          placeholder='Edit The Form To Update A Movie..'
          disabled
        />
        <div className='row'>
          <div className='form-group col-md-10'>
            <label htmlFor='inputName'>Name</label>
            <input
              type='text'
              className='form-control'
              name='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='form-group col-md-2'>
            <label htmlFor='inputRating'>Rating</label>
            <input
              type='text'
              className='form-control'
              name='rating'
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
          </div>
        </div>
        <div className='form-row'>
          <div className='form-group col-md-12'>
            <label htmlFor='inputImage'>Image URL</label>
            <input
              type='text'
              className='form-control'
              name='imageURL'
              value={imageURL}
              onChange={(e) => setImageURL(e.target.value)}
            />
          </div>
        </div>
        <div className='form-row'>
          <div className='form-group col-md-12'>
            <label htmlFor='overviewTextarea'>Overview</label>
            <textarea
              className='form-control'
              name='overview'
              value={overview}
              onChange={(e) => setOverview(e.target.value)}
              rows='5'
            ></textarea>
          </div>
        </div>
        <input
          type='submit'
          className='btn btn-danger w-100 mt-3'
          value='Edit Movie'
        />
      </form>
    </div>
  );
};

export default EditMovie;
