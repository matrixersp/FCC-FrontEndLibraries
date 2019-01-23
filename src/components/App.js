import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import MarkdownPreviewer from './MarkdownPreviewer/MarkdownPreviewer';
import RandomQuote from './RandomQuote/RandomQuote';

import Sidebar from '../shared/Sidebar';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Sidebar />
          <Route path="/" exact component={RandomQuote} />
          <Route path="/markdown-previewer" component={MarkdownPreviewer} />
        </div>
      </Router>
    );
  }
}

export default App;
