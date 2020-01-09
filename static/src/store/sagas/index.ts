import { all, fork } from 'redux-saga/effects';
import { account, login, logout} from './account';
import { add } from './counter';
import { fetchSocket, closeSocket } from './socket';

export default function* sagas() {
    yield all([ // 同时并发多个
        account(),
        login(),
        logout(),
        add(),
        closeSocket(),
        fetchSocket()
    ])
}
