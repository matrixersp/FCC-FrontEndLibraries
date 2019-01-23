import React, { Component } from 'react';
import './RandomQuote.css';
import { FaTwitter, FaTumblr } from 'react-icons/fa';

class RandomQuote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: '',
      author: '',
      loading: true
    };
  }
  componentDidMount() {
    this.requestNewQuote();
  }

  requestNewQuote = () => {
    this.setState({ loading: true });
    fetch('https://floating-atoll-17650.herokuapp.com/random')
      .then(res => res.json())
      .then(this.displayQuote)
      .catch(this.handleError);
  };

  displayQuote = ({ quote, author }) => {
    this.setState({ quote, author, loading: false });
  };

  handleError = error => {
    console.error('Error:', error);
  };

  render() {
    const { quote, author, loading } = this.state;
    return (
      <React.Fragment>
        <div id="quote-box" className="RandomQuote">
          {!loading ? (
            <div id="quote-content">
              <div className="btn-group">
                <div className="social">
                  <a
                    id="tweet-quote"
                    className="btn"
                    href={
                      'https://twitter.com/intent/tweet?text=' +
                      quote +
                      '%0A' +
                      author
                    }>
                    <FaTwitter />
                  </a>
                  <a
                    id="tumblr-quote"
                    className="btn"
                    href="https://www.tumblr.com/share?data-content="
                    data-content={+quote + '%0A' + author}>
                    <FaTumblr />
                  </a>
                </div>
                <a
                  id="new-quote"
                  className="btn"
                  onClick={this.requestNewQuote}>
                  New Quote
                </a>
              </div>
              <div className="quote">
                <div className="opening-quote" />
                <p id="text">{quote}</p>
              </div>
              <p id="author">&ndash; {author}</p>
            </div>
          ) : (
            <div className="loader">
              <div className="line first-line" />
              <div className="line second-line" />
              <div className="line third-line" />
            </div>
          )}
        </div>
        <p className="creator">
          By&nbsp;
          <a
            href="https://github.com/matrixersp"
            target="_blank"
            rel="noopener noreferrer">
            M. Boudad
          </a>
        </p>
      </React.Fragment>
    );
  }
}

export default RandomQuote;
