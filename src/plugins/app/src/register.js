'use strict';

module.exports = async({ strapi }) => {
    // registeration phase



    const { ServiceBroker } = require("moleculer");

    // Create a ServiceBroker
    const broker = new ServiceBroker();

    // Define a service
    broker.createService({
        name: "math",
        actions: {
            add(ctx) {
                return Number(ctx.params.a) + Number(ctx.params.b);
            }
        },
        events: {
            "user.created": {
                // Register handler to the "other" group instead of "payment" group.
                group: "other",
                handler(ctx) {
                    console.log("Payload:", ctx.params);

                }
            }
        }
    });
    /*
        const ApiGwService = require("moleculer-web");
        broker.createService({
            name: "api",
            mixins: [ApiGwService],
            settings: {
                // Change port setting
                port: 3333
            },
            actions: {
                myAction: async(ctx) => {

                    // console.log(ctx)


                    const a = await strapi.entityService.findMany('api::membro.membro')

                    console.log(a, 'ee')

                    // Add a new action to apiGwService service
                    return a
                }
            }
        });


    */




    // Start the broker
    broker.start()
        // Call the service
        .then(() => broker.call("math.add", { a: 5, b: 3 }))
        // Print the response
        .then(res => console.log("5 + 3 =", res))
        .catch(err => console.error(`Error occured! ${err.message}`));


    strapi['broker'] = broker

};


/**
 *
 *
 * // Load every *.service.js file from the "./services" folder (including subfolders)
broker.loadServices();

// Load every *.service.js file from the current folder (including subfolders)
broker.loadServices("./");

// Load every user*.service.js file from the "./svc" folder
broker.loadServices("./svc", "user*.service.js");

 */