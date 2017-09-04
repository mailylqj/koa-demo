title: KOA2 学习笔记分享
speaker: leeli
url: https://github.com/ksky521/nodePPT
transition: zoomout
files: /doc/ppt.css
theme: moon
highlightStyle: monokai_sublime
usemathjax: no
date: 2017-04-26

[slide]
# **KOA**
## next generation web framework for node.js

[slide]
## 一、KOA的简介

<div class="text"> koa.js 是下一代的node.js框架，由Express团队开发，通过生成器（generators JavaScript 1.7新引入的，用于解决回调嵌套的方案），减少异步回调，提高代码的可读性和可维护性，同时改进了错误处理（Express的错误处理方式相当糟糕）。</div>

[slide]
## KOA的优点

* 更优雅、简单、安全的中间件机制 {:&.rollIn}
* 更优雅、简单的异常处理
* 更优雅、简单的异步编程方式

[slide]
## KOA环境依赖

* KOA@1 Node环境最低 v0.11.x {:&.rollIn}
  运行server的时候开启 --harmony (或--harmony-generators)来支持ES6的generators
* <pre><code class="koajs">node --harmony app.js</code></pre>  
* KOA@2 Node环境 node v7.6.x  来支持ES7的async函数

[slide]
## 一如既往的hello word

<pre><code class="koajs">const Koa = require('koa');
const app = new Koa();

app.use(ctx => {
	ctx.body = 'Hello World';
});

app.listen(3000);
// 等价于 http.createServer(app.callback()).listen(3000);
</code></pre>

[slide]
## KOA中的上下文 Context
---
<div class="text">
Koa Context 将 node 的 request 和 response 对象封装在一个单独的对象里面，其为编写 web 应用和 API 提供了很多有用的方法。

这些操作在 HTTP 服务器开发中经常使用，因此其被添加在上下文这一层，而不是更高层框架中，因此将迫使中间件需要重新实现这些常用方法。

context 在每个 request 请求中被创建，在中间件中作为接收器(receiver)来引用，或者通过 this 标识符来引用：
</div>
<pre><code class="koajs">app.use(function *(){
this; // is the Context
this.request; // is a koa Request
this.response; // is a koa Response
});
</code></pre>
<div class="text">
    许多 context 的访问器和方法为了便于访问和调用，简单的委托给他们的 ctx.request 和 ctx.response 所对应的等价方法， 比如说 ctx.type 和 ctx.length 代理了 response 对象中对应的方法，ctx.path 和 ctx.method 代理了 request 对象中对应的方法。
</div>

[slide]
#### 常用的API 
----
* ctx.req   Node 的 request 对象。
* ctx.res   Node 的 response 对象。
* ctx.request  Koa 的 Request 对象。
* ctx.response  Koa 的 Response 对象。
* ctx.app   应用实例引用。
* ctx.cookies.get(name, [options])
* ctx.cookies.set(name, value, [options])
<div class="options">
signed: 是否要做签名<br>
expires: cookie 有效期时间<br>
path: cookie 的路径，默认为 /'<br>
domain: cookie 的域<br>
secure: false 表示 cookie 通过 HTTP 协议发送，true 表示 cookie 通过 HTTPS 发送。<br>
httpOnly: true 表示 cookie 只能通过 HTTP 协议发送
</div>

<a style="float: left;" href="http://koajs.com/#context">更多</a>
[slide]

#### Koa不支持直接调用底层 res 进行响应处理
---
<pre><code class="koajs">res.statusCode
res.writeHead()
res.write()
res.end()
</code></pre>

[slide]
## KOA@2 对async await语法支持
<pre><code class="koajs">function getSyncTime() {
    return new Promise((resolve, reject) => {
        try {
            let startTime = new Date().getTime()
            setTimeout(() => {
                let endTime = new Date().getTime()
                let data = endTime - startTime
                resolve( data )
            }, 500)
        } catch ( err ) {
            reject( err )
        }
    })
}

async function getSyncData() {
    let time = await getSyncTime()
    let data = `endTime - startTime = ${time}`
    return data
}

async function getData() {
    let data = await getSyncData()
    console.log( data )
}

getData()
</code></pre>
[slide]
#### Chrome 提供原生支持async/await
---
![KOA async](/doc/async.jpg "KOA async")

[slide]
## async/await 的特点
---
* 可以让异步逻辑用同步写法实现 {:&.rollIn}
* 最底层的await返回需要是Promise对象
* 可以通过多层 async function 的同步写法代替传统的callback嵌套

[slide]
#### koa@2的中间件写法
---
<pre><code class="koajs">app.use(async (next) => {
	var start = new Date;
	await next();
	var ms = new Date - start;
	this.set('X-Response-Time', ms + 'ms');
});
</code></pre>

[slide]
#### koa@1的中间件写法
---
<pre><code class="koajs">app.use(function *(next){
	var start = new Date;
	yield next;
	var ms = new Date - start;
	this.set('X-Response-Time', ms + 'ms');
});
</code></pre>

[slide]
#### KOA中间件的执行顺序
---
![KOA generators](/doc/koa.jpg "KOA generators")

[slide]
## KOA中间件的开发和使用

#### generator中间件开发
---
<pre><code class="koajs">// generator中间件返回的应该是function* () 函数
function log( ctx ) {
    console.log( ctx.method, ctx.header.host + ctx.url )
}

module.exports = function () {
    return function* ( next ) {

        // 执行中间件的操作
        log( this )

        if ( next ) {
            yield next
        }
    }
}
</code></pre>

[slide]
#### generator中间件在koa@1中的使用
---
<pre><code class="koajs">// generator 中间件在koa v1中可以直接use使用
const koa = require('koa')  // koa v1
const loggerGenerator  = require('./middleware/logger-generator')
const app = koa()

app.use(loggerGenerator())

app.use(function *( ) {
    this.body = 'hello world!'
})

app.listen(3000)
console.log('the server is starting at port 3000')
</code></pre>

[slide]

#### async中间件开发
---
<pre><code class="koajs">function log( ctx ) {
    console.log( ctx.method, ctx.header.host + ctx.url )
}

module.exports = function () {

    return function ( ctx, next ) {

        return new Promise( ( resolve, reject ) => {

            // 执行中间件的操作
            log( ctx )

            resolve()

            return next()

        }).catch(( err ) => {

            return next()
        })
    }
}
	
</code></pre>

[slide]

#### async 中间件在koa@2中使用
---
<pre><code>// async 中间件只能在 koa v2中使用
const Koa = require('koa') // koa v2
const loggerAsync  = require('./middleware/logger-async')
const app = new Koa()

app.use(loggerAsync())

app.use(( ctx ) => {
    ctx.body = 'hello world!'
})

app.listen(3000)
console.log('the server is starting at port 3000')
</code></pre>

[slide]
## 路由

#### koa@2 原生路由实现
---
<pre><code>// 返回页面访问地址
const Koa = require('koa')
const app = new Koa()

app.use( async ( ctx ) => {
  let url = ctx.request.url
  ctx.body = url
})
app.listen(3000)
</code></pre>
[slide]
#### koa@2 GET请求
---

<div class="text">在koa中，获取GET请求数据源头是koa中request对象中的query方法或querystring方法，query返回是格式化好的参数对象，querystring返回的是请求字符串，由于ctx对request的API有直接引用的方式，所以获取GET请求数据有两个途径。</div>

* 1.是从上下文中直接获取 {:&.rollIn}
请求对象ctx.query，返回如 { a:1, b:2 }
请求字符串 ctx.querystring，返回如 a=1&b=2
* 2.是从上下文的request对象中获取
请求对象ctx.request.query，返回如 { a:1, b:2 }
请求字符串 ctx.request.querystring，返回如 a=1&b=2

[slide]
#### koa@2 GET请求
---
<pre><code class="koajs">const Koa = require('koa')
const app = new Koa()

app.use( async ( ctx ) => {
    let url = ctx.url
    // 从上下文的request对象中获取
    let request = ctx.request
    let req_query = request.query
    let req_querystring = request.querystring

    // 从上下文中直接获取
    let ctx_query = ctx.query
    let ctx_querystring = ctx.querystring

    ctx.body = {
        url,
        req_query,
        req_querystring,
        ctx_query,
        ctx_querystring
    }
})
app.listen(3000);
</code></pre>

[slide]
#### koa@2 POST请求
---
<div class="text">
    对于POST请求的处理，koa2没有封装获取参数的方法，需要通过解析上下文context中的原生node.js请求对象req，将POST表单数据解析成query string（例如：a=1&b=2&c=3），再将query string 解析成JSON格式（例如：{"a":"1", "b":"2", "c":"3"}）
</div>

[slide]
<pre><code>// 解析上下文里node原生请求的POST参数
function parsePostData( ctx ) {
    return new Promise((resolve, reject) => {
        try {
            let postdata = "";
            ctx.req.addListener('data', (data) => {
                postdata += data
            })
            ctx.req.addListener("end",function(){
                let parseData = parseQueryStr( postdata )
                resolve( parseData )
            })
        } catch ( err ) {
            reject(err)
        }
    })
}

// 将POST请求参数字符串解析成JSON
function parseQueryStr( queryStr ) {
    let queryData = {}
    let queryStrList = queryStr.split('&')
    console.log( queryStrList )
    for (  let [ index, queryStr ] of queryStrList.entries()  ) {
        let itemList = queryStr.split('=')
        queryData[ itemList[0] ] = decodeURIComponent(itemList[1])
    }
    return queryData
}
</code></pre>

[slide]
#### KOA的模板引擎
---
<div class="text">适用于 koa 的模板引擎选择非常多，比如 jade、ejs、nunjucks、xtemplate 等。<br>
怎么选择 ? 主要考虑以下几个因素：
</div>

* 上手难度  xtemplate < nunjucks < ejs < jade  {:&.rollIn}
* 功能的强大度   nunjucks > xtemplate > jade > ejs 
* 是否支持前后端混用  jade不支持
* 性能考量  xtemplate 会更优秀些

[slide]

<pre><code class="jade">// jade
body
    h1 Jade - node template engine
    #container.col
      if youAreUsingJade
        p You are amazing
      else
        p Get on it!
</code></pre>

<pre><code class="ejs">// ejs
<p><%=: users | first | capitalize %></p>
</code></pre>

<pre><code class="xtemplate"> // xtemplate
{{#if(variable===0)}}
  It is true    
{{/if}}
</code></pre>

<pre><code class="nunjucks"> // nunjucks
{% if variable == 0 %}
  It is true
{% endif %}
</code></pre>

[slide]

#### koa@2加载模板引擎
---
<pre><code class="koajs">const Koa = require('koa')
const views = require('koa-views')
const path = require('path')
const app = new Koa()

// 加载模板引擎
app.use(views(path.join(__dirname, './view'), {
    extension: 'ejs'
}))

app.use( async ( ctx ) => {
    let title = 'hello koa2'
    await ctx.render('index', {
        title,
    })
})

app.listen(3000)
</code></pre>

[slide]

#### 后记

* ES6/7 带来的变革
<div class="text">
    自ES6确定和ES7的async/await开始普及，node.js的发展变得更加迅速，可以预见到JavaScript中令人“头疼”的多层嵌套回调（注意是”多层嵌套回调“）将会使用Promise + async/await的方式逐渐替代（不是完全替代，多层嵌套回调也有其特殊的应用场景）。
</div>

* 参考
---
<a style="float: left;" href="http://koajs.com">koa官方文档</a> <br>
<a style="float: left;" href="http://koa.bootcss.com">koa中文文档</a><br>
<a style="float: left;" href="http://javascript.ruanyifeng.com/nodejs/koa.html">koa框架</a><br>
<a style="float: left;" href="http://book.apebook.org/minghe/koa-action/hello-koa/index.html">koa实战</a><br>
<a style="float: left;" href="https://github.com/17koa/koa-generator">koa-generator</a>

[slide]

# **谢谢**