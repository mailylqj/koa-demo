import { SOCKET_ONMESSAGE } from '../actions/action-type/socket';

const initState = {
    pending: true,
    data: null,
}

const socketData = (state = initState, action) => {
    let newState;
    switch (action.type){
        case SOCKET_ONMESSAGE:
            newState = {
                pending: false,
                ...action.payload
            }
            break;
        default:
            newState = state
    }
    return newState;
}

export default socketData;