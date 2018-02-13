import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Index from '@/pages/index.jsx';
import Login from '@/pages/login.jsx';
import Password from '@/pages/password.jsx';
import Device from '@/pages/device.jsx';
import History from '@/pages/history.jsx';
import Visual from '@/pages/visual.jsx';
import Virtual from '@/pages/virtual.jsx';
import Maps from '@/pages/maps.jsx';
import User from '@/pages/user.jsx';
import EditUser from '@/pages/editUser.jsx';
import AddUser from '@/pages/adduser.jsx';
import AllDevice from '@/pages/alldevice.jsx';
import EditDevice from '@/pages/editdevice.jsx';
import AddDevice from '@/pages/adddevice.jsx';
import EditVR from '@/pages/editvr.jsx';
import Company from '@/pages/company.jsx';
import Audit from '@/pages/audit.jsx';
import Imei from '@/pages/imei.jsx';
import EditImei from '@/pages/editImei.jsx';
import AddImei from '@/pages/addImei.jsx';
import Control from '@/pages/control.jsx';
import Alarm from '@/pages/alarm.jsx';

import Test from '@/pages/test.jsx';

import { Route, Switch, withRouter } from 'react-router-dom';
import { Cookies } from '@/component/utils';

class Main extends React.Component {
	constructor(props) {
		super(props);
	}
	static propTypes = {
		location: PropTypes.object.isRequired
	}	
	componentDidUpdate(prevProps) {
		if (this.props.location !== prevProps.location) {
			this.onRouteChanged();
		}
	}
	onRouteChanged() {
		let that = this;
		let menu = document.querySelector('#login-view');
		if(this.props.location.pathname == '/login'){
			menu.style.display = 'none';
		}else{
			menu.style.display = 'block';
			axios.post('/ajax/Token', {token: Cookies.get('__token')}).then(function(data){
				let result = data.data;
				Cookies.set('__token', result.token, 1000*60*30);
				if(result.result !== 0){
					Cookies.set('__pin', null);
					that.props.history.push('/login');
				}
			});
		}
	}
	render() {
		return (
			<Switch>
				<Route exact path="/" component={Index}/>
				<Route path="/login" component={Login}/>
				<Route path="/password" component={Password}/>
				<Route path="/alldevice" component={AllDevice}/>
				<Route exact path="/device" component={Device}/>
				<Route path="/device/:id" component={EditDevice}/>
				<Route path="/adddevice" component={AddDevice}/>
				<Route path="/editvr/:id" component={EditVR}/>
				<Route path="/maps" component={Maps}/>
				<Route path="/history/:id" component={History}/>
				<Route path="/visual/:id" component={Visual}/>
				<Route path="/virtual/:id" component={Virtual}/>
				<Route path="/control/:id" component={Control}/>
				<Route path="/alarm/:id" component={Alarm}/>
				<Route exact path="/user" component={User}/>
				<Route path="/adduser" component={AddUser}/>
				<Route path="/user/:id" component={EditUser}/>
				<Route path="/company" component={Company}/>
				<Route path="/audit" component={Audit}/>
				<Route exact path="/imei" component={Imei}/>
				<Route path="/imei/:id" component={EditImei}/>
				<Route path="/addimei" component={AddImei}/>
				<Route path="/test" component={Test}/>
			</Switch>
		);
	}
}

export default withRouter(Main);
