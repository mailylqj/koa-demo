import React from 'react';
import Charts from '@/include/chart.jsx';
import Options from '@/component/chatOptions';

class Visual extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			items: [],
			array: [],
			temp: [],
			chart: Options.chart,
			gauge: Options.gauge,
			vugauge: Options.vugauge,
			health: Options.health
		};
	}
	componentDidMount(){
		this.socket = new WebSocket('ws://localhost:8080/ws/socket/' + this.props.match.params.id);
		this.socket.onopen = () => this.onSocketOpen();
		this.socket.onmessage = (m) => this.onSocketData(m);
		this.socket.onclose = () => this.onSocketClose();
	}
	onSocketOpen() {
		console.log('Connection established!');
	}
	onSocketData(data) {
		const result = JSON.parse(data.data);
		this.setState({items: result.value_list});
	}
	onSocketClose() {
		console.log('Connection closed!');
	}
	renderChart(item, index) {
		switch(item.showType) {
		case 'bit':
			return (
				<label className="switch switch-success"><input type="checkbox" checked={ item.value == 1 ? true : false} disabled="disabled" className="ng-valid ng-dirty"/><i></i></label>
			);
		case 'int':
			return (
				<div style={{fontSize: '22px', fontWeight: 'bold', textAlign: 'center'}}>{item.value}{item.unit}</div>
			);	
		case 'curve':
			this.state.array.push(item.value);
			if(this.state.array.length > 12){
				this.state.array = this.state.array.slice(1);
			}
			return (
				<Charts type="chart" container={'chart' + index} options={this.state.chart} series={this.state.array}/>
			);
		case 'rotate':
			this.state.temp = [item.value];
			return (
				<Charts type="chart" container={'chart' + index} options={this.state.gauge} series={this.state.temp}/>
			);
		
		case 'arcprogress':
			this.state.temp = [item.value];
			return (
				<Charts type="chart" container={'chart' + index} options={this.state.vugauge} series={this.state.temp}/>
			);
		case 'healthvalue':
			this.state.temp = [item.value];
			return (
				<Charts type="chart" container={'chart' + index} options={this.state.health} series={this.state.temp}/>
			);
		}
	}
	render() {
		if (!this.props.style) {
			return null;
		}
		return (			
			<div className={this.props.style} id="content">
				<div className="page">
					<div className="row">
						{this.state.items.map((item, index) => {
							return (
								<div key={index} className={item.showType == 'bit' ? 'col-md-3' : 'col-md-6'}>
									<div className="panel panel-default">
										<div className="panel-heading">
											<span>{item.name}</span>
										</div>
										<div className="panel-body">
											{this.renderChart(item, index)}
										</div>
									</div>
								</div>
							);
						})}
					</div>
					<div className="row">
						<div className="col-md-6">
							<div className="panel panel-default">
								<div className="panel-heading">
									<span>index</span>
								</div>
								<div className="panel-body">
									<Charts type="Chart" container="chart" options={this.state.chart} series={this.state.array}/>
								</div>
							</div>
						</div>
						<div className="col-md-6">
							<div className="panel panel-default">
								<div className="panel-heading">
									<span>index</span>
								</div>
								<div className="panel-body">
									<Charts type="Chart" container="chart100" options={this.state.gauge} series={this.state.temp}/>
								</div>
							</div>
						</div>
						<div className="col-md-6">
							<div className="panel panel-default">
								<div className="panel-heading">
									<span>index</span>
								</div>
								<div className="panel-body">
									<Charts type="Chart" container="chart101" options={this.state.vugauge} series={this.state.temp}/>
								</div>
							</div>
						</div>
					</div>					
				</div>
			</div>
		);
	}
}

Visual.propTypes = {
	style: React.PropTypes.string
};

Visual.defaultProps = {
	style: 'wapper'
};

export default Visual;