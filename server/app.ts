import * as Koa from 'koa';
import * as path from 'path';
import * as views from 'koa-views';
import * as Router from 'koa-router';
import * as koaStatic from 'koa-static';
import * as Mount from 'koa-mount';
import * as bodyParser from 'koa-bodyparser';
import * as session from 'koa-session';
import * as redisStore from 'koa-redis';
import config from './config/config';
import SocketServ from './service/socket';

const app = new Koa();

// 加载模板引擎
app.use(views(path.join(__dirname, './views'), {
	extension: 'jade'
}));

// 设置管理静态目录
app.use(Mount(koaStatic(
	path.join(__dirname, './../static')
)));

// 错误处理机制
// onerror(app);

// 使用ctx.body解析中间件
app.use(bodyParser());

app.use(session({
	store: redisStore({
		port: 6379,
		host: '127.0.0.1'
	}),
	signed: false, //是否签名。(默认是 true)
	maxAge: 60 * 60 * 1000,
	// renew: true,  //是否在Session快过期时刷新Session的有效期。(默认是 false)
	rolling: true // 是否每次响应时刷新Session的有效期。(默认是 false)
}, app));

// 设置主路由
const index = require('./routes/index');
// const login = require('./routes/login');
// const user = require('./routes/user');
// const chat = require('./routes/chat');

const Api = require('./routes/restful');

// 装载所有子路由
const router = new Router();

// router.use('/login', login.routes());
// router.use('/user', user.routes());
// socket.ws.use(route.all('/chat', chat.routes()));
router.use('/ajax', Api.routes());
router.use('*', index.routes());

// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods());

const appServer = app.listen(config.serverPort);

SocketServ(appServer);

console.log(`koa server is on port, ${config.serverPort}`);
