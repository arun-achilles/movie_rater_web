import React from 'react';

import InfiniteScroll from 'react-infinite-scroll-component';

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
            <InfiniteScroll
            dataLength={props.movies.length} //This is important field to render the next data
            next={props.loadMovies}
            hasMore={props.listConfig.count !== props.movies.length}
            loader={<h4>Loading...</h4>}
            height={720}
            className="movie-list-infinite-container"
            endMessage={
                <p style={{ textAlign: 'center' }}>
                <b>That's it.. You have seen it all !!!</b>
                </p>
            }
            >
                {props.movies.map(movie => {
                    return (
                        <div key={movie.id} className="movie-item">
                            <div onClick={movieClicked(movie)}>
                                <h3 key={movie.id}>
                                    {movie.title}
                                </h3>
                            </div>
                            <FontAwesome name="edit" onClick={() => editClicked(movie)}/>
                            <FontAwesome name="trash" onClick={() => removeClicked(movie)}/>
                        </div>
                    )
                })}
            </InfiniteScroll>            
            <button onClick={props.newMovie}>Add Movie</button>
        </div>
    )
}

export default MovieList;