import React from 'react';
import ReactDOM from 'react-dom';
import Herder from '@/include/header.jsx';
import Main from '@/include/main.jsx';
import Aside from '@/include/aside.jsx';
import { BrowserRouter } from 'react-router-dom';
import { Cookies } from '@/component/utils';

class App extends React.Component {
	render() {
		if (!this.props.style) {
			return null;
		}
		return (
			<BrowserRouter>
				<div className={this.props.style}>
					<section id="login-view">
						<Herder />
						<Aside />
					</section>
					<main><Main /></main>
					<footer></footer>
				</div>
			</BrowserRouter>
		);
	}
}

App.propTypes = {
	style: React.PropTypes.string
};

App.defaultProps = {
	style: 'wapper'
};

ReactDOM.render(<App />, 
	document.getElementById('container'));
