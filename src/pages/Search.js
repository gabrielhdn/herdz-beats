import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import AlbumList from '../components/AlbumList';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import { SiMusicbrainz } from 'react-icons/si';
import './Search.css';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      userInput: '',
      artistData: [],
      currentArtist: '',
      loading: false,
    };
  }

  handleChange = ({ target: { value } }) => {
    this.setState({ userInput: value });
  }

  handleClick = async () => {
    const { userInput } = this.state;
    this.setState({ loading: true, userInput: '', currentArtist: userInput },
      async () => {
        const result = await searchAlbumsAPI(userInput);
        this.setState({ artistData: result.length ? result : 0, loading: false });
      });
  }

  render() {
    const { userInput, loading, artistData, currentArtist } = this.state;
    const { history: { location: { pathname } } } = this.props;
    return (
      <div className="main-search-div">
        <Header pathname={pathname}/>
        {!loading
        ? (
          <div className="search-input-container">
            <section className="search-input">
              <input
                type="text"
                placeholder="artist or band"
                onChange={ this.handleChange }
                value={ userInput }
              />
              <button
                type="button"
                disabled={ userInput.length < 2 }
                onClick={ this.handleClick }
              >
                search
              </button>
            </section>
          </div>
          ) 
        : (
          <div className="search-icon-div">
            <SiMusicbrainz size={45} className="search-icon"/>
          </div>
          )}
        {artistData.length > 0 && (
          <div className="search-content">
            <p className="intro-phrase">
              album/single results for <span>{currentArtist}</span>
            </p>
            <div className="search-albums-div">
              {artistData.map((album) => (
                <Link
                  to={ `/album/${album.collectionId}` }
                  className="search-link"
                  key={ album.collectionId }
                >
                  <AlbumList album={ album } />
                </Link>
              ))}
            </div>
          </div>
        )}
        {artistData === 0 && <p className="error">we couldn't find anything from this artist! try another one :)</p>}
      </div>
    );
  }
}

export default Search;
