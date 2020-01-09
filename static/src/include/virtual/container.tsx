import * as React from 'react';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Widget from '@/component/widget';
import Target from './target';
import Source from './source';

export default class Container extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isShow: false
		};
	}
	toggleShow = () => {
		this.setState({isShow: !this.state.isShow});
	}
	render() {
		const right = this.state.isShow ? 0 : -150;
		return (
			<DragDropContextProvider backend={HTML5Backend}>
				<div className="">
					<div style={{ overflow: 'hidden'}}>
						<Target deviceid={this.props.deviceid} hideSourceOnDrag/>
					</div>
					<div style={{...{width: 175, position: 'fixed', top: '50px', bottom: 0, zIndex: 999999, transition: 'all .5s ease-in'}, right}}>
						<div style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflowY: 'auto', padding: '10px', background: '#f6f6f6', borderLeft: '1px solid #e9e9e9', marginLeft: 25}}>
						{Object.keys(Widget).map(key => {
							const { name } = Widget[key];
							return (<Source key={key} name={name} prototypeid={key}/>);
						})}
						</div>
						<span onClick={this.toggleShow} style={{position: 'absolute', left: 0, top: '50%', marginTop: -43, width: '25px', background: '#df4a32', color: '#fff', cursor: 'pointer', textAlign: 'center', padding: '5px'}}>添加控件</span>
					</div>
				</div>
			</DragDropContextProvider>
		);
	}
}