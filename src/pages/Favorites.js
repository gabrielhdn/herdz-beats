import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import './Favorites.css';

class Favorites extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      favSongs: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true }, async () => {
      const result = await getFavoriteSongs();
      this.setState({ loading: false, favSongs: result });
    });
  }

  updateList = (id) => {
    const { favSongs } = this.state;
    const arr = favSongs.filter((song) => song.trackId !== id);
    this.setState({ favSongs: arr });
  }

  render() {
    const { loading, favSongs } = this.state;
    return (
      <div className="page-favorites">
        <Header />
        <div className="favorites-main">
        <div className="favorites-content">
        {!loading
          ? (
            favSongs.map((song) => (
              <MusicCard
                trackId={ Number(song.trackId) }
                track={ song.trackName }
                preview={ song.preview }
                key={ song.trackId }
                favSongs={ favSongs }
                renderSongs
                updateList={ this.updateList }
              />))
          )
          : (
            <div className="favorites-loading">
              <Loading />
            </div>
          )}
        </div>
        </div>
      </div>
    );
  }
}

export default Favorites;
