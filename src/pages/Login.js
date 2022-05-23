import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';
import { SiMusicbrainz } from 'react-icons/si';
import './Login.css';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      userInput: '',
      loading: false,
      redirect: false,
    };
  }

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({
      userInput: value,
    });
  }

  callCreateUser = async () => {
    const { userInput } = this.state;
    this.setState({ loading: true }, async () => {
      await createUser({ name: userInput });
      this.setState({ loading: false, redirect: true });
    });
  }

  render() {
    const { userInput, loading, redirect } = this.state;
    const minNumber = 3;
    return (
      <div className="main-div">
        {loading ? <Loading /> : (
          <section className="card">
            <div className="title-div">
              <span className="title">herdz</span>
              <SiMusicbrainz className="title-icon" size={40}/>
              <span className="beats">beats</span>
            </div>
            <div className="form">
              <div className="input-div">
                <input
                  type="text"
                  className="user-input"
                  data-testid="login-name-input"
                  placeholder="your name"
                  name="userInput"
                  onChange={ this.handleChange }
                  value={ userInput }
                />
                <div className="underline"></div>
              </div>
              <button
                type="button"
                className="login-button"
                disabled={ userInput.length < minNumber }
                onClick={ this.callCreateUser }
              >
                LOGIN
              </button>
            </div>
          </section>
        )}
        {redirect && <Redirect to="/search" />}
      </div>
    );
  }
}

export default Login;
