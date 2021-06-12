import React from 'react';
var FontAwesome  = require('react-fontawesome')

function MovieList(props){

    const movieClicked = movie => evt => {
        props.movieClicked(movie);
    }

    const removeClicked = movie => {
        fetch(`${process.env.REACT_APP_API_URL}/api/movies/${movie.id}/`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${props.token}` 
            },
          }).then( resp => props.movieDeleted(movie))
          .catch( err => console.log(err))
    }

    const editClicked = movie => {
        props.editClicked(movie)
    }

    return (
        <div>
            {props.movies.map(movie => {
                return (
                    <div key={movie.id} className="movie-item">
                        <h3 key={movie.id} onClick={movieClicked(movie)}>
                            {movie.title}
                        </h3>
                        <FontAwesome name="edit" onClick={() => editClicked(movie)}/>
                        <FontAwesome name="trash" onClick={() => removeClicked(movie)}/>
                    </div>
                )
            })}
            <button onClick={props.newMovie}>Add Movie</button>
        </div>
    )
}

export default MovieList;