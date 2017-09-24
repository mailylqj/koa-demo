import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class Login extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			username: '',
			password: ''
		};
	}
	componentDidMount() {
		//this.setState({ username: '' });
		// this.setState({ password: '' });
	}
	changeName = (e) => {
		this.setState({ username: e.target.value });
	}
	changePasd = (e) => {
		this.setState({ password: e.target.value });
	}
	handleLogin = () => {
		const user = { name: this.state.username, password : this.state.password };
		axios.post('/ajax/Login', {

		}).then();
		this.props.history.push('/');
		console.log(user);
	}
	render() {
		return (
			<div className="page-signin">
				<div className="signin-header">
					<div className="container text-center">
						<section className="logo">
							<a href="#/" className="">Square</a>
						</section>
					</div>
				</div>
				<div className="main-body">
					<div className="container">
							<div className="form-container">
								<section className="row signin-social text-center">
									<a href="javascript:;" className="btn-icon btn-icon-sm bg-twitter"><i className="fa fa-twitter"></i></a>
									<div className="space"></div>
									<a href="javascript:;" className="btn-icon btn-icon-sm bg-facebook"><i className="fa fa-facebook"></i></a>
									<div className="space"></div>
									<a href="javascript:;" className="btn-icon btn-icon-sm bg-google-plus"><i className="fa fa-google-plus"></i></a>
								</section>

								<span className="line-thru">OR</span>

								<form className="form-horizontal">
									<fieldset>
										<div className="form-group">
											<div className="input-group input-group-lg">
												<span className="input-group-addon">
													<span className="glyphicon glyphicon-envelope"></span>
												</span>
												<input type="email" value={this.state.username} onChange={this.changeName} className="form-control" placeholder="Email"/>
											</div>
										</div>
										<div className="form-group">
											<div className="input-group input-group-lg">
												<span className="input-group-addon">
													<span className="glyphicon glyphicon-lock"></span>
												</span>
												<input type="password" value={this.state.password} onChange={this.changePasd} className="form-control" placeholder="password"/>
											</div>
										</div>
										<div className="form-group"></div>
										<div className="form-group">
											<a href="javascript:;" onClick={this.handleLogin} className="btn btn-primary btn-lg btn-block">Log in</a>
										</div>
									</fieldset>
								</form>
							<section>
								<p className="text-center"><a href="#/pages/forgot">Forgot your password?</a></p>
								<p className="text-center text-muted text-small">Don't have an account yet? <a href="#/pages/signup">Sign up</a></p>
							</section>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Login.defaultProps = {
	style: 'wapper'
};

export default Login;
