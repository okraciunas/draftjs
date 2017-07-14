import React from 'react';
import ToolbarButton from './ToolbarButton';

export default class Toolbar extends React.Component {
  render() {
    const { UndoButton, RedoButton } = this.props.plugin;

    return (
      <nav className="toolbar">
        <ToolbarButton
          className="bold"
          action={this.props.context.bold}
          name="B"
        />
        <ToolbarButton
          className="italic"
          action={this.props.context.italic}
          name="I"
        />
        <ToolbarButton
          className="underline"
          action={this.props.context.underline}
          name="U"
        />
        <UndoButton/>
        <RedoButton/>
      </nav>
    )
  }
}