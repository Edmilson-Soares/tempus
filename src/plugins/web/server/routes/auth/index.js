const koaRouter = require("koa-router");
const { web_auth } = require("../../controllers");
const router = new koaRouter({
    prefix: '/auth'
});

router.get("/login", web_auth.index);

router.get("/new_password", web_auth.new_password);

router.get("/forgot_password", web_auth.forgot_password);


router.get("/forgot_password_send", web_auth.forgot_password_send);




module.exports = router;
