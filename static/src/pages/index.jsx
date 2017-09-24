import React from 'react';
import Charts from '@/include/chart.jsx';

class Index extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
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
			}
		};
	}
	render() {
		if (!this.props.style) {
			return null;
		}
		return (			
			<div className={this.props.style} id="content">
				<div className="page">
					<div className="panel panel-default">
						<div className="panel-heading">
							<span>index</span>
						</div>
						<div className="panel-body">
							<Charts type="Chart" container="chart" options={this.state.chart} />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Index.propTypes = {
	style: React.PropTypes.string
};

Index.defaultProps = {
	style: 'wapper'
};

export default Index;
