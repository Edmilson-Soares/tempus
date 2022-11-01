'use strict';

const auth = require('./auth');
const login = require('./login')
const userCreate = require('./userCreate')
const clientCreate = require('./clientCreate')
const jwt = require('./jwt')
const forgotPassword = require('./forgotPassword')
const newPassword = require('./newPassword')
const newPasswordAcoant = require('./newPasswordAcoant')


module.exports = {
    auth,
    login,
    'user-create': userCreate,
    'client-create': clientCreate,
    jwt,
    'forgot-password': forgotPassword,
    'new-password': newPassword,
    'new-password-acoant': newPasswordAcoant,

};