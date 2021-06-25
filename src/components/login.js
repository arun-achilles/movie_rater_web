import React, {Component} from 'react';
import { withCookies } from 'react-cookie';
import { GoogleLogin } from 'react-google-login';


class Login extends Component {
    state = {
        credentials: {
            username: '',
            password: ''
        },
        isLoginView: true,
        token: this.props.cookies.get('mr-token')
    }
  
    componentDidMount(){
      if (this.state.token) {
        window.location.href = '/movies';
      }
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
                  if (res.hasOwnProperty('token')){
                    this.props.cookies.set('mr-token', res.token)
                    window.location.href = '/movies'
                  } else {
                    alert(JSON.stringify(res))
                  }
              })
              .catch( err => console.log(err))    

        } else {
            fetch(`${process.env.REACT_APP_API_URL}/api/users/`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state.credentials)
              }).then( resp => resp.json())
              .then( res => {
                if (res.hasOwnProperty('token')){
                    this.props.cookies.set('mr-token', res.token)
                    window.location.href = '/movies'
                } else {
                    alert(JSON.stringify(res))
                }                  
              })
              .catch( err => console.log(err))        
        }
    }

    toggleView = () => {
        this.setState({isLoginView: !this.state.isLoginView })
    }

    render () {
      const responseGoogle = (response) => {
        fetch(`${process.env.REACT_APP_API_URL}/rest-auth/google/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({access_token: response.tokenObj.access_token})
        }).then( resp => resp.json())
        .then( res => {
            if (res.hasOwnProperty('key')){
              this.props.cookies.set('mr-token', res.key)
              window.location.href = '/movies'
            } else {
              alert(JSON.stringify(res))
            }
        })
        .catch( err => console.log(err))           
        
      }        
  
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
                <GoogleLogin
                  clientId="416898136690-lded9q8bqb53qqgmi6so9pqiogu73oqd.apps.googleusercontent.com"
                  buttonText="Login"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={'single_host_origin'}
                />

            </div>
        )
    }
}

export default withCookies(Login);