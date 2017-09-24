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