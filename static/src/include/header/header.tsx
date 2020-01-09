import * as React from 'react';
import { Layout, Menu, Dropdown, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logout } from '../../store/actions/account';

const { Header } = Layout;

function mapStateToProps(state) {
    return {
        ...state.accountInfo
    };
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({ logout }, dispatch)
    }
}

@connect(
    mapStateToProps,
    mapDispatchToProps
)

class Topmenu extends React.Component<any, any> {
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
        const path = location.pathname;
        if (this.props.loggedin) {
            return (
                <Header style={{ background: '#fff', padding: 0 }}>
                    <div style={{ color: '#1890ff', float: 'left', fontSize: 28, padding: '0 58px', background: 'rgba(255, 255, 255, 0.2)' }}>
                        <Link to="/">云平台</Link>
                    </div>
                    <Icon style={{ fontSize: 18, lineHeight: '64px', padding: '0 24px', cursor: 'pointer', transition: 'color 0.3s' }} className="trigger" type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} onClick={this.toggle} />
                    <Dropdown placement="bottomLeft" overlay={() => (
                        <Menu>
                            <Menu.Item>
                                <span onClick={() => this.props.logout()}>注销</span>
                            </Menu.Item>
                        </Menu>
                    )}>
                        <a className="ant-dropdown-link" href="#" style={{display: 'inline-block'}}>
                            {this.props.username} <Icon type="down" />
                        </a>
                    </Dropdown>
                </Header>
            )
        } else {
            return null;
        }
    }
}
export default Topmenu;
