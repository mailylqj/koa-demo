import React from 'react';
import axios from 'axios';
import moment from 'moment';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import '@/component/prototype';
import { Cookies } from '@/component/utils';

import 'react-datepicker/dist/react-datepicker.css';

class Control extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			keyData: [],
			hisData: [],
			cmder: 'test',
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
				for (var i = 0, ii = result.data.data.length; i < ii; i++) {
					result.data.data[i]['dateTime'] = new Date(result.data.data[i].time).Format('yyyy-MM-dd HH:mm:ss');
				}
				that.setState({ 'hisData': result.data.data });
				that.setState({ 'keyData': that.state.hisData[0].value_list});
			}else{
				that.props.history.push('/login');
			}	
		}).catch(function(error){
			console.log(error);
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
									<DatePicker className="form-control" dateFormat="YYYY-MM-DD hh:mm" timeIntervals={5} showTimeSelect placeholderText="开始时间" selected={this.state.startTime} onChange={this.pickStartTime}></DatePicker>
								</div>
								<div className="col-md-5">
									<DatePicker className="form-control" dateFormat="YYYY-MM-DD hh:mm" timeIntervals={5} showTimeSelect placeholderText="结束时间" selected={this.state.endTime} onChange={this.pickEndTime}></DatePicker>
								</div>
								<div className="col-md-2">
									<button type="submit" className="btn btn-w-md btn-primary" onClick={this.getControl}>查询</button>
								</div>
							</div>							
							<table className="table">
								<thead>
									<tr>
										<th>时间</th>
										{this.state.keyData.map((item, index) => {
											return <th key={index}>{item.name}</th>;
										})}
									</tr>	
								</thead>
								<tbody>
									{this.state.hisData.map((item, index) => {
										return (
											<tr key={index}>
												<td>{item.dateTime}</td>
												{item.value_list.map((val, index) => {
													return <td key={index}>{val.value}</td>;
												})}
											</tr>
										);
									})}
								</tbody>
							</table>
							<ul className="pagination-sm pagination">
								<li>
									<a>First</a>
								</li>
								<li>
									<a>Previous</a>
								</li>
								<li>
									<a>1</a>
								</li>
								<li>
									<a>Next</a>
								</li>
								<li>
									<a>Last</a>
								</li>
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
