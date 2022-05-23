import React from 'react';
import { SiMusicbrainz } from 'react-icons/si';
import './Loading.css';

class Loading extends React.Component {
  render() {
    return (
      <div className="main-loading-div">
        <div className="loading-div">
          <SiMusicbrainz size={80} className="loading-icon"/>
        </div>
      </div>
    );
  }
}

export default Loading;
