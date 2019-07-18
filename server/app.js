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

const session = require('koa-session')
const redisStore = require('koa-redis');

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
}, app))

app.use(async (ctx, next) => {
	console.log(ctx.path);
	if(!/login/i.test(ctx.path)){
		if(!(ctx.session && ctx.session.isLogin)){
			ctx.redirect('/login');
		}else{
			console.log(ctx.session)
		}
	}
	await next();
})

// 设置主路由
const index = require('./routes/index');
// const login = require('./routes/login');
// const user = require('./routes/user');
// const chat = require('./routes/chat');

const Api = require('./routes/restful');

// 装载所有子路由
const router = new Router();

router.use('*', index.routes());
// router.use('/login', login.routes());
// router.use('/user', user.routes());
// socket.ws.use(route.all('/chat', chat.routes()));
router.use('/ajax', Api.routes())

// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods());

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
	/* setInterval(function(){
		ws.send(JSON.stringify(data));
	}, 1000); */
	
});

console.log(`koa server is on port, ${config.serverPort}`);
