import React from 'react';

class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			message: 'Hello!',
			like: false,
			input: 'default'
		};
		// This line is important! 如果handleClick是函数表达式
		// this.handleClick = this.handleClick.bind(this);
	}
	handleClick = () => {
		// alert(this.state.message);
		this.setState({ liked: !this.state.liked });
	}
	handleChange = (e) => {
		this.setState({ input: e.target.value });
	}
	render() {
		if (!this.props.style) {
			return null;
		}
		let text = this.state.liked ? 'like' : 'haven\'t liked';
		return (
			<div className={this.props.style} onClick={this.handleClick}>
				<div className="menu">
					<ul>
						<li>You {text} this. Click to toggle &middot;.</li>
						<li><input value={this.state.input} onChange={this.handleChange} /></li>
						<li><input value={this.state.input} onChange={this.handleChange} /></li>
						<li>dddddd</li>
						<li>dddddd</li>
					</ul>
				</div>
			</div>
		);
	}
}

Header.propTypes = {
	style: React.PropTypes.string
};

Header.defaultProps = {
	style: 'header'
};

export default Header;
