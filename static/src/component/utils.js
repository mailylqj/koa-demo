import moment from 'moment';
export default {
    Cookies: {
        get: (name) => {
            let pattern = RegExp(name + '=.[^;]*');
            let matched = document.cookie.match(pattern);
            if (matched) {
                let cookie = matched[0].split('=');
                return cookie[1];
            }
            return '';
        },
        set: (name, value, expires, path, domain, secure) => {
            if ('string' == typeof(name) && 'string' == typeof(value)) {
                let Cookie = name + '=' + value;
                if (expires) {
                    let date = moment();
                    date.set(date.valueOf() + parseInt(expires));
                    Cookie += '; expires=' + date.toString();
                }
                if (path) {
                    Cookie += '; path=' + path;
                }
                if (domain) {
                    Cookie += '; domain=' + domain;
                }
                if (secure) {
                    Cookie += '; secure';
                }
                document.cookie = Cookie;
            }
        }
    }
};