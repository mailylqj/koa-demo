import moment from 'moment';
export default {
	curve: {
		exporting:{
			enabled:false
		},
		credits: {
			enabled: false
		},		
		xAxis: {
			type: 'datetime',
			dateTimeLabelFormats: {
				millisecond: '%H:%M:%S.%L',
				second: '%H:%M:%S',
				minute: '%H:%M',
				hour: '%H:%M',
				day: '%m-%d',
				week: '%m-%d',
				month: '%Y-%m',
				year: '%Y'
			}
		},
		series: [{
			name: '折线图',
			data: [null, null, null, null, null, null, null, null, null, null, null, null],
			pointStart: moment().valueOf(),
			pointInterval: 2 * 1000
		}]
	},
	column: {
		chart: {
			type: 'column'
		},
		title: {
			text: 'column'
		},
		exporting:{
			enabled:false
		},
		credits: {
			enabled: false
		},
		xAxis: {
			crosshair: true
		},
		yAxis: {
			min: 0
		},
		plotOptions: {
			column: {
				borderWidth: 0
			}
		},
		series: [{
			name: '柱状图',
			data: [99]
		}]
	},
	speed: {
		chart: {
			type: 'gauge',
			plotBackgroundColor: null,
			plotBackgroundImage: null,
			plotBorderWidth: 0,
			plotShadow: false
		},

		exporting:{
			enabled:false
		},

		credits: {
			enabled: false
		},

		title: {
			text: 'Speedometer'
		},

		pane: {
			startAngle: -150,
			endAngle: 150,
			background: [{
				backgroundColor: {
					linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
					stops: [
						[0, '#FFF'],
						[1, '#333']
					]
				},
				borderWidth: 0,
				outerRadius: '109%'
			}, {
				backgroundColor: {
					linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
					stops: [
						[0, '#333'],
						[1, '#FFF']
					]
				},
				borderWidth: 1,
				outerRadius: '107%'
			}, {
			// default background
			}, {
				backgroundColor: '#DDD',
				borderWidth: 0,
				outerRadius: '105%',
				innerRadius: '103%'
			}]
		},

		// the value axis
		yAxis: {
			min: 0,
			max: 500,

			minorTickInterval: 'auto',
			minorTickWidth: 1,
			minorTickLength: 10,
			minorTickPosition: 'inside',
			minorTickColor: '#666',

			tickPixelInterval: 30,
			tickWidth: 2,
			tickPosition: 'inside',
			tickLength: 10,
			tickColor: '#666',
			labels: {
				step: 2,
				rotation: 'auto'
			},
			title: {
				text: 'rpm'
			},
			plotBands: [{
				from: 0,
				to: 400,
				color: '#55BF3B' // green
			}, {
				from: 400,
				to: 450,
				color: '#DDDF0D' // yellow
			}, {
				from: 450,
				to: 500,
				color: '#DF5353' // red
			}]
		},

		series: [{
			name: 'Speed',
			data: [80]
		}]
	},	
	voltage: {
		chart: {
			type: 'gauge',
			plotBorderWidth: 1,
			plotBackgroundColor: {
				linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
				stops: [
					[0, '#FFF4C6'],
					[0.3, '#FFFFFF'],
					[1, '#FFF4C6']
				]
			},
			plotBackgroundImage: null,
			height: 150
		},

		exporting:{
			enabled:false
		},

		credits: {
			enabled: false
		},

		title: {
			text: '伏压仪'
		},

		pane: [{
			startAngle: -45,
			endAngle: 45,
			background: null,
			center: ['50%', '145%'],
			size: 150
		}],

		tooltip: {
			enabled: false
		},

		yAxis: [{
			min: -20,
			max: 6,
			minorTickPosition: 'outside',
			tickPosition: 'outside',
			labels: {
				rotation: 'auto',
				distance: 20
			},
			plotBands: [{
				from: 0,
				to: 6,
				color: '#C02316',
				innerRadius: '100%',
				outerRadius: '105%'
			}],
			pane: 0,
			title: {
				text: 'VU<br/><span style="font-size:8px">Channel A</span>',
				y: -40
			}
		}],

		plotOptions: {
			gauge: {
				dataLabels: {
					enabled: false
				},
				dial: {
					radius: '100%'
				}
			}
		},

		series: [{
			name: 'Channel A',
			data: [-20],
			yAxis: 0
		}]
	}
};
