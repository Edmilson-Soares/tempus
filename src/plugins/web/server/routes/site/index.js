const koaRouter = require("koa-router");
const { site } = require("../../controllers");
const router = new koaRouter();



router.get("/", site.index);

router.get("/sobre", site.sobre);

router.get("/sobre/programas", site.sobre_programas);

router.get("/servicos", site.servicos);
router.get("/servico/:plano", site.servico);
router.get("/galerias", site.galerias);
router.get("/publicacoes", site.publicacoes);
router.get("/publicacoes/:id", site.publicacao);
router.get("/contatos", site.contatos);
router.get("/s", site.contatos);




/*
router.get('*', function(ctx) {
    ctx.res.send('what???', 404);
});

*/



module.exports = router;
