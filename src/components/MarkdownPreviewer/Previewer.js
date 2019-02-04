import React from 'react';
import { FiMinimize2, FiMaximize2 } from 'react-icons/fi';

export default props => (
  <div className="container">
    <div className="header" name="previewer">
      <h1 className="title">Previewer</h1>
      {props.isPreviewerMaximized ? (
        <FiMinimize2 className="resize" onClick={props.resizePreviewer} />
      ) : (
        <FiMaximize2 className="resize" onClick={props.resizePreviewer} />
      )}
    </div>
    <div
      className="previewer"
      id="preview"
      dangerouslySetInnerHTML={props.getMarkdownText()}
    />
  </div>
);
