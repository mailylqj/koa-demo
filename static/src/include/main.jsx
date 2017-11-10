import React from 'react';

import Index from '@/pages/index.jsx';
import Login from '@/pages/login.jsx';
import Device from '@/pages/device.jsx';
import History from '@/pages/history.jsx';
import Visual from '@/pages/visual.jsx';
import Maps from '@/pages/maps.jsx';

import Test from '@/pages/test.jsx';

import { Route, Switch, withRouter } from 'react-router-dom';
import { Cookies } from '@/component/utils';

class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			count: 1
		};
	}
	static propTypes = {
		location: React.PropTypes.object.isRequired
	}
	componentDidMount() {
		const pin = Cookies.get('_pin');
		if(!pin){
			//this.props.history.push('/login');
		} else {
			//this.props.history.push('/');
		}
	}
	componentDidUpdate(prevProps) {
		if (this.props.location !== prevProps.location) {
			this.onRouteChanged();
		}
	}
	onRouteChanged() {
		let menu = document.getElementById('login-view');
		if(this.props.location.pathname == '/login'){
			menu.style.display = 'none';
		}else{
			menu.style.display = 'block';
		}
	}
	render() {
		return (
			<Switch>
				<Route exact path="/" component={Index}/>
				<Route path="/login" component={Login}/>
				<Route path="/device" component={Device}/>
				<Route path="/maps" component={Maps}/>
				<Route path="/history/:id" component={History}/>
				<Route path="/visual/:id" component={Visual}/>
				<Route path="/test" component={Test}/>
			</Switch>
		);
	}
}

export default withRouter(Main);
