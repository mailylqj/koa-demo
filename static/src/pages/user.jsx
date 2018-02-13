import React from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import {Link} from 'react-router-dom';
import { toast } from 'react-toastify';
import { Cookies } from '@/component/utils';

class User extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user : [],
			username: '',
			isOpen: false
		};
	}
	componentDidMount(){
		let that = this;
		let param = { token: Cookies.get('__token') };
		axios.post('/ajax/userSelectAll', param).then(function(data){
			let result = data.data;
			if(result.result == 0){
				that.setState({ 'user': result.data });
			}else{
				toast.error(result.message);
			}
		});
	}
	deleteUser = (e) =>{
		let that = this;
		let param = {namelist:[this.userId], token: Cookies.get('__token') };
		axios.post('/ajax/userDel', param).then(function(data){
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
	changeValue = (e) => {
		this.setState({ username: e.target.value });
	}
	openModal = (e) =>{
		this.userId = e.target.getAttribute('data-id');
		this.setState({isOpen: true});
	}
	closeModal = (e) =>{
		this.userId = null;
		this.setState({isOpen: false});
	}	
	searchUser = () => {
		let that = this;
		let param = {name: this.state.username, token: Cookies.get('__token') };
		axios.post('/ajax/userSelectByName', param).then(function(data){
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
							<span>用户列表</span>
						</div>
						<div className="panel-body">
							<div className="row" style={{paddingBottom: '15px', marginBottom: '15px', borderBottom: '1px solid #ddd'}}>
								<div className="col-md-4">
									<Link className="btn btn-w-md btn-info" to="/adduser">添加用户</Link>									
								</div>
								<div className="col-md-4"></div>
								<div className="col-md-4">
									<div className="input-group">
										<input type="text" className="form-control" value={this.state.username} onChange={this.changeValue} placeholder="请输入用户名"/>
										<span className="input-group-btn">
											<button className="btn btn-success" type="button" onClick={this.searchUser}>查询</button>
										</span>
									</div>
								</div>
							</div>
							<table className="table table-hover">
								<thead>
									<tr><th>#</th><th>用户名</th><th>生产公司</th><th>使用公司</th><th>权限</th><th>操作</th></tr>
								</thead>
								<tbody>
								{this.state.user.map((item, index) => {
									return (
										<tr key={index}>
											<td>{item.id}</td>
											<td>{item.username}</td>											
											<td data-id={item.pro_company_id}>{item.pro_company}</td>
											<td data-id={item.use_company_id}>{item.use_company}</td>
											<td><span className="color-success"><i className="fa fa-level-up"></i></span>{item.level_name}</td>
											<td>
												<Link className="btn btn-sm btn-primary" to={'/user/' + item.id} title={item.username}>编辑</Link>
												<div className="space"></div>
												<button className="btn btn-sm btn-danger" data-id={item.id} onClick={this.openModal}>删除</button>
											</td>
										</tr>
									);
								})}
								</tbody>
							</table>
							<Modal isOpen={this.state.isOpen} onRequestClose={this.closeModal} className={{base:'modal-dialog', afterOpen:''}} overlayClassName={{base: 'modal-backdrop fade', afterOpen: 'in'}} bodyOpenClassName="modal-open" shouldCloseOnOverlayClick={true} style={{overlay: {backgroundColor: 'rgba(0, 0, 0, 0.5)'}, content: {backgroundColor: '#fff'}}}>
								<div className="modal-header">
									<div className="text-danger">警告！！</div>
								</div>
								<div className="modal-body">
									<div className="text-danger text-center size-h3">是否确认删除此用户？</div>
								</div>
								<div className="modal-footer">
									<button className="btn btn-danger" onClick={this.deleteUser}>确认删除</button>
									<button className="btn btn-warning" onClick={this.closeModal}>取消</button>
								</div>
							</Modal>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

User.defaultProps = {
	style: 'wapper'
};

export default User;