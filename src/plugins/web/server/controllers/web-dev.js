'use strict';

module.exports = {


    async perfil(ctx) {
        let jwt = ctx.cookies.get(`${process.env.COOKIES_NAME}:jwt`)


        try {
            const { data } = await strapi.plugin('web').service('auth').jwt(jwt);

            console.log(data, 'role')

            if (data.role != 'dev') return ctx.redirect('/auth/login');

            const user = await strapi.plugin('web').service('instituicao').tempusperfil(data.id)
            await ctx.render('dev/perfil', { user });

        } catch (error) {

            console.log(error)
                // ctx.redirect('/auth/login')
        }


    },
    async monitorizacao(ctx) {
        let jwt = ctx.cookies.get(`${process.env.COOKIES_NAME}:jwt`)


        try {
            const { data } = await strapi.plugin('web').service('auth').jwt(jwt);

            console.log(data, 'role')

            if (data.role != 'dev') return ctx.redirect('/auth/login');

            const user = await strapi.plugin('web').service('instituicao').tempusmonitorizacao(data.id)


            await ctx.render('dev/live', { user, jwt });

        } catch (error) {

            console.log(error)
                //ctx.redirect('/auth/login')
        }


    },
}
