import React from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import {Link} from 'react-router-dom';
import { toast } from 'react-toastify';
import { Cookies } from '@/component/utils';

const isEmpty = value => {
	return (Array.isArray(value) && value.length === 0) 
		|| (Object.prototype.isPrototypeOf(value) && Object.keys(value).length === 0);
};

class Company extends React.Component {
	constructor(props) {
		super(props);
		this.state = {proCompany: {}, useCompany: {}, isOpen: false};
	}
	componentDidMount(){
		let that = this;
		axios.post('/ajax/proCompanySelectAll', {token: Cookies.get('__token')}).then(function(data){
			let result = data.data;
			if (result.result == 0 && result.data){
				let temp = result.data;
				for (let key in temp){
					temp[key]['editing'] = false;
				}
				that.setState({ 'proCompany': temp });
			}else{
				toast.error(result.message);
			}
		});
		axios.post('/ajax/useCompanySelectByProCompanyID', {token: Cookies.get('__token')}).then(function(data){
			let result = data.data;
			if (result.result == 0 && result.data){
				let temp = result.data;
				for (let key in temp){
					temp[key]['editing'] = false;
				}
				that.setState({ 'useCompany': temp });
			}else{
				toast.error(result.message);
			}
		});
	}
	editProCompany = (e) => {
		let id = e.target.id;
		let editing = true;
		this.setState(update(
			this.state, {
				proCompany: {
					[id]:{
						$merge: { editing }
					}
				}
			}
		));
	}
	editUseCompany = (e) => {
		let id = e.target.id;
		let editing = true;
		this.setState(update(
			this.state, {
				useCompany: {
					[id]:{
						$merge: { editing }
					}
				}
			}
		));
	}
	changeProValue = (e) => {
		let id = e.target.id;
		let pro_company = e.target.value;
		this.setState(update(
			this.state, {
				proCompany: {
					[id]: {
						$merge: { pro_company }
					}
				}
			}
		));		
	}
	changeUseValue = (e) => {
		let id = e.target.id;
		let use_company = e.target.value;
		this.setState(update(
			this.state, {
				useCompany: {
					[id]: {
						$merge: { use_company }
					}
				}
			}
		));		
	}
	sureUpdatePro = (e) => {
		let that = this;
		let editing = false;
		let id = e.target.id;
		let company = this.state.proCompany[id];
		let param = {
			...company,
			token: Cookies.get('__token')
		};
		axios.post('/ajax/proCompanyUpdate', param).then(function (data) {
			let result = data.data;
			if (result.result == 0) {
				that.setState(update(
					that.state, {
						proCompany: {
							[id]: {
								$merge: { editing }
							}
						}
					}
				));
			}else if([-2,-14].indexOf(result.result) > -1) {
				that.props.history.push('/login');
			}else{
				toast.error(result.message);
			}
		});
	}
	sureUpdateUse = (e) => {
		let that = this;
		let editing = false;
		let id = e.target.id;
		let company = this.state.useCompany[id];
		let param = {
			...company,
			token: Cookies.get('__token')
		};
		axios.post('/ajax/useCompanyUpdate', param).then(function (data) {
			let result = data.data;
			if (result.result == 0) {
				that.setState(update(
					that.state, {
						useCompany: {
							[id]: {
								$merge: { editing }
							}
						}
					}
				));
			}else if([-2,-14].indexOf(result.result) > -1) {
				that.props.history.push('/login');
			}else{
				toast.error(result.message);
			}
		});
	}
	checkSub = e => {
		let proId = e.target.id;
		let that = this;
		axios.post('/ajax/useCompanySelectByProCompanyID', {pro_company_id: proId, token: Cookies.get('__token')}).then(function(data){
			let result = data.data;
			if (result.result == 0 && result.data){
				let temp = result.data;
				for (let key in temp){
					temp[key]['editing'] = false;
				}
				that.setState({ 'useCompany': temp });
			}else{
				toast.error(result.message);
			}
		});
	}
	deleteCompany = (e) => {
		let that = this;
		let url = this.type == 'pro' ? '/ajax/proCompanyDel' : '/ajax/useCompanyDel';
		let param = { id_list: [this.companyId], token: Cookies.get('__token') };
		axios.post(url, param).then(function (data) {
			let result = data.data;
			if (result.result == 0) {
				that.setState({ isOpen: false });
			} else if ([-2, -14].indexOf(result.result) > -1) {
				that.props.history.push('/login');
			} else {
				toast.error(result.message);
			}
		});
	}
	openModal = (e) => {
		this.type = e.target.getAttribute('data-type');
		this.companyId = e.target.getAttribute('data-id');
		this.setState({ isOpen: true });
	}
	closeModal = (e) => {
		this.type = null;
		this.companyId = null;
		this.setState({ isOpen: false });
	}
	render() {
		if (!this.props.style) {
			return null;
		}
		return (			
			<div className={this.props.style} id="content">
				<div className="page">
					<div className="row">
						<div className={isEmpty(this.state.useCompany) ? 'col-md-12' : 'col-md-6'} style={{display: isEmpty(this.state.proCompany) ? 'none' : 'block'}}>
							<div className="panel panel-default">
								<div className="panel-heading">
									<span>生产公司列表</span>
								</div>
								<div className="panel-body">
									<div className="row" style={{ paddingBottom: '15px', marginBottom: '15px', borderBottom: '1px solid #ddd' }}>
										<div className="col-md-4">
											<Link className="btn btn-w-md btn-info" to="/addcompany">添加公司</Link>
										</div>
										<div className="col-md-4"></div>
										<div className="col-md-4">
											<div className="input-group">
												<input type="text" className="form-control" value={this.state.username} onChange={this.changeValue} placeholder="请输入公司名字" />
												<span className="input-group-btn">
													<button className="btn btn-success" type="button" onClick={this.searchUser}>查询</button>
												</span>
											</div>
										</div>
									</div>
									<table className="table table-hover">
										<thead>
											<tr><th>#</th><th>公司名称</th><th>操作</th></tr>
										</thead>
										<tbody>
										{Object.keys(this.state.proCompany).map(key => {
											let item = this.state.proCompany[key];
											return (
												<tr key={key}>
													<td>{key}</td>
													<td>
														<span style={{ 'display': item.editing ? 'none' : 'block' }}>{item.pro_company}</span>
														<span className="input-group" style={{ 'display': item.editing ? 'table' : 'none'}}>
															<input type="text" className="form-control" value={item.pro_company} id={item.id} onChange={this.changeProValue}/>
															<span className="input-group-btn"><button className="btn btn-success" id={item.id} onClick={this.sureUpdatePro}>确认</button></span>
														</span>
													</td>
													<td>
														<button className="btn btn-sm btn-primary" id={item.id} title={item.id} onClick={this.editProCompany}>编辑</button>
														<div className="space"></div>
														<button className="btn btn-sm btn-danger" data-id={item.id} data-type="pro" onClick={this.openModal}>删除</button>
														<div className="space"></div>														
														<button className="btn btn-sm btn-primary" id={item.id} title={item.id} onClick={this.checkSub}>查看使用公司</button>
													</td>
												</tr>
											);
										})}
										</tbody>
									</table>
								</div>
							</div>
						</div>
						<div className={isEmpty(this.state.proCompany) ? 'col-md-12' : 'col-md-6'} style={{display: isEmpty(this.state.useCompany) ? 'none' : 'block'}}>
							<div className="panel panel-default">
								<div className="panel-heading">
									<span>使用公司列表</span>
								</div>
								<div className="panel-body">
									<table className="table table-hover">
										<thead>
											<tr><th>#</th><th>生产公司</th><th>公司名称</th><th>操作</th></tr>
										</thead>
										<tbody>
										{Object.keys(this.state.useCompany).map(key => {
											let item = this.state.useCompany[key];
											return (
												<tr key={key}>
													<td>{key}</td>
													<td>{item.pro_company}</td>
													<td>
														<span style={{ 'display': item.editing ? 'none' : 'block' }}>{item.use_company}</span>
														<span className="input-group" style={{ 'display': item.editing ? 'table' : 'none'}}>
															<input type="text" className="form-control" value={item.use_company} id={item.id} onChange={this.changeUseValue}/>
															<span className="input-group-btn"><button className="btn btn-success" id={item.id} onClick={this.sureUpdateUse}>确认</button></span>
														</span>
													</td>
													<td>
														<button className="btn btn-sm btn-primary" id={item.id} title={item.id} onClick={this.editUseCompany}>编辑</button>
														<div className="space"></div>
														<button className="btn btn-sm btn-danger" data-id={item.id} data-type="use" onClick={this.openModal}>删除</button>
													</td>
												</tr>
											);
										})}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
				<Modal isOpen={this.state.isOpen} onRequestClose={this.closeModal} className={{ base: 'modal-dialog', afterOpen: '' }} overlayClassName={{ base: 'modal-backdrop fade', afterOpen: 'in' }} bodyOpenClassName="modal-open" shouldCloseOnOverlayClick={true} style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)' }, content: { backgroundColor: '#fff' } }}>
					<div className="modal-header">
						<div className="text-danger">警告！！</div>
					</div>
					<div className="modal-body">
						<div className="text-danger text-center size-h3">是否确认删除此公司？</div>
					</div>
					<div className="modal-footer">
						<button className="btn btn-danger" onClick={this.deleteCompany}>确认删除</button>
						<button className="btn btn-warning" onClick={this.closeModal}>取消</button>
					</div>
				</Modal>
			</div>
		);
	}
}

Company.propTypes = {
	style: PropTypes.string
};

Company.defaultProps = {
	style: 'wapper'
};

export default Company;
