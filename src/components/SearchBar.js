import React from 'react';
import {Link} from 'react-router-dom';

const SearchBar = ({searchMovieProp}) => {

    const handleFormSubmit = (e) => {
        e.preventDefault();
        
    }
    


    return (
        <form onSubmit={handleFormSubmit}>
            <div className='row mb-5'>
                <div className='col-10'>
                    <input type='text' 
                    
                    onChange={searchMovieProp} 
                    className='form-control' 
                    placeholder='Search a movie' 
                    />

                </div>
                <div className='col-2'>
                    <Link to="/add" type='button' className='btn btn-md btn-danger' style={{float: 'right'}}>Add Movie</Link>
                </div>
            </div>
        </form>
    )
    
}

export default SearchBar;