import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Spin } from 'antd';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

import { account } from '../../store/actions/account';
const {lazy, Suspense} = React;

const Test = lazy(() => import('../../pages/test'))

import Index from '../../pages/index';
import Login from '../../pages/login';
import Password from '@/pages/password';
import Device from '@/pages/device';
import History from '@/pages/history';
import Visual from '@/pages/visual';
import Virtual from '@/pages/virtual';
import Maps from '@/pages/maps';
import User from '@/pages/user';
import EditUser from '@/pages/editUser';
import AddUser from '@/pages/adduser';
import AllDevice from '@/pages/alldevice';
import EditDevice from '@/pages/editdevice';
import AddDevice from '@/pages/adddevice';
import EditVR from '@/pages/editvr';
import Company from '@/pages/company';
import AddCompany from '@/pages/addCompany';
import Audit from '@/pages/audit';
import Imei from '@/pages/imei';
import EditImei from '@/pages/editImei';
import AddImei from '@/pages/addImei';
import Control from '@/pages/control';
import Alarm from '@/pages/alarm';

// import Test from '@/pages/test';




const routes = [
	{ path: '/', exact: true, component: Index },
	{ path: '/login', component: Login }
]

function mapStateToProps(state) {
	return {
		...state.accountInfo,
		counter: state.counter
	};
}

function mapDispatchToProps(dispatch) {
	return {
		...bindActionCreators({ account }, dispatch)
	}
}

@connect(
	mapStateToProps,
	mapDispatchToProps
)

class Main extends React.Component<IProps> {
	constructor(props: any) {
		super(props);
	}
	componentDidUpdate(prevProps: any) {
		if (this.props.location !== prevProps.location) {
			this.onRouteChanged();
		}
	}
	onRouteChanged() {
		// this.props.account();
	}
	render() {
		return (
			<Switch>
				<Suspense fallback={<Spin size="large" style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)'}}/>}>
					{routes.map((route, index) => (
						<Route
							key={index}
							path={route.path}
							exact={route.exact}
							render={(props) => {
								if (this.props.pending) {
									return <Spin size="large" style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)'}}/>
								} else {
									if (this.props.loggedin || route.path === '/login') {
										return <route.component {...props} route={route} />
									}
									return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
								}
							}}
						/>
					))}
					{/* <Route exact path="/" component={Index}/>
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
					<Route path="/addcompany" component={AddCompany} />
					<Route path="/audit" component={Audit}/>
					<Route exact path="/imei" component={Imei}/>
					<Route path="/imei/:id" component={EditImei}/>
					<Route path="/addimei" component={AddImei}/> */}
					<Route path="/test" component={Test} />
				</Suspense>
			</Switch>
		);
	}
}

export default withRouter(Main);
