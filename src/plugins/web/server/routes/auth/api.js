module.exports = [{
        method: 'POST',
        path: '/auth/login',
        handler: 'api_auth.login',
        config: {
            auth: false,
            policies: [],
        },
    },
    {
        method: 'POST',
        path: '/auth/new_password',
        handler: 'api_auth.new_password',
        config: {
            auth: false,
            policies: [],
        },
    },
    {
        method: 'POST',
        path: '/auth/new_password_conta',
        handler: 'api_auth.new_password_conta',
        config: {
            auth: false,
            policies: [],
        },
    },
    {
        method: 'POST',
        path: '/auth/forgot_password',
        handler: 'api_auth.forgot_password',
        config: {
            auth: false,
            policies: [],
        },
    },
    {
        method: 'GET',
        path: '/auth/logout',
        handler: 'api_auth.logout',
        config: {
            auth: false,
            policies: [],
        },
    },



];
