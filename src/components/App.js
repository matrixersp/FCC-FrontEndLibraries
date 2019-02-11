import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import RandomQuote from './RandomQuote/RandomQuote';
import MarkdownPreviewer from './MarkdownPreviewer/MarkdownPreviewer';
import DrumMachine from './DrumMachine/DrumMachine';
import Calculator from './Calculator/Calculator';

import Sidebar from '../shared/Sidebar';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Sidebar />
          <Route path="/" exact component={RandomQuote} />
          <Route path="/markdown-previewer" component={MarkdownPreviewer} />
          <Route path="/drum-machine" component={DrumMachine} />
          <Route path="/calculator" component={Calculator} />
        </div>
      </Router>
    );
  }
}

export default App;
