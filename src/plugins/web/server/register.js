'use strict';

const routers = require('./routes/router')
const render = require('koa-ejs');
const path = require('path');
module.exports = ({ strapi }) => {
    // registeration phase

    render(strapi.server.app, {
        root: path.join(__dirname, 'views'),
        viewExt: 'ejs',
        "layout": false,
        cache: false,
        debug: false
    });


    strapi.server.app.use(routers.routes()).use(routers.allowedMethods());
};