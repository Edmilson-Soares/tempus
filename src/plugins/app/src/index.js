'use strict';

const register = require('./register');
const bootstrap = require('./bootstrap');
const destroy = require('./destroy');
const config = require('./config');

const middlewares = require('./middlewares');
const policies = require('./policies');
const services = require('./services');

module.exports = {
    register,
    bootstrap,
    destroy,
    config,
    services,
    policies,
    middlewares,
};
