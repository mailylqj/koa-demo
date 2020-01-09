import * as React from 'react';
import * as axios from 'axios';
import * as PropTypes from 'prop-types';
import Container from '@/include/virtual/container';

import { Cookies } from '@/component/utils';

class EditVR extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidMount(){}	
	render() {
		if (!this.props.style) {
			return null;
		}		
		return (			
			<div className={this.props.style} id="content">
				<div className="page">
					<div className="panel panel-default">
						<div className="panel-heading">
							<span>编辑工程图</span>
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
