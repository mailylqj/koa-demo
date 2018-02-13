import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import { Cookies } from '@/component/utils';

class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			show: false,
			openClass: '',
			showClass: ''
		};
	}
	toggleDropdown = () => {
		let temp = !this.state.open;
		this.setState({open: temp, openClass: temp ? 'open' : ''});
	}
	toggleLang = () => {
		let temp = !this.state.show;
		this.setState({show: temp, showClass: temp ? 'open' : ''});
	}
	toggleSide = () => {
		let bodyClass = document.querySelector('body').className || '';
		if(/nav-min/.test(bodyClass)){
			document.querySelector('body').className = bodyClass.replace(/nav-min/, '');
		}else{
			document.querySelector('body').className = bodyClass + ' nav-min';
		}
	}
	render() {
		if (!this.props.style) {
			return null;
		}
		let username = Cookies.get('__pin');
		return (
			<div className="top-header clearfix">
				<div className="logo"><a><span>云平台</span></a></div>
				<div className="top-nav clearfix">
					<ul className="nav-left list-unstyled">
						<li><a href="javascript:;" className="toggle-min" onClick={this.toggleSide}><i className="fa fa-bars"></i></a></li>
						<li className={'dropdown text-normal nav-profile ' + this.state.openClass}>
							<a href="javascript:;" className="dropdown-toggle" onClick={this.toggleDropdown}>
								<img src="/assets/img/tx.jpg" alt=" " className="img-circle img30_30"/>
								<span className="hidden-xs">
									<span>&nbsp;&nbsp;{username}</span>
								</span>
							</a>
							<ul className="dropdown-menu dropdown-dark with-arrow">
								<li>
									<a href="/password">
										<i className="fa fa-sign-out"></i>
										<span>修改密码</span>
									</a>
								</li>
								<li>
									<a href="/login">
										<i className="fa fa-sign-out"></i>
										<span>注销</span>
									</a>
								</li>
							</ul>
						</li>
						<li className={'dropdown langs text-normal ' + this.state.showClass}>
							<a href="javascript:;" className="dropdown-toggle active-flag" onClick={this.toggleLang}>
								<div className="flag flags-china"></div>
							</a>
							<ul className="dropdown-menu dropdown-dark with-arrow list-langs">
								<li><a href="javascript:;"><div className="flag flags-american"></div> English</a></li>
								<li><a href="javascript:;"><div className="flag flags-spain"></div> Español</a></li>
								<li><a href="javascript:;"><div className="flag flags-japan"></div> 日本語</a></li>
								<li><a href="javascript:;"><div className="flag flags-china"></div> 中文</a></li>
								<li><a href="javascript:;"><div className="flag flags-germany"></div> Deutsch</a></li>
								<li><a href="javascript:;"><div className="flag flags-france"></div> français</a></li>
								<li><a href="javascript:;"><div className="flag flags-italy"></div> Italiano</a></li>
								<li><a href="javascript:;"><div className="flag flags-portugal"></div> Portugal</a></li>
								<li><a href="javascript:;"><div className="flag flags-russia"></div> Русский язык</a></li>
								<li><a href="javascript:;"><div className="flag flags-korea"></div> 한국어</a></li>
							</ul>
						</li>
					</ul>

					<ul className="nav-right pull-right list-unstyled">
						<li className="dropdown">
							<a href="javascript:;" className="dropdown-toggle bg-orange" data-toggle="dropdown">
								<i className="fa fa-comment-o"></i>
								<span className="badge badge-info">0</span>
							</a>
							<div className="dropdown-menu pull-right with-arrow panel panel-default">
								<div className="panel-heading">You have 2 messages.</div>
								<ul className="list-group">
									<li className="list-group-item">
										<a href="javascript:;" className="media">
											<span className="pull-left media-icon">
												<span className="square-icon sm bg-info"><i className="fa fa-comment-o"></i></span>
											</span>
											<div className="media-body">
												<span className="block">Jane sent you a message</span>
												<span className="text-muted">3 hours ago</span>
											</div>
										</a>
									</li>
									<li className="list-group-item">
										<a href="javascript:;" className="media">
											<span className="pull-left media-icon">
												<span className="square-icon sm bg-danger"><i className="fa fa-comment-o"></i></span>
											</span>
											<div className="media-body">
												<span className="block">Lynda sent you a mail</span>
												<span className="text-muted">9 hours ago</span>
											</div>
										</a>
									</li>
								</ul>
								<div className="panel-footer">
									<a href="javascript:;">Show all messages.</a>
								</div>
							</div>
						</li>
						<li className="dropdown">
							<a href="javascript:;" className="dropdown-toggle bg-warning" data-toggle="dropdown">
								<i className="fa fa-envelope-o"></i>
								<span className="badge badge-info">0</span>
							</a>
							<div className="dropdown-menu pull-right with-arrow panel panel-default">
								<div className="panel-heading">
									You have 3 mails.
								</div>
								<ul className="list-group">
									<li className="list-group-item">
										<a href="javascript:;" className="media">
											<span className="pull-left media-icon">
												<span className="square-icon sm bg-warning"><i className="fa fa-envelope-o"></i></span>
											</span>
											<div className="media-body">
												<span className="block">Lisa sent you a mail</span>
												<span className="text-muted block">2min ago</span>
											</div>
										</a>
									</li>
									<li className="list-group-item">
										<a href="javascript:;" className="media">
											<span className="pull-left media-icon">
												<span className="square-icon sm bg-info"><i className="fa fa-envelope-o"></i></span>
											</span>
											<div className="media-body">
												<span className="block">Jane sent you a mail</span>
												<span className="text-muted">3 hours ago</span>
											</div>
										</a>
									</li>
									<li className="list-group-item">
										<a href="javascript:;" className="media">
											<span className="pull-left media-icon">
												<span className="square-icon sm bg-success"><i className="fa fa-envelope-o"></i></span>
											</span>
											<div className="media-body">
												<span className="block">Lynda sent you a mail</span>
												<span className="text-muted">9 hours ago</span>
											</div>
										</a>
									</li>
								</ul>
								<div className="panel-footer">
									<a href="javascript:;">Show all mails.</a>
								</div>
							</div>
						</li>
						<li className="dropdown">
							<a href="javascript:;" className="dropdown-toggle bg-success" data-toggle="dropdown">
								<i className="fa fa-bell-o nav-icon"></i>
								<span className="badge badge-info">0</span>
							</a>
							<div className="dropdown-menu pull-right with-arrow panel panel-default">
								<div className="panel-heading">
									You have 3 notifications.
								</div>
								<ul className="list-group">
									<li className="list-group-item">
										<a href="javascript:;" className="media">
											<span className="pull-left media-icon">
												<span className="square-icon sm bg-success"><i className="fa fa-bell-o"></i></span>
											</span>
											<div className="media-body">
												<span className="block">New tasks needs to be done</span>
												<span className="text-muted block">2min ago</span>
											</div>
										</a>
									</li>
									<li className="list-group-item">
										<a href="javascript:;" className="media">
											<span className="pull-left media-icon">
												<span className="square-icon sm bg-info"><i className="fa fa-bell-o"></i></span>
											</span>
											<div className="media-body">
												<span className="block">Change your password</span>
												<span className="text-muted">3 hours ago</span>
											</div>
										</a>
									</li>
									<li className="list-group-item">
										<a href="javascript:;" className="media">
											<span className="pull-left media-icon">
												<span className="square-icon sm bg-danger"><i className="fa fa-bell-o"></i></span>
											</span>
											<div className="media-body">
												<span className="block">New feature added</span>
												<span className="text-muted">9 hours ago</span>
											</div>
										</a>
									</li>
								</ul>
								<div className="panel-footer">
									<a href="javascript:;">Show all notifications.</a>
								</div>
							</div>
						</li>
						<li>
							<a href="#/tasks" className="bg-info">
								<i className="fa fa-tasks"></i>
							</a>
						</li>
					</ul>
				</div>
			</div>
		);
	}
}

Header.propTypes = {
	style: PropTypes.string
};

Header.defaultProps = {
	style: 'header'
};

export default Header;
