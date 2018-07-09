const Koa = require('koa');
const path = require('path');
const app = new Koa();
const views = require('koa-views');
const Router = require('koa-router');
// const route = require('koa-route');
const koaStatic = require('koa-static');
const convert = require('koa-convert');
const onerror = require('koa-onerror');
const bodyParser = require('koa-bodyparser');
const config = require('./../config');
// const websockify = require('koa-websocket');
const WebSocket = require('ws');

// 加载模板引擎
app.use(views(path.join(__dirname, './views'), {
	extension: 'jade'
}));

// 设置管理静态目录
app.use(convert(koaStatic(
	path.join(__dirname, './../static')
)));

// 错误处理机制
onerror(app);

// 设置主路由
const index = require('./routes/index');
// const login = require('./routes/login');
// const user = require('./routes/user');
// const chat = require('./routes/chat');

// 装载所有子路由
const router = new Router();

router.use('*', index.routes(), index.allowedMethods());
// router.use('/login', login.routes(), login.allowedMethods());
// router.use('/user', user.routes(), user.allowedMethods());
// socket.ws.use(route.all('/chat', chat.routes(), chat.allowedMethods()));

// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods());

// 使用ctx.body解析中间件
app.use(bodyParser());
const data = { count: 2 };

const appServer = app.listen(config.serverPort);

const wss = new WebSocket.Server({
	server: appServer
});

wss.on('connection', (ws, req) => {
	console.log(req.url);
	ws.on('message', (message) => {
		wss.clients.forEach((client) => {
			if (client !== ws && client.readyState === WebSocket.OPEN) {
				client.send(message);
			}
		});
	});
	ws.send(JSON.stringify(data));
});

console.log(`koa server is on port, ${config.serverPort}`);
