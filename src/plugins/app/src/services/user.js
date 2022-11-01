'use strict';

module.exports = ({ strapi }) => ({
    getWelcomeMessage() {
        return 'Welcome to Strapi 🚀';
    },
    infor: async(id) => {
        return await strapi.query('plugin::users-permissions.user').findOne({
            select: ['username', 'email', 'nome', 'descricao', 'morada'],
            where: {
                id
            },
            populate: {
                'foto': {
                    select: ['url']
                },
                'instituicao': {
                    select: ['nome'],
                    populate: {
                        logo: {
                            select: ['url']
                        },

                    }
                }
            }


        });
    },
    infor_code: async(resetPasswordToken) => {
        return await strapi.query('plugin::users-permissions.user').findOne({
            select: ['username', 'email', 'nome', 'descricao', 'morada'],
            where: {
                resetPasswordToken
            },
            populate: {
                'foto': {
                    select: ['url']
                },
                'instituicao': {
                    select: ['nome'],
                    populate: {
                        logo: {
                            select: ['url']
                        },

                    }
                }
            }


        });
    },
});
