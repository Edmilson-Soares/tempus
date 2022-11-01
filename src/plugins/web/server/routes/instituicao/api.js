module.exports = [{
        method: 'POST',
        path: '/instituicao/excel',
        handler: 'upload.uploadExcel',
        config: {
            auth: false,
        },
    },
    {
        method: 'GET',
        path: '/instituicao/excel/:jwt',
        handler: 'api_instituicao.excel_data_get',
        config: {
            auth: false,
            policies: [],
        },
    }, {
        method: 'POST',
        path: '/instituicao/utentes',
        handler: 'api_instituicao.create_utente',
        config: {
            auth: false,
            policies: [],
        },
    },
    {
        method: 'POST',
        path: '/instituicao/utentes/:id/observacao',
        handler: 'api_instituicao.create_observacao',
        config: {
            auth: false,
            policies: [],
        },
    },

    {
        method: 'GET',
        path: '/instituicao/relatorio/:start/:end/:id',
        handler: 'api_instituicao.irelatorio',
        config: {
            auth: false,
            policies: [],
        },
    },
    {
        method: 'PUT',
        path: '/instituicao/utentes/:id/observacao/:id_ob',
        handler: 'api_instituicao.update_observacao',
        config: {
            auth: false,
            policies: [],
        },
    },
    {
        method: 'PUT',
        path: '/instituicao/utentes/:id/fotos',
        handler: 'api_instituicao.updade_utente_fotos',
        config: {
            auth: false,
            policies: [],
        },
    },
    {
        method: 'DELETE',
        path: '/instituicao/utentes/:id/fotos/:fotoid',
        handler: 'api_instituicao.delete_utente_fotos',
        config: {
            auth: false,
            policies: [],
        },
    },
    {
        method: 'PUT',
        path: '/instituicao/utentes/:id',
        handler: 'upload.update_utente',
        config: {
            auth: false,
            policies: [],
        },
    },
    {
        method: 'PUT',
        path: '/instituicao',
        handler: 'upload.uploadInstituicao',
        config: {
            auth: false,
            policies: [],
        },
    },
    {
        method: 'POST',
        path: '/instituicao/tecnicos',
        handler: 'upload.create_tecnico',
        config: {
            auth: false,
            policies: [],
        },
    },
    {
        method: 'PUT',
        path: '/instituicao/tecnicos/:id',
        handler: 'upload.update_tecnico',
        config: {
            auth: false,
            policies: [],
        },
    },
    {
        method: 'PUT',
        path: '/instituicao/perfil',
        handler: 'upload.update_tecnico',
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
    {
        method: 'DELETE',
        path: '/instituicao/tecnicos/:id',
        handler: 'api_instituicao.delete_tecnico',
        config: {
            auth: false,
            policies: [],
        },
    },
    {
        method: 'PUT',
        path: '/instituicao/tecnicos/:id/acesso',
        handler: 'api_instituicao.acesso_tecnico',
        config: {
            auth: false,
            policies: [],
        },
    },
    {
        method: 'POST',
        path: '/instituicao/live',
        handler: 'api_instituicao.data_live_create',
        config: {
            auth: false,
            policies: [],
        },
    },

    {
        method: 'DELETE',
        path: '/instituicao/live/:data_close',
        handler: 'api_instituicao.data_live_delete',
        config: {
            auth: false,
            policies: [],
        },
    },
    {
        method: 'DELETE',
        path: '/instituicao/lives',
        handler: 'api_instituicao.data_live_delete_all',
        config: {
            auth: false,
            policies: [],
        },
    },

];
