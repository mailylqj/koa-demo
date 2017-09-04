const Koa = require('koa');
const path = require('path');
const app = new Koa();
const views = require('koa-views');
const Router = require('koa-router');
const koaStatic = require('koa-static');
const convert = require('koa-convert');
const onerror = require('koa-onerror');
const bodyParser = require('koa-bodyparser');
const config = require('./../config');

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

// 装载所有子路由
const router = new Router();
router.use('/', index.routes(), index.allowedMethods());
router.use('/login', login.routes(), login.allowedMethods());
router.use('/user', user.routes(), user.allowedMethods());

// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods());

// 使用ctx.body解析中间件
app.use(bodyParser());
app.use(async (ctx) => {
	if (ctx.url === '/register' && ctx.method === 'GET') {
		let html = `
		<h1>koa2 request post demo</h1>
		<form method="POST" action="/register">
			<p>userName</p>
			<input name="userName" /><br/>
			<p>nickName</p>
			<input name="nickName" /><br/>
			<p>email</p>
			<input name="email" /><br/>
			<button type="submit">submit</button>
		</form>`;
		ctx.body = html;
	} else if (ctx.url === '/register' && ctx.method === 'POST') {
		let postData = ctx.request.body;
		ctx.body = postData;
	} else {
		ctx.body = '<h1>404 </h1>';
	}
});

app.listen(config.serverPort);
console.log(`koa server is on port, ${config.serverPort}`);

// 子路由2
/* let page = new Router()
page.get('/404', async ( ctx )=>{
	ctx.body = '404 page!'
}).get('/helloworld', async ( ctx )=>{
	let title = 'hello koa2'
	await ctx.render('test', {
		title,
	})
})*/
