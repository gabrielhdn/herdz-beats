import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import './MusicCard.css';
import { TiHeart } from 'react-icons/ti';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      checkboxInput: false,
      loading: false,
    };
  }

  componentDidMount() {
    const { favSongs, trackId } = this.props;
    const isSongFavorited = favSongs.some((song) => song.trackId === trackId);
    if (isSongFavorited) this.setState({ checkboxInput: true });
  }

  handleChange = async ({ target: { checked } }) => {
    const { checkboxInput } = this.state;
    const { trackId, track, preview, renderSongs, updateList } = this.props;
    this.setState({ checkboxInput: checked });
    if (checkboxInput) {
      if (renderSongs) {
        updateList(trackId);
      }
      await removeSong({ trackName: track, trackId, preview });
    } else {
      await addSong({ trackName: track, trackId, preview });
    }
  }

  render() {
    const { trackId, track, preview } = this.props;
    const { checkboxInput } = this.state;
    return (
      <div className = "main-song-div">
        <div className="song-p-div">
          <p className="track-name">{track}</p>
        </div>
        <div className="audio-label-div">
          <audio className="audio-component" src={ preview } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            <code>audio</code>
            .
          </audio>
          <input
              type="checkbox"
              id={ trackId }
              checked={ checkboxInput }
              className="favorite-input"
              onChange={ this.handleChange }
          />
          <label htmlFor={ trackId }>
            <TiHeart size={25} className="favorite-icon" />
          </label>
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackId: PropTypes.number.isRequired,
  track: PropTypes.string.isRequired,
  preview: PropTypes.string.isRequired,
  favSongs: PropTypes.arrayOf(PropTypes.object).isRequired,
  renderSongs: PropTypes.bool.isRequired,
  updateList: PropTypes.func,
};

MusicCard.defaultProps = {
  updateList: () => {},
};

export default MusicCard;
