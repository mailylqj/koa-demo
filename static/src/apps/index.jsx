import React from 'react';
import Herder from './../component/header.jsx';
// import Main from './../component/main.jsx';
// import Footer from './../component/footer.jsx';

class App extends React.Component {
	render() {
		if (!this.props.style) {
			return null;
		}
		return (
			<div className={this.props.style}>
				<Herder />
			</div>
		);
	}
}

App.propTypes = {
	style: React.PropTypes.string
};

App.defaultProps = {
	style: 'wapper'
};

export default App;
