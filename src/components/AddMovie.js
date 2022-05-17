import React, { useState } from "react";
// import serialize from "form-serialize";
import { useNavigate } from "react-router-dom";

const AddMovie = (props) => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [rating, setRating] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [overview, setOverview] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // const newMovie = serialize(e.target, { hash: true });
    console.log(name, rating, imageURL, overview);
    props.addMovie(name, rating, imageURL, overview);
    navigate("/");
  };

  return (
    <div className='container'>
      <form className='mt-5' onSubmit={handleFormSubmit}>
        <input
          className='form-control'
          id='disabledInput'
          type='text'
          placeholder='Fill The Form To Add A Movie..'
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
          value='Add Movie'
        />
      </form>
    </div>
  );
};

export default AddMovie;
