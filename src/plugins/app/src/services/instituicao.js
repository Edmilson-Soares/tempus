'use strict';

module.exports = ({ strapi }) => ({
    index() {
        return 'Welcome to Strapi 🚀';
    },

    update_obs_utente: async(user, data, utente_id, id_obs) => {



        const utente = await strapi.db.query('api::utente.utente').findOne({
            where: {
                id: utente_id,
                instituicao: {
                    id: user.instituicao
                },
                observacaos: {
                    id: id_obs
                }
            }

        })

        if (utente) {
            return await strapi.db.query('api::observacao.observacao').update({
                where: {
                    id: id_obs
                },
                data: {
                    descricao: data.descricao
                },
            });

        } else {
            throw new Error('Utente não encontrado')
        }

    },
    create_obs_utente: async(user, data, utente_id) => {



        const utente = await strapi.db.query('api::utente.utente').findOne({
            where: {
                id: utente_id,
                instituicao: {
                    id: user.instituicao
                }
            }

        })

        if (utente) {

            return await strapi.db.query('api::observacao.observacao').create({
                data: {
                    utente: utente_id,
                    descricao: data.descricao
                },
            });

        } else {
            throw new Error('Utente não encontrado')
        }

    },
    create_utente1: async(user, data) => {

        console.log(user, data)

        return await strapi.db.query('api::utente.utente').create({
            data

        })

    },
    update_user: async(user, data, id) => {


        console.log(user, data, id)

        let tecnico = await strapi.query('plugin::users-permissions.user').findOne({
            where: {
                id: id || user.id
            },
            populate: {
                'foto': {

                }
            }
        });

        return await strapi.query('plugin::users-permissions.user').update({
            where: {
                id: id || user.id
            },
            data
        });

    },

    acesso_tecnico: async(user, id) => {

        const u = await strapi.query('plugin::users-permissions.user').findOne({
            where: {
                id
            }
        });

        return await strapi.query('plugin::users-permissions.user').update({
            where: {
                id
            },
            data: {
                blocked: !u.blocked
            }
        });

    },

    delete_tecnico: async(user, id) => {

        return await strapi.query('plugin::users-permissions.user').delete({
            where: {
                id
            }
        });

    },
    update_instituicao: async(user, data) => {
        return await strapi.db.query('api::instituicao.instituicao').update({
            where: { id: user.instituicao },
            data

        })

    },

    update_utente_fotos: async(user, data, id) => {

        console.log(user, data, id, 'ddd')


        await strapi.db.query('api::utente.utente').update({
            where: { id },
            data

        })

        const utente = await strapi.db.query('api::utente.utente').findOne({
            where: { id },
            populate: {
                img: {

                }
            }

        })


        return utente.img

    },
    delete_utente_fotos: async(user, utente_id, id) => {


        console.log(user, utente_id, id)


        let utente = await strapi.db.query('api::utente.utente').findOne({
            where: { id: utente_id },
            populate: {
                img: {

                }
            }

        })


        const file = utente.img.find(f => f.id == id)

        if (file) {
            await strapi.plugin('upload').service('upload').remove(file);
        }

        utente = await strapi.db.query('api::utente.utente').findOne({
            where: { id: utente_id },
            populate: {
                img: {

                }
            }

        })


        return utente.img || []

    },
    update_utente: async(user, data, id) => {

        let utente = await strapi.db.query('api::utente.utente').findOne({
            where: { id },
            populate: {
                img: {

                }
            }

        })


        if (Array.isArray(data.img)) {
            if (utente.img) {
                utente.img.map(img => {
                    data.img.push(img.id)
                })
            }

        } else {
            data.img = []
            if (utente.img) {
                utente.img.map(img => {
                    data.img.push(img.id)
                })
            }

        }



        await strapi.db.query('api::utente.utente').update({
            where: { id },
            data

        })



        utente = await strapi.db.query('api::utente.utente').findOne({
            where: { id },
            populate: {
                img: {

                }
            }

        })


        return utente.img



    },
    create_utente: async(user, data) => {

        console.log(user, data)

        return await strapi.db.query('api::utente.utente').create({
            data

        })

    },
    delete_utente: async(user, id) => {

        console.log(user, id)

        return await strapi.db.query('api::utente.utente').delete({
            where: { id }
        })

    },
    arquivar_utente: async(user, id) => {

        return await strapi.db.query('api::utente.utente').update({
            where: { id },
            data: {
                arquivar: true
            }

        })

    },
    desarquivar_utente: async(user, id) => {

        return await strapi.db.query('api::utente.utente').update({
            where: { id },
            data: {
                arquivar: false
            }

        })

    },
    create_instituicao: async(user, data) => {

        console.log(user, data)

        return await strapi.db.query('api::utente.utente').create({
            data

        })

    },
    getinstituicao: async() => {

        return await strapi.db.query('api::instituicao.instituicao').findMany({
            populate: {
                ferramentas: {

                },
                users: {
                    where: {
                        role: {
                            name: 'cliente'
                        }
                    }
                }
            }
        })

    },
    getferramentas: async() => {

        return await strapi.db.query('api::ferramenta.ferramenta').findMany({

        })

    },

});
