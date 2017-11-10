import React from 'react';
import {Link} from 'react-router-dom';
import { Cookies } from '@/component/utils';

class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			openClass: '',
			showClass: ''
		};
	}
	toggleDropdown = () => {
		this.setState({open: !this.state.open});
		this.setState({openClass: this.state.open ? 'open' : ''});
	}
	toggleLang = () => {
		this.setState({show: !this.state.show});
		this.setState({showClass: this.state.show ? 'open' : ''});
	}
	render() {
		if (!this.props.style) {
			return null;
		}
		let username = Cookies.get('__pin');
		return (
			<div className="top-header clearfix">
				<div className="logo"><a><span>Square</span></a></div>
				<div className="top-nav clearfix">
					<ul className="nav-left list-unstyled">
						<li><a className="toggle-min"><i className="fa fa-bars"></i></a></li>
						<li className={'dropdown text-normal nav-profile ' + this.state.openClass}>
							<a href="javascript:;" className="dropdown-toggle" onClick={this.toggleDropdown}>
								<img src="images/g1.jpg" alt="" className="img-circle img30_30"/>
								<span className="hidden-xs">
									<span data-i18n="Lisa Doe">{username}</span>
								</span>
							</a>
							<ul className="dropdown-menu dropdown-dark with-arrow">
								<li>
									<a href="/login">
										<i className="fa fa-sign-out"></i>
										<span data-i18n="Log Out">Log Out</span>
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
				</div>
			</div>
		);
	}
}

Header.propTypes = {
	style: React.PropTypes.string
};

Header.defaultProps = {
	style: 'header'
};

export default Header;
