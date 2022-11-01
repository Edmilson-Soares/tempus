const koaRouter = require("koa-router");
const site = require("./site");
const auth = require("./auth");
const instituicao = require("./instituicao");
const tecnico = require("./tecnico");
const dev = require("./dev");
const admin = require("./admin");
const router = new koaRouter();


router.use(admin.routes()).use(admin.allowedMethods());
router.use(dev.routes()).use(dev.allowedMethods());
router.use(tecnico.routes()).use(tecnico.allowedMethods());
router.use(instituicao.routes()).use(instituicao.allowedMethods());
router.use(site.routes()).use(site.allowedMethods());
router.use(auth.routes()).use(auth.allowedMethods());







module.exports = router;
