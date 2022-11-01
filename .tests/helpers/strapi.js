const Strapi = require("@strapi/strapi");
const fs = require("fs");

let instance;

async function setupStrapi() {

    console.log("init")
    if (!instance) {
        await Strapi().load();
        instance = strapi;
        await instance.server.mount();


    }
    return instance;
}

async function cleanupStrapi() {
    console.log("close")
    await instance.server.httpServer.close();
    await instance.db.connection.destroy();
}


module.exports = { setupStrapi, cleanupStrapi }
