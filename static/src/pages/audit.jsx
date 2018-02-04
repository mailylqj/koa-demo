import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import {Link} from 'react-router-dom';
import { toast } from 'react-toastify';
import { Cookies } from '@/component/utils';

class Audit extends React.Component {
	constructor(props) {
		super(props);
		this.state = {device : []};
	}
	componentDidMount(){
		const that = this;
		const param = { token: Cookies.get('_token') };
		axios.post('/ajax/deviceSelect_UNAllow', param).then(function(data){
			let result = data.data;
			if(result.result == 0){
				that.setState({ 'device': result.data });
			}else{
				toast.error(result.message);
			}
		});
	}
	checkDevice = (e) => {
		const that = this;
		let diviceId = e.target.id;
		const param = { id: diviceId, token: Cookies.get('_token') };
		axios.post('/ajax/deviceReview', param).then(function(data){
			let result = data.data;
			if(result.result == 0){
				let _index = 0;
				for (var i = 0, ii = that.state.device.length; i < ii; i++) {
					let item = that.state.device[i];
					if(result.data.id == item.id){
						_index = i; break;						
					}
				}
				that.setState(update(that.state, {
					device: {
						[_index]: {
							ischeck: {
								$set: result.data.ischeck
							}
						}
					}
				}));
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
							<table className="table">
								<thead>
									<tr><th>#</th><th>设备编号</th><th>设备名称</th><th>状态</th><th>数据</th></tr>
								</thead>
								<tbody>
								{this.state.device.map((item, index) => {
									let checkState = item.ischeck == 0 ? '正常' : item.ischeck == 1 ? '未审核' : '异常';
									let style = item.ischeck == 0 ? 'label-success' : item.ischeck == 1 ? 'label-warning' : 'label-danger';
									return (
										<tr key={index}>
											<td>{item.id}</td>
											<td>{item.device_id}</td>
											<td><span className="color-success"><i className="fa fa-level-up"></i></span>{item.device_name}</td>
											<td><span className={'label ' + style}>{checkState}</span></td>
											<td>
												<button className="btn btn-sm btn-primary" onClick={this.checkDevice} bind-index={index} id={item.id}>审核当前设备</button>
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

Audit.propTypes = {
	style: PropTypes.string
};

Audit.defaultProps = {
	style: 'wapper'
};

export default Audit;
