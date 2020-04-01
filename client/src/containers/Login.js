import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import HeaderBar from '../components/HeaderBar';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

const registerButton = {
  background: 'green',
  padding: '1em',
  margin: '1em',
};

const linkStyle = {
  textDecoration: 'none',
  color: 'white',
};

const homeButton = {
  background: 'mediumpurple',
  padding: '1em',
  margin: '1em',
};

const loginButton = {
  background: 'royalblue',
  padding: '1em',
  margin: '1em',
};

const inputStyle = {
  margin: '.5em',
};

const title = {
  pageTitle: 'Login Screen',
};

class Login extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
      loggedIn: false,
      showError: false,
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  loginUser = e => {

    e.preventDefault();

    let loginErrMsg;
    if (!this.state.username) {
      loginErrMsg = "username is required. ";
    }
    if (!this.state.password) {
      loginErrMsg+= "password is required. ";
    }

    if (loginErrMsg) {

      this.setState({
        loginErrorMsg:loginErrMsg,
        showError: true
      });

    } else {

      console.log("calling :3003/loginUser");

      axios
        .post('http://localhost:3003/loginUser', {
          params: {
            username: this.state.username,
            password: this.state.password,
          },
        })
        .then(response => {
          console.log("response.data", response.data);
          if (response.status !== 200) {
            this.setState({
              showError: true,
              loginErrorMsg: response.data.message
            });
          } else {
            localStorage.setItem('jwtToken', response.data.token);
            this.setState({
              loggedIn: true,
              showError: false,
            });
          }
        })
        .catch(error => {
          console.log("response from loginUser  ", error.response.data.message);
          this.setState({
            showError: true,
            loginErrorMsg: error.response.data.message
          });
        });
    }
  };

  render() {
    const { username, password, showError, loggedIn, loginErrorMsg } = this.state;
    if (!loggedIn) {
      return (
        <div>
          <HeaderBar title={title} />
          <form className="profile-form" onSubmit={this.loginUser}>
            <TextField
              style={inputStyle}
              id="username"
              label="username"
              value={username}
              onChange={this.handleChange('username')}
              placeholder="Username"
            />
            <TextField
              style={inputStyle}
              id="password"
              label="password"
              value={password}
              onChange={this.handleChange('password')}
              placeholder="Password"
              type="password"
            />
            <Button
              style={loginButton}
              type="submit"
              variant="contained"
              color="primary"
            >
              Login
            </Button>
          </form>
          {showError && (
            <div>
              <p>
                {loginErrorMsg}
              </p>
              <Button
                style={registerButton}
                variant="contained"
                color="primary"
              >
                <Link style={linkStyle} to="/register">
                  Go Register
                </Link>
              </Button>
            </div>
          )}
          <Button style={homeButton} variant="contained" color="primary">
            <Link style={linkStyle} to="/">
              Go Home
            </Link>
          </Button>
        </div>
      );
    } else {
      return <Redirect to={`/userProfile/${username}`} />;
    }
  }
}

export default Login;