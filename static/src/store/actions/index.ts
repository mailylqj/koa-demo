import {account, login, logout } from './account';
import {increate, increateAsync, fetch_user} from './counter'


export default { //导出ActionCreators
    account,
    login,
    logout,
    fetch_user,
    increateAsync,
    increate
};