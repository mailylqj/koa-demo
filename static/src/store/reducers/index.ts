import { combineReducers } from 'redux';

import accountInfo from './account';
import counter from './counter';
import socketData from './socket';


export default combineReducers({ counter, accountInfo, socketData });