module.exports = {
    routes: [{
            method: 'GET',
            path: '/tempus',
            handler: 'tempus.exampleAction',
            config: {
                policies: [],
                middlewares: [],
            },
        },


        {
            method: 'PUT',
            path: '/tempus/instituicao/:id',
            handler: 'tempus.update_instituicao',
            config: {
                policies: [],
                middlewares: [],
            },
        },
        {
            method: 'POST',
            path: '/tempus/instituicao/:id/desbloquear',
            handler: 'tempus.desbloquear_instituicao',
            config: {
                policies: [],
                middlewares: [],
            },
        },
        {
            method: 'POST',
            path: '/tempus/instituicao/:id/bloquear',
            handler: 'tempus.bloquear_instituicao',
            config: {
                policies: [],
                middlewares: [],
            },
        },
        {
            method: 'POST',
            path: '/tempus/instituicao',
            handler: 'tempus.create_instituicao',
            config: {
                policies: [],
                middlewares: [],
            },
        },





    ],
};
