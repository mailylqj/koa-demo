import * as Router from 'koa-router';
const router = new Router();

router.get('/', async (ctx, next) => {
	const titleTxt = 'hello koa';
	await ctx.render('index', {
		title: titleTxt,
		content: 'kkkkk'
	});
});

module.exports = router;
