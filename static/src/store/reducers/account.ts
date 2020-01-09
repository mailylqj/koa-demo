import {FETCH_ACCOUNT_REQUEST, FETCH_FAIL} from '../actions/action-type/account';
import {LOGIN_REQUEST, LOGIN_SUCESS} from '../actions/action-type/account';
import {LOGOUT_REQUEST, LOGOUT_SUCESS} from '../actions/action-type/account';

const initState = {
    pending: true,
    loggedin: false,
    username: null
}


const accountInfo = (state = initState, action) => {
    let newState;
    switch(action.type){
        case FETCH_ACCOUNT_REQUEST || LOGIN_REQUEST || LOGOUT_REQUEST:
            newState = {
                pending: true,
                loggedin: false,
                username: null
            };
            break;
        case LOGIN_SUCESS:
            newState = {
                ...action.payload,
                pending: false
            };
            break;
        case LOGOUT_SUCESS:
            newState = {
                loggedin: false,
                pending: false,
                username: null
            };
            break
        default:
            newState = state
    }
    return newState;
}

export default accountInfo