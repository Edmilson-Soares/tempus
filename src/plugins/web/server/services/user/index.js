'use strict';
//delete
module.exports = ({ strapi }) => ({
    update: async(id, data) => {
        return await strapi.query('plugin::users-permissions.user').update({
            where: {
                id
            },
            data
        })
    },

    delete: async(id) => {
        return await strapi.query('plugin::users-permissions.user').delete({
            where: {
                id
            }
        })
    },
});