'use strict';


function* generator(array) {

    for (let index = 0; index < array.length; index++) {
        yield array[index];

    }

}


module.exports = ({ strapi }) => ({
    acesso_tecnico: async(ctx) => {

        console.log(ctx.request.body)
        try {

            let jwt = ctx.cookies.get(`${process.env.COOKIES_NAME}:jwt`)
            const { data } = await strapi.plugin('web').service('auth').jwt(jwt);
            if (data.role != 'cliente') {
                ctx.assert.equal('object', typeof ctx.body, 403, { message: 'Não autorizado' })
            }

            ctx.body = await strapi.plugin('app').service('instituicao').acesso_tecnico(data, ctx.params.id)


        } catch (error) {
            ctx.assert.equal('object', typeof ctx.body, 400, error)
        }
    },
    delete_tecnico: async(ctx) => {

        console.log(ctx.request.body)
        try {

            let jwt = ctx.cookies.get(`${process.env.COOKIES_NAME}:jwt`)
            const { data } = await strapi.plugin('web').service('auth').jwt(jwt);
            if (data.role != 'cliente') {
                ctx.assert.equal('object', typeof ctx.body, 403, { message: 'Não autorizado' })
            }
            ctx.body = await strapi.plugin('app').service('instituicao').delete_tecnico(data, ctx.params.id)


        } catch (error) {
            ctx.assert.equal('object', typeof ctx.body, 400, error)
        }
    },
    delete_utente_fotos: async(ctx) => {

        try {

            let jwt = ctx.cookies.get(`${process.env.COOKIES_NAME}:jwt`)
            const { data } = await strapi.plugin('web').service('auth').jwt(jwt);

            if (data.role != 'cliente') {
                ctx.assert.equal('object', typeof ctx.body, 403, { message: 'Não autorizado' })
            }

            ctx.body = await strapi.plugin('app').service('instituicao').delete_utente_fotos(data, ctx.params.id, ctx.params.fotoid)


        } catch (error) {
            ctx.assert.equal('object', typeof ctx.body, 400, error)
        }
    },
    updade_utente_fotos: async(ctx) => {

        try {

            let jwt = ctx.cookies.get(`${process.env.COOKIES_NAME}:jwt`)
            const { data } = await strapi.plugin('web').service('auth').jwt(jwt);

            if (data.role != 'cliente') {
                ctx.assert.equal('object', typeof ctx.body, 403, { message: 'Não autorizado' })
            }

            ctx.body = await strapi.plugin('app').service('instituicao').update_utente_fotos(data, ctx.request.body.data, ctx.params.id)


        } catch (error) {
            ctx.assert.equal('object', typeof ctx.body, 400, error)
        }
    },
    update_utente: async(ctx) => {

        console.log(ctx.request.body, ctx.params)
        try {

            let jwt = ctx.cookies.get(`${process.env.COOKIES_NAME}:jwt`)
            const { data } = await strapi.plugin('web').service('auth').jwt(jwt);

            if (data.role != 'cliente') {
                ctx.assert.equal('object', typeof ctx.body, 403, { message: 'Não autorizado' })
            }

            ctx.body = await strapi.plugin('app').service('instituicao').update_utente(data, ctx.request.body.data, ctx.params.id)


        } catch (error) {
            ctx.assert.equal('object', typeof ctx.body, 400, error)
        }
    },
    create_utente: async(ctx) => {

        console.log(ctx.request.body)
        try {

            let jwt = ctx.cookies.get(`${process.env.COOKIES_NAME}:jwt`)
            const { data } = await strapi.plugin('web').service('auth').jwt(jwt);

            if (data.role != 'cliente') {
                ctx.assert.equal('object', typeof ctx.body, 403, { message: 'Não autorizado' })
            }

            ctx.body = await strapi.plugin('app').service('instituicao').create_utente(data, ctx.request.body.data)


        } catch (error) {
            ctx.assert.equal('object', typeof ctx.body, 400, error)
        }
    },
    delete_utente: async(ctx) => {

        console.log(ctx.request.body)
        try {

            let jwt = ctx.cookies.get(`${process.env.COOKIES_NAME}:jwt`)
            const { data } = await strapi.plugin('web').service('auth').jwt(jwt);
            if (data.role != 'cliente') {
                ctx.assert.equal('object', typeof ctx.body, 403, { message: 'Não autorizado' })
            }

            ctx.body = await strapi.plugin('app').service('instituicao').delete_utente(data, ctx.params.id)


        } catch (error) {
            ctx.assert.equal('object', typeof ctx.body, 400, error)
        }
    },
    arquivar_utente: async(ctx) => {

        console.log(ctx.request.body)
        try {

            let jwt = ctx.cookies.get(`${process.env.COOKIES_NAME}:jwt`)
            const { data } = await strapi.plugin('web').service('auth').jwt(jwt);
            if (data.role != 'cliente') {
                ctx.assert.equal('object', typeof ctx.body, 403, { message: 'Não autorizado' })
            }
            ctx.body = await strapi.plugin('app').service('instituicao').arquivar_utente(data, ctx.params.id)

        } catch (error) {
            ctx.assert.equal('object', typeof ctx.body, 400, error)
        }
    },
    desarquivar_utente: async(ctx) => {

        console.log(ctx.request.body)
        try {

            let jwt = ctx.cookies.get(`${process.env.COOKIES_NAME}:jwt`)
            const { data } = await strapi.plugin('web').service('auth').jwt(jwt);
            ctx.body = await strapi.plugin('app').service('instituicao').desarquivar_utente(data, ctx.params.id)

        } catch (error) {
            ctx.assert.equal('object', typeof ctx.body, 400, error)
        }
    },
    excel_data_get: async(ctx) => {

        try {

            const { jwt } = ctx.params

            const { data: us } = await strapi.plugin('web').service('auth').jwt(jwt);

            /*    if (us.role != 'cliente' || us.role != 'tecnico') {
                    ctx.assert.equal('object', typeof ctx.body, 403, { message: 'Não autorizado' })
                }

                */
            const user = await strapi.plugin('web').service('instituicao').tempusmonitorizacao(us.id)


            let data = []



            user.instituicao.utentes.forEach(utente => {


                data.push({
                    sheet: `${utente.rfid}_${utente.nome}`,
                    columns: [
                        { label: "Nº de Ferramenta", value: "ferramenta" },
                        { label: "Nº de Acerto", value: "acerto" },
                        { label: "Nº de Erro", value: "erro" },
                        { label: "Tempo (min)", value: "tempo" },
                        { label: "Data de utilização", value: "data", format: "d-mmm-yy" }
                    ],
                    content: [

                    ],
                })



            });


            let xlsx = require("json-as-xlsx")

            const settings = {
                writeOptions: {
                    type: "buffer",
                    bookType: "xlsx",
                },

            }

            const buffer = xlsx(data, settings)
            ctx.res.writeHead(200, {
                "Content-Type": "application/octet-stream",
                "Content-disposition": `attachment; filename=${user.instituicao.nome}_dados_execl.xlsx`,
            })
            ctx.res.end(buffer)



        } catch (err) {
            console.log(err)
                //  ctx.redirect('/auth/login')

        }
    },
    data_live_create: async(ctx) => {
        try {
            const { data } = await strapi.plugin('web').service('auth').jwt(ctx.request.header.authorization);
            /*
                        if (data.role != 'cliente' || data.role != 'tecnico' || data.role != 'dev') {
                            ctx.assert.equal('object', typeof ctx.body, 403, { message: 'Não autorizado' })
                        }

                        */

            const user = await strapi.plugin('web').service('instituicao').get_inst(data.id)

            const { data: start_data } = ctx.request.body


            strapi.plugin('app').service('mqtt').on("start", start_data.split(','));

            ctx.body = data

        } catch (error) {
            return ctx.badRequest('name is missing', { foo: 'bar' })
        }
    },
    data_live_delete: async(ctx) => {

        try {
            const { data } = await strapi.plugin('web').service('auth').jwt(ctx.request.header.authorization);

            /*    if (data.role != 'cliente' || data.role != 'tecnico' || data.role != "dev") {
                ctx.assert.equal('object', typeof ctx.body, 403, { message: 'Não autorizado' })
            }

*/
            const { data_close } = ctx.params

            // console.log(data_close)

            strapi.plugin('app').service('mqtt').on("close", data_close.split('_'));

            ctx.body = data

        } catch (error) {
            return ctx.badRequest('name is missing', { foo: 'bar' })
        }

    },
    data_live_delete_all: async(ctx) => {

        try {
            const { data } = await strapi.plugin('web').service('auth').jwt(ctx.request.header.authorization);

            /* if (data.role != 'cliente' || data.role != 'tecnico' || data.role != 'dev') {
                 ctx.assert.equal('object', typeof ctx.body, 403, { message: 'Não autorizado' })
             }

             */
            const user = await strapi.plugin('web').service('instituicao').get_inst(data.id)


            const ferr_on = strapi.plugin('app').service('ferramenta').getMany(user.instituicao.id)



            const gen = generator(ferr_on);

            let flag = false;

            while (!flag) {

                const { value, done } = gen.next()
                if (value) {

                    console.log(value)
                    strapi.plugin('app').service('mqtt').on("close", [
                        value.instituicao,
                        value.ferramenta,
                        value.device.split(':')[1]
                    ]);
                }
                flag = done

            }

            ctx.body = data

        } catch (error) {
            return ctx.badRequest('name is missing', { foo: 'bar' })
        }


    },
    create_observacao: async(ctx) => {



        try {

            let jwt = ctx.cookies.get(`${process.env.COOKIES_NAME}:jwt`)
            const { data } = await strapi.plugin('web').service('auth').jwt(jwt);

            if (data.role != 'cliente' || data.role != 'tecnico') {
                ctx.assert.equal('object', typeof ctx.body, 403, { message: 'Não autorizado' })
            }

            ctx.body = await strapi.
            plugin('app').
            service('instituicao')
                .create_obs_utente(data, ctx.request.body.data, ctx.params.id)

        } catch (error) {
            ctx.assert.equal('object', typeof ctx.body, 400, error)
        }



    },
    update_observacao: async(ctx) => {

        try {

            let jwt = ctx.cookies.get(`${process.env.COOKIES_NAME}:jwt`)
            const { data } = await strapi.plugin('web').service('auth').jwt(jwt);

            if (data.role != 'cliente' || data.role != 'tecnico') {
                ctx.assert.equal('object', typeof ctx.body, 403, { message: 'Não autorizado' })
            }

            ctx.body = await strapi.
            plugin('app').
            service('instituicao')
                .update_obs_utente(data, ctx.request.body.data, ctx.params.id, ctx.params.id_ob)

        } catch (error) {
            ctx.assert.equal('object', typeof ctx.body, 400, error)
        }


    },

    irelatorio: async(ctx, next) => {
        try {


            let jwt = ctx.cookies.get(`${process.env.COOKIES_NAME}:jwt`)
            const { data: us } = await strapi.plugin('web').service('auth').jwt(jwt);

            if (us.role != 'cliente' || us.role != 'tecnico') {
                ctx.assert.equal('object', typeof ctx.body, 403, { message: 'Não autorizado' })
            }

            const { start, end, id } = ctx.params

            console.log(start, end, id)
            let testes;

            if (start == end) {

                testes = await strapi.query('api::teste.teste').findMany({
                    select: ['tempo', 'id', 'p'],
                    where: {

                        utente: id,
                        createdAt: start
                    },
                    populate: {
                        ferramenta: {
                            select: 'nome'
                        }
                    }




                });

            } else {

                testes = await strapi.query('api::teste.teste').findMany({
                    select: ['tempo', 'id', 'p'],
                    where: {

                        utente: id,

                        createdAt: {
                            $between: [start, end],
                        }

                    },
                    populate: {
                        ferramenta: {
                            select: 'nome'
                        }
                    }




                });
            }


            let data = [

                { t: 0, d: 0, q: 0 },
                { t: 0, d: 0, q: 0 },
                { t: 0, d: 0, q: 0 },
                { t: 0, d: 0, q: 0 },
                { t: 0, d: 0, q: 0 },
                { t: 0, d: 0, q: 0 },
                { t: 0, d: 0, q: 0 },
                { t: 0, d: 0, q: 0 },
                { t: 0, d: 0, q: 0 },
                { t: 0, d: 0, q: 0 },
                { t: 0, d: 0, q: 0 },


            ]

            console.log(data)

            testes.map(teste => {

                console.log(teste, 'testes')

                if (teste.ferramenta.nome == 'Almofada') {

                    data[0].q++
                        data[0].t += teste.tempo
                    data[0].d = teste.p + parseFloat(data[0].d)


                }
                if (teste.ferramenta.nome == 'Manta') {

                    data[1].q++
                        data[1].t += teste.tempo
                    data[1].d = teste.p + parseFloat(data[0].d)

                }
                if (teste.ferramenta.nome == 'Peixe') {

                    data[2].q++
                        data[2].t += teste.tempo
                    data[2].d = teste.p + parseFloat(data[0].d)

                }

            })


            ctx.body = { data, ok: true };
        } catch (err) {
            ctx.body = err;
        }
    },


});
