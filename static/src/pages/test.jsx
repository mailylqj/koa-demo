import React from 'react';
// import Main from '@/include/main.jsx';
class Test extends React.Component {
	render() {
		return (
			<div className={this.props.style}>
				
			</div>
		);
	}
}

Test.defaultProps = {
	style: 'wapper'
};

export default Test;