import { FETCH_ACCOUNT_REQUEST, LOGOUT_REQUEST, LOGIN_REQUEST } from './action-type/account';


export const account = (payload: any) => {
    return { type: FETCH_ACCOUNT_REQUEST, payload}
}

export const login = (payload: any) => {
    return { type: LOGIN_REQUEST, payload }
}

export const logout = (payload: any) => {
    return { type: LOGOUT_REQUEST, payload }
}