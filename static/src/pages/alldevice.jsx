import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import {Link} from 'react-router-dom';
import { toast } from 'react-toastify';
import { Cookies } from '@/component/utils';

class AllDevice extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			device : [],
			isOpen: false,
			curDeviceId: ''
		};
	}
	componentDidMount(){
		let that = this;
		let param = { token: Cookies.get('__token') };
		axios.post('/ajax/deviceSelectAll', param).then(function(data){
			let result = data.data;
			if(result.result == 0){
				that.setState({ 'device': result.data });
			}else{
				toast.error(result.message);
			}
		});
	}
	openModal = (e) => {
		this.deviceId = e.target.getAttribute('data-id');
		this.setState({isOpen: true});
	}
	deleteDevice = (e) => {
		let that = this;
		let param = {deviceid_list:[this.deviceId], token: Cookies.get('__token') };
		axios.post('/ajax/deviceDel', param).then(function(data){
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
	changeValue = e => {
		this.setState({curDeviceId: e.target.value});
	}
	searchDevice(){
		//
	}
	closeModal = (e) => {
		this.deviceId = null;
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
									<Link className="btn btn-w-md btn-info" to="/adddevice">添加设备</Link>
								</div>
								<div className="col-md-4"></div>
								<div className="col-md-4">
									<div className="input-group">
										<input type="text" className="form-control" value={this.state.curDeviceId} onChange={this.changeValue} placeholder="请输入设备编号"/>
										<span className="input-group-btn">
											<button className="btn btn-success" type="button" onClick={this.searchDevice}>查询</button>
										</span>
									</div>
								</div>
							</div>
							<table className="table table-hover">
								<thead>
									<tr><th>#</th><th>设备编号</th><th>设备名称</th><th>用户</th><th>生产商</th><th>使用商</th><th>操作</th></tr>
								</thead>
								<tbody>
								{this.state.device.map((item, index) => {
									return (
										<tr key={index}>
											<td>{index}</td>
											<td>{item.device_id}</td>
											<td>{item.device_name}</td>
											<td>{item.configfile_name}</td>
											<td>{item.pro_company}</td>
											<td>{item.use_company}</td>
											<td>
												<Link className="btn btn-sm btn-primary" to={'/editvr/' + item.device_id} title={item.device_id}>编辑工程图</Link>
												<div className="space"></div>
												<Link className="btn btn-sm btn-primary" to={'/device/' + item.id} title={item.device_id}>编辑</Link>
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
								<div className="text-danger text-center size-h3">是否确认删除此设备？</div>
							</div>
							<div className="modal-footer">
								<button className="btn btn-danger" onClick={this.deleteDevice}>确认删除</button>
								<button className="btn btn-warning" onClick={this.closeModal}>取消</button>
							</div>
						</Modal>
					</div>
				</div>
			</div>
		);
	}
}

AllDevice.propTypes = {
	style: PropTypes.string
};

AllDevice.defaultProps = {
	style: 'wapper'
};

export default AllDevice;
