import React, { Component } from 'react';
import {
  FiPlay,
  FiPause,
  FiRefreshCw,
  FiArrowUpCircle,
  FiArrowDownCircle
} from 'react-icons/fi';

import './PomodoroClock.css';

class PomodoroClock extends Component {
  state = {
    breakLength: 5,
    sessionLength: 25,
    timeLeft: 1500,
    isSession: true,
    timerID: null
  };

  handleStartStop = () => {
    if (this.state.timerID) this.clearTimer();
    else this.setTimer();
  };

  handleReset = () => {
    this.clearTimer();
    this.stopBeep();
    document.getElementById('timer').style.color = '#444';
    this.setState({
      breakLength: 5,
      sessionLength: 25,
      timeLeft: 1500,
      isSession: true
    });
  };

  setTimer() {
    const timerID = setInterval(() => {
      let { timeLeft, breakLength, sessionLength, isSession } = this.state;
      if (timeLeft > 60) {
        timeLeft--;
      } else if (timeLeft > 1 && timeLeft <= 60) {
        document.getElementById('timer').style.color = '#e74c3c';
        timeLeft--;
      } else if (timeLeft === 1) {
        this.playBeep();
        timeLeft--;
      } else {
        if (isSession) {
          timeLeft = breakLength * 60;
          isSession = false;
        } else {
          timeLeft = sessionLength * 60;
          isSession = true;
        }
        document.getElementById('timer').style.color = '#444';
      }
      this.setState({ timeLeft, isSession });
    }, 1000);

    this.setState({ timerID });
  }

  playBeep() {
    const beep = document.getElementById('beep');
    beep.play();
  }

  stopBeep() {
    const beep = document.getElementById('beep');
    beep.pause();
    beep.currentTime = 0;
  }

  clearTimer() {
    clearInterval(this.state.timerID);
    this.setState({ timerID: null });
  }

  displayTimer(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`;
  }

  handleBreakIncrement = () => {
    let { breakLength, isSession } = this.state;
    if (breakLength >= 60 || this.state.timerID) return;
    if (breakLength === 1)
      document.getElementById('timer').style.color = '#444';
    breakLength++;
    this.setState({ breakLength });
    if (!isSession) this.setState({ timeLeft: breakLength * 60 });
  };

  handleBreakDecrement = () => {
    let { breakLength, isSession } = this.state;
    if (breakLength <= 1 || this.state.timerID) return;
    breakLength--;
    this.setState({ breakLength });
    if (!isSession) this.setState({ timeLeft: breakLength * 60 });
  };

  handleSessionIncrement = () => {
    let { sessionLength, isSession } = this.state;
    if (sessionLength >= 60 || this.state.timerID) return;
    if (sessionLength === 1)
      document.getElementById('timer').style.color = '#444';
    sessionLength++;
    this.setState({ sessionLength });
    if (isSession) this.setState({ timeLeft: sessionLength * 60 });
  };

  handleSessionDecrement = () => {
    let { sessionLength, isSession } = this.state;
    if (sessionLength <= 1 || this.state.timerID) return;
    sessionLength--;
    this.setState({ sessionLength });
    if (isSession) this.setState({ timeLeft: sessionLength * 60 });
  };

  render() {
    return (
      <div className="PomodoroClock">
        <div className="duration-controls">
          <div id="break-label" className="label">
            Break Label
          </div>
          <button id="break-decrement" onClick={this.handleBreakDecrement}>
            <FiArrowDownCircle />
          </button>
          <div id="break-length" className="duration">
            {this.state.breakLength}
          </div>
          <button id="break-increment" onClick={this.handleBreakIncrement}>
            <FiArrowUpCircle />
          </button>
        </div>
        <div className="duration-controls">
          <div id="session-label" className="label">
            Session Label
          </div>
          <button id="session-decrement" onClick={this.handleSessionDecrement}>
            <FiArrowDownCircle />
          </button>
          <div id="session-length" className="duration">
            {this.state.sessionLength}
          </div>
          <button id="session-increment" onClick={this.handleSessionIncrement}>
            <FiArrowUpCircle />
          </button>
        </div>
        <div id="timer" className="timer-wrapper">
          <div id="timer-label">
            {this.state.isSession ? 'Session' : 'Break'}
          </div>
          <div id="time-left">{this.displayTimer(this.state.timeLeft)}</div>
        </div>
        <div className="timer-controls">
          <button id="start_stop" onClick={this.handleStartStop}>
            {this.state.timerID ? <FiPause /> : <FiPlay />}
          </button>
          <button id="reset" onClick={this.handleReset}>
            <FiRefreshCw />
          </button>
        </div>
        <audio
          id="beep"
          src="https://freesound.org/data/previews/246/246332_4486188-lq.mp3"
        />
      </div>
    );
  }
}

export default PomodoroClock;
