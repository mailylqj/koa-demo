import React from 'react';
import axios from 'axios';
import moment from 'moment';
import PropTypes from 'prop-types';
import Datetime from 'react-datetime';
import { toast } from 'react-toastify';
import { Cookies } from '@/component/utils';

import 'react-datetime/css/react-datetime.css';

class Control extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hisData: [],
			curPage: 1,
			startTime: moment(),
			endTime: moment()
		};
	}
	componentDidMount(){
		
	}
	pickStartTime = date => {
		this.setState({startTime: date});
	}
	pickEndTime = date => {
		this.setState({endTime: date});
	}	
	getControl = () => {
		let param = {
			endTime: this.state.endTime.valueOf(),
			startTime: this.state.startTime.valueOf(),
			uid: this.props.match.params.id,
			token: Cookies.get('__token')
		};
		let that = this;
		axios.post('/ajax/readControlData', param).then(function(data){
			let result = data.data;
			if(result.result == 0){
				for (var i = 0, ii = result.data.length; i < ii; i++) {
					result.data[i]['dateTime'] = moment(result.data[i].date).format('YYYY-MM-DD HH:mm:ss');
				}
				that.setState({ 'hisData': result.data });
			} else if ([-2, -14].indexOf(result.result) > -1) {
				that.props.history.push('/login');
			} else {
				toast.error(result.message);
			}	
		}).catch(function(error){
			console.log(error);
		});
	}
	getPrevpage = e => {
		let that = this;
		if (this.state.curPage > 1) {
			axios.post('/ajax/readControlDataPrev').then(function (data) {
				let result = data.data;
				if (result.result == 0) {
					for (var i = 0, ii = result.data.length; i < ii; i++) {
						result.data[i]['dateTime'] = moment(result.data[i].date).format('YYYY-MM-DD HH:mm:ss');
					}
					that.setState({ 'hisData': result.data, curPage: that.state.curPage - 1 });
				} else if ([-2, -14].indexOf(result.result) > -1) {
					that.props.history.push('/login');
				} else {
					toast.error(result.message);
				}
			});
		}
	}
	getNextpage = e => {
		let that = this;
		axios.post('/ajax/readControlDataNext').then(function (data) {
			let result = data.data;
			if (result.result == 0) {
				for (var i = 0, ii = result.data.data.length; i < ii; i++) {
					result.data.data[i]['dateTime'] = moment(result.data.data[i].date).format('YYYY-MM-DD HH:mm:ss');
				}
				that.setState({ 'hisData': result.data.data, curPage: that.state.curPage + 1 });
			} else if ([-2, -14].indexOf(result.result) > -1) {
				that.props.history.push('/login');
			} else {
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
							<span>设备控制数据</span>
						</div>
						<div className="panel-body">
							<div className="clearfix data-fillter">
								<div className="col-md-5">
									<Datetime dateFormat="YYYY-MM-DD" timeFormat="HH:mm:ss" inputProps={{ placeholder: '开始时间' }} value={this.state.startTime} onChange={this.pickStartTime}></Datetime>
								</div>
								<div className="col-md-5">
									<Datetime dateFormat="YYYY-MM-DD" timeFormat="HH:mm:ss" inputProps={{ placeholder: '结束时间' }} value={this.state.endTime} onChange={this.pickEndTime}></Datetime>
								</div>
								<div className="col-md-2">
									<button type="submit" className="btn btn-w-md btn-primary" onClick={this.getControl}>查询</button>
								</div>
							</div>							
							<table className="table">
								<thead>
									<tr><th>时间</th><th>控件名</th><th>IMEI</th><th>设定值</th></tr>
								</thead>
								<tbody>
									{this.state.hisData.map((item, index) => {
										return (
											<tr key={index}>
												<td>{item.dateTime}</td>
												<td>{item.name}</td>
												<td>{item.imei}</td>
												<td>{item.content}</td>
											</tr>
										);
									})}
								</tbody>
							</table>
							<ul className="pagination-sm pagination">
								<li><a href="javascript:;" onClick={this.getPrevpage}>上一页</a></li>
								<li><span>{this.state.curPage}</span></li>
								<li><a href="javascript:;" onClick={this.getNextpage}>下一页</a></li>
							</ul>
						</div>
					</div>	
				</div>
			</div>
		);
	}
}

Control.propTypes = {
	style: PropTypes.string
};

Control.defaultProps = {
	style: 'wapper'
};

export default Control;
