import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from '../components/Loading';
import './Profile.css';

class Profile extends React.Component {
  constructor() {
    super();

    this.state = {
      userData: {},
      loading: false,
    };
  }

  componentDidMount() {
    this.setState({ loading: true }, async () => {
      const userData = await getUser();
      this.setState({ loading: false, userData });
    });
  }

  render() {
    const { loading, userData } = this.state;
    const { description, email, image, name } = userData;
    return (
      <div className="page-profile">
        <Header />
        <div className="page-profile-content">
          <div className="profile-card">
          {!loading
            ? (
              <div className="user-profile">
                <div className="user-img">
                  <img
                    className="profile-image"
                    src={ image ? image : 'https://ps.w.org/simple-user-avatar/assets/icon-256x256.png?rev=2413146' }
                    alt="User Img"
                  />
                </div>
                <div className="user-info">
                  <label htmlFor="user-name">
                    name
                    <p className="user-name">{name}</p>
                  </label>
                  <label htmlFor="user-email">
                    e-mail
                    <p className="user-email">{email}</p>
                  </label>
                  <label htmlFor="user-description" className="description-label">
                    description
                    <p className="user-description">{description}</p>
                  </label>
                  <Link to="/profile/edit" className="edit-link">edit your profile</Link>
                </div>
              </div>
            )
            : (
              <div className="profile-loading">
                <Loading />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
