'use strict';

module.exports = {



    async instituicoes(ctx) {
        let jwt = ctx.cookies.get(`${process.env.COOKIES_NAME}:jwt`)


        try {
            const { data } = await strapi.plugin('web').service('auth').jwt(jwt);

            console.log(data, 'role')

            if (data.role != 'admin') return ctx.redirect('/auth/login');

            const instituicoes = await strapi.plugin('app').service('instituicao').getinstituicao()
            const ferramentas = await strapi.plugin('app').service('instituicao').getferramentas()

            const user = await strapi.plugin('web').service('instituicao').tempusperfil(data.id)

            await ctx.render('dashboard/instituicoes', { user, jwt, instituicoes, ferramentas });


        } catch (error) {

            console.log(error)
            ctx.redirect('/auth/login')
        }


    },
    async perfil(ctx) {
        let jwt = ctx.cookies.get(`${process.env.COOKIES_NAME}:jwt`)


        try {
            const { data } = await strapi.plugin('web').service('auth').jwt(jwt);




            if (data.role != 'admin') return ctx.redirect('/auth/login');

            const user = await strapi.plugin('web').service('instituicao').tempusperfil(data.id)
            await ctx.render('dashboard/perfil', { user });

        } catch (error) {

            console.log(error)
            ctx.redirect('/auth/login')
        }


    },
}
