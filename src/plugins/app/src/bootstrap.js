'use strict';


module.exports = async({ strapi }) => {

    strapi.io = require("socket.io")(strapi.server.httpServer);
    // bootstrap phase

    // strapi.plugin('app').service('mqtt').on("close", { user: 'ddd' });

    strapi.plugin('app').service('mqtt').mqtt.on('connect', () => {

        console.log("conectado!!!!!")
        strapi.plugin('app').service('mqtt').mqtt.subscribe("start")
        strapi.plugin('app').service('mqtt').mqtt.subscribe("result")
        strapi.plugin('app').service('mqtt').mqtt.subscribe("close")
        strapi.plugin('app').service('mqtt').mqtt.subscribe("CloseFurramentas")


        // strapi.plugin('app').service('mqtt').mqtt.publish("start", "1,1,12345678")

    })




    strapi.plugin('app').service('mqtt').mqtt.on('message', async(topic, data) => {

        strapi.plugin('app').service('mqtt').on(topic, data.toString().split(","));

    })



    // let data = [1, 1, "12345678"]

    //strapi.plugin('app').service('mqtt').on("start", data);


    //let data = [1, 1, 0]

    // strapi.plugin('app').service('mqtt').on("result", data);


    let data = [1, 1]

    //await strapi.plugin('app').service('mqtt').on("close", data);





    let ddd = 0

    /*
        setInterval(async() => {
            strapi.plugin('app').service('ferramenta').tempo()



            strapi.plugin('app').service('ferramenta').rooms.map(room => {


                strapi.io.to(`${room.split(':')[0]}${room.split(':')[1]}`).emit('gets', strapi.plugin('app').service('ferramenta').getMany(room.split(':')[1]))

            })



        }, 5 * 1000);




        */


    strapi.io.use(async(socket, next) => {
        //.cookies.get(`${process.env.COOKIES_NAME}:jwt`)
        try {


            const { data } = await strapi.plugin('web').service('auth').jwt(socket.handshake.headers.authorization);
            socket.user = data

            socket.user = await strapi.query('plugin::users-permissions.user').findOne({
                select: ['username', 'id'],
                where: {
                    id: data.id
                },
                populate: {
                    'instituicao': {
                        select: ['nome', 'id'],
                    }
                }


            });


            console.log(socket.handshake.headers.authorization, "dddd---", socket.user)

            if (socket.user.id && data.role) {

                next()
            }

        } catch (e) {
            next(e)

        }


        strapi.io.on('connection', (socket) => {
            console.log("Conectou----")

            socket.join(`instituicao${socket.user.instituicao.id}`);



            const room = strapi.plugin('app')
                .service('ferramenta')
                .rooms.find(room => room == `instituicao:${socket.user.instituicao.id}`)

            if (!room) {

                strapi.plugin('app')
                    .service('ferramenta')
                    .rooms.push(`instituicao:${socket.user.instituicao.id}`)
            }



            socket.on("utentes", () => {
                strapi.io.to(`instituicao${socket.user.instituicao.id}`).emit('gets', strapi.plugin('app').service('ferramenta').getMany(socket.user.instituicao.id))
            });



            socket.on('disconnect', () => {



            });
        });




    })




    // await strapi.plugin('app').service('ferramenta').get_file({ id: 4 }, { url: 'dados_excel.xlsx' });



    //await strapi.plugin('app').service('email').test()
};
