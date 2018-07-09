const Koa = require('koa');
const path = require('path');
const app = new Koa();
const views = require('koa-views')
const Router = require('koa-router')

// 加载模板引擎
app.use(views(path.join(__dirname, './views'), {
  extension: 'jade'
}))

const index = require('./routes/index');

// 子路由2
let page = new Router()
page.get('/404', async ( ctx )=>{
  ctx.body = '404 page!'
}).get('/helloworld', async ( ctx )=>{
  let title = 'hello koa2'
  await ctx.render('test', {
    title,
  })
})

// 装载所有子路由
let router = new Router()
router.use('/', index.routes(), index.allowedMethods())
router.use('/page', page.routes(), page.allowedMethods())

// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods())
 
app.listen(3000);
console.log('koa server is on port 3000');