'use strict';

const mqtt = require('mqtt');

module.exports = ({ strapi }) => ({
    on: function(topic, data) {


        this[topic](data)



    },
    start: async(data) => {

        try {
            data.push('00')
            console.log("start", data)

            let utente = await strapi.plugin('app').service('ferramenta').getutente(data);

            if (utente) {
                let utente_jogo = {
                    nome: utente.nome,
                    rfid: utente.rfid,
                    foto: utente.foto ? utente.foto.url : "",
                    instituicao: utente.instituicao.id,
                    ferramenta: utente.instituicao.ferramentas[0].id,
                    ferramentas: [utente.f, utente.f1, utente.f2, utente.f3, utente.f4,
                        utente.f5, utente.f6, utente.f7, utente.f8, utente.f9, utente.f10,
                        utente.f11
                    ],
                    acertou: 0,
                    errou: 0,
                    tempo: 0,
                    testes: [],
                    device: `${data[0]}-${data[1]}:${data[3]}`

                }


                let jogado = strapi.plugin('app').service('ferramenta').add(utente_jogo);


                console.log(strapi.plugin('app').service('ferramenta').get())
            }


        } catch (error) {
            console.log(error)
        }


    },
    result: async(data) => {

        try {
            data.push('00')


            const { index } = strapi.plugin('app').service('ferramenta').getOne(`${data[0]}-${data[1]}:${data[3]}`)

            console.log(strapi.plugin('app').service('ferramenta').update(index, data[2]))
        } catch (error) {
            console.log(error)
        }

    },
    close: async(data) => {

        try {
            data.push('00')


            const utente = strapi.plugin('app').service('ferramenta').getOne(`${data[0]}-${data[1]}:${data[2]}`)

            strapi.plugin('app').service('ferramenta').remove(utente.index)

            const teste = await strapi.plugin('app').service('ferramenta').save(utente)

            console.log(teste, 'teste')



            console.log(strapi.plugin('app').service('ferramenta').get(), "true")
        } catch (error) {
            console.log(error)
        }



    },
    mqtt: mqtt.connect(process.env.MQTT_URL)
});
