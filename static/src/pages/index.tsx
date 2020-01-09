import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { Spin, Row, Col } from 'antd';

import options from '../config/options';

import Charts from '../include/chart';

import { fetchSocket, closeSocket } from '../store/actions/socket';

function mapStateToProps(state:any):any {
    return {
		socketData: state.socketData
    };
}

function mapDispatchToProps(dispatch:any){
	return {
		...bindActionCreators({fetchSocket, closeSocket}, dispatch)
	}
}

@connect(
	mapStateToProps,
	mapDispatchToProps
)

class Index extends React.Component<IProps> {
	constructor(props: any) {
		super(props);
	}

	componentDidMount(){
		this.props.fetchSocket();
	}

	componentWillUnmount(){
		this.props.closeSocket();
	}
	
	render() {
		let { pending, data } = this.props.socketData;
		if( pending ){
			return <Spin size="large" style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)'}}/>
		}
		let {curve, column} = options;
		let realdata = JSON.parse(data);
		let value1 = realdata['ao_id'];
		let value2 = realdata['bo_id'];
		return (
			<Row gutter={16} style={{paddingTop: 50}}>
				<Col className="gutter-row" span={12}>
					<Charts type="chart" options={curve} series={[value1]}/>
				</Col>
				<Col className="gutter-row" span={12}>
					<Charts type="chart" options={column} series={[value2]}/>
				</Col>
			</Row>
		);
	}
}
export default Index;
