import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

class Aside extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			message: 'Hello!',
			like: false,
			input: 'default'
		};
	}
	render() {
		if (!this.props.style) {
			return null;
		}
		let path = location.pathname;
		return (
			<div id="nav-container">				
				<div id="nav-wrapper">
					<ul className="list" id="nav">
					{this.props.menus.map(function(item, index){
						let reg = new RegExp(item.link);
						return <li className={reg.test(path) ? 'active' : ''} key={index}><Link to={item.link} title={item.name}>{item.name}</Link></li>;
					})}
					</ul>
				</div>
			</div>
		);
	}
}

Aside.propTypes = {
	style: PropTypes.string,
	menus: PropTypes.array
};

Aside.defaultProps = {
	style: 'header',
	menus: [{
		name: '我的设备',
		link: '/device'
	},{
		name: '地图模式',
		link: '/maps'
	},{
		name: '公司管理',
		link: '/company'
	},{
		name: '用户中心',
		link: '/user'
	},{
		name: '设备管理',
		link: '/alldevice'
	},{
		name: 'IMEI管理',
		link: '/imei'
	},{
		name: '设备审核',
		link: '/audit'
	}]
};

export default Aside;
