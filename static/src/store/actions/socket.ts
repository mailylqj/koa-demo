import {SOCKET_ONCONNECTION, SOCKET_ONCLOSE } from './action-type/socket';

export const fetchSocket = (payload: any) => {
    return { type: SOCKET_ONCONNECTION, payload}
}

export const closeSocket = () => {
    return { type: SOCKET_ONCLOSE }
} 