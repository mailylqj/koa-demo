import React from 'react';
// import axios from 'axios';
//import Websocket from 'react-websocket';

class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			count: 1
		};
	}
	componentDidMount() {
		this.socket = new WebSocket('ws://localhost:8090/chat');
		this.socket.onopen = () => this.onSocketOpen();
		this.socket.onmessage = (m) => this.onSocketData(m);
		this.socket.onclose = () => this.onSocketClose();
	}
	onSocketOpen() {
		console.log('Connection established!');
	}
	onSocketData(data) {
		console.log(data)
		const result = JSON.parse(data.data);
		this.setState({ count: this.state.count + result.count });
	}
	onSocketClose() {
		console.log('Connection closed!');
	}
	handleChange = (e) => {
		var msg = { count: e.target.value };
		this.setState({ count: e.target.value });
		this.socket.send(JSON.stringify(msg));
	}
	render() {
		return (
			<div>
				<ul>{this.state.count}</ul>
				<input value={this.state.count} onChange={this.handleChange} />
			</div>
		);
	}
}

export default Main;
