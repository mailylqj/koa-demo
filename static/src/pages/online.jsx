import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

class Online extends React.Component {
	constructor(props) {
		super(props);
		this.state = {device : []};
	}
	componentDidMount(){
		const that = this;
		const user = { username: 'klzy' };
		axios.post('/ajax/getDeviceList', user).then(function(data){
			that.setState({ 'device': data.data });
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
						<table className="table">
							<thead>
								<tr><th>#</th><th>设备编号</th><th>设备名称</th><th>状态</th><th>数据</th></tr>
							</thead>
							<tbody>
							{this.state.device.map((item, index) => {
								return (
									<tr key={index}>
										<td>{index}</td>
										<td><Link to={'/real/' + item.deviceNO} title={item.deviceNO}>{item.deviceNO}</Link></td>
										<td><span className="color-success"><i className="fa fa-level-up"></i></span>{item.deviceName}</td>
										<td><span className={'label ' + (item.onLine ? 'label-success' : 'label-default')}>{item.onLine ? '在线' : '离线'}</span></td>
										<td>
											<Link className="btn btn-sm btn-primary" to={'/real/' + item.deviceNO} title={item.deviceNO}>查看实时数据</Link>
											<div className="space"></div>
											<Link className="btn btn-sm btn-danger" to={'/history/' + item.deviceNO} title={item.deviceNO}>查看历史数据</Link>
										</td>
									</tr>
								);
							})}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		);
	}
}

Online.propTypes = {
	style: PropTypes.string
};

Online.defaultProps = {
	style: 'wapper'
};

export default Online;
