import React, { Component } from 'react';
import './DrumMachine.css';
import drums from './drums.json';
import Drum from './Drum';
import Controls from './Controls';

class DrumMachine extends Component {
  state = {
    displayText: '',
    bank: 0,
    volume: 50
  };

  componentWillMount() {
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown.bind(this));
  }

  handleOnClick = key => {
    const drum = drums.find(drum => drum.key === key);
    if (drum) this.playAudio(key, drum);
  };

  handleKeyDown = e => {
    const key = e.key.toUpperCase();
    const drum = drums.find(drum => drum.key === key);
    if (drum) {
      const button = document.getElementById(key).parentNode;
      const keyframes = [{ opacity: 1 }, { opacity: 1 }];
      button.animate(keyframes, { duration: 300 });
      this.playAudio(key, drum);
    }
  };

  playAudio = (key, drum) => {
    const bank = this.state.bank;
    this.setState({ displayText: drum.drumPad[bank].name });
    document.getElementById(key).play();
  };

  handleToggle = () => {
    if (this.state.bank === 1) {
      this.setState({ bank: 0, displayText: 'Heater Kit' });
    } else {
      this.setState({ bank: 1, displayText: 'Smooth Piano Kit' });
    }
  };

  handleVolume = e => {
    const volume = e.target.value;
    this.setState({ volume, displayText: `Volume: ${volume}` });
    const clips = document.querySelectorAll('.clip');
    clips.forEach(clip => (clip.volume = volume / 100));
  };

  render() {
    const bank = this.state.bank;
    return (
      <div id="drum-machine" className="DrumMachine">
        <div className="drum-container">
          {drums.map((drum, index) => (
            <Drum
              key={index}
              drum={drum}
              bank={bank}
              click={this.handleOnClick}
              keyDown={this.handleKeyDown}
            />
          ))}
        </div>
        <Controls
          displayText={this.state.displayText}
          volume={this.state.volume}
          handleToggle={this.handleToggle}
          handleVolume={this.handleVolume}
        />
      </div>
    );
  }
}

export default DrumMachine;
