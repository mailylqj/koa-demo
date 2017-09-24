import React from 'react';
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
		return (
			<div id="nav-container">				
				<div id="nav-wrapper">
					<ul className="list" id="nav">
					{this.props.menus.map(function(item, index){
						return <li key={index}><Link to={item.link} title={item.name}>{item.name}</Link></li>;
					})}
					</ul>
				</div>
			</div>
		);
	}
}

Aside.propTypes = {
	style: React.PropTypes.string,
	menus: React.PropTypes.array
};

Aside.defaultProps = {
	style: 'header',
	menus: [
		{
			name: '地图模式',
			link: '/maps'
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

export default Aside;
