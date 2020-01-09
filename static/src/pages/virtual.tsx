import * as React from 'react';
import * as axios from 'axios';
import * as moment from 'moment';
import * as PropTypes from 'prop-types';
import update from 'immutability-helper';
import { toast } from 'react-toastify';
import Charts from '@/include/chart';
import Options from '@/component/chatOptions';
import { Cookies } from '@/component/utils';

class Virtual extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			array: [],
			items: {},
			container: { mod_list: {} },
			elements: {},
			canContorl: {},
			curWidget: null
		};
		this.line = {};
	}
	componentDidMount(){
		let that = this;
		let param = {device_id: this.props.match.params.id, token: Cookies.get('__token')};
		axios.post('/ajax/layoutSelectByDeviceID', param).then(function(data){
			let result = data.data;
			if(result.data && !result.data.add){
				let { data: container } = result;
				that.setState({container: container});
			}else{
				toast.error(result.message);
			}
		});
		axios.post('/ajax/layoutSelectWriteByDeviceID', param).then(function (data) {
			let result = data.data;
			if (result.result == 0) {
				that.setState({ canContorl: result.data });
			} else {
				toast.error(result.message);
			}
		});
		this.socket = new WebSocket('ws://' + location.host + '/ws/socket/' + this.props.match.params.id);
		this.socket.onopen = () => this.onSocketOpen();
		this.socket.onmessage = (m) => this.onSocketData(m);
		this.socket.onclose = () => this.onSocketClose();
	}
	onSocketOpen() {
		console.log('Connection established!');
	}
	onSocketData(data) {
		const result = JSON.parse(data.data);		
		this.setState(
			update(this.state, {
				items: { $merge: result.data_map }
			})
		);
	}
	onSocketClose() {
		console.log('Connection closed!');
	}
	renderWidget = (id, data) => {
		let { type } = data;
		let value = this.state.items[id];
		switch(type) {
		case 'image': {
			return(<img style={{maxHeight: '100%', maxWidth: '100%'}} src={data.defaultImg}/>);
		}
		case 'boolean':{
			let imgSrc = value == 1 ? data.currentImg : data.defaultImg;
			return(<img style={{maxHeight: '100%', maxWidth: '100%'}} src={imgSrc}/>);
		}
		case 'curve': {
			let chart = JSON.parse(JSON.stringify(Options[type]));
			chart['chart'] = {events: {load: function () {this.real = this.series[0];} }};
			let dvalue = [value];
			return(<Charts style={{height: data.height, width: data.width}} type="chart" data={data} container={'chart' + id} options={chart} series={dvalue}/>);
		}
		case 'speed':
		case 'column':
		case 'voltage':{
			let chart = JSON.parse(JSON.stringify(Options[type]));
			if (type == 'speed' && data.max && data.min){
				chart['yAxis']['plotBands'] = [{
					from: parseInt(data.min),
					to: parseInt(data.max) * 0.6,
					color: '#55BF3B' // green
				}, {
					from: parseInt(data.max) * 0.6,
					to: parseInt(data.max) * 0.8,
					color: '#DDDF0D' // yellow
				}, {
					from: parseInt(data.max) * 0.8,
					to: parseInt(data.max),
					color: '#DF5353' // red
				}];
			}
			let dvalue = [value];
			return(<Charts style={{height: data.height, width: data.width}} type="chart" data={data} container={'chart' + id} options={chart} series={dvalue}/>);
		}
		default: {
			return(<div style={{padding: '0.5rem 1rem'}}>{value ? value : data.title}</div>);
		}}
	}
	changeValue = e => {
		this.setState({ cmder: e.target.value });
	}
	chooseWidget = e => {
		this.setState({ curWidget: e.currentTarget.value });
	}
	sendControl = () => {
		let param = {
			value: this.state.cmder,
			id: this.state.curWidget,
			device_id: this.props.match.params.id,
			token: Cookies.get('__token')
		};
		let that = this;
		axios.post('/ajax/control', param).then(function (data) {
			let result = data.data;
			if (result.result == 0) {
				toast.success(result.message);
			} else {
				that.props.history.push('/login');
			}
		}).catch(function (error) {
			console.log(error);
		});
	}
	componentWillUnmount() {
		this.socket.close();
	}
	render() {
		if (!this.props.style) {
			return null;
		}
		let container = this.state.container;
		let { mod_list: elements } = container;
		return (			
			<div className={this.props.style} id="content">
				<div className="page">
					<div className="panel panel-default">
						<div className="panel-heading">
							<span>实时数据展示</span>
						</div>
						<div className="control-area">
							<div className="row">
								<div className="col-md-6">
									{Object.keys(this.state.canContorl).map(key => {
										let widget = this.state.canContorl[key];
										return (
											<label key={key} className="ui-radio">
												<input name="widget" type="radio" value={key} onChange={this.chooseWidget} />
												<span>{widget.title}</span>
											</label>
										);
									})}
								</div>
								<div className="col-md-5" style={{ paddingTop: 5 }}><textarea style={{ resize: 'none', width: '100%' }} onChange={this.changeValue}>{this.state.cmder}</textarea></div>
								<div className="col-md-1" style={{ paddingTop: 10 }}><a href="javascript:;" className="btn btn-warning" onClick={this.sendControl}>控制</a></div>
							</div>
						</div>
						<div className="panel-body">							
							<div style={{...container, position:'relative'}}>
								{Object.keys(elements).map(key => {
									let eleData = elements[key];
									return (
										<div style={{...eleData, position: 'absolute'}} key={key}>
											{this.renderWidget(key, eleData)}
										</div>
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

Virtual.propTypes = {
	style: PropTypes.string
};

Virtual.defaultProps = {
	style: 'wapper'
};

export default Virtual;
