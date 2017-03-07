const Router = require('koa-router');
const router = new Router();

router.get('/', async (ctx, next) => {
	const title = 'hello koa';
	await ctx.render('index', {
		titleTxt: title,
		content: 'kkkkk'
	});
});

module.exports = router;
