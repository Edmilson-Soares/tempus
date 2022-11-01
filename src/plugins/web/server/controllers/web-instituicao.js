'use strict';

module.exports = {


    async index(ctx) {
        let jwt = ctx.cookies.get(`${process.env.COOKIES_NAME}:jwt`)


        try {
            const { data } = await strapi.plugin('web').service('auth').jwt(jwt);

            console.log(data, 'role')

            if (data.role == 'admin') return ctx.redirect('/dashboard');
            if (data.role == 'dev') return ctx.redirect('/dev');

            if (data.role == 'tecnico') return ctx.redirect('/tecnico');
            if (data.role != 'cliente') return ctx.redirect('/auth/login');

            const user = await strapi.plugin('web').service('instituicao').tempus(data.id)

            user.instituicao.tecnicos = []

            console.log(user)

            let tempo = 0,
                desempenho = 0.0,
                utente_v = 0;


            user.instituicao.utentes.map(utente => {
                //console.log(utente.f.split(":")[1])
                tempo += Number(utente.f.split(":")[1].split(',')[0])
                desempenho += Number(utente.f.split(":")[1].split(',')[1])
                utente_v++

            })

            if (utente_v > 0) {
                desempenho /= utente_v
            }

            console.log(tempo, desempenho)

            await ctx.render('clients/index', { user, desempenho, tempo, jwt });


        } catch (error) {

            console.log(error)
            ctx.redirect('/auth/login')
        }


    },


    async tecnicos(ctx) {
        let jwt = ctx.cookies.get(`${process.env.COOKIES_NAME}:jwt`)


        try {


            //   console.log(ctx.request.header.host, ctx.request.header.referer.split('/instituicao')[0])
            const { data } = await strapi.plugin('web').service('auth').jwt(jwt);

            console.log(data, 'role')

            if (data.role == 'tecnico') return ctx.redirect('/tecnico');
            if (data.role != 'cliente') return ctx.redirect('/auth/login');



            const user = await strapi.plugin('web').service('instituicao').tempustecnicos(data.id)

            user.instituicao.tecnicos = []
            console.log(user)
            await ctx.render('clients/tecnicos', { user, jwt });


        } catch (error) {

            console.log(error)
            ctx.redirect('/auth/login')
        }


    },

    async utentes(ctx) {
        let jwt = ctx.cookies.get(`${process.env.COOKIES_NAME}:jwt`)


        try {
            const { data } = await strapi.plugin('web').service('auth').jwt(jwt);

            console.log(data, 'role')

            if (data.role == 'tecnico') return ctx.redirect('/tecnico');
            if (data.role != 'cliente') return ctx.redirect('/auth/login');

            const user = await strapi.plugin('web').service('instituicao').tempusutentes(data.id)
            let data1 = new Date()



            await ctx.render('clients/utentes', { user, ano: data1.getFullYear(), jwt });


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

            if (data.role == 'tecnico') return ctx.redirect('/tecnico');
            if (data.role != 'cliente') return ctx.redirect('/auth/login');

            const user = await strapi.plugin('web').service('instituicao').tempusutente(data.id, utente)


            await ctx.render('clients/utente_perfil', { user, jwt });


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

            if (data.role == 'tecnico') return ctx.redirect('/tecnico');
            if (data.role != 'cliente') return ctx.redirect('/auth/login');

            const user = await strapi.plugin('web').service('instituicao').tempusperfil(data.id)
            await ctx.render('clients/perfil', { user });

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

            if (data.role == 'tecnico') return ctx.redirect('/tecnico');
            if (data.role != 'cliente') return ctx.redirect('/auth/login');

            const user = await strapi.plugin('web').service('instituicao').tempusalertas(data.id)

            user.instituicao.alertas = []
            let data1 = new Date()

            await ctx.render('clients/alertas', { user, ano: data1.getFullYear(), jwt });

        } catch (error) {

            console.log(error)
                //   ctx.redirect('/auth/login')
        }


    },
    async arquivar(ctx) {
        let jwt = ctx.cookies.get(`${process.env.COOKIES_NAME}:jwt`)


        try {
            const { data } = await strapi.plugin('web').service('auth').jwt(jwt);

            console.log(data, 'role')

            if (data.role == 'tecnico') return ctx.redirect('/tecnico');
            if (data.role != 'cliente') return ctx.redirect('/auth/login');

            const user = await strapi.plugin('web').service('instituicao').tempusarquivar(data.id)
            let data1 = new Date()

            await ctx.render('clients/arquivos', { user, ano: data1.getFullYear(), jwt });


        } catch (error) {

            console.log(error)
            ctx.redirect('/auth/login')
        }


    },
    async relatorios(ctx) {
        let jwt = ctx.cookies.get(`${process.env.COOKIES_NAME}:jwt`)


        try {
            const { data } = await strapi.plugin('web').service('auth').jwt(jwt);

            console.log(data, 'role')

            if (data.role == 'tecnico') return ctx.redirect('/tecnico');
            if (data.role != 'cliente') return ctx.redirect('/auth/login');

            const user = await strapi.plugin('web').service('instituicao').tempusrelatorios(data.id)
            let data1 = new Date()

            await ctx.render('clients/relatorio', { user, ano: data1.getFullYear(), jwt });

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

            if (data.role == 'tecnico') return ctx.redirect('/tecnico');
            if (data.role != 'cliente') return ctx.redirect('/auth/login');

            const user = await strapi.plugin('web').service('instituicao').tempusmonitorizacao(data.id)


            await ctx.render('clients/live', { user, jwt });

        } catch (error) {

            console.log(error)
                //ctx.redirect('/auth/login')
        }


    },
}
