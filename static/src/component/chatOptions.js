export default {
	chart: {
		exporting:{
			enabled:false
		},
		credits: {
			enabled: false
		},
		xAxis: {
			categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
		},
		series: [{
			data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 295.6, 454.4]
		}]
	},
	gauge: {
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
			data: [80],
			tooltip: {
				valueSuffix: 'rpm'
			}
		}]

	},
	health: {
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
			text: 'health'
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
			max: 100,

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
				from: 20,
				to: 100,
				color: '#55BF3B' // green
			}, {
				from: 10,
				to: 20,
				color: '#DDDF0D' // yellow
			}, {
				from: 0,
				to: 10,
				color: '#DF5353' // red
			}]
		},

		series: [{
			name: 'Speed',
			data: [80],
			tooltip: {
				valueSuffix: 'rpm'
			}
		}]
	},
	vugauge: {
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
			height: 200
		},

		exporting:{
			enabled:false
		},

		credits: {
			enabled: false
		},

		title: {
			text: 'VU meter'
		},

		pane: [{
			startAngle: -45,
			endAngle: 45,
			background: null,
			center: ['25%', '145%'],
			size: 300
		}, {
			startAngle: -45,
			endAngle: 45,
			background: null,
			center: ['75%', '145%'],
			size: 300
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
		}, {
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
			pane: 1,
			title: {
				text: 'VU<br/><span style="font-size:8px">Channel B</span>',
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
		}, {
			name: 'Channel B',
			data: [-20],
			yAxis: 1
		}]
	}
};
