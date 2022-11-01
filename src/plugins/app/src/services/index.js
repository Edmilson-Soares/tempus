'use strict';

const myService = require('./my-service');
const mqtt = require('./mqtt');
const ferramenta = require('./ferramenta');
const instituicao = require('./instituicao')
const email = require('./email')
const user = require('./user')

module.exports = {
    instituicao,
    ferramenta,
    myService,
    mqtt,
    email,
    user
};
