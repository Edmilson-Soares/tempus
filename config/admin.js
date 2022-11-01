module.exports = ({ env }) => ({
    auth: {
        secret: env('ADMIN_JWT_SECRET', '5a9da9d2dfb22594c8c21f9973a4504a'),

    },
    apiToken: { salt: env('API_TOKEN_SALT', '5a9da9d2dfb22594c8c21f9973a4504a') }
});