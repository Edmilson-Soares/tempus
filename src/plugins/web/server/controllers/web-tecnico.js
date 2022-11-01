'use strict';

module.exports = {



    async utentes(ctx) {
        let jwt = ctx.cookies.get(`${process.env.COOKIES_NAME}:jwt`)


        try {
            const { data } = await strapi.plugin('web').service('auth').jwt(jwt);

            console.log(data, 'role')

            if (data.role == 'cliente') return ctx.redirect('/instituicao');
            if (data.role != 'tecnico') return ctx.redirect('/auth/login');

            const user = await strapi.plugin('web').service('instituicao').tempusutentes(data.id)
            let data1 = new Date()



            await ctx.render('tecnico/utentes', { user, ano: data1.getFullYear(), jwt });


        } catch (error) {

            console.log(error)
            ctx.redirect('/auth/login')
        }


    },
    async utente(ctx) {
        let jwt = ctx.cookies.get(`${process.env.COOKIES_NAME}:jwt`)


        try {
            const { data } = await strapi.plugin('web').service('auth').jwt(jwt);

            const utente = ctx.params.id;

            console.log(data, 'role')
            if (data.role == 'cliente') return ctx.redirect('/instituicao');
            if (data.role != 'tecnico') return ctx.redirect('/auth/login');

            const user = await strapi.plugin('web').service('instituicao').tempusutente(data.id, utente)


            await ctx.render('tecnico/utente_perfil', { user, jwt });


        } catch (error) {

            console.log(error)
            ctx.redirect('/auth/login')
        }


    },
    async perfil(ctx) {
        let jwt = ctx.cookies.get(`${process.env.COOKIES_NAME}:jwt`)


        try {
            const { data } = await strapi.plugin('web').service('auth').jwt(jwt);

            console.log(data, 'role')

            if (data.role == 'cliente') return ctx.redirect('/instituicao');
            if (data.role != 'tecnico') return ctx.redirect('/auth/login');

            const user = await strapi.plugin('web').service('instituicao').tempusperfil(data.id)
            await ctx.render('tecnico/perfil', { user });

        } catch (error) {

            console.log(error)
            ctx.redirect('/auth/login')
        }


    },
    async alertas(ctx) {
        let jwt = ctx.cookies.get(`${process.env.COOKIES_NAME}:jwt`)


        try {
            const { data } = await strapi.plugin('web').service('auth').jwt(jwt);

            console.log(data, 'role')

            if (data.role == 'cliente') return ctx.redirect('/instituicao');
            if (data.role != 'tecnico') return ctx.redirect('/auth/login');

            const user = await strapi.plugin('web').service('instituicao').tempusalertas(data.id)

            user.instituicao.alertas = []
            let data1 = new Date()

            await ctx.render('tecnico/alertas', { user, ano: data1.getFullYear(), jwt });

        } catch (error) {

            console.log(error)
                //   ctx.redirect('/auth/login')
        }


    },
    async relatorios(ctx) {
        let jwt = ctx.cookies.get(`${process.env.COOKIES_NAME}:jwt`)


        try {
            const { data } = await strapi.plugin('web').service('auth').jwt(jwt);

            console.log(data, 'role')

            if (data.role == 'cliente') return ctx.redirect('/instituicao');
            if (data.role != 'tecnico') return ctx.redirect('/auth/login');

            const user = await strapi.plugin('web').service('instituicao').tempusrelatorios(data.id)
            let data1 = new Date()

            await ctx.render('tecnico/relatorio', { user, ano: data1.getFullYear(), jwt });

        } catch (error) {

            console.log(error)
            ctx.redirect('/auth/login')
        }


    },
    async monitorizacao(ctx) {
        let jwt = ctx.cookies.get(`${process.env.COOKIES_NAME}:jwt`)


        try {
            const { data } = await strapi.plugin('web').service('auth').jwt(jwt);

            console.log(data, 'role')

            if (data.role == 'cliente') return ctx.redirect('/instituicao');
            if (data.role != 'tecnico') return ctx.redirect('/auth/login');

            const user = await strapi.plugin('web').service('instituicao').tempusmonitorizacao(data.id)


            await ctx.render('tecnico/live', { user, jwt });

        } catch (error) {

            console.log(error)
            ctx.redirect('/auth/login')
        }


    },
}
