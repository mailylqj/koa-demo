import React, { Component } from 'react';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Widget from '@/component/widget';
import Target from './target.jsx';
import Source from './source.jsx';

export default class Container extends Component {
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
		const right = this.state.isShow ? 0 : -335;
		return (
			<DragDropContextProvider backend={HTML5Backend}>
				<div className="">
					<div style={{ overflow: 'hidden'}}>
						<Target deviceid={this.props.deviceid} hideSourceOnDrag/>
					</div>
					<div style={{...{width: 335, position: 'fixed', top: '50px', bottom: 0, padding: '10px', background: '#f6f6f6', borderLeft: '1px solid #e9e9e9', zIndex: 999999, transition: 'all .5s ease-in'}, right}}>
						<div style={{overflow: 'hidden'}}>
						{Object.keys(Widget).map(key => {
							const { name } = Widget[key];
							return (<Source key={key} name={name} prototypeid={key}/>);
						})}
						</div>
						<span onClick={this.toggleShow} style={{position: 'absolute', left: '-25px', top: '50%', width: '25px', background: '#df4a32', color: '#fff', cursor: 'pointer', textAlign: 'center', padding: '5px'}}>添加控件</span>
					</div>
				</div>
			</DragDropContextProvider>
		);
	}
}