import React from 'react';
// import Main from '@/include/main.jsx';
class Test extends React.Component {
	render() {
		return (
			<div className={this.props.style}>
				<div className="form-group row">
					<label className="col-md-2">控件高</label>
					<div className="col-md-10">
						<input type="text" className="form-control" value=""/>
					</div>
				</div>
				<div className="form-group row">
					<label className="col-md-2">图片链接</label>
					<div className="col-md-10">
						<input type="text" className="form-control" value=""/>
					</div>
				</div>
				<div className="form-group">
					<Dropzone accept="image/jpeg, image/png" onDrop={this.onDrop.bind(this)} style={{width: '100%', height: 90, textAlign: 'center', lineHeight:'90px', border: '2px dashed #666'}}>拖动或点击上传图片</Dropzone>
				</div>
			</div>
		);
	}
}

Test.defaultProps = {
	style: 'wapper'
};

export default Test;