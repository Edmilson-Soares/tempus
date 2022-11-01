'use strict';

module.exports = {



    async index(ctx) {



        let user = null;

        let jwt = ctx.cookies.get(`${process.env.COOKIES_NAME}:jwt`)
        try {

            const { data } = await strapi.plugin('web').service('auth').jwt(jwt);

            user = data;

        } catch (error) {

        }



        try {

            const colaboradores = await strapi.db.query('api::colaborador.colaborador').findMany({ // uid syntax: 'api::api-name.content-type-name'

                populate: {
                    foto: {
                        select: ['url']
                    },
                },
            });


            const publicacoes = await strapi.db.query('api::publicacao.publicacao').findMany({ // uid syntax: 'api::api-name.content-type-name'
                orderBy: [{ createdAt: 'desc' }],
                limit: 3,
                populate: {
                    fotos: {
                        select: ['url']
                    }
                },
            });



            const parcerias = await strapi.db.query('api::parceria.parceria').findMany({ // uid syntax: 'api::api-name.content-type-name'

                populate: {
                    logo: {
                        select: ['url']
                    },
                },
            });


            const produtos = await strapi.db.query('api::ferramenta.ferramenta').findMany({ // uid syntax: 'api::api-name.content-type-name'
                select: ['nome', 'descricao'],
                populate: {
                    foto: {
                        select: ['url']
                    },
                },
            });


            const destaques = await strapi.db.query('api::destaque.destaque').findMany({
                where: {
                    publishedAt: {
                        $notNull: true,
                    },
                },
                populate: {
                    foto: {
                        select: ['url']
                    },
                },
            });


            console.log(destaques, 'ddd')

            await ctx.render('site/index', {
                data: user,
                colaboradores,
                publicacoes,
                parcerias,
                destaques,
                produtos
            });
        } catch (err) {
            console.log(err)

        }
    },

    async sobre(ctx) {


        let user = null;

        let jwt = ctx.cookies.get(`${process.env.COOKIES_NAME}:jwt`)
        try {

            const { data } = await strapi.plugin('web').service('auth').jwt(jwt);

            user = data;

        } catch (error) {

        }

        try {

            const colaboradores = await strapi.db.query('api::colaborador.colaborador').findMany({ // uid syntax: 'api::api-name.content-type-name'

                populate: {
                    foto: {
                        select: ['url']
                    },
                },
            });
            await ctx.render('site/sobre', { data: user, colaboradores });
        } catch (err) {
            console.log(err)

        }
    },

    async sobre_programas(ctx) {
        let user = null;

        let jwt = ctx.cookies.get(`${process.env.COOKIES_NAME}:jwt`)
        try {

            const { data } = await strapi.plugin('web').service('auth').jwt(jwt);

            user = data;

        } catch (error) {

        }

        try {
            await ctx.render('site/programas', { data: user });
        } catch (err) {
            console.log(err)

        }
    },
    async servicos(ctx) {
        let user = null;

        let jwt = ctx.cookies.get(`${process.env.COOKIES_NAME}:jwt`)
        try {

            const { data } = await strapi.plugin('web').service('auth').jwt(jwt);

            user = data;

        } catch (error) {

        }


        try {


            const planos = await strapi.db.query('api::plano.plano').findMany({
                populate: {
                    img: {
                        select: ['url']
                    }
                }
            });
            await ctx.render('site/servicos', { data: user, planos });
        } catch (err) {
            console.log(err)

        }
    },
    servico: async(ctx) => {
        console.log(ctx.params)
        let user = null;

        let jwt = ctx.cookies.get(`${process.env.COOKIES_NAME}:jwt`)
        try {

            const { data } = await strapi.plugin('web').service('auth').jwt(jwt);

            user = data;

        } catch (error) {

        }


        const { plano: type } = ctx.params


        const plano = await strapi.db.query('api::plano.plano').findOne({
            where: {
                id: type
            }
        });


        if (plano) {
            try {
                const { data } = await jwt_app(jwt)

                console.log(data, jwt)




                await ctx.render('site/servicoplano', { data, plano });
            } catch (error) {
                await ctx.render('site/servicoplano', { data: user, plano });
            }
        } else {
            ctx.redirect('/servicos')
        }



    },
    async galerias(ctx) {
        let user = null;

        let jwt = ctx.cookies.get(`${process.env.COOKIES_NAME}:jwt`)
        try {

            const { data } = await strapi.plugin('web').service('auth').jwt(jwt);

            user = data;

        } catch (error) {

        }

        try {

            const types = await strapi.db.query('api::tipo-de-galeria.tipo-de-galeria').findMany({
                populate: {
                    galerias: {
                        populate: {
                            images: {
                                select: ['url']
                            }
                        }
                    }

                }
            });
            await ctx.render('site/galeria', { data: user, types });
        } catch (err) {
            console.log(err)

        }
    },
    publicacoes: async(ctx) => {
        let user = null;

        let jwt = ctx.cookies.get(`${process.env.COOKIES_NAME}:jwt`)
        try {

            const { data } = await strapi.plugin('web').service('auth').jwt(jwt);

            user = data;

        } catch (error) {

        }




        const publicacoes = await strapi.db.query('api::publicacao.publicacao').findMany({
            populate: {

                fotos: {
                    select: ['url']
                }


            }
        });

        try {
            const { data } = await jwt_app(jwt)




            await ctx.render('site/publicacao', { data, publicacoes });
        } catch (error) {
            await ctx.render('site/publicacao', { data: user, publicacoes });
        }

    },
    publicacao: async(ctx) => {

        let user = null;

        let jwt = ctx.cookies.get(`${process.env.COOKIES_NAME}:jwt`)
        try {

            const { data } = await strapi.plugin('web').service('auth').jwt(jwt);

            user = data;

        } catch (error) {

        }




        const publicacao = await strapi.db.query('api::publicacao.publicacao').findOne({
            where: {
                id: ctx.params.id
            },

            populate: {

                fotos: {
                    select: ['url']
                }


            }
        });

        if (publicacao) {
            try {
                const { data } = await jwt_app(jwt)




                await ctx.render('site/publicacao_single', { data, publicacao });
            } catch (error) {
                await ctx.render('site/publicacao_single', { data: user, publicacao });
            }
        } else {
            ctx.redirect('/publicacoes')
        }



    },
    async contatos(ctx) {
        let user = null;

        let jwt = ctx.cookies.get(`${process.env.COOKIES_NAME}:jwt`)
        try {

            const { data } = await strapi.plugin('web').service('auth').jwt(jwt);

            user = data;

        } catch (error) {

        }

        try {
            await ctx.render('site/contato', { data: user });
        } catch (err) {
            console.log(err)

        }
    },



}
