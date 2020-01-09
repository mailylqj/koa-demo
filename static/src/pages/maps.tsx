import React from 'react';
import axios from 'axios';
import { Cookies } from '@/component/utils';
import { toast } from 'react-toastify';

class Maps extends React.Component {
	componentDidMount(){
		let that = this;
		let user = { username: Cookies.get('__pin'), token: Cookies.get('__token') };
		let map = new AMap.Map('gaodeMap', {
			center:[117.000923,36.675807],
			zoom: 6
		});
		axios.post('/ajax/getDeviceList', user).then(function(data){
			let result = data.data;
			if(result.result == 0){
				for (var i = 0, ii = result.data.length; i < ii; i++) {					
					let marker = new AMap.Marker({
						position: [result.data[i].longitude, result.data[i].latitude],
						title: result.data[i].deviceName,
						map: map
					});
				}
			}else{
				toast.error(result.message);
			}
		});
		
	}
	render() {
		return (
			<div className={this.props.style} id="content">
				<div className="page">
					<div className="panel panel-default">
						<div className="panel-heading">
							<span>index</span>
						</div>
						<div className="panel-body">
							<div id="gaodeMap" style={{display: 'block', height: '700px'}}></div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Maps.defaultProps = {
	style: 'wapper'
};

export default Maps;