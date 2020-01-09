import * as React from 'react';
import {Layout, Menu, Icon } from 'antd';
import {Link} from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { account } from '../../store/actions/account';

const {Sider} = Layout;

function mapStateToProps(state) {
	return {
		...state.accountInfo
	};
}

function mapDispatchToProps(dispatch) {
	return {
		...bindActionCreators({ account }, dispatch)
	}
}

@connect(
	mapStateToProps,
	mapDispatchToProps
)

class Aside extends React.Component {
	constructor(props: any) {
		super(props);
	}
	state = {
		collapsed: false,
	};
	
	toggle = () => {
		this.setState({
			collapsed: !this.state.collapsed,
		});
	};
	render() {
		let path = location.pathname;
		if(this.props.loggedin){
			return (
				<Sider trigger={null} collapsible collapsed={this.state.collapsed}>	
					<Menu theme="dark" mode="inline" defaultSelectedKeys={[path]}>
						<Menu.Item key="/device">
							<Icon type="user" />
							<span><Link to="/device" style={{color: '#fff'}}>我的设备</Link></span>
						</Menu.Item>
						<Menu.Item key="/maps">
							<Icon type="video-camera" />
							<span><Link to="/maps" style={{color: '#fff'}}>地图模式</Link></span>
						</Menu.Item>
						<Menu.Item key="/company">
							<Icon type="upload" />
							<span><Link to="/company" style={{color: '#fff'}}>公司管理</Link></span>
						</Menu.Item>
						<Menu.Item key="/user">
							<Icon type="user" />
							<span><Link to="/user" style={{color: '#fff'}}>用户中心</Link></span>
						</Menu.Item>
						<Menu.Item key="/alldevice">
							<Icon type="upload" />
							<span><Link to="/alldevice" style={{color: '#fff'}}>设备管理</Link></span>
						</Menu.Item>
						<Menu.Item key="/imei">
							<Icon type="upload" />
							<span><Link to="/imei" style={{color: '#fff'}}>IMEI管理</Link></span>
						</Menu.Item>
						<Menu.Item key="/audit">
							<Icon type="upload" />
							<span><Link to="/audit" style={{color: '#fff'}}>设备审核</Link></span>
						</Menu.Item>
						<Menu.Item key="/test">
							<Icon type="upload" />
							<span><Link to="/test" style={{color: '#fff'}}>测试路由</Link></span>
						</Menu.Item>
					</Menu>
				</Sider>
			);
		}else{
			return null;
		}
	}
}

export default Aside;
