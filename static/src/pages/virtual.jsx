import React from 'react';
import axios from 'axios';
import moment from 'moment';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import { toast } from 'react-toastify';
import Charts from '@/include/chart.jsx';
import Options from '@/component/chatOptions';
import { Cookies } from '@/component/utils';

class Virtual extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			array: [],
			items: {},
			container: { mod_list: {} },
			elements: {}
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
							<span>index</span>
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
