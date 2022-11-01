const koaRouter = require("koa-router");
const { web_tecnico } = require("../../controllers");
const router = new koaRouter({
    prefix: '/tecnico'
});


router.get("/utentes/:id", web_tecnico.utente);
router.get("/", web_tecnico.perfil);
router.get("/alertas", web_tecnico.alertas);
router.get("/live", web_tecnico.monitorizacao);
router.get("/relatorios", web_tecnico.relatorios);


module.exports = router;
