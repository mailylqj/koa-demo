import React from 'react';
import Highcharts from 'highcharts';
import highchartsMore from 'highcharts/highcharts-more';
import Exporting from 'highcharts/modules/exporting';
// Initialize exporting module.
highchartsMore(Highcharts);
Exporting(Highcharts);

Highcharts.setOptions({
	global: {
		useUTC: false
	},
	exporting:{
		enabled:false
	},
	credits: {
		enabled: false
	}
});

class Charts extends React.Component {
	componentDidMount() {
		// Extend Highcharts with modules
		if (this.props.modules) {
			this.props.modules.forEach(function (module) {
				module(Highcharts);
			});
		}		
		
		// Set container which the chart should render to.
		this.chart = new Highcharts[this.props.type || 'Chart'](
			this.props.container,
			this.props.options
		);
		
		let { width, height, title, yAxis, min, max } = this.props.data;
		if(width || height) this.chart.setSize(width-2, height-2);
		if(max && min) this.chart.yAxis[0].setExtremes(min, max);
		if(title) this.chart.setTitle({ text: title });
		if(yAxis) this.chart.yAxis[0].setTitle({ text: yAxis });
	}
	componentWillReceiveProps(nextProps){
		let series = nextProps.series;
		let { width, height, title, yAxis, min, max } = this.props.data;
		if(width || height) this.chart.setSize(width-2, height-2);
		if(max && min) this.chart.yAxis[0].setExtremes(min, max);
		if(title) this.chart.setTitle({ text: title });
		if(yAxis) this.chart.yAxis[0].setTitle({ text: yAxis });
		if(series){
			if (this.chart.real){
				this.chart.real.addPoint(series, true, true);
			}else{
				this.chart.series[0].setData(series);
			}
		}
	}
	shouldComponentUpdate(){
		return false;
	}
	//Destroy chart before unmount.
	componentWillUnmount() {
		this.chart.destroy();
	}
	render() {
		return (
			<div id={this.props.container} style={this.props.style}></div>
		);
	}
}

export default Charts;