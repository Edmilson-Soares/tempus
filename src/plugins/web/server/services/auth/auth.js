'use strict';
const auth = require('./index')
module.exports = ({ strapi }) => ({
    login: async(data) => {
        return await auth['login']({ strapi }).exec(data);
    },
    create: async(data) => {
        return await auth['user-create']({ strapi }).exec(data);
    },
    jwt: async(data) => {
        return await auth['jwt']({ strapi }).exec(data);
    },
    issue: async(data) => {
        return await auth['jwt']({ strapi }).issue(data);
    },
    create_cliente: async(data, inst, url_server) => {
        return await auth['client']({ strapi }).exec(data, inst, url_server);
    },
    create_tecnico: async(data, inst, url_server) => {
        return await auth['tecnico']({ strapi }).exec(data, inst, url_server);
    },
    newPasswordAcoant: async(data) => {
        return await auth['newPasswordAcoant']({ strapi }).exec(data);
    },
    newPassword: async(data) => {
        return await auth['newPassword']({ strapi }).exec(data);
    },
    forgot_password: async(data, url_server) => {
        return await auth['forgot_password']({ strapi }).exec(data, url_server);
    },

});
