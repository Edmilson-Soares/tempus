'use strict';

const loginUser = require('./../../../../api/auth/services/userAuthLogin')
const createUser = require('./../../../../api/auth/services/userAuthcreate')
const forgotpassword = require('./../../../../api/auth/services/userAuthForgotPassword')
const newpassword = require('./../../../../api/auth/services/userAuthNewPassword')
const newpasswordconta = require('./../../../../api/auth/services/userAuthNewPasswordConta')



module.exports = ({ strapi }) => ({
    login(params, provider) {
        return loginUser.login(params, provider);
    },
    create(data) {
        return createUser.register_user(data);
    },
    conta(data, url) {
        return createUser.register_client(data, url);
    },
    update(data) {
        return register_client(data);
    },
    forgot(email, url_server) {
        return forgotpassword.forgot_password(email, url_server);
    },
    reset(email, url_server) {
        return forgotpassword.reset_password(email, url_server);
    },
    newpassword(body, params_ = {}) {
        return newpassword.new_password(body, params_ = {});
    },
    newacesso(body, params_ = {}) {
        return newpassword.new_password(body, params_ = {});
    },
    newpasswordconta(body, params_) {
        return newpasswordconta.new_password_conta(body, params_);
    },
    delete(data) {
        return register_client(data);
    },
});