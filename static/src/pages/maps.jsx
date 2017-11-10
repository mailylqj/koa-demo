import React from 'react';
// import Main from '@/include/main.jsx';
class Maps extends React.Component {
	componentDidMount(){
		let map = new AMap.Map('gaodeMap', {
			center:[117.000923,36.675807],
			zoom: 6
		});
	}
	render() {
		return (
			<div className={this.props.style} id="content">
				<div className="page">
					<div className="panel panel-default">
						<div className="panel-heading">
							<span>index</span>
						</div>
						<div className="panel-body">
							<div id="gaodeMap" style={{display: 'block', height: '700px'}}></div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Maps.defaultProps = {
	style: 'wapper'
};

export default Maps;