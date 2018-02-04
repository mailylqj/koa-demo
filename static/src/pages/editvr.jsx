import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Container from '@/include/virtual/container.jsx';

import { Cookies } from '@/component/utils';

class EditVR extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidMount(){
		let that = this;
		let param = {device_id: this.props.match.params.id, token: Cookies.get('__token') };
		axios.post('/ajax/layoutSelectByDeviceID', param).then(function(data){
			let result = data.data;
		});
	}
	render() {
		if (!this.props.style) {
			return null;
		}
		let username = Cookies.get('_pin');
		let date = new Date().Format('yyyy-MM-dd HH:mm:ss');
		return (			
			<div className={this.props.style} id="content">
				<div className="page">
					<div className="panel panel-default">
						<div className="panel-heading">
							<span>index</span>
						</div>
						<div className="panel-body">
							<Container deviceid={this.props.match.params.id}/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

EditVR.propTypes = {
	style: PropTypes.string
};

EditVR.defaultProps = {
	style: 'wapper'
};

export default EditVR;
