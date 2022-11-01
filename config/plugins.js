module.exports = {

    'users-permissions': {
        config: {
            jwt: {
                expiresIn: '1d',
            },
        },
    },

    i18n: true,

    'app': {
        enabled: true,
        resolve: './src/plugins/app'
    },

    'web': {
        enabled: true,
        resolve: './src/plugins/web'
    }

}
