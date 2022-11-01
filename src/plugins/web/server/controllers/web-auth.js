'use strict';

module.exports = {


    async index(ctx) {
        try {
            await ctx.render('auth/index', { jwt: 22 });
        } catch (err) {
            console.log(err)

        }
    },
    async forgot_password_send(ctx) {
        try {



            await ctx.render('auth/forgot_password_send', { jwt: 22 });
        } catch (err) {
            console.log(err)

        }
    },
    async forgot_password(ctx) {
        try {
            await ctx.render('auth/forgot_password', { jwt: 22 });
        } catch (err) {
            console.log(err)

        }
    },
    async new_password(ctx) {
        try {

            const { code } = ctx.query

            if (!code) {
                ctx.redirect('/auth/login')
            }
            const user = await strapi.plugin('app').service('user').infor_code(code)
            if (!user) {
                ctx.redirect('/auth/login')
            }

            await ctx.render('auth/newpassword', { code, user });
        } catch (err) {
            console.log(err)

        }
    },



}
