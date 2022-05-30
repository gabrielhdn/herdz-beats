import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import { SiMusicbrainz } from 'react-icons/si';
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
        <div className="header-title-div">
          <span className="header-title">herdz</span>
          <SiMusicbrainz className="header-title-icon" size={34}/>
          <span className="header-beats">beats</span>
        </div>
        <nav className="navigation">
          <Link to="/search" className="link">search</Link>
          <Link to="/favorites" className="link">favorites</Link>
          <Link to="/profile" className="link">profile</Link>
        </nav>
        <div className="header-user">
          {hasAnswer ? <p>{name}</p> : <SiMusicbrainz size={35} className="header-user-icon"/>}
        </div>
      </header>
    );
  }
}

export default Header;
