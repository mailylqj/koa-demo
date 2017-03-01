const Router = require('koa-router');
let router = new Router();

router.get('/', async function (ctx, next) {
	let title = 'hello koa';
	await ctx.render('index', {
		title: title,
		content: 'kkkkk'
	});
})

module.exports = router;