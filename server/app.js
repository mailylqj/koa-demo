const Koa = require('koa');
const path = require('path');
const app = new Koa();
const views = require('koa-views');
const Router = require('koa-router');
const route = require('koa-route');
const koaStatic = require('koa-static');
const convert = require('koa-convert');
const onerror = require('koa-onerror');
const bodyParser = require('koa-bodyparser');
const config = require('./../config');
const websockify = require('koa-websocket');

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
const login = require('./routes/login');
const user = require('./routes/user');
// const chat = require('./routes/chat');

// 装载所有子路由
const router = new Router();
const socket = websockify(app);
router.use('/', index.routes(), index.allowedMethods());
router.use('/login', login.routes(), login.allowedMethods());
router.use('/user', user.routes(), user.allowedMethods());
// socket.ws.use(route.all('/chat', chat.routes(), chat.allowedMethods()));

// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods());

// 使用ctx.body解析中间件
app.use(bodyParser());

socket.ws.use(route.all('/chat', (ctx, next) => {
	var data = {count: 1};
	ctx.websocket.send(JSON.stringify(data));
	ctx.websocket.on('message', (message) => {
		ctx.websocket.send(message);
		console.log(message);
	});
}));

app.listen(config.serverPort);
console.log(`koa server is on port, ${config.serverPort}`);
