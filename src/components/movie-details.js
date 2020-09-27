import React, { Component } from 'react';
var FontAwesome  = require('react-fontawesome')
class MovieDetails extends Component {

    state = {
        highlighted: -1
    }

    highlightRate = high => evt => {
        this.setState({highlighted: high})
    }

    rateClicked = stars => evt => {
        fetch(`${process.env.REACT_APP_API_URL}/api/movies/${this.props.movie.id}/rate_movie/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${this.props.token}` 
            },
            body: JSON.stringify({stars: stars + 1})
          }).then( resp => resp.json())
          .then( res => this.getDetails())
          .catch( err => console.log(err))    
    }

    getDetails = () => {
        fetch(`${process.env.REACT_APP_API_URL}/api/movies/${this.props.movie.id}/`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${this.props.token}` 
            }
          }).then( resp => resp.json())
          .then( res => this.props.updateMovie(res))
          .catch( err => console.log(err))    

    }

    render () {
        const movie = this.props.movie;
        return (
            <React.Fragment>
                { movie ? (
                    <div>
                        <h3>{movie.title}</h3>
                        <FontAwesome name="star" className={movie.average_rating > 0 ? 'orange' : ''}/>
                        <FontAwesome name="star" className={movie.average_rating > 1 ? 'orange' : ''}/>
                        <FontAwesome name="star" className={movie.average_rating > 2 ? 'orange' : ''}/>
                        <FontAwesome name="star" className={movie.average_rating > 3 ? 'orange' : ''}/>
                        <FontAwesome name="star" className={movie.average_rating > 4 ? 'orange' : ''}/>
                        ({movie.ratings_count})
                        <p>{movie.description}</p>
                        <div className="rate-container">
                            <h4>Give you Ratings !!</h4>
                            {[...Array(5)].map((e, i) => {
                                return <FontAwesome key={i} name="star" className={this.state.highlighted > i-1 ? 'purple' : ''}
                                onMouseEnter={this.highlightRate(i)} onMouseLeave={this.highlightRate(-1)} onClick={this.rateClicked(i)}/>
                            })}
                        </div>
                    </div>
                ) : (
                    <h2>Select a movie</h2>
                )}
            </React.Fragment>
        )
    }
}

export default MovieDetails;