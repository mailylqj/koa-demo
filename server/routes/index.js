const Router = require('koa-router');
const router = new Router();

router.get('/', async (ctx, next) => {
	const titleTxt = 'hello koa';
	await ctx.render('index', {
		title: titleTxt,
		content: 'kkkkk'
	});
});

module.exports = router;
