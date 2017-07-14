import React from 'react';
import PropTypes from 'prop-types';

export default class ToolbarButton extends React.Component {
	render() {
		return (
			<button className={this.props.className} onClick={this.props.action}>{this.props.name}</button>
		);
	}
}

ToolbarButton.propTypes = {
	className: PropTypes.string,
	action: PropTypes.func.isRequired,
	name: PropTypes.string.isRequired
}