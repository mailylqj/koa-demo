import { call, take, put, fork, takeEvery } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import {SOCKET_ONCONNECTION, SOCKET_ONMESSAGE, SOCKET_ONCLOSE } from '../actions/action-type/socket';

let socketChannel:any = null;

function createWebSocketConnection(action){
    return new WebSocket('ws://' + location.host + '/ws/socket/111');
}

function createSocketChannel(socket){
    return eventChannel(emit => {
        socket.onmessage = event => {
            emit(event.data);
            // console.log(event.data);
        }
        socket.onclose = () => {
            console.log('close');
        }
        const unsubscribe = () => {
            socket.close();
        }
        return unsubscribe
    })
}

function* _fetchSocket(action: any){
    const socket = yield call(createWebSocketConnection, action);
    socketChannel = yield call(createSocketChannel, socket);
    while (true) {
        const data = yield take(socketChannel);
        yield put({ type: SOCKET_ONMESSAGE, payload: { data } })
    }
}

function* _closeSocket(){
    if(socketChannel) {
        socketChannel.close();
    }
}

export function* fetchSocket(){
    yield takeEvery(SOCKET_ONCONNECTION, _fetchSocket)
    // yield fork(_fetchSocket);
}

export function* closeSocket(){
    yield takeEvery(SOCKET_ONCLOSE, _closeSocket);
}