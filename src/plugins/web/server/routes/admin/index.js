const koaRouter = require("koa-router");
const { web_admin } = require("../../controllers");
const router = new koaRouter({
    prefix: '/dashboard'
});


router.get("/perfil", web_admin.perfil);
router.get("/", web_admin.instituicoes);


module.exports = router;
