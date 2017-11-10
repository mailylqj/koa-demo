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
			name: '全部设备',
			link: '/device'
		},
		{
			name: '实时数据',
			link: '/visual/0023558B2178'
		},
		{
			name: '历史数据',
			link: '/history/0023558B2178'
		},		
		{
			name: '地图模式',
			link: '/maps'
		},
		{
			name: '管理中心',
			link: '/maps'
		}
	]
};

export default Aside;
