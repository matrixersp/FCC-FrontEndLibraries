import React from 'react';
import { FiMinimize2, FiMaximize2 } from 'react-icons/fi';

export default props => (
  <div className="container">
    <div className="header">
      <h1 className="title">Editor</h1>
      {props.isEditorMaximized ? (
        <FiMinimize2 className="resize" onClick={props.resizeEditor} />
      ) : (
        <FiMaximize2 className="resize" onClick={props.resizeEditor} />
      )}
    </div>
    <textarea
      className="editor"
      id="editor"
      onChange={props.onChange}
      value={props.text}
    />
  </div>
);
