import { call, takeEvery, put, fork } from 'redux-saga/effects';
import axios from '../axios';

//import { createBrowserHistory } from 'history';
//const history = createBrowserHistory();

import {FETCH_ACCOUNT_REQUEST, FETCH_FAIL} from '../actions/action-type/account';
import {LOGIN_REQUEST, LOGIN_SUCESS} from '../actions/action-type/account';
import {LOGOUT_REQUEST, LOGOUT_SUCESS} from '../actions/action-type/account';

function* _account(action) {
    try {
        const res = yield call(axios.get, '/ajax/account');
        yield put({ type: LOGIN_SUCESS,  payload: {
            username: res.data.username,
            loggedin: res.data.loggedin
        }});
    } catch (e) {
        yield put({ type: FETCH_FAIL, payload: {error: e} });
    }
}

function* _login(action) {
    try{
        const res = yield call(axios.post, '/ajax/login', action.payload.data);
        yield put ({type: LOGIN_SUCESS, payload: {
            username: res.data.username,
            loggedin: res.data.loggedin
        }})
        yield put(action.payload.callBack());
    }catch (e) {
        yield put({ type: FETCH_FAIL, payload: {error: e} });
    }
}

function* _logout() {
    try{
        const res = yield call(axios.get, '/ajax/logout');
        yield put ({type: LOGOUT_SUCESS, payload: {
            username: '',
            loggedin: res.data.loggedin
        }})
    }catch(e){
        yield put({ type: FETCH_FAIL, payload: {error: e} });
    }
}

export function* account() {
    // yield takeEvery(FETCH_ACCOUNT_REQUEST, _account); // 正在加载数据
    yield fork(_account);
}

export function* login() {
    yield takeEvery(LOGIN_REQUEST, _login);
}

export function* logout() {
    yield takeEvery(LOGOUT_REQUEST, _logout);
}