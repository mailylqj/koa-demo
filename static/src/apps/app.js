import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Herder from '@/include/header.jsx';
import Main from '@/include/main.jsx';
import Aside from '@/include/aside.jsx';
import { BrowserRouter } from 'react-router-dom';
import { Cookies } from '@/component/utils';
import { ToastContainer } from 'react-toastify';

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
					<ToastContainer />
				</div>
			</BrowserRouter>
		);
	}
}

App.propTypes = {
	style: PropTypes.string
};

App.defaultProps = {
	style: 'wapper'
};

ReactDOM.render(<App />, 
	document.getElementById('container'));
