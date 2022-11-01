const koaRouter = require("koa-router");
const { web_instituicao } = require("../../controllers");
const router = new koaRouter({
    prefix: '/instituicao'
});



router.get("/", web_instituicao.index);
router.get("/tecnicos", web_instituicao.tecnicos);
router.get("/utentes", web_instituicao.utentes);
router.get("/utentes/:id", web_instituicao.utente);
router.get("/perfil", web_instituicao.perfil);
router.get("/arquivos", web_instituicao.arquivar);

router.get("/alertas", web_instituicao.alertas);
router.get("/live", web_instituicao.monitorizacao);
router.get("/relatorios", web_instituicao.relatorios);


module.exports = router;
