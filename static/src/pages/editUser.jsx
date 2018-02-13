import React from 'react';
import axios from 'axios';
import update from 'immutability-helper';
import {Link} from 'react-router-dom';
import { toast } from 'react-toastify';
import { Cookies } from '@/component/utils';

class EditUser extends React.Component {
	constructor(props) {
		super(props);
		this.state = {user : {}, proCompany: [], useCompany: [], levelList: [], useDevice: []};
	}
	componentDidMount(){
		let that = this;
		let param = {id: parseInt(this.props.match.params.id), token: Cookies.get('__token') };
		axios.post('/ajax/userSelectByID', param).then(function(data){
			let result = data.data;
			if(result.result == 0){
				that.setState({ 'user': result.data });
			}else{
				toast.error(result.message);
			}
			axios.post('/ajax/useCompanySelectByProCompanyID', {pro_company_id: result.data.pro_company_id, token: Cookies.get('__token')}).then(function(data){
				let re = data.data;
				if(re.result == 0){
					that.setState({ 'useCompany': re.data });
				}else{
					toast.error(re.message);
				}
			});
		});
		axios.post('/ajax/getLevel', {token: Cookies.get('__token')}).then(function(data){
			let re = data.data;
			if(re.result == 0){
				that.setState({ 'levelList': re.data });
			}else{
				toast.error(re.message);
			}
		});
		axios.post('/ajax/userDeviceSelect', {user_id: parseInt(that.props.match.params.id), token: Cookies.get('__token')}).then(function(data){
			let r = data.data;
			if(r.result == 0){
				if(r.data.chose.length > 0){
					for (var i = 0, ii = r.data.chose.length; i < ii; i++) {
						r.data.chose[i]['checked'] = true;
					}
				}
				that.setState({ 'useDevice': [...r.data.chose, ...r.data.unchose] });
			}else{
				toast.error(r.message);
			}
		});
		axios.post('/ajax/proCompanySelectAll', {token: Cookies.get('__token')}).then(function(data){
			let ret = data.data;
			if(ret.result == 0){
				that.setState({ 'proCompany': ret.data });
			}else{
				toast.error(ret.message);
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
			}else if([-2,-14].indexOf(re.result) > -1) {
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
		this.setState({ user: Object.assign({}, this.state.user, {username: e.target.value} )});
	}
	selectLevel = (e) => {
		this.setState({ user: Object.assign({}, this.state.user, {level: parseInt(e.target.value)}) });
	}
	updateUser = () => {
		let that = this;
		axios.post('/ajax/userUpdate', {...this.state.user, name: this.state.user.username, token: Cookies.get('__token')}).then(function(data){
			let result = data.data;
			if(result.result == 0){
				toast.success(result.message);
			}else if([-2,-14].indexOf(result.result) > -1) {
				that.props.history.push('/login');
			}else{
				toast.error(result.message);
			}
		});
	}
	bindDevice = () => {
		let that = this, choseArr = [];
		let chose = document.querySelectorAll('[name="useDevice"]:checked');
		for (var i = 0; i < chose.length; i++) {
			choseArr.push(parseInt(chose[i].value));
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
			}else if([-2,-14].indexOf(result.result) > -1) {
				that.props.history.push('/login');
			}else{
				toast.error(result.message);
			}
		});
	}
	selectAdmin = () => {
		let that = this;
		let param = {token: Cookies.get('__token') };
		axios.post('/ajax/userSelectAllName', param).then(function(data){
			let result = data.data;
			if(result.result == 0){
				that.setState({ 'user': result.data });
			}else if([-2,-14].indexOf(result.result) > -1) {
				that.props.history.push('/login');
			}else{
				toast.error(result.message);
			}
		});
	}
	toggleCheck = (e) => {
		let index = e.target.getAttribute('index');
		this.setState(
			update(this.state, {
				useDevice: {
					[index]: {
						$merge: {checked: e.target.checked}
					}
				}
			})
		);
	}
	render() {
		return (
			<div className={this.props.style} id="content">
				<div className="page">
					<div className="row">
						<div className="col-md-6">
							<div className="panel panel-default">
								<div className="panel-heading">
									<span>编辑用户</span>
								</div>
								<div className="panel-body">
									<div className="form-horizontal">										
										<div className="form-group">
											<label className="col-md-2">用户名</label>
											<div className="col-md-10"><input type="text" className="form-control" value={this.state.user.username} onChange={this.changeName}/></div>
										</div>
										<div className="form-group">
											<label className="col-md-2">生产公司</label>
											<div className="col-md-10">
												<span className="ui-select" style={{display: 'block', margin: '0'}}>
													<select style={{width: '100%'}} id="proCompanyId" value={this.state.user.pro_company_id} onChange={this.selectProCompany}>
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
											<label className="col-md-2">使用公司</label>
											<div className="col-md-10">
												<span className="ui-select" style={{display: 'block', margin: '0'}}>
													<select style={{width: '100%'}} id="useCompanyId" value={this.state.user.use_company_id} onChange={this.selectUseCompany}>
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
											<label className="col-md-2">权限控制</label>
											<div className="col-md-10">
												<span className="ui-select" style={{display: 'block', margin: '0'}}>
													<select style={{width: '100%'}} value={this.state.user.level} onChange={this.selectLevel}>
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
											<button type="submit" className="btn btn-w-md btn-primary" onClick={this.updateUser}>确认</button>
											<div className="space"></div>
											<button className="btn btn-w-md btn-default">清空</button>
										</div>
									</div>
								</div>	
							</div>	
						</div>
						<div className="col-md-6">
							<div className="panel panel-default">
								<div className="panel-heading">
									<span>绑定设备</span>
								</div>
								<div className="panel-body">
									<div className="form-horizontal">
										<div className="form-group">
											{this.state.useDevice.map((item, index) => {
												return (
													<div key={index} className="col-md-4">
														<label className="ui-checkbox">
															<input index={index} name="useDevice" type="checkbox" value={item.id} checked={item.checked ? true : false} onChange={this.toggleCheck}/>
															<span>{item.device_name}</span>
														</label>
													</div>
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

EditUser.defaultProps = {
	style: 'wapper'
};

export default EditUser;