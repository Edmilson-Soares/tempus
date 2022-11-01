'use strict';


module.exports = {
    /**
     * An asynchronous register function that runs before
     * your application is initialized.
     *
     * This gives you an opportunity to extend code.
     */

    register({ strapi }) {

        function handle404error(ctx, next) {
            console.log(ctx.status)
                //
                // if (404 == ctx.status) ctx.redirect('/');
            return next();
        }
        //    strapi.server.app.use(handle404error);


    },

    /**
     * An asynchronous bootstrap function that runs before
     * your application gets started.
     *
     * This gives you an opportunity to set up your data model,
     * run jobs, or perform some special logic.
     */
    bootstrap({ strapi }) {

        // strapi.$io.emit("api::membro.membro.create", { nome: 'fff' });
    },
};
