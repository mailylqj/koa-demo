import React from 'react';
import Highcharts from 'highcharts';
import highchartsMore from 'highcharts/highcharts-more';
import Exporting from 'highcharts/modules/exporting';
// Initialize exporting module.
highchartsMore(Highcharts);
Exporting(Highcharts);

class Charts extends React.Component {
	componentDidMount() {
		const that = this;
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

		this.timer = setInterval(function(){
			that.chart.series[0].setData(that.props.series);
		}, 2000);
	}
	//Destroy chart before unmount.
	componentWillUnmount() {
		this.chart.destroy();
		clearInterval(this.timer);
	}
	render() {
		return (
			<div id={this.props.container}></div>
		);
	}
}

export default Charts;