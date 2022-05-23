import React from 'react';
import errorImg from '../images/error404.png';
import './NotFound.css';

class NotFound extends React.Component {
  render() {
    return (
      <div className="page-not-found">
        <div>
          <a href="https://lovepik.com/images/png-404.html" target="_blank" rel="noreferrer">
            <img src={errorImg} alt="Page not found" width={450}/>
          </a>
        </div>
      </div>
    );
  }
}

export default NotFound;
