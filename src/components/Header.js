import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import { SiMusicbrainz } from 'react-icons/si';
import PropTypes from 'prop-types';
import './Header.css';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      userInfo: '',
      hasAnswer: false,
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    this.setState({ hasAnswer: false }, async () => {
      const data = await getUser();
      this.setState({ userInfo: data, hasAnswer: true });
    });
  }

  render() {
    const { hasAnswer, userInfo } = this.state;
    const { name } = userInfo;
    return (
      <header className="header">
        <Link to="/" className="header-title-div">
          <span className="header-title">herdz</span>
          <SiMusicbrainz className="header-title-icon" size={34}/>
          <span className="header-beats">beats</span>
        </Link>
        <nav className="navigation">
          <Link to="/search" className="link">search</Link>
          <Link to="/favorites" className="link">favorites</Link>
          <Link to="/profile" className="link">profile</Link>
        </nav>
        <Link to="/profile" className="header-user">
          {hasAnswer ? <p>{name}</p> : <SiMusicbrainz size={35} className="header-user-icon"/>}
        </Link>
      </header>
    );
  }
}

Header.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Header;
