import * as React from 'react';
import * as axios from 'axios';
import * as PropTypes from 'prop-types';
import { Cookies } from '@/component/utils';
import Charts from '@/include/chart';
import { curve } from '@/component/chatOptions';
import Datetime from 'react-datetime';
import * as update from 'immutability-helper';
import { toast } from 'react-toastify';
import * as moment from 'moment';
import 'react-datetime/css/react-datetime.css';

class History extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedIds: [],
			control: {},
			ctrlData: {},
			startTime: moment(),
			endTime: moment()
		};
	}
	componentDidMount(){
		let param = {
			device_id: this.props.match.params.id,
			token: Cookies.get('__token')
		};
		let that = this;
		axios.post('/ajax/getDataList', param).then(function(data){
			let result = data.data;
			if(result.result == 0){
				that.setState({control: result.data, endTime: moment()});
			}else{
				toast.error(result.message);
			}
		});		
	}	
	pickStartTime = date => {
		this.setState({startTime: date});
	}
	pickEndTime = date => {
		this.setState({endTime: date});
	}
	toggleCheck = (e) => {
		if(e.target.checked){
			this.setState( 
				update(this.state, {
					selectedIds: { $push: [e.target.value] }
				})
			);
		}else{
			let index = this.state.selectedIds.indexOf(e.target.value);
			this.setState( 
				update(this.state, {
					selectedIds: { $unset: [index] }
				})
			);
		}
	}
	getHistory = () => {
		let param = {
			endTime: this.state.endTime.valueOf(),
			startTime: this.state.startTime.valueOf(),
			uid: this.props.match.params.id,
			idList: this.state.selectedIds,
			token: Cookies.get('__token')
		};
		
		let that = this;
		axios.post('/ajax/readModData', param).then(function(data){
			let result = data.data;
			if(result.result == 0){
				Object.keys(result.data).map(key => {
					let item = result.data[key];
					result.data[key]['option'] = {width: '100%', height:400, title: key};
					let chart =  JSON.parse(JSON.stringify(curve)); // 深度拷贝对象
					chart['chart'] = {zoomType: 'x'};					
					chart['series'] = [{
						name: '设备控件历史数据折线图',
						data: item.data || [],
						pointStart: item.startTime + 1000*60*60*8,
						pointInterval: item.step * 1000
					}];
					result.data[key]['chart'] = chart;
				});
				that.setState({ctrlData: result.data});
			}else if([-2,-14].indexOf(result.result) > -1) {
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
							<span>设备历史数据</span>
						</div>
						<div className="row">
							<div className="col-md-2">
								<ul className="control-list">
									{Object.keys(this.state.control).map(key => {
										let item = this.state.control[key];
										return (
											<li className="control" key={key}>
												<label className="ui-checkbox">
													<input name="control" type="checkbox" value={key} onChange={this.toggleCheck}/>
													<span>{item.name}</span>
												</label>
											</li>
										);
									})}
								</ul>
							</div>
							<div className="col-md-10">
								<div className="clearfix data-fillter">
									<div className="col-md-5">
										<Datetime dateFormat="YYYY-MM-DD" timeFormat="HH:mm:ss" inputProps={{ placeholder: '开始时间' }} VALUE={this.state.startTime} onChange={this.pickStartTime}></Datetime>
									</div>
									<div className="col-md-5">
										<Datetime dateFormat="YYYY-MM-DD" timeFormat="HH:mm:ss" inputProps={{ placeholder: '结束时间' }} VALUE={this.state.endTime} onChange={this.pickEndTime}></Datetime>
									</div>
									<div className="col-md-2">
										<button type="submit" className="btn btn-w-md btn-primary" onClick={this.getHistory}>查询</button>
									</div>
								</div>
								{Object.keys(this.state.ctrlData).map(key => {
									let item = this.state.ctrlData[key];
									return (
										<Charts key={key} style={{width: '100%', height: 400}} type="chart" data={item.option} container={'chart' + key} options={item.chart}/>
									);
								})}
							</div>
						</div>						
					</div>
				</div>
			</div>
		);
	}
}

History.propTypes = {
	style: PropTypes.string
};

History.defaultProps = {
	style: 'wapper'
};

export default History;
