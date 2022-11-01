'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('web')
      .service('myService')
      .getWelcomeMessage();
  },
});
