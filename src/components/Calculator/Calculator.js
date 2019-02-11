import React, { Component } from 'react';
import './Calculator.css';

class Calculator extends Component {
  state = {
    current: '',
    operation: '',
    history: '',
    result: 0,
    accumulator: 0
  };

  handleNumber = e => {
    const number = e.target.innerHTML;
    let { history, operation, current } = this.state;
    if (current === '0' && number === '0') return;
    if (operation === '=') {
      this.setState({
        history: number,
        current: number,
        accumulator: 0,
        operation: ''
      });
    } else {
      history = history + number;
      current = current + number;
      this.setState({ history, current });
    }
  };

  getOperationHistory(op) {
    const { operation, current, history } = this.state;
    return !operation || current
      ? history + op
      : history.slice(0, history.length - 1) + op;
  }

  handleOperation = e => {
    const op = e.target.innerHTML;
    let { history, operation, accumulator, current, result } = this.state;
    switch (operation) {
      case '+':
        accumulator = Number(accumulator) + Number(current);
        history = this.getOperationHistory(op);
        break;
      case '-':
        accumulator = accumulator - Number(current);
        history = this.getOperationHistory(op);
        break;
      case 'x':
        accumulator =
          accumulator && current
            ? accumulator * Number(current)
            : !current
            ? accumulator
            : Number(current);
        history = this.getOperationHistory(op);
        break;
      case '/':
        accumulator =
          accumulator && current
            ? accumulator / Number(current)
            : !current
            ? accumulator
            : Number(current);
        history = this.getOperationHistory(op);
        break;
      case '=':
        accumulator = result;
        history =
          accumulator || (op !== 'x' && op !== '/') ? history + op : history;
        break;
      default:
        accumulator = current || accumulator;
        history =
          accumulator || (op !== 'x' && op !== '/') ? history + op : history;
        break;
    }

    this.setState({
      accumulator,
      history,
      result: op,
      operation: op,
      current: ''
    });
  };

  handleDecimal = e => {
    let { current, history } = this.state;
    if (current.indexOf('.') !== -1) return;
    history = current && current.indexOf('.') === -1 ? history + '.' : history;
    current = current && current.indexOf('.') === -1 ? current + '.' : '0.';
    this.setState({ current, history });
  };

  handleResult = e => {
    let { current, accumulator, operation } = this.state;
    if (operation === '=' || !current) return;
    switch (operation) {
      case '+':
        current = Number(accumulator) + Number(current);
        break;
      case '-':
        current = accumulator - Number(current);
        break;
      case 'x':
        current = accumulator ? accumulator * Number(current) : Number(current);
        break;
      case '/':
        current = accumulator ? accumulator / Number(current) : Number(current);
        break;
      default:
        current = current || accumulator;
        break;
    }
    this.setState({
      result: current,
      current: '',
      operation: '='
    });
  };

  handleClear = e => {
    this.setState({
      current: '',
      history: '',
      operation: '',
      result: 0,
      accumulator: 0
    });
  };

  render() {
    const { history, current, result } = this.state;
    return (
      <div className="Calculator">
        <div class="display-container">
          <div>{history}</div>
          <div id="display">{current || result}</div>
        </div>
        <div className="buttons-container">
          <button id="clear" className="btn wide" onClick={this.handleClear}>
            C
          </button>
          <button id="divide" className="btn" onClick={this.handleOperation}>
            /
          </button>
          <button
            id="multiply"
            className="btn right"
            onClick={this.handleOperation}>
            x
          </button>
          <button id="seven" onClick={this.handleNumber}>
            7
          </button>
          <button id="eight" onClick={this.handleNumber}>
            8
          </button>
          <button id="nine" onClick={this.handleNumber}>
            9
          </button>
          <button
            id="subtract"
            className="right"
            onClick={this.handleOperation}>
            -
          </button>
          <button id="four" onClick={this.handleNumber}>
            4
          </button>
          <button id="five" onClick={this.handleNumber}>
            5
          </button>
          <button id="six" onClick={this.handleNumber}>
            6
          </button>
          <button id="add" className="right" onClick={this.handleOperation}>
            +
          </button>
          <button id="one" onClick={this.handleNumber}>
            1
          </button>
          <button id="two" onClick={this.handleNumber}>
            2
          </button>
          <button id="three" onClick={this.handleNumber}>
            3
          </button>
          <button
            id="equals"
            className="tall right"
            onClick={this.handleResult}>
            =
          </button>
          <button id="zero" className="wide" onClick={this.handleNumber}>
            0
          </button>
          <button id="decimal" onClick={this.handleDecimal}>
            .
          </button>
        </div>
      </div>
    );
  }
}

export default Calculator;
