import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import update from 'immutability-helper';
import moment from 'moment';
import { toast } from 'react-toastify';
import { Cookies } from '@/component/utils';

class AddDevice extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			device : {cmd:[{loopTime: '', readAdd: '', readCmd: '', readLen: '', readNO: ''}]},
			proCompany: {},
			useCompany: {},
			deviceImei: [],
			isSuccess: false,
			allState: ['正常', '未审核', '异常']
		};
	}
	componentDidMount(){
		let that = this;		
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
	}
	selectProCompany = (e) =>{
		let that = this;
		let param = {pro_company_id: parseInt(e.target.value), token: Cookies.get('__token') };
		this.setState({ device: Object.assign({}, this.state.device, {pro_company_id: parseInt(e.target.value)}) });
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
		this.setState({ device: Object.assign({}, this.state.device, {use_company_id: parseInt(e.target.value)} ) });
	}
	changeName = (e) => {
		this.setState({ device: Object.assign({}, this.state.device, {device_name: e.target.value} )});
	}
	selectType = e => {
		this.setState({device: Object.assign({}, this.state.device, {type: parseInt(e.target.value)})});
	}
	changeNum = (e) => {
		this.setState({ device: Object.assign({}, this.state.device, {device_id: e.target.value} )});
	}
	changeLatitude = e => {
		this.setState({ device: Object.assign({}, this.state.device, {latitude: e.target.value} )});
	}
	changeLongitude = e => {
		this.setState({ device: Object.assign({}, this.state.device, {longitude: e.target.value} )});
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
	addDevice = () => {
		let that = this;		
		axios.post('/ajax/deviceAdd', {...this.state.device, token: Cookies.get('__token')}).then(function(data){
			let result = data.data;
			if(result.result == 0){				
				toast.success(result.message);
				let param = {id: result.data.id, token: Cookies.get('__token') };
				axios.post('/ajax/deviceImeiSelect', param).then(function(data){
					let ret = data.data;
					if(ret.result == 0){
						if(ret.data.chose.length > 0){
							for (var i = 0, ii = ret.data.chose.length; i < ii; i++) {
								ret.data.chose[i]['checked'] = true;
							}
						}
						that.setState({ 'deviceImei': [...ret.data.chose, ...ret.data.unchose] });
						that.setState({ 'isSuccess': result.data ? true : false });
					}else{
						toast.error(ret.message);
					}
				});
			}else if([-2,-5,-14].indexOf(result.result) > -1) {
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
			}else if([-2,-5,-14].indexOf(result.result) > -1) {
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
						<div className={this.state.isSuccess ? 'col-md-6' : 'col-md-12'}>
							<div className="panel panel-default">
								<div className="panel-heading">
									<span>编辑设备</span>
								</div>
								<div className="panel-body">
									<div className="form-horizontal">
										<div className="form-group">
											<label className="col-md-3">设备编号</label>
											<div className="col-md-9"><input type="text" className="form-control" value={this.state.device.device_id} onChange={this.changeNum}/></div>
										</div>
										<div className="form-group">
											<label className="col-md-3">设备名称</label>
											<div className="col-md-9"><input type="text" className="form-control" value={this.state.device.device_name} onChange={this.changeName}/></div>
										</div>
										<div className="form-group">
											<label className="col-md-3">设备类型</label>
											<div className="col-md-9">
												<span className="ui-select" style={{display: 'block', margin: '0'}}>
													<select style={{width: '100%'}} value={this.state.device.type} onChange={this.selectType}>													
														<option value="chose">--请选择--</option>
														<option value="0">DTU</option>
														<option value="1">HMI</option>
													</select>
												</span>
											</div>
										</div>
										<div className="form-group">
											<label className="col-md-3">命令</label>
											<div className="col-md-9">
												{this.state.device.cmd.map((item, index) => {
													return (
														<div className="row" style={{paddingTop: index > 0 ? 10 : 0 }} key={index}>
															{Object.keys(item).map(key => {
																let cmds = item[key];
																return (
																	<div key={key} className="col-md-2"><input type="number" bind-key={key} bind-index={index} className="form-control" value={cmds} onChange={this.changeValue}/></div>
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
											<div className="col-md-9"><input type="text" className="form-control" value={this.state.device.longitude} onChange={this.changeLongitude}/></div>
										</div>
										<div className="form-group">
											<label className="col-md-3">纬度</label>
											<div className="col-md-6"><input type="text" className="form-control" value={this.state.device.latitude} onChange={this.changeLatitude}/></div>
											<div className="col-md-3">
												<Link style={{marginTop: '5px'}} className="btn btn-xs btn-danger" to="//lbs.amap.com/console/show/picker" target="_blank">获得经纬度坐标</Link>
											</div>
										</div>										
										<div className="form-group">
											<label className="col-md-3">生产厂家</label>
											<div className="col-md-9">
												<span className="ui-select" style={{display: 'block', margin: '0'}}>
													<select style={{width: '100%'}} id="proCompanyId" value={this.state.device.pro_company_id} onChange={this.selectProCompany}>
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
											<button className="btn btn-w-md btn-primary" onClick={this.addDevice}>更新设备</button>
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
											<button className="btn btn-w-md btn-primary" onClick={this.bindImei}>确认</button>
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

AddDevice.defaultProps = {
	style: 'wapper'
};

export default AddDevice;