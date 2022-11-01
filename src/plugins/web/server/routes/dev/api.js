module.exports = [{
        method: 'POST',
        path: '/instituicao/utentes',
        handler: 'api_instituicao.create_utente',
        config: {
            auth: false,
            policies: [],
        },
    },
    {
        method: 'PUT',
        path: '/instituicao/utentes/:id',
        handler: 'api_instituicao.update_utente',
        config: {
            auth: false,
            policies: [],
        },
    },
    {
        method: 'POST',
        path: '/instituicao/utentes/:id/desarquivar',
        handler: 'api_instituicao.desarquivar_utente',
        config: {
            auth: false,
            policies: [],
        },
    },
    {
        method: 'POST',
        path: '/instituicao/utentes/:id/arquivar',
        handler: 'api_instituicao.arquivar_utente',
        config: {
            auth: false,
            policies: [],
        },
    },
    {
        method: 'DELETE',
        path: '/instituicao/utentes/:id',
        handler: 'api_instituicao.delete_utente',
        config: {
            auth: false,
            policies: [],
        },
    },

];
