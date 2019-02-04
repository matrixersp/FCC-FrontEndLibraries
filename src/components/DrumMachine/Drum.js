import React from 'react';

const Drum = props => {
  const { drum, bank, click, keyDown } = props;
  return (
    <div
      id={drum.drumPad[bank].name}
      className="drum-pad"
      onClick={e => click(drum.key)}
      onKeyDown={keyDown}>
      <span>{drum.key}</span>
      <audio id={drum.key} src={drum.drumPad[bank].link} className="clip" />
    </div>
  );
};

export default Drum;
