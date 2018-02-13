import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import update from 'immutability-helper';
import moment from 'moment';
import { toast } from 'react-toastify';
import { Cookies } from '@/component/utils';

class EditDevice extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			device: {cmd: []},
			proCompany: {},
			useCompany: {},
			deviceImei: [],
			allState: ['正常', '未审核', '异常']
		};
	}
	componentDidMount(){
		let that = this;
		let param = {id: this.props.match.params.id, token: Cookies.get('__token') };
		axios.post('/ajax/deviceSelectByID', param).then(function(data){
			let result = data.data;
			if(result.result == 0){
				if(result.data['allow_date'] === 0){					
					result.data['allow_date'] = moment();
				}else{
					result.data['allow_date'] = moment(result.data['allow_date']);
				}
				that.setState({ 'device': result.data });
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
		axios.post('/ajax/proCompanySelectAll', {token: Cookies.get('__token')}).then(function(data){
			let ret = data.data;
			let _default = {};
			_default[that.state.device.pro_company_id] = { id: that.state.device.pro_company_id, pro_company: that.state.device.pro_company };
			if(ret.result == 0){				
				that.setState({ 'proCompany': ret.data });
			}else{
				that.setState({ 'proCompany': _default });
			}
		});
		axios.post('/ajax/deviceImeiSelect', param).then(function(data){
			let ret = data.data;
			if(ret.result == 0){
				if(ret.data.chose.length > 0){
					for (var i = 0, ii = ret.data.chose.length; i < ii; i++) {
						ret.data.chose[i]['checked'] = true;
					}
				}
				that.setState({ 'deviceImei': [...ret.data.chose, ...ret.data.unchose] });
			}else{
				toast.error(ret.message);
			}
		});
	}
	selectProCompany = (e) =>{
		let that = this;
		let param = {pro_company_id: parseInt(e.target.value), token: Cookies.get('__token') };
		this.setState({ device: Object.assign({}, this.state.device, {pro_company_id: parseInt(e.target.value)}) });
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
		this.setState({ device: Object.assign({}, this.state.device, {use_company_id: parseInt(e.target.value)} ) });
	}
	changeName = (e) => {
		this.setState({ device: Object.assign({}, this.state.device, {device_name: e.target.value, devicename: e.target.value} )});
	}
	pickDate = (date) => {
		this.setState({ device: Object.assign({}, this.state.device, {allow_date: date} )});
	}
	changeState = (e) => {
		this.setState({ device: Object.assign({}, this.state.device, {ischeck: parseInt(e.target.value)} )});
	}
	addCmds = () => {
		this.setState(update(this.state, {
			device: {
				cmd: {
					$push: [{loopTime: '', readAdd: '', readCmd: '', readLen: '', readNO: ''}]
				}
			}
		}));
	}
	changeValue = e => {
		let _index = e.target.getAttribute('bind-index');
		let _key = e.target.getAttribute('bind-key');
		this.setState(update(this.state, {
			device: {
				cmd: {
					[_index]:{
						[_key]: {
							$set: parseInt(e.target.value)
						}
					}
				}
			}
		}));
	}
	toggleCheck = (e) => {
		let index = e.target.getAttribute('index');
		this.setState(
			update(this.state, {
				deviceImei: {
					[index]: {
						$merge: {checked: e.target.checked}
					}
				}
			})
		);
	}
	updateDevice = () => {
		let that = this;
		this.state.device['allow_date'] = moment(this.state.device['allow_date']).valueOf();
		axios.post('/ajax/deviceUpdate', {...this.state.device, token: Cookies.get('__token')}).then(function(data){
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
	bindImei = () => {
		let that = this, choseArr = [];
		let chose = document.querySelectorAll('[name="deviceImei"]:checked');
		for (var i = 0; i < chose.length; i++) {
			choseArr.push(parseInt(chose[i].value));
		}
		let param = {
			device_id: this.state.device.id,
			imei_list: choseArr,
			token: Cookies.get('__token')
		};
		axios.post('/ajax/deviceImeiUpdate', param).then(function(data){
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
	render() {
		return (
			<div className={this.props.style} id="content">
				<div className="page">						
					<div className="row">
						<div className="col-md-6">
							<div className="panel panel-default">
								<div className="panel-heading">
									<span>编辑设备</span>
								</div>
								<div className="panel-body">
									<div className="form-horizontal">
										<div className="form-group">
											<label className="col-md-3">设备名称</label>
											<div className="col-md-9"><input type="text" className="form-control" value={this.state.device.device_name}/></div>
										</div>
										<div className="form-group">
											<label className="col-md-3">命令</label>
											<div className="col-md-9">
												<div className="row">
													<div className="col-md-2"><label>设备地址</label></div>
													<div className="col-md-2"><label>功能码</label></div>
													<div className="col-md-2"><label>起始地址</label></div>
													<div className="col-md-2"><label>命令长度</label></div>
													<div className="col-md-2"><label>循环时间</label></div>
												</div>
												{this.state.device.cmd.map((item, index) => {
													return (
														<div className="row" style={{paddingTop: index > 0 ? 10 : 0 }} key={index}>
															{Object.keys(item).map(key => {
																let cmds = item[key];
																return (
																	<div key={key} className="col-md-2"><input type="text" bind-key={key} bind-index={index} className="form-control" value={cmds} onChange={this.changeValue}/></div>
																);
															})}
															{(index == 0) ? <div key={index} className="col-md-2"><a href="javascript:;" className="btn btn-info" onClick={this.addCmds}>添加</a></div> : <div></div>}
														</div>
													);
												})}
											</div>
										</div>
										<div className="form-group">
											<label className="col-md-3">经度</label>
											<div className="col-md-9"><input type="text" className="form-control" value={this.state.device.longitude}/></div>
										</div>
										<div className="form-group">
											<label className="col-md-3">纬度</label>
											<div className="col-md-6"><input type="text" className="form-control" value={this.state.device.latitude}/></div>
											<div className="col-md-3">
												<Link style={{marginTop: '5px'}} className="btn btn-xs btn-danger" to="//lbs.amap.com/console/show/picker" target="_blank">获得经纬度坐标</Link>
											</div>
										</div>										
										<div className="form-group">
											<label className="col-md-3">生产厂家</label>
											<div className="col-md-9">
												<span className="ui-select" style={{display: 'block', margin: '0'}}>
													<select style={{width: '100%'}} id="proCompanyId" value={this.state.device.pro_company_id} onChange={this.selectProCompany}>
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
											<label className="col-md-3">使用厂家</label>
											<div className="col-md-9">
												<span className="ui-select" style={{display: 'block', margin: '0'}}>
													<select style={{width: '100%'}} id="useCompanyId" value={this.state.device.use_company_id} onChange={this.selectUseCompany}>
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
										<div className="form-group text-center">
											<button type="submit" className="btn btn-w-md btn-primary" onClick={this.updateDevice}>更新设备</button>
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
									<span>index</span>
								</div>
								<div className="panel-body">
									<div className="form-horizontal">
										<div className="form-group">
											{this.state.deviceImei.map((item, index) => {
												return (
													<div key={index} className="col-md-4">
														<label className="ui-checkbox">
															<input index={index} name="deviceImei" type="checkbox" value={item.id} checked={item.checked ? true : false} onChange={this.toggleCheck}/>
															<span>{item.imei}</span>
														</label>
													</div>
												);
											})}
										</div>
										<div className="form-group text-center">
											<button type="submit" className="btn btn-w-md btn-primary" onClick={this.bindImei}>确认</button>
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

EditDevice.defaultProps = {
	style: 'wapper'
};

export default EditDevice;