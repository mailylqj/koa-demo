import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Cookies } from '@/component/utils';

class Index extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		if (!this.props.style) {
			return null;
		}
		let username = Cookies.get('_pin');
		let date = moment().format('YYYY-MM-DD HH:mm:ss');
		return (			
			<div className={this.props.style} id="content">
				<div className="page">
					<div className="panel panel-default">
						<div className="panel-heading">
							<span>index</span>
						</div>
						<div className="panel-body">
							<p>欢迎：{username}</p>
							<p>现在是：{date}</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Index.propTypes = {
	style: PropTypes.string
};

Index.defaultProps = {
	style: 'wapper'
};

export default Index;
