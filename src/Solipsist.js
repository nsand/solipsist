import React, { PropTypes, PureComponent } from 'react';

const propTypes = {
	children: PropTypes.node,
	onClick: PropTypes.func.isRequired,
};

class Solipsist extends PureComponent {
	componentDidMount() {
		document.addEventListener('click', this.handleClick, false);
	}
	componentWillUnmount() {
		document.removeEventListener('click', this.handleClick);
	}
	handleClick = (evt) => {
		if (!this.container.contains(evt.target)) {
			this.props.onClick(evt);
		}
	}
	ref = (el) => {
		this.container = el;
	}
	render() {
		return <div ref={this.ref}>{this.props.children}</div>;
	}
}

Solipsist.propTypes = propTypes;

export default Solipsist;
