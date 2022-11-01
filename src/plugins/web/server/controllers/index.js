'use strict';

const myController = require('./my-controller');
const site = require('./web-site');
const api_auth = require('./api-auth');
const web_auth = require('./web-auth');
const web_instituicao = require('./web-instituicao');
const web_tecnico = require('./web-tecnico');
const web_dev = require('./web-dev');
const web_admin = require('./web-admin');
const api_instituicao = require('./api-instituicao');
const upload = require('./upload')

module.exports = {
    myController,
    site,
    web_auth,
    upload,
    api_auth,
    web_instituicao,
    web_dev,
    web_admin,
    web_tecnico,
    api_instituicao
};