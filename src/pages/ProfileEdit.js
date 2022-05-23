import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import { SiMusicbrainz } from 'react-icons/si';
import Loading from '../components/Loading';
import './ProfileEdit.css';

class ProfileEdit extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      description: '',
      email: '',
      image: '',
      name: '',
      redirect: false,
    };
  }

  componentDidMount() {
    this.setState({ loading: true }, async () => {
      const userData = await getUser();
      const { description, email, image, name } = userData;
      this.setState({
        description,
        email,
        image,
        name,
        loading: false });
    });
  }

  handleClick = async () => {
    const { name, email, image, description } = this.state;
    this.setState({ loading: true }, async () => {
      await updateUser({
        name,
        email,
        image,
        description,
      });
      this.setState({ loading: false, redirect: true });
    });
  }

  handleDisable = () => {
    const { description, email, image, name } = this.state;
    const isEmailValid = email.includes('@');
    const arr = [description, email, image, name];
    const disableCondition = arr.every((input) => input.length > 0);
    const combination = disableCondition && isEmailValid;
    return !combination;
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState(() => ({ [name]: value }), this.handleDisable);
  }

  render() {
    const { loading, description, email, image, name,
      redirect } = this.state;
    return (
      <div className="page-profile-edit">
        <Header />
        <div className="profile-edit-content">
        {redirect && <Redirect to="/profile" />}
        {loading
          && (
            <div className="profile-edit-loading">
              <Loading />
            </div>
          )}
        {!loading
          && (
            <form className="form-edit">
              <SiMusicbrainz size={50} className="form-icon"/>
              <div className="user-data-edit">
                <label htmlFor="name">name
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={ name }
                    onChange={ this.handleChange }
                  />
                </label>
                <label htmlFor="email">e-mail
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={ email }
                    onChange={ this.handleChange }
                  />
                </label>
                <label htmlFor="description">description
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    value={ description }
                    onChange={ this.handleChange }
                  />
                </label>
                <label htmlFor="picture">image
                  <input
                    id="picture"
                    type="text"
                    placeholder="picture url"
                    name="image"
                    value={ image }
                    onChange={ this.handleChange }
                  />
                </label>
              </div>
              <button
                type="button"
                className="save-button"
                disabled={ this.handleDisable() }
                onClick={ this.handleClick }
              >
                SAVE
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }
}

export default ProfileEdit;
