'use strict';

/**
 * A set of functions called "actions" for `tempus`
 */

module.exports = {


    async create_instituicao(ctx) {




        let jwt = ctx.cookies.get(`${process.env.COOKIES_NAME}:jwt`)


        try {
            const { data } = await strapi.plugin('web').service('auth').jwt(jwt);

            const input = ctx.request.body.data


            const client = await strapi.plugin('web')
                .service('auth').create_cliente({
                    email: input.email,
                    nome: input.nome_
                }, { nome: input.nome, ferrs: input.ferrs }, ctx.request.header.referer.split('/dashboard')[0])



            ctx.send({ client: {} })


        } catch (error) {
            throw new ApplicationError('This provider is disabled');
        }



    },
    async update_instituicao(ctx) {

        const { id } = ctx.params

        const data = ctx.request.body.data

        let jwt = ctx.cookies.get('microaitec')

        ctx.request.header.authorization = jwt

        console.log(data, 'dddffffffffff', id)


        try {


            const entry = await strapi.db.query('api::instituicao.instituicao').update({
                where: { id },
                data: {
                    ferramentas: data
                },
            });

            ctx.send(entry)


        } catch (error) {
            throw new ApplicationError('This provider is disabled');
        }



    },

    async desbloquear_instituicao(ctx) {

        const { id } = ctx.params

        const data = ctx.request.body.data

        let jwt = ctx.cookies.get('microaitec')

        ctx.request.header.authorization = jwt

        console.log(data, 'dddffffffffff', id)


        try {


            function* generator(array) {
                for (let index = 0; index < array.length; index++) {
                    yield array[index];

                }

            }

            let flag = false

            const inst = await strapi.db.query('api::instituicao.instituicao').findOne({
                where: { id },
                populate: { users: true },
            });

            const entry = await strapi.db.query('api::instituicao.instituicao').update({
                where: { id },
                data: {
                    blocked: false,
                },
            });

            const gen = generator(inst.users);

            while (!flag) {

                const { value, done } = gen.next()


                if (value) {

                    await strapi.db.query('plugin::users-permissions.user').update({
                        where: { id: value.id },
                        data: {
                            blocked: false
                        },
                    });

                }

                flag = done

            }





            ctx.send(entry)


        } catch (error) {
            throw new ApplicationError('This provider is disabled');
        }



    },


    async bloquear_instituicao(ctx) {

        const { id } = ctx.params

        const data = ctx.request.body.data

        let jwt = ctx.cookies.get('microaitec')

        ctx.request.header.authorization = jwt

        console.log(data, 'dddffffffffff', id)


        try {


            function* generator(array) {
                for (let index = 0; index < array.length; index++) {
                    yield array[index];

                }

            }

            let flag = false

            const inst = await strapi.db.query('api::instituicao.instituicao').findOne({
                where: { id },
                populate: { users: true },
            });

            const entry = await strapi.db.query('api::instituicao.instituicao').update({
                where: { id },
                data: {
                    blocked: true
                },
            });

            const gen = generator(inst.users);

            while (!flag) {

                const { value, done } = gen.next()
                if (value) {
                    console.log(value)
                    const user = await strapi.db.query('plugin::users-permissions.user').update({
                        where: { id: value.id },
                        data: {
                            blocked: true
                        },
                    });

                    console.log("user", user)

                }

                flag = done

            }





            ctx.send(entry)


        } catch (error) {
            throw new ApplicationError('This provider is disabled');
        }



    },


    exampleAction: async(ctx, next) => {
        try {
            ctx.body = 'ok';
        } catch (err) {
            ctx.body = err;
        }
    },





};
