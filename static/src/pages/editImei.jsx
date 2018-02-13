import React from 'react';
import axios from 'axios';
import update from 'immutability-helper';
import {Link} from 'react-router-dom';
import { toast } from 'react-toastify';
import { Cookies } from '@/component/utils';

class EditImei extends React.Component {
	constructor(props) {
		super(props);
		this.state = {imei : {}, proCompany: [], useCompany: []};
	}
	componentDidMount(){
		let that = this;
		let param = {id: parseInt(this.props.match.params.id), token: Cookies.get('__token') };
		axios.post('/ajax/imeiSelectByID', param).then(function(data){
			let result = data.data;
			if(result.result == 0){
				that.setState({ 'imei': result.data[0] });
			}else{
				toast.error(result.message);
			}
			axios.post('/ajax/useCompanySelectByProCompanyID', {pro_company_id: result.data[0].pro_company_id, token: Cookies.get('__token')}).then(function(data){
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
			if(ret.result == 0){
				that.setState({ 'proCompany': ret.data });
			}else{
				toast.error(ret.message);
			}
		});
	}
	selectProCompany = e =>{
		let that = this;
		let param = {pro_company_id: parseInt(e.target.value), token: Cookies.get('__token') };
		this.setState({ imei: Object.assign({}, this.state.imei, {pro_company_id: parseInt(e.target.value)}) });
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
	selectUseCompany = e =>{
		this.setState({ imei: Object.assign({}, this.state.imei, {use_company_id: parseInt(e.target.value)} ) });
	}
	changeName = e => {
		this.setState({ imei: Object.assign({}, this.state.imei, {imei: e.target.value} )});
	}
	changeInfo = e => {
		this.setState({ imei: Object.assign({}, this.state.imei, {info: e.target.value} )});
	}
	updateImei = () => {
		let that = this;
		axios.post('/ajax/imeiUpdate', {...this.state.imei, token: Cookies.get('__token')}).then(function(data){
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
					<div className="panel panel-default">
						<div className="panel-heading">
							<span>编辑IMEI</span>
						</div>
						<div className="panel-body">
							<div className="form-horizontal">										
								<div className="form-group">
									<label className="col-md-2">IMEI名称</label>
									<div className="col-md-10"><input type="text" className="form-control" value={this.state.imei.imei} onChange={this.changeName}/></div>
								</div>
								<div className="form-group">
									<label className="col-md-2">IMEI描述</label>
									<div className="col-md-10"><input type="text" className="form-control" value={this.state.imei.info} onChange={this.changeInfo}/></div>
								</div>
								<div className="form-group">
									<label className="col-md-2">生产公司</label>
									<div className="col-md-10">
										<span className="ui-select" style={{display: 'block', margin: '0'}}>
											<select style={{width: '100%'}} id="proCompanyId" value={this.state.imei.pro_company_id} onChange={this.selectProCompany}>
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
											<select style={{width: '100%'}} id="useCompanyId" value={this.state.imei.use_company_id} onChange={this.selectUseCompany}>
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
									<button type="submit" className="btn btn-w-md btn-primary" onClick={this.updateImei}>确认</button>
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

EditImei.defaultProps = {
	style: 'wapper'
};

export default EditImei;