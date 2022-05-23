import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';
import './Album.css';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      songData: [],
      loading: false,
      favSongs: [],
    };
  }

  componentDidMount() {
    this.getData();
    this.getFavSongs();
  }

  getReleaseDate = () => {
    const { songData } = this.state;
    if (songData.length) {
      const { releaseDate } = songData[0];
      return releaseDate.split('-')[0];
    }
  }

  getData = async () => {
    const { match: { params: { id } } } = this.props;
    const result = await getMusics(id);
    this.setState({ songData: result });
  }

  getFavSongs = () => {
    this.setState({ loading: true }, async () => {
      const result = await getFavoriteSongs();
      this.setState({ loading: false, favSongs: result });
    });
  }

  render() {
    const { songData, loading, favSongs } = this.state;
    return (
      <div className="page-album">
        <Header />
        {Boolean(songData.length)
        && (
          <div className="album-content">
            <div className="album-info">
              <div className="album-artwork-div">
                <img src={ songData[0].artworkUrl100 } alt={ songData[0].collectionName } />
              </div>
              <div className="album-p-div">
                <p>{ songData[0].collectionName }</p>
              </div>
              <p className="album-artist-name">{ songData[0].artistName }</p>
              <p>release year: { this.getReleaseDate() }</p>
              <p>tracks: { songData[0].trackCount }</p>
            </div>
            {!loading
              ? (
                <div className="album-songs-list">
                  {songData.map(({ trackId, trackName, previewUrl }, index) => {
                    if (index === 0) return;
                    return (<MusicCard
                      trackId={ trackId }
                      track={ trackName }
                      preview={ previewUrl }
                      favSongs={ favSongs }
                      key={ previewUrl }
                      renderSongs={ false }
                    />);
                  })}
                </div>
              )
              : (
                <div className="loading-element-div">
                  <Loading />
                </div>
              )}
          </div>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
