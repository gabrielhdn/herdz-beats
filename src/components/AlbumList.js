import React from 'react';
import PropTypes from 'prop-types';
import './AlbumList.css';

class AlbumList extends React.Component {
  render() {
    const { album } = this.props;
    const { artistName, collectionName, artworkUrl100 } = album;
    return (
      <div className="albums-list">
        <div className="artwork-div">
          <img src={ artworkUrl100 } alt={ collectionName } />
        </div>
        <div className="album-name-div">
          <p className="album-name">{collectionName}</p>
        </div>
        <div className="artist-name-div">
          <p className="artist-name">{artistName}</p>
        </div>
      </div>
    );
  }
}

AlbumList.propTypes = {
  album: PropTypes.shape({
    artistName: PropTypes.string.isRequired,
    collectionName: PropTypes.string.isRequired,
    artworkUrl100: PropTypes.string.isRequired,
  }).isRequired,
};

export default AlbumList;
