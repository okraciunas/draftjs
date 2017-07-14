import React from 'react';
import { EditorState, RichUtils } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createUndoPlugin from 'draft-js-undo-plugin';
import Toolbar from './Toolbar';

const undoPlugin = createUndoPlugin();

export default class DraftEditor extends React.Component {
  constructor() {
    super();

    this.state = { editorState: EditorState.createEmpty() };
    
    this.onChange = this._onChange.bind(this);
    this.handleKeyCommand = this._handleKeyCommand.bind(this);
    this.bold = this._bold.bind(this);
    this.italic = this._italic.bind(this);
    this.underline = this._underline.bind(this);
  }

  _onChange(editorState) {
    this.setState({ editorState });
  }

  _handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(
      this.state.editorState,
      command
    );

    if(newState) {
      this.onChange(newState);
      return 'handled';
    }

    return 'not-handled';
  }

  _bold() {
    this._onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  }

  _italic() {
    this._onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'));
  }

  _underline() {
    this._onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));
  }

  render() {
    return (
      <div className="container">
         <Toolbar
          context={this}
          plugin={undoPlugin}
        />
        <Editor
          editorState={this.state.editorState}
          plugins={[undoPlugin]}
          onChange={this.onChange}
          handleKeyCommand={this.handleKeyCommand}
          blockRendererFn={this._blockRenderer}
        />
      </div>
    );
  }
}