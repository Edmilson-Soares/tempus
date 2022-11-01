'use strict';

const myService = require('./my-service');
const auth = require('./auth/auth');
const user = require('./user');
const instituicao = require('./instituicao');


module.exports = {
    myService,
    auth,
    user,
    instituicao
};
