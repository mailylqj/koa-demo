const Router = require('koa-router');
let router = new Router();

router.get('/', async (ctx, next) => {
	console.log(ctx);
	await ctx.render('login', {
		title: 'login',
		content: 'kkkkk'
	});
});

module.exports = router;
