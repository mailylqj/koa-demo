import moment = require("moment");

const md5 = require('md5');
module.exports = {
    restToken: async (ctx:any) => {
        ctx.body = {
            result: 0,
            data: md5(ctx.path)
        }
    },
    login: async (ctx:any) => {
        let {username, password} = ctx.request.body;
        ctx.cookies.set('__pin', username, {
            domain: ctx.host,
            path: ctx.path,
            maxAge: 10 * 60 * 1000,
            overwrite: false
        })
        ctx.session.loggedin = true;
        ctx.session.username = username;
        ctx.session.password = password;
        ctx.body = {
            result: 0,
            data: {
                username,
                loggedin: true,
                date: moment().unix(),
                token: md5(ctx.path)
            }
        }
    },
    logout: async (ctx:any) => {
        ctx.session.loggedin = false;
        ctx.session.username = null;
        ctx.session.password = null;
        ctx.body = {
            result: 0,
            data: {
                loggedin: false,
                date: moment().unix(),
                token: md5(ctx.path)
            }
        }
    },
    account: async (ctx:any) => {
        let { username, loggedin } = ctx.session;
        ctx.body = {
            result: 0,
            data: {
                username,
                loggedin,
                date: moment().unix(),
                token: md5(ctx.path)
            }
        }
    }
}