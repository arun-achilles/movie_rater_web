import React,{Component} from 'react';

class MovieForm extends Component {

  state = {
      editedMovie: this.props.movie
  }

  cancelClicked = () => {
      this.props.cancelForm()
  }

  inputChanged = evt => {
    let movie = this.state.editedMovie;
    movie[evt.target.name] = evt.target.value;
    this.setState({editedMovie: movie})
  }

  saveClicked = () => {
    fetch(`${process.env.REACT_APP_API_URL}/api/movies/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${this.props.token}` 
        },
        body: JSON.stringify(this.state.editedMovie)
      }).then( resp => resp.json())
      .then( res => this.props.newMovie(res))
      .catch( err => console.log(err))
  }

  updateClicked = () => {
    fetch(`${process.env.REACT_APP_API_URL}/api/movies/${this.state.editedMovie.id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${this.props.token}` 
        },
        body: JSON.stringify(this.state.editedMovie)
      }).then( resp => resp.json())
      .then( res => this.props.editedMovie(res))
      .catch( err => console.log(err))

  }

  render(){
    const isDisabled = this.state.editedMovie.title.length === 0 || 
                        this.state.editedMovie.description.length;
    return (
      <React.Fragment>
          <span>Title</span><br/>
          <input type="text" value={this.props.movie.title} name="title" onChange={this.inputChanged}/><br/>
          <span>Description</span><br/>
          <textarea value={this.props.movie.description} name="description" onChange={this.inputChanged}/><br/>
          { this.props.movie.id ? (
              <button disabled={isDisabled} onClick={this.updateClicked}>update</button>
            ): (
            <button disabled={isDisabled} onClick={this.saveClicked}>save</button>
          )}
          &nbsp;
          <button onClick={this.cancelClicked}>cancel</button>
      </React.Fragment>
    );
  }
}

export default MovieForm;
