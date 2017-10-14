import React from 'react';
import axios from 'axios';

class History extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hisData: [],
			keyData: {}
		}
	}
	componentDidMount(){
		const param = {
			endTime: '2017-09-30 15:50:10',
			startTime: '2017-09-30 15:40:10',
			uid: this.props.match.params.id
		};
		const that = this;
		axios.post('/ajax/readModData', param).then(function(data){
			console.log(data.data);
			that.setState({ 'hisData': data.data });
			that.setState({ 'keyData': data.data[0] });
		}).catch(function(error){
			console.log(error);			
		});
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
							<span>设备历史数据</span>
						</div>
						<table className="table">
							<thead>
								<tr>
									{Object.keys(this.state.keyData).map((v, k) => {
										return child;
									})}
								</tr>
							</thead>
							<tbody>
								{this.state.hisData.map((item) => {
									return <th>{item}</th>;
								})}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		);
	}
}

History.propTypes = {
	style: React.PropTypes.string
};

History.defaultProps = {
	style: 'wapper'
};

export default History;
