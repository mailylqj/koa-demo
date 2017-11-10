import React from 'react';
import axios from 'axios';
import '@/component/prototype';
import { Cookies } from '@/component/utils';

class History extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			keyData: [],
			hisData: []
		}
	}
	componentDidMount(){
		const param = {
			endTime: new Date().getTime(),
			startTime: new Date().getTime() - 60000,
			uid: this.props.match.params.id,
			token: Cookies.get('__token')
		};
		const that = this;
		axios.post('/ajax/readModData', param).then(function(data){			
			let result = data.data;
			if(result.result == 0){
				for (var i = 0, ii = result.data.data.length; i < ii; i++) {
					result.data.data[i]['dateTime'] = new Date(result.data.data[i].time).Format('yyyy-MM-dd HH:mm:ss');
				}
				that.setState({ 'hisData': result.data.data });
				that.setState({ 'keyData': that.state.hisData[0].value_list});
			}else{
				that.props.history.push('/login');
			}	
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
									<th>时间</th>
									{this.state.keyData.map((item, index) => {
										return <th key={index}>{item.name}</th>;
									})}
								</tr>	
							</thead>
							<tbody>
								{this.state.hisData.map((item, index) => {
									return (
										<tr key={index}>
											<td>{item.dateTime}</td>
											{item.value_list.map((val, index) => {
												return <td key={index}>{val.value}</td>;
											})}
										</tr>
									);
								})}
							</tbody>
						</table>
						<ul className="pagination-sm pagination">
							<li>
								<a>First</a>
							</li>
							<li>
								<a>Previous</a>
							</li>
							<li>
								<a>1</a>
							</li>
							<li>
								<a>Next</a>
							</li>
							<li>
								<a>Last</a>
							</li>
						</ul>
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
