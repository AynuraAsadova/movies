import React from 'react';
import {Link} from 'react-router-dom';

const SearchBar = ({searchMovieProp}) => {

    const handleFormSubmit = (e) => {
        e.preventDefault();
        
    }
    


    return (
        <form onSubmit={handleFormSubmit}>
            <div className='row mb-5'>
                <div className='col-lg-10 col-sm-9'>
                    <input type='text' 
                    
                    onChange={searchMovieProp} 
                    className='form-control' 
                    placeholder='Search a movie' 
                    />

                </div>
                <div className='col-lg-2 col-sm-3 mt-sm-0 mt-2'>
                    <Link to="/movies/add" type='button' className='btn btn-md btn-danger w-100'>Add Movie</Link>
                </div>
            </div>
        </form>
    )
    
}

export default SearchBar;