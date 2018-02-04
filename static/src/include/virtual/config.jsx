import React from 'react';
import Dropzone from 'react-dropzone';
import update from 'immutability-helper';
import Widget from '@/component/widget';
import H5upload from '@/component/h5Upload';

class Config extends React.Component {
	constructor(props) {
		super(props);
		const {activeX} = this.props;
		this.state = {
			activeX: activeX
		};
	}
	onDrop(files){
		const that = this;
		new H5upload({
			files: files, 
			url: '/ajax/fileUpload',
			onSuccess: (file, data) => {
				if(data.result == 0 && data.data && data.data.length > 0){
					let defaultImg = data.data.length > 0 ? data.data[0].url : '';
					let currentImg = data.data.length > 1 ? data.data[1].url : '';
					that.setState(
						update(that.state, {
							activeX: {
								$merge: { defaultImg, currentImg }
							}
						})
					);
				}else{
					alert('文件上传失败' + file.name);
				}
			},
			onFailure: (file, data) => {
				alert('文件上传失败' + file.name);
			}
		});
	}
	renderItem(key, item){
		switch(item.type) {
		case 2:{
			return (
				<Dropzone accept="image/jpeg, image/png, image/bmp" onDrop={this.onDrop.bind(this)} style={{width: '100%', height: 34, textAlign: 'center', lineHeight: '32px', border: '2px dashed #666'}}>拖动或点击上传图片</Dropzone>
			);
		}	
		default:{
			return (
				<input id={key} type={item.dataType} placeholder={item.tips} className="form-control" value={this.state.activeX[key]} onChange={this.changeVal}/>
			);
		}}
	}
	changeVal = (e) => {
		let key = e.target.id;
		let value = e.target.type == 'number' ? parseInt(e.target.value) : e.target.value;		
		this.setState(
			update(this.state, {
				activeX: {
					[key]: {$set: value}
				}
			})
		);
	}
	saveConfig = () => {
		this.props.saveConfig(this.state.activeX);
	}
	render() {
		const {instanceId, closeModal} = this.props;
		const prototypeId = instanceId.split('ll')[0];
		const { options } = Widget[prototypeId];
		return (
			<div>
				<div className="modal-header">
					<div className="text-primary">编辑组件</div>
				</div>
				<div className="modal-body">
					<div className="row">
						{Object.keys(options).map(key => {
							const item = options[key];
							return (
							<div className="col-md-6">	
								<div className="form-group row" key={key}>
									<label className="col-md-3">{item.name}</label>
									<div className="col-md-9">
										{this.renderItem(key, item)}
									</div>
								</div>
							</div>	
							);
						})}
					</div>
				</div>
				<div className="modal-footer">
					<button className="btn btn-primary" onClick={this.saveConfig}>保存</button>
					<button className="btn btn-default" onClick={closeModal}>取消</button>
				</div>
			</div>
		);
	}
}

export default Config;