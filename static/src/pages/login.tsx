import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import {Input, Button, Icon, Col} from 'antd';

import { login } from '../store/actions/account';


/* function mapStateToProps(state) {
    return {
		...state.accountInfo,
		counter: state.counter
    };
} */

function mapDispatchToProps(dispatch){
	return {
		...bindActionCreators({login}, dispatch)
	}
}

@connect(
	null,
	mapDispatchToProps
)


class Login extends React.Component<IProps, IState> {
	constructor(props:any){
		super(props);
		this.state = {
			username: '',
			password: ''
		};
	}
	changeName = (e) => {
		this.setState({ username: e.target.value });
	}
	changePasd = (e) => {
		this.setState({ password: e.target.value });
	}
	loginHandle = () => {
		this.props.login({data: {...this.state}, callBack: () => {
			this.props.history.push('/')
		}})
	}
	render() {
		return (
			<div style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}>
				<div style={loginStyle}>
					<div style={{textAlign: 'center', fontSize:0}}>
						<Icon type="apple" style={{fontSize: 50, color: '#c8c8c8',verticalAlign: 'top'}} theme="filled"/>
						<span style={{fontSize: '36px', verticalAlign: 'top'}}>MacBook Pro</span>
					</div>
					<Input size="large" placeholder="Enter your username" value={this.state.username} onChange={this.changeName} style={{marginTop: 40}}/>
					<Input.Password size="large" placeholder="input password" value={this.state.password} onChange={this.changePasd} style={{marginTop: 20}}/>
					<Button type="primary" size="large" block onClick={this.loginHandle} style={{marginTop:20}}>登录</Button>
				</div>
			</div>
		);
	}
}

const loginStyle = {
	position: 'absolute', 
	top: '50%', 
	left: '50%', 
	transform: 'translate(-50%,-50%)',
	width: 425,
	height: 400,
	padding: 40,
	background: '#fff',
	boxShadow: '0 10px 25px 5px rgba(0,0,0,0.1)'
}

export default Login;
