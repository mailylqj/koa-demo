import { INCREMENT, INCREMENT_ASYNC } from './action-type/counter';

export const increate = () => {
    return {
        type: INCREMENT
    }
}

export const increateAsync = () => {
    return {
        type: INCREMENT_ASYNC
    }
}


export const fetch_user = () => {
    return {
        type: 'FETCH_ACCOUNT_REQUEST'
    }
}
