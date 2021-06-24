import React,{Component} from 'react';
import { withCookies } from 'react-cookie';
import './App.css';
import MovieList from './components/movie-list';
import MovieDetails from './components/movie-details';
import MovieForm from './components/movie-form';
import Header from './components/header';
var FontAwesome  = require('react-fontawesome')


class App extends Component {

  state = {
    movies: [],
    listConfig: {count: 0, next: `${process.env.REACT_APP_API_URL}/api/movies/`, previous: null},
    selectedMovie: null,
    editedMovie: null,
    token: this.props.cookies.get('mr-token')
  }

  componentDidMount(){
    if (this.state.token) {
      this.loadMovies();
    } else {
      window.location.href = '/';
    }
   
  }

  loadMovies = () => {
    fetch(this.state.listConfig.next, {
      method: 'GET',
      headers: {
        'Authorization': `Token ${this.state.token}` 
      }
    }).then( resp => resp.json())
    .then( res => {
      this.setState({movies: [...this.state.movies, ...res.results], listConfig: res})
    })
    .catch( err => console.log(err))
  }

  loadMovie = movie => {
    fetch(`${process.env.REACT_APP_API_URL}/api/movies/${movie.id}/`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${this.state.token}` 
    }
    }).then( resp => resp.json())
    .then( res => this.setState({selectedMovie: res, editedMovie: null}))
    .catch( err => console.log(err))    
  }

  movieDeleted = selMovie => {
    const movies = this.state.movies.filter(movie => movie.id !== selMovie.id) 
    this.setState({movies: movies, selectedMovie: null})
  }

  editClicked = selMovie => {
    this.setState({editedMovie: selMovie})
  }
  
  newMovie = () => {
    this.setState({editedMovie: {title: '', description: ''}})
  }
  
  cancelForm = () => {
    this.setState({editedMovie: null})
  }

  addMovie = movie => {
    this.setState({movies: [...this.state.movies, movie]});
  }

  render(){
    return (
      <div className="App">
        <Header cookies={this.props.cookies}/>
        <h1>
          <FontAwesome name="film" />
          <span>Movie Rater</span>
        </h1>
        <div className="layout">
          <MovieList movies={this.state.movies} loadMovies={this.loadMovies} listConfig={this.state.listConfig} movieClicked={this.loadMovie}
            movieDeleted={this.movieDeleted} editClicked={this.editClicked} newMovie={this.newMovie} token={this.state.token} />
            <div>
              {this.state.editedMovie ? (
                <MovieForm movie={this.state.editedMovie} cancelForm={this.cancelForm} 
                  newMovie={this.addMovie} editedMovie={this.loadMovie} token={this.state.token}/>
                ) : (
                  <MovieDetails movie={this.state.selectedMovie} updateMovie={this.loadMovie} token={this.state.token}/>
              )}
            </div>
        </div>
      </div>
    );
  }
}

export default withCookies(App);
