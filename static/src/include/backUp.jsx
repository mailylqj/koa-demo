/****************************************************************************
 static Charts Component
 websocket 各种示例备份
*****************************************************************************/ 
import React from 'react';
// import axios from 'axios';
// import WebSocket from 'ws';
import Websocket from 'react-websocket';

class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			count: 1
		};
	}
	componentDidMount() {
		this.socket = new WebSocket('ws://localhost:8090/ws/chat');
		this.socket.onopen = () => this.onSocketOpen();
		this.socket.onmessage = (m) => this.onSocketData(m);
		this.socket.onclose = () => this.onSocketClose();
	}
	onSocketOpen() {
		console.log('Connection established!');
	}
	onSocketData(data) {
		console.log(data);
		const result = JSON.parse(data.data);
		this.setState({ count: result.count });
	}
	onSocketClose() {
		console.log('Connection closed!');
	}
	handleChange = (e) => {
		var msg = { count: e.target.value };
		this.setState({ count: e.target.value });
		this.socket.send(JSON.stringify(msg));
	}
	handleData(data) {
		let result = JSON.parse(data);
		this.setState({count: result.count});
	}
	render() {
		return (
			<div>
				<ul>
					<li>{this.state.count}</li>
					<li><input value={this.state.count} onChange={this.handleChange} /></li>
					<li>Count: <strong>{this.state.count}</strong></li>
					<Websocket url='ws://localhost:8090/ws/chat'
					onMessage={this.handleData.bind(this)}/>
				</ul>				
			</div>
		);
	}
}

export default Main;


/****************************************************************************
 static Charts Component
 静态图表代码备份
*****************************************************************************/ 

import React from 'react';
import Highcharts from 'highcharts';

class Charts extends React.Component {
	componentDidMount() {
		// Extend Highcharts with modules
		if (this.props.modules) {
			this.props.modules.forEach(function (module) {
				module(Highcharts);
			});
		}
		console.log(this.props);
		// Set container which the chart should render to.
		this.chart = new Highcharts[this.props.type || 'Chart'](
			this.props.container,
			this.props.options
		);
	}
	//Destroy chart before unmount.
	componentWillUnmount() {
		this.chart.destroy();
	}
	render() {
		return (
			<div id={this.props.container}></div>
		);
	}
}

export default Charts;
