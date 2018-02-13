import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import ActiveX from './activex.jsx';
import Charts from '@/include/chart.jsx';
import Options from '@/component/chatOptions';

const style = {
	position: 'absolute',
	border: '1px dashed gray',	
	minWidth: '120px'
};

const boxSource = {
	beginDrag(props) {
		const { id, eleData } = props;
		return { id, eleData };
	},
	endDrag(props, monitor) {
		console.log(monitor.getDropResult());
	}
};

@DragSource(ActiveX.BOX, boxSource, (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
	connectDragPreview: connect.dragPreview(),
	isDragging: monitor.isDragging()
}))

export default class Instance extends Component {
	static propTypes = {
		connectDragSource: PropTypes.func.isRequired,
		connectDragPreview: PropTypes.func.isRequired,
		removeElement: PropTypes.func.isRequired,
		editElement: PropTypes.func.isRequired,
		isDragging: PropTypes.bool.isRequired,
		id: PropTypes.any.isRequired,
		eleData: PropTypes.object.isRequired,
		hideSourceOnDrag: PropTypes.bool.isRequired
	}

	constructor(props) {
		super(props);
		this.state = {
			isHover: false
		};
	}

	handleEnter = ()=>{
		this.setState({isHover: true});
	}

	handleLeave =() => {
		this.setState({isHover: false});
	}

	renderMatter = (id, data) => {
		let { type } = data;
		switch(type) {
		case 'image':
		case 'boolean': {
			return(data.defaultImg ? <img style={{maxHeight: '100%', maxWidth: '100%'}} src={data.defaultImg}/> : <div style={{padding: '0.5rem 1rem'}}>{data.title}</div>);
		}
		case 'curve':
		case 'speed':
		case 'column':
		case 'voltage':{
			let chart = JSON.parse(JSON.stringify(Options[type]));
			return(<Charts style={{height: data.height ? data.height : 150, width: data.width ? data.width : 200}} type="chart" data={data} container={'chart' + id} options={chart}/>);
		}
		default: {
			return(<div style={{padding: '0.5rem 1rem'}}>{data.title}</div>);
		}}
	} 

	render() {
		const {
			hideSourceOnDrag,
			editElement,
			removeElement,
			eleData,
			id,
			connectDragSource,
			connectDragPreview,
			isDragging
		} = this.props;
		
		if (isDragging && hideSourceOnDrag) {
			return null;
		}
		const opacity = this.state.isHover ? 0.8 : 0;
		return connectDragPreview(
			<div style={{ ...style, ...eleData }} onMouseEnter={this.handleEnter} onMouseLeave={this.handleLeave}>
				<div style={{...{background: '#242633', color: '#fff', position: 'absolute',top: 0, left:0, right: 0, fontSize:'20px', fontWeight:'normal', padding: '2px 10px', zIndex: 9}, opacity}}>
					{connectDragSource(<span className="glyphicon glyphicon-move" style={{cursor: 'move'}}></span>)}
					<div className="space"></div>
					<span id={id} className="glyphicon glyphicon-cog" style={{cursor: 'pointer'}} onClick={editElement}></span>
					<div className="space"></div>
					<span id={id} className="glyphicon glyphicon-remove" style={{cursor: 'pointer'}} onClick={removeElement}></span>
				</div>
				{ this.renderMatter(id, eleData) }
			</div>
		);
	}
}