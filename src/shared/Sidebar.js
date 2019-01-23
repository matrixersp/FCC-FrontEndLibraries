import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Sidebar.css';
import { MdClose, MdMenu } from 'react-icons/md';

class Sidebar extends Component {
  state = {
    isClosed: true
  };

  handleToggle = () => {
    this.setState({ isClosed: !this.state.isClosed });
  };

  render() {
    const isClosed = this.state.isClosed;
    return (
      <div className="Sidebar">
        <div className="toggle" onClick={this.handleToggle}>
          {isClosed ? (
            <MdMenu className="menu" />
          ) : (
            <MdClose className="close" />
          )}
        </div>
        <nav className={'projects ' + (isClosed && 'hidden')}>
          <h3 className="title">FreeCodeCamp Projects</h3>
          <ul>
            <li>
              <Link to="/">Random Quote Machine</Link>
            </li>
            <li>
              <Link to="/markdown-previewer">Markdown Previewer</Link>
            </li>
            <li>
              <Link to="/drum-machine">Drum Machine</Link>
            </li>
            <li>
              <Link to="/calculator">Calculator</Link>
            </li>
            <li>
              <Link to="/pomodoro-clock">Pomodoro Clock</Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Sidebar;
