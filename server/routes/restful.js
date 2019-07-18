const Router = require('koa-router');
const router = new Router();

const DeviceCtrl = require('../controller/deviceCtrl');
const Author = require('../controller/authorCtrl');

router.post('/getDeviceList', DeviceCtrl.getDeviceList);

router.post('/Token', Author.restToken);
router.post('/Login', Author.login);

module.exports = router;