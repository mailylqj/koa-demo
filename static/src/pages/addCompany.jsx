import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import { toast } from 'react-toastify';
import { Cookies } from '@/component/utils';

class AddCompany extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			company: {},
			proCompany:{}
		}
	}
	componentDidMount(){
        let that = this;
		axios.post('/ajax/proCompanySelectAll', { token: Cookies.get('__token') }).then(function (data) {
			let result = data.data;
			if (result.result == 0) {
                that.setState({ 'proCompany': result.data });
            } else {
                toast.error(result.message);
            }
		});
    }
    changeProName = e => {
        this.setState(update(this.state, {
            company: {
                pro_company: { $set: e.target.value }
            }
        }));
    }
    changeUseName = e => {
        this.setState(update(this.state, {
            company: {
                use_company: { $set: e.target.value }
            }
        }));
    }
    selectProCompany = e =>{
        this.setState(update(this.state, {
            company: {
                pro_company_id: { $set: parseInt(e.target.value)}
            }
        }));
    }
    addProCompany = e => {
        let that = this;
        axios.post('/ajax/proCompanyAdd', { ...this.state.company, token: Cookies.get('__token') }).then(function (data) {
            let result = data.data;
            if (result.result == 0) {
                that.setState(update(that.state, {
                    proCompany: {
                        [result.data.id]: {
                            $set: { id: result.data.id, pro_company: that.state.company.pro_company}
                        }
                    }
                }));
            } else if ([-2, -14].indexOf(result.result) > -1) {
                that.props.history.push('/login');
            } else {
                toast.error(result.message);
            }
        });
    }
    addUseCompany = e => {
        let that = this;
        axios.post('/ajax/useCompanyAdd', {...this.state.company, token: Cookies.get('__token') }).then(function (data) {
            let result = data.data;
            if (result.result == 0) {
                toast.success(result.message);
            } else if ([-2, -14].indexOf(result.result) > -1) {
                that.props.history.push('/login');
            } else {
                toast.error(result.message);
            }
        });
    }
	render() {
		if (!this.props.style) {
			return null;
		}
		return (
            <div className={this.props.style} id="content">
                <div className="page">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <span>添加生产公司</span>
                                </div>
                                <div className="panel-body">
                                    <div className="form-horizontal">
                                        <div className="form-group">
                                            <label className="col-md-2">公司名称</label>
                                            <div className="col-md-10"><input type="text" className="form-control" value={this.state.company.pro_company} onChange={this.changeProName} /></div>
                                        </div>
                                        <div className="form-group text-center">
                                            <button type="submit" className="btn btn-w-md btn-primary" onClick={this.addProCompany}>添加生产公司</button>
                                            <div className="space"></div>
                                            <button className="btn btn-w-md btn-default">清空</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <span>添加使用公司</span>
                                </div>
                                <div className="panel-body">
                                    <div className="form-horizontal">
                                        <div className="form-group">
                                            <label className="col-md-2">公司名称</label>
                                            <div className="col-md-10"><input type="text" className="form-control" value={this.state.company.use_company} onChange={this.changeUseName} /></div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-md-2">生产厂家</label>
                                            <div className="col-md-10">
                                                <span className="ui-select" style={{ display: 'block', margin: '0' }}>
                                                    <select style={{ width: '100%' }} id="proCompanyId" value={this.state.company.pro_company_id} onChange={this.selectProCompany}>
                                                        <option value="0">--请选择--</option>
                                                        {Object.keys(this.state.proCompany).map(key => {
                                                            let item = this.state.proCompany[key];
                                                            return (
                                                                <option key={key} value={item.id}>{item.pro_company}</option>
                                                            );
                                                        })}
                                                    </select>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="form-group text-center">
                                            <button type="submit" className="btn btn-w-md btn-primary" onClick={this.addUseCompany}>添加使用公司</button>
                                            <div className="space"></div>
                                            <button className="btn btn-w-md btn-default">清空</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
		);
	}
}

AddCompany.propTypes = {
	style: PropTypes.string
};

AddCompany.defaultProps = {
	style: 'wapper'
};

export default AddCompany;