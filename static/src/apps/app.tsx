import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Layout } from 'antd';

import Main from '../include/main/main';
import Aside from '../include/aside/aside';
import Topmenu from '../include/header/header';

import store from '../store/index';

const { Content, Footer } = Layout;

class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<BrowserRouter>
					<Layout style={{ minHeight: '100vh' }}>
						<Topmenu/>
						<Layout>
							<Aside/>
							<Layout>
								<Content style={{ padding: '0 50px'}}><Main /></Content>
								<Footer style={{ textAlign: 'center' }}>Morning meeting ©2018 Created by leeli</Footer>
							</Layout>
						</Layout>
					</Layout>
				</BrowserRouter>
			</Provider>
		);
	}
}

ReactDOM.render(<App />, 
	document.getElementById('container'));
