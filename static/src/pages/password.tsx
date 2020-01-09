import React from 'react';
import axios from 'axios';
import update from 'immutability-helper';
import {Link} from 'react-router-dom';
import { toast } from 'react-toastify';
import { Cookies } from '@/component/utils';

class Password extends React.Component {
	constructor(props) {
		super(props);
		this.state = {user:{}};
	}
	componentDidMount(){
	}

	changeOld = e => {
		this.setState({ user: Object.assign({}, this.state.user, {original_pwd: e.target.value} )});
	}
	changeNew = e => {
		this.setState({ user: Object.assign({}, this.state.user, {new_pwd: e.target.value} )});
	}
	surePassword = e => {
		this.setState({ user: Object.assign({}, this.state.user, {surePwd: e.target.value} )});
	}
	changePwd = () => {
		let that = this;
		if(this.state.user.new_pwd == this.state.user.surePwd){
			axios.post('/ajax/userCpwd', {...this.state.user, token: Cookies.get('__token')}).then(function(data){
				let result = data.data;
				if(result.result == 0){
					toast.success(result.message);
				}else if([-2,-14].indexOf(result.result) > -1) {
					that.props.history.push('/login');
				}else{
					toast.error(result.message);
				}
			});
		}else{
			toast.error('确认新密码和新密码不一致！');
		}		
	}

	render() {
		return (
			<div className={this.props.style} id="content">
				<div className="page">
					<div className="panel panel-default">
						<div className="panel-heading">
							<span>修改密码</span>
						</div>
						<div className="panel-body">
							<div className="form-horizontal">										
								<div className="form-group">
									<label className="col-md-2">旧密码</label>
									<div className="col-md-10"><input type="password" className="form-control" value={this.state.user.original_pwd} onChange={this.changeOld}/></div>
								</div>
								<div className="form-group">
									<label className="col-md-2">新密码</label>
									<div className="col-md-10"><input type="password" className="form-control" value={this.state.user.new_pwd} onChange={this.changeNew}/></div>
								</div>
								<div className="form-group">
									<label className="col-md-2">确认新密码</label>
									<div className="col-md-10"><input type="password" className="form-control" value={this.state.user.surePwd} onChange={this.surePassword}/></div>
								</div>		
								<div className="form-group text-center">
									<button type="submit" className="btn btn-w-md btn-primary" onClick={this.changePwd}>确认</button>
									<div className="space"></div>
									<button className="btn btn-w-md btn-default">清空</button>
								</div>
							</div>
						</div>	
					</div>	
				</div>
			</div>
		);
	}
}

Password.defaultProps = {
	style: 'wapper'
};

export default Password;