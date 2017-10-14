import React from 'react';

import Index from '@/pages/index.jsx';
import Login from '@/pages/login.jsx';
import Online from '@/pages/online.jsx';
import History from '@/pages/history.jsx';

import Test from '@/pages/test.jsx';

import { Route, Switch } from 'react-router-dom';

class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			count: 1
		};
	}
	render() {
		return (
			<Switch>
				<Route exact path="/" component={Index}/>
				<Route path="/login" component={Login}/>
				<Route path="/online" component={Online}/>
				<Route path="/history/:id" component={History}/>
				<Route path="/test" component={Test}/>
			</Switch>
		);
	}
}

export default Main;
