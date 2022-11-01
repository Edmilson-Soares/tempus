'use strict';


const userCreate = require('./userCreate')
const jwt = require('./jwt')
const login = require('./login')
const client = require('./clientCreate')
const tecnico = require('./userCreate')
const newPassword = require('./newPassword')
const forgot_password = require('./forgotPassword')

const newPasswordAcoant = require('./newPasswordAcoant')

module.exports = {
    client,
    tecnico,
    newPasswordAcoant,
    newPassword,
    forgot_password,
    'user-create': userCreate,
    jwt,
    login,
};
