import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import {Link} from 'react-router-dom';
import { toast } from 'react-toastify';
import { Cookies } from '@/component/utils';

class Imei extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			imeiList : [], 
			imei: '',
			isOpen: false
		};
	}
	componentDidMount(){
		const that = this;
		const param = { token: Cookies.get('_token') };
		axios.post('/ajax/imeiSelectAll', param).then(function(data){
			let result = data.data;
			if(result.result == 0){
				that.setState({ 'imeiList': result.data });
			}else{
				toast.error(result.message);
			}
		});
	}
	changeValue = e => {
		this.setState({imei: e.target.value});
	}
	searchImei = () => {
		const that = this;
		const param = {imei: this.state.imei, token: Cookies.get('_token') };
		axios.post('/ajax/imeiSelectByImei', param).then(function(data){
			let result = data.data;
			if(result.result == 0){
				that.setState({ 'imeiList': result.data });
			}else if([-2,-14].indexOf(result.result) > -1) {
				that.props.history.push('/login');
			}else{
				toast.error(result.message);
			}
		});
	}
	deleteImei = (e) => {
		let that = this;
		let param = {id_list:[this.imeiId], token: Cookies.get('__token') };
		axios.post('/ajax/imeiDel', param).then(function(data){
			let result = data.data;
			if(result.result == 0){
				that.setState({isOpen: false});
			}else if([-2,-14].indexOf(result.result) > -1) {
				that.props.history.push('/login');
			}else{
				toast.error(result.message);
			}
		});
	}
	openModal = (e) => {
		this.imeiId = e.target.getAttribute('data-id');
		this.setState({isOpen: true});
	}
	closeModal = (e) => {
		this.imeiId = null;
		this.setState({isOpen: false});
	}
	render() {
		if (!this.props.style) {
			return null;
		}
		return (
			<div className={this.props.style} id="content">
				<div className="page">
					<div className="panel panel-default">
						<div className="panel-heading">
							<span>在线设备列表</span>
						</div>
						<div className="panel-body">
							<div className="row" style={{paddingBottom: '15px', marginBottom: '15px', borderBottom: '1px solid #ddd'}}>
								<div className="col-md-4">
									<Link className="btn btn-w-md btn-info" to="/addimei">添加IMEI</Link>
								</div>
								<div className="col-md-4"></div>
								<div className="col-md-4">
									<div className="input-group">
										<input type="text" className="form-control" value={this.state.imei} onChange={this.changeValue} placeholder="请输入IMEI"/>
										<span className="input-group-btn">
											<button className="btn btn-success" type="button" onClick={this.searchImei}>查询</button>
										</span>
									</div>
								</div>
							</div>
							<table className="table">
								<thead>
									<tr><th>#</th><th>IMEI</th><th>信息</th><th>生产公司</th><th>使用公司</th><th>操作</th></tr>
								</thead>
								<tbody>
								{this.state.imeiList.map((item, index) => {
									return (
										<tr key={index}>
											<td>{item.id}</td>
											<td>{item.imei}</td>
											<td>{item.info}</td>
											<td>{item.pro_company}</td>
											<td>{item.use_company}</td>
											<td>
												<Link className="btn btn-sm btn-primary" to={'/imei/' + item.id} id={item.id}>编辑</Link>
												<div className="space"></div>
												<button className="btn btn-sm btn-danger" data-id={item.id} onClick={this.openModal}>删除</button>
											</td>
										</tr>
									);
								})}
								</tbody>
							</table>
						</div>
						<Modal isOpen={this.state.isOpen} onRequestClose={this.closeModal} className={{base:'modal-dialog', afterOpen:''}} overlayClassName={{base: 'modal-backdrop fade', afterOpen: 'in'}} bodyOpenClassName="modal-open" shouldCloseOnOverlayClick={true} style={{overlay: {backgroundColor: 'rgba(0, 0, 0, 0.5)'}, content: {backgroundColor: '#fff'}}}>
							<div className="modal-header">
								<div className="text-danger">警告！！</div>
							</div>
							<div className="modal-body">
								<div className="text-danger text-center size-h3">是否确认删除此IMEI？</div>
							</div>
							<div className="modal-footer">
								<button className="btn btn-danger" onClick={this.deleteImei}>确认删除</button>
								<button className="btn btn-warning" onClick={this.closeModal}>取消</button>
							</div>
						</Modal>
					</div>
				</div>
			</div>
		);
	}
}

Imei.propTypes = {
	style: PropTypes.string
};

Imei.defaultProps = {
	style: 'wapper'
};

export default Imei;
