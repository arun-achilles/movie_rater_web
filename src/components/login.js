import React, {Component} from 'react';
import { withCookies } from 'react-cookie';

class Login extends Component {
    state = {
        credentials: {
            username: '',
            password: ''
        },
        isLoginView: true
    }

    inputChanged = evt => {
        let credentials = this.state.credentials;
        credentials[evt.target.name] = evt.target.value;
        this.setState({credentials: credentials})
    }

    login = () => {
        if (this.state.isLoginView){
            fetch(`${process.env.REACT_APP_API_URL}/auth/`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state.credentials)
              }).then( resp => resp.json())
              .then( res => {
                  console.log(res.token)
                  this.props.cookies.set('mr-token', res.token)
                  window.location.href = '/movies'
              })
              .catch( err => console.log(err))    

        } else {
            fetch(`${process.env.REACT_APP_API_URL}/api/users`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state.credentials)
              }).then( resp => resp.json())
              .then( res => {
                  console.log(res.token)
                  this.props.cookies.set('mr-token', res.token)
                  window.location.href = '/movies'
              })
              .catch( err => console.log(err))        
        }
    }

    toggleView = () => {
        this.setState({isLoginView: !this.state.isLoginView })
    }

    render () {
        return (
            <div className="login-container">
                <h1>
                    {this.state.isLoginView ? 'Login' : 'Register'}
                </h1>
                <span>username</span><br/>
                <input type="text" name="username" value={this.state.credentials.username} onChange={this.inputChanged} />
                <span>password</span><br/>
                <input type="password" name="password" value={this.state.credentials.password} onChange={this.inputChanged} />
                <button onClick={this.login}>{this.state.isLoginView ? 'Login' : 'Register'}</button>
                <p onClick={this.toggleView}>{this.state.isLoginView ? 'Create an Account?' : 'Already have an account?'}</p>
            </div>
        )
    }
}

export default withCookies(Login);