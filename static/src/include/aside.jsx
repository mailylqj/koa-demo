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
				<div id="nav-wrapper"  text-align="center">
					<ul className="list" id="nav">
					{this.props.menus.map(function(item, index){
						let reg = new RegExp(item.link);
						return (
							<li  text-align="center" className={reg.test(path) ? 'active' : ''} key={index}>
								<Link to={item.link} title={item.name}><i className={'glyphicon ' + item.class}></i>{item.name}</Link>
								<i className="fa fa-caret-right icon-has-ul"></i>
							</li>
						);
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
		link: '/device',
		class: 'glyphicon-wrench'
	},{
		name: '地图模式',
		link: '/maps',
		class: 'glyphicon-map-marker'
	},{
		name: '公司管理',
		link: '/company',
		class: 'glyphicon-briefcase'
	},{
		name: '用户中心',
		link: '/user',
		class: 'glyphicon-user'
	},{
		name: '设备管理',
		link: '/alldevice',
		class: 'glyphicon-th-list'
	},{
		name: 'IMEI管理',
		link: '/imei',
		class: 'glyphicon-phone'
	},{
		name: '设备审核',
		link: '/audit',
		class: 'glyphicon-eye-open'
	}]
};

export default Aside;
