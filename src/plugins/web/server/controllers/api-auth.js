'use strict';


module.exports = ({ strapi }) => ({

    logout: async(ctx) => {

        console.log(ctx.request.body)
        try {


            ctx.cookies.set(`${process.env.COOKIES_NAME}:jwt`, ``, { httpOnly: false });
            ctx.redirect('/auth/login')
        } catch (error) {
            ctx.assert.equal('object', typeof ctx.body, 400, error)
        }
    },
    login: async(ctx) => {

        console.log(ctx.request.body)
        try {

            let auth = await strapi.plugin('web').service('auth').login(ctx.request.body);

            ctx.cookies.set(`${process.env.COOKIES_NAME}:jwt`, `Bearer ${auth.jwt}`, { httpOnly: false });
            ctx.body = { auth };
        } catch (error) {
            ctx.assert.equal('object', typeof ctx.body, 400, error)
        }
    },

    new_password_conta: async(ctx) => {


        try {


            let jwt = ctx.cookies.get(`${process.env.COOKIES_NAME}:jwt`)
            const { data } = await strapi.plugin('web').service('auth').jwt(jwt);

            ctx.request.body.id = data.id

            console.log(ctx.request.body)

            let auth = await strapi.plugin('web').service('auth').newPasswordAcoant(ctx.request.body);
            ctx.body = { auth };
        } catch (error) {
            ctx.assert.equal('object', typeof ctx.body, 400, error)
        }
    },

    new_password: async(ctx) => {

        console.log(ctx.request.body)
        try {

            let auth = await strapi.plugin('web').service('auth').newPassword(ctx.request.body);

            ctx.cookies.set(`${process.env.COOKIES_NAME}:jwt`, `Bearer ${auth.jwt}`, { httpOnly: false });
            ctx.body = { auth };
        } catch (error) {
            ctx.assert.equal('object', typeof ctx.body, 400, error)
        }
    },

    forgot_password: async(ctx) => {

        console.log(ctx.request.body)
        try {


            //console.log(ctx.request.header.referer.split("/auth/")[0])

            let auth = await strapi.plugin('web').service('auth').forgot_password(ctx.request.body, ctx.request.header.referer.split("/auth/")[0]);

            // ctx.cookies.set(`${process.env.COOKIES_NAME}:jwt`, `Bearer ${auth.jwt}`, { httpOnly: false });
            ctx.body = { auth };
        } catch (error) {
            ctx.assert.equal('object', typeof ctx.body, 400, error)
        }
    },
});
