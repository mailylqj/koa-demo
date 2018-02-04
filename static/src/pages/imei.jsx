import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import { toast } from 'react-toastify';
import { Cookies } from '@/component/utils';

class Imei extends React.Component {
	constructor(props) {
		super(props);
		this.state = {imeiList : [], imei: ''};
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
	changeValue = (e) => {
		this.setState({imei: e.target.value});
	}
	searchImei(){
		const that = this;
		const param = {imei: this.state.imei, token: Cookies.get('_token') };
		axios.post('/ajax/imeiSelectByImei', param).then(function(data){
			let result = data.data;
			if(result.result == 0){
				that.setState({ 'imeiList': result.data });
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
												<button className="btn btn-sm btn-primary" onClick={this.checkDevice} id={item.id}>编辑</button>
												<div className="space"></div>
												<button className="btn btn-sm btn-danger" data-id={item.id} onClick={this.openModal}>删除</button>
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
