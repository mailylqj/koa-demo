import * as React from 'react';
import * as Highcharts from 'highcharts';
import highchartsMore from 'highcharts/highcharts-more';
import Exporting from 'highcharts/modules/exporting';
// Initialize exporting module.
highchartsMore(Highcharts);
Exporting(Highcharts);

const { useEffect, useRef } = React;

function Charts(props: any) {
	const chartRef = useRef();
	const containerRef = useRef();
	function createChart() {
		const H = props.highcharts || Highcharts;
		const type = props.type || 'Chart';
		if (!H) {
			console.warn('The "highcharts" property was not passed.');
		} else if (!H[type]) {
			console.warn(
				'The "type" property is incorrect or some required module is not imported.'
			);
		} else if (!props.options) {
			console.warn('The "options" property was not passed.');
		} else {
			chartRef.current = H[type](
				containerRef.current,
				props.options,
				props.callback ? props.callback : undefined
			);
		}
	}
	useEffect(() => {
		if(!chartRef.current){
			createChart();
		}
	}, [props.options]);

	useEffect(() => {
		return () => {
			const series = props.series;
			if(!chartRef.current){
				createChart();
			}else{
				series.forEach((val, index) => {
					if (chartRef.current.real) {
						chartRef.current.real[index].addPoint([val], true, true);
					} else {
						chartRef.current.series[index].setData([val]);
					}
				})
			}
		}
	}, [props.series]);

	useEffect(() => {
		return () => {
			chartRef.current && chartRef.current.destroy()
		}
	}, []);

	return (
		<div {...props.containerProps} ref={containerRef}></div>
	)
}

export default Charts;