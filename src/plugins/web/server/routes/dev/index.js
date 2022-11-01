const koaRouter = require("koa-router");
const { web_dev } = require("../../controllers");
const router = new koaRouter({
    prefix: '/dev'
});



router.get("/", web_dev.perfil);
router.get("/live", web_dev.monitorizacao);



module.exports = router;
