import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import { DropTarget, DragDropContext } from 'react-dnd';
import Widget from '@/component/widget';
import { Cookies } from '@/component/utils';
import Config from './config.jsx';
import ActiveX from './activex.jsx';
import Instance from './instance.jsx';


const styles = {
	border: '1px solid #242633',
	position: 'relative'
};

const boxTarget = {
	drop(props, monitor, component) {
		const item = monitor.getItem();
		if(item.type == 'source'){
			let offset = monitor.getClientOffset();	
			let scrollTop = document.querySelector('#content').scrollTop;		
			component.addElement(item.id, offset.x-200, offset.y-120+scrollTop);
			return { name: 'Dustbin' };
		}
		const delta = monitor.getDifferenceFromInitialOffset();
		const left = Math.round(item.eleData.left + delta.x);
		const top = Math.round(item.eleData.top + delta.y);

		component.moveElement(item.id, left, top);
	}
};

@DropTarget(ActiveX.BOX, boxTarget, connect => ({
	connectDropTarget: connect.dropTarget()
}))
export default class Target extends Component {
	static propTypes = {
		deviceid: PropTypes.any.isRequired,
		hideSourceOnDrag: PropTypes.bool.isRequired,
		connectDropTarget: PropTypes.func.isRequired
	}

	constructor(props) {
		super(props);
		this.state = {
			delModal: false,
			editModal: false,
			addModal: false,
			tplModal: false,
			tempList: [],
			container: {height: 580},
			elements: {},
			ajaxUrl: '/ajax/layoutAdd'
		};		
	}

	componentWillMount(){
		Modal.setAppElement('body');
		let that = this;
		let {deviceid} = this.props;
		let param = {device_id: deviceid, token: Cookies.get('__token') };
		axios.post('/ajax/layoutSelectByDeviceID', param).then(function(data){
			let result = data.data;
			if(result.data && !result.data.add){
				let { data: container } = result;
				let { mod_list: elements } = container;
				that.setState({elements: elements, container: container, ajaxUrl: '/ajax/layoutUpdate'});
			}else if([-2,-14].indexOf(result.result) > -1) {
				that.props.history.push('/login');
			}else{
				toast.error(result.message);
			}
		});
		this._zIndex = 0;
	}

	addElement(id, left, top) {
		let instanceId = id + 'll' + moment().unix();
		let { name: title, type, showType, isData } = Widget[id];
		let zIndex = this._zIndex + 1;
		this.setState(
			update(this.state, {
				elements: {
					[instanceId]: {
						$set: { left, top, zIndex, title, type, showType, isData}
					}
				}
			})
		);
	}

	editElement = (e) => {
		this.instanceId = e.target.id;		
		this.activeX = this.state.elements[e.target.id];
		this.setState({editModal: true});
	}
	
	changeHeight = (e) => {
		this.setState({
			container: Object.assign({}, this.state.container, {height: parseInt(e.target.value)})
		});
	}

	moveElement(id, left, top) {
		this.setState(
			update(this.state, {
				elements: {
					[id]: {
						$merge: { left, top }
					}
				}
			})
		);
	}

	removeElement = (e) => {
		this.instanceId = e.target.id;
		this.setState({delModal: true});
	}

	sureRemove = (e) => {		
		this.setState(
			update(this.state, {
				elements: {
					$unset: [this.instanceId]
				},
				delModal: {
					$set: false
				}
			})
		);
	}

	saveConfig = (data) => {
		this.setState(
			update(this.state, {
				elements: {
					[this.instanceId]: {
						$merge: data
					}
				},
				editModal: {
					$set: false
				}
			})
		);
	}

	saveVirtual = () => {
		let {deviceid} = this.props;
		let that = this;
		let { id, height } = this.state.container;
		let param = {
			id: id,
			device_id: deviceid,
			height: height,
			mod_list: this.state.elements,
			token: Cookies.get('__token')
		};
		axios.post(this.state.ajaxUrl, param).then(function(data){
			let result = data.data;
			if(result.result == 0){
				toast.success(result.message);
			}else if([-2,-14].indexOf(result.result) > -1) {
				that.props.history.push('/login');
			}else{
				toast.error(result.message);
			}
		});
	}

	cleanCanvas = () => {
		this.setState(
			update(this.state, {
				elements: {
					$set: {}
				}
			})
		);
	}

	changeName = (e) => {
		this.setState({tplName: e.target.value});
	}

	sureAddTpl = () => {
		let that = this;
		let {deviceid} = this.props;
		let { id, height } = this.state.container;
		let param = {
			id: id,
			name: this.state.tplName,
			device_id: deviceid,
			height: height,
			mod_list: this.state.elements,
			token: Cookies.get('__token')
		};
		axios.post('/ajax/layoutTempAdd', param).then(function(data){
			let result = data.data;
			if(result.result == 0){
				toast.success('保存成功');
			}else if([-2,-14].indexOf(result.result) > -1) {
				that.props.history.push('/login');
			}else{
				toast.error(result.message);
			}
			that.setState({addModal: false});
		});
	}

	selectTemplate = () => {
		let that = this;
		axios.post('/ajax/layoutTempSelectByCompanyID', {token: Cookies.get('__token')}).then(function(data){
			let result = data.data;
			if(result.data && result.data.length > 0){
				that.setState({tempList: result.data, tplModal: true});
			}else{
				toast.error('你还没有工程图模板！');
			}			
		});
	}

	sureSelect = (e) => {
		let that = this;
		let param = {id: e.target.id, token: Cookies.get('__token')};
		axios.post('/ajax/layoutTempSelectByID', param).then(function(data){
			let result = data.data;
			if(result.result == 0){
				let { data: container } = result;
				let { mod_list: elements } = container;
				that.setState({ 'container': container, 'elements': elements, 'tplModal': false });
			}else if([-2,-14].indexOf(result.result) > -1) {
				that.props.history.push('/login');
			}else{
				toast.error(result.message);
			}
		});
	}

	saveTemplate = () => {
		this.setState({addModal: true});
	}

	closeAddModal = () => {
		this.setState({addModal: false});
	}

	closeTplModal = () => {
		this.setState({tplModal: false});
	}

	closeEditModal = (e) => {
		this.instanceId = null;
		this.setState({editModal: false});
	}

	closeDelModal = (e) => {
		this.instanceId = null;
		this.setState({delModal: false});
	}

	render() {
		const { hideSourceOnDrag, connectDropTarget } = this.props;
		const { elements } = this.state;
		const { removeElement, editElement } = this;

		return connectDropTarget(
			<div>
				<div className="form-group row">
					<label className="col-md-1">画布高度:</label>
					<div className="col-md-2">
						<input type="number" className="form-control" value={this.state.container.height} onChange={this.changeHeight}/>
					</div>
					<div className="col-md-3">
						<button type="button" className="btn btn-w-md btn-danger" onClick={this.selectTemplate}>选择模板</button>
					</div>
				</div>
				<div className="form-group" style={{...styles, ...this.state.container}}>
					{Object.keys(elements).map(key => {
						let eleData = elements[key];
						if(eleData.zIndex > this._zIndex){
							this._zIndex = eleData.zIndex;
						}
						return (
							<Instance
								key={key}
								id={key}
								eleData={eleData}
								removeElement = {removeElement}
								editElement = {editElement}
								hideSourceOnDrag={hideSourceOnDrag}
							></Instance>
						);
					})}
				</div>
				<div className="form-group">
					<button type="button" className="btn btn-w-md btn-primary" onClick={this.saveVirtual}>保存</button>
					<div className="space"></div>
					<button type="button" className="btn btn-w-md btn-danger" onClick={this.saveTemplate}>另存为模板</button>
					<div className="space"></div>
					<button className="btn btn-w-md btn-default" onClick={this.cleanCanvas}>清空</button>
				</div>
				<Modal isOpen={this.state.editModal} onRequestClose={this.closeEditModal} className={{ base:'modal-dialog widget-config', afterOpen:''}} overlayClassName={{base: 'modal-backdrop fade', afterOpen: 'in'}} bodyOpenClassName="modal-open" shouldCloseOnOverlayClick={true} style={{overlay: {backgroundColor: 'rgba(0, 0, 0, 0.5)'}, content: {backgroundColor: '#fff'}}}>					
					<Config instanceId={this.instanceId} activeX={this.activeX} closeModal={this.closeEditModal} saveConfig={this.saveConfig}/>
				</Modal>
				<Modal isOpen={this.state.addModal} onRequestClose={this.closeAddModal} className={{base:'modal-dialog', afterOpen:''}} overlayClassName={{base: 'modal-backdrop fade', afterOpen: 'in'}} bodyOpenClassName="modal-open" shouldCloseOnOverlayClick={true} style={{overlay: {backgroundColor: 'rgba(0, 0, 0, 0.5)'}, content: {backgroundColor: '#fff'}}}>
					<div className="modal-header">
						<div className="text-primary">另存为工程图模板</div>
					</div>
					<div className="modal-body">
						<div className="form-group row">
							<label className="col-md-3">模板名称：</label>
							<div className="col-md-9"><input type="text" className="form-control" value={this.state.tplName} onChange={this.changeName}/></div>
						</div>
					</div>
					<div className="modal-footer">
						<button className="btn btn-danger" onClick={this.sureAddTpl}>确认添加</button>
						<button className="btn btn-warning" onClick={this.closeAddModal}>取消</button>
					</div>
				</Modal>
				<Modal isOpen={this.state.tplModal} onRequestClose={this.closeTplModal} className={{base:'modal-dialog', afterOpen:''}} overlayClassName={{base: 'modal-backdrop fade', afterOpen: 'in'}} bodyOpenClassName="modal-open" shouldCloseOnOverlayClick={true} style={{overlay: {backgroundColor: 'rgba(0, 0, 0, 0.5)'}, content: {backgroundColor: '#fff'}}}>
					<div className="modal-header">
						<div className="text-primary">选择工程图模板</div>
					</div>
					<div className="modal-body clearfix">
					{this.state.tempList.map((item, index) => {
						return (
							<div className="layout-temp" key={index} id={item.id} onClick={this.sureSelect}>{item.name}</div>
						);
					})}
					</div>
					<div className="modal-footer">
						<button className="btn btn-warning" onClick={this.closeTplModal}>取消</button>
					</div>
				</Modal>
				<Modal isOpen={this.state.delModal} onRequestClose={this.closeDelModal} className={{base:'modal-dialog', afterOpen:''}} overlayClassName={{base: 'modal-backdrop fade', afterOpen: 'in'}} bodyOpenClassName="modal-open" shouldCloseOnOverlayClick={true} style={{overlay: {backgroundColor: 'rgba(0, 0, 0, 0.5)'}, content: {backgroundColor: '#fff'}}}>
					<div className="modal-header">
						<div className="text-danger">警告！！</div>
					</div>
					<div className="modal-body">
						<div className="text-danger text-center size-h3">是否确认删除此控件？</div>
					</div>
					<div className="modal-footer">
						<button className="btn btn-danger" onClick={this.sureRemove}>确认删除</button>
						<button className="btn btn-warning" onClick={this.closeDelModal}>取消</button>
					</div>
				</Modal>
			</div>
		);
	}
}