const md5 = require('md5');
module.exports = {
    restToken: async ctx => {
        ctx.body = {
            result: 0,
            data: md5(ctx.path)
        }
    },
    login: async ctx => {
        let {username, password} = ctx.request.body;
        ctx.cookies.set('__pin', username, {
            domain: ctx.host,
            path: ctx.path,
            maxAge: 10 * 60 * 1000,
            overwrite: false
        })
        ctx.session.isLogin = true;
        ctx.session.username = username;
        ctx.session.password = password;
        ctx.body = {
            result: 0,
            data: {
                username,
                isLogin: true
            }
        }
    },
    logout: async ctx => {
        ctx.session.isLogin = false;
        ctx.session.username = null;
        ctx.session.password = null;
        ctx.body = {
            result: 0,
            data: {
                username,
                isLogin: false
            }
        }
    }
}