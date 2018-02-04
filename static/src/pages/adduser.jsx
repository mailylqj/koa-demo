import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import { toast } from 'react-toastify';
import { Cookies } from '@/component/utils';

class AddUser extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {},
			isSame: false,
			isSuccess: false,
			proCompany: [],
			useCompany: [],
			levelList: [],
			useDevice: { unchose : [] }
		};
	}
	componentDidMount(){
		let that = this;
		axios.post('/ajax/proCompanySelectAll', {token: Cookies.get('__token')}).then(function(data){
			let ret = data.data;
			if(ret.result == 0){
				that.setState({ 'proCompany': ret.data });
			}else{
				toast.error(ret.message);
			}
		});
		axios.post('/ajax/getLevel', {token: Cookies.get('__token')}).then(function(data){
			let re = data.data;
			if(re.result == 0){
				that.setState({ 'levelList': re.data });
			}else{
				toast.error(re.message);
			}
		});
	}
	selectProCompany = (e) =>{
		let that = this;
		let param = {pro_company_id: parseInt(e.target.value), token: Cookies.get('__token') };
		this.setState({ user: Object.assign({}, this.state.user, {pro_company_id: parseInt(e.target.value)}) });
		axios.post('/ajax/useCompanySelectByProCompanyID', param).then(function(data){
			let re = data.data;
			if(re.result == 0){
				that.setState({ 'useCompany': re.data });
			}else if([-2,-5,-14].indexOf(re.result) > -1) {
				that.props.history.push('/login');
			}else{
				toast.error(re.message);
			}
		});
	}
	selectUseCompany = (e) =>{
		this.setState({ user: Object.assign({}, this.state.user, {use_company_id: parseInt(e.target.value)} ) });
	}
	changeName = (e) => {
		this.setState({ user: Object.assign({}, this.state.user, { username: e.target.value} )});
	}
	changePasd = (e) => {
		this.setState({ user: Object.assign({}, this.state.user, {password: e.target.value}) });
	}
	selectLevel = (e) => {
		this.setState({ user: Object.assign({}, this.state.user, {level: parseInt(e.target.value)}) });
	}
	confirmPasd = (e) => {
		this.setState({surepasd: e.target.value});
		if(e.target.value == this.state.user.password){
			this.setState({ isSame: true });
		}else{
			this.setState({ isSame: false });
		}
	}
	addUser = () => {
		let that = this;		
		axios.post('/ajax/userAdd', {...this.state.user, token: Cookies.get('__token')}).then(function(data){
			let re = data.data;
			if(re.result == 0){
				that.userId = re.data.id;
				that.selectDevice();
			}else if([-2,-5,-14].indexOf(re.result) > -1) {
				that.props.history.push('/login');
			}else{
				toast.error(re.message);
			}
		});
	}
	selectDevice = () => {
		let that = this;
		axios.post('/ajax/userDeviceSelect', { user_id: this.userId, token: Cookies.get('__token') }).then(function (data) {
			let r = data.data;
			if (r.result == 0) {
				that.setState({ 'useDevice': r.data });
				that.setState({ 'isSuccess': r.data.length > 0 ? true : false });
				if (r.data.length < 1){
					toast.success('添加成功！');
				}
			} else if([-2,-5,-14].indexOf(r.result) > -1) {
				that.props.history.push('/login');
			}else{
				toast.error(r.message);
			}
		});
	}
	bindDevice = () =>{
		let that = this, choseArr = [];
		let chose = document.querySelectorAll('[name="useDevice"]:checked');
		for (var i = 0; i < chose.length; i++) {
			choseArr.push(chose[i].value);
		}
		let param = {
			user_id: this.state.user.id,
			chose_list: choseArr,
			token: Cookies.get('__token')
		};
		axios.post('/ajax/userDeviceUpdate', param).then(function(data){
			let result = data.data;
			if(result.result == 0){
				toast.success(result.message);
			}else if([-2,-5,-14].indexOf(result.result) > -1) {
				that.props.history.push('/login');
			}else{
				toast.error(result.message);
			}
		});
	}
	render() {
		if (!this.props.style) {
			return null;
		}
		return (			
			<div className={this.props.style} id="content">
				<div className="page">
					<div className="row">
						<div className={this.state.isSuccess ? 'col-md-6' : 'col-md-12'}>
							<div className="panel panel-default">
								<div className="panel-heading">
									<span>添加用户</span>
								</div>
								<div className="panel-body">
									<div className="form-horizontal">
										<div className="form-group">
											<label className="col-md-2">用户名</label>
											<div className="col-md-10"><input type="text" className="form-control" value={this.state.user.username} onChange={this.changeName}/></div>
										</div>
										<div className="form-group">
											<label className="col-md-2">密码</label>
											<div className="col-md-10"><input type="password" className="form-control" value={this.state.user.password} onChange={this.changePasd}/></div>
										</div>
										<div className="form-group">
											<label className="col-md-2">确认密码</label>
											<div className="col-md-10"><input type="password" className="form-control" value={this.state.surepasd} onChange={this.confirmPasd}/></div>
										</div>
										<div className="form-group">
											<label className="col-md-2">公司名字</label>
											<div className="col-md-10">
												<span className="ui-select" style={{display: 'block', margin: '0'}}>
													<select style={{width: '100%'}} onChange={this.selectProCompany}>
														<option value="0">--请选择--</option>
														{Object.keys(this.state.proCompany).map(key => {
															let item = this.state.proCompany[key];
															return (
																<option key={key} value={item.id}>{item.pro_company}</option>
															);
														})}
													</select>
												</span>
											</div>
										</div>
										<div className="form-group">
											<label className="col-md-2">公司名字</label>
											<div className="col-md-10">
												<span className="ui-select" style={{display: 'block', margin: '0'}}>
													<select style={{width: '100%'}} onChange={this.selectUseCompany}>
														<option value="0">--请选择--</option>
														{Object.keys(this.state.useCompany).map(key => {
															let item = this.state.useCompany[key];
															return (
																<option key={key} value={item.id}>{item.use_company}</option>
															);
														})}
													</select>
												</span>
											</div>
										</div>
										<div className="form-group">
											<label className="col-md-2">权限设置</label>
											<div className="col-md-10">
												<span className="ui-select" style={{display: 'block', margin: '0'}}>
													<select style={{width: '100%'}} onChange={this.selectLevel}>
														<option value="0">--请选择--</option>
														{this.state.levelList.map((item, index) => {
															return (
																<option key={index} value={item.id}>{item.levelname}</option>
															);
														})}
													</select>
												</span>
											</div>
										</div>
										<div className="form-group text-center">
											<button type="submit" className="btn btn-w-md btn-primary" onClick={this.addUser}>添加</button>
											<div className="space"></div>
											<button className="btn btn-w-md btn-default">清空</button>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="col-md-6" style={{ 'display': this.state.isSuccess ? 'block' : 'none'}}>
							<div className="panel panel-default">
								<div className="panel-heading">
									<span>绑定设备</span>
								</div>
								<div className="panel-body">
									<div className="form-horizontal">
										<div className="form-group">
											{this.state.useDevice.unchose.map((item, index) => {
												return (
													<div className="col-md-4"><label key={index} className="ui-checkbox"><input name="useDevice" type="checkbox" value={item.id}/><span>{item.device_name}</span></label></div>
												);
											})}
										</div>
										<div className="form-group text-center">
											<button type="submit" className="btn btn-w-md btn-primary" onClick={this.bindDevice}>确认</button>
											<div className="space"></div>
											<button className="btn btn-w-md btn-default">清空</button>
										</div>
									</div>
								</div>
							</div>			
						</div>
					</div>		
				</div>
			</div>
		);
	}
}

AddUser.propTypes = {
	style: PropTypes.string
};

AddUser.defaultProps = {
	style: 'wapper'
};

export default AddUser;
