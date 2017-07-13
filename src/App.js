import React from 'react';
import { EditorState, RichUtils } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createUndoPlugin from 'draft-js-undo-plugin';
import './App.css';

const undoPlugin = createUndoPlugin();
const { UndoButton, RedoButton } = undoPlugin;

export default class App extends React.Component {
  constructor() {
    super();

    this.state = { editorState: EditorState.createEmpty() };
    
    this._onChange = this._onChange.bind(this);
    this._handleKeyCommand = this._handleKeyCommand.bind(this);
    this._bold = this._bold.bind(this);
    this._italic = this._italic.bind(this);
    this._underline = this._underline.bind(this);
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
        />
        <Editor
          ref={ element => this.editor = element }
          editorState={this.state.editorState}
          onChange={this._onChange}
          plugins={[undoPlugin]}
          handleKeyCommand={this._handleKeyCommand}
        />
      </div>
    );
  }
}

const Toolbar = (props) => {
  return (
    <nav className="toolbar">
      <ToolbarButton
        className="bold"
        action={props.context._bold}
        name="B"
      />
      <ToolbarButton
        className="italic"
        action={props.context._italic}
        name="I"
      />
      <ToolbarButton
        className="underline"
        action={props.context._underline}
        name="U"
      />
      <UndoButton/>
      <RedoButton/>
    </nav>
  );
}

const ToolbarButton = (props) => {
  return <button className={props.className} onClick={props.action}>{props.name}</button>
}