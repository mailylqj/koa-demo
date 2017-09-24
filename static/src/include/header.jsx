import React from 'react';
import {Link} from 'react-router-dom';

class Header extends React.Component {
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
		return (
			<div className="top-header clearfix">
				<div className="logo"><img src="" height="50" width="100"/></div>
				<div className="top-nav clearfix">
					<ul className="nav-left">
					{this.props.menus.map(function(item, index){
						return <li key={index} style={{fontSize:'14px', fontWeight:'bold'}}><Link to={item.link} title={item.name}>{item.name}</Link></li>;
					})}
					</ul>
					<ul className="pull-right">
						<li className="user-center" style={{display: 'inline-block', verticalAlign: 'middle'}}>
							<a href="javascript" className="user-name">今麦郎</a>
							<ul>
								<li><Link to="/maps">监控中心</Link></li>
								<li><Link to="/logout">注销</Link></li>
							</ul>
						</li>
						<li className="lang" style={{display: 'inline-block', verticalAlign: 'middle'}}><a href="javascript"><div className="flag flags-china"></div></a></li>
					</ul>
				</div>
			</div>
		);
	}
}

Header.propTypes = {
	style: React.PropTypes.string,
	menus: React.PropTypes.array
};

Header.defaultProps = {
	style: 'header',
	menus: [
		{
			name: '地图模式',
			link: '/login'
		},
		{
			name: '信息反馈',
			link: '/maps'
		},
		{
			name: '监控中心',
			link: '/maps'
		},
		{
			name: '管理中心',
			link: '/maps'
		}
	]
};

export default Header;
