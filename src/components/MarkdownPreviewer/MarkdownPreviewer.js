import React, { Component } from 'react';
import marked from 'marked';
import dummyText from './dummyText.md';

import './MarkdownPreviewer.css';

import Editor from './Editor';
import Previewer from './Previewer';

class MarkdownPreviewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      isEditorMaximized: false,
      isPreviewerMaximized: false
    };
  }

  componentDidMount() {
    fetch(dummyText)
      .then(response => {
        return response.text();
      })
      .then(text => this.setState({ text }));
  }

  handleOnChange = e => {
    this.setState({ text: e.target.value });
  };

  getMarkdownText = () => {
    return {
      __html: marked(this.state.text, {
        sanitize: true,
        breaks: true,
        gfm: true
      })
    };
  };

  handleResizeEditor = e => {
    this.setState({ isEditorMaximized: !this.state.isEditorMaximized });
  };

  handleResizePreviewer = e => {
    this.setState({ isPreviewerMaximized: !this.state.isPreviewerMaximized });
  };

  render() {
    const { text, isEditorMaximized, isPreviewerMaximized } = this.state;
    return (
      <div className="MarkdownPreviewer">
        {!isPreviewerMaximized && (
          <Editor
            text={text}
            isEditorMaximized={isEditorMaximized}
            onChange={this.handleOnChange}
            resizeEditor={this.handleResizeEditor}
          />
        )}
        {!isEditorMaximized && (
          <Previewer
            getMarkdownText={this.getMarkdownText}
            resizePreviewer={this.handleResizePreviewer}
            isPreviewerMaximized={isPreviewerMaximized}
          />
        )}
      </div>
    );
  }
}

export default MarkdownPreviewer;
