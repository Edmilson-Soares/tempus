'use strict';


//f=> mfx,mf2,mf3,mf4,mf5,mf6,mf7,mf8,mf9,mfx0,mfx1,m,tempo

//fx=>ntest,suma,m,tempo

/**
 {
    nome: 'fffffffffff',
    rfid: '12345678',
    foto: '',
    instituicao: 1,
    ferramenta: 1,
    ferramentas: [
        "0.67-3,0-0,0-0,0-0,0-0,0-0,0-0,0-0,0-0,0-0,0-0:0.67,3",
        "1,0.67,3,0", "0,0,0,0", "0,0,0,0",
        "0,0,0,0", "0,0,0,0", "0,0,0,0",
        "0,0,0,0", "0,0,0,0", "0,0,0,0",
        "0,0,0,0", "0,0,0,0", "0,0,0,0"
    ],
    acertou: 2,
    errou: 1,
    testes: [1, 1, 0],
    device: '1-1:00',
    tempo: 3,
    index: 0
}
 */
const ferramenta = []

const excelToJson = require('convert-excel-to-json');

module.exports = ({ strapi }) => ({
    rooms: [],
    add: function(data) {

        data.index = ferramenta.length

        ferramenta.push(data)
        strapi.io.to(`instituicao${ferramenta[data.index].instituicao}`).emit('gets', this.getMany(ferramenta[data.index].instituicao))
        return data;
    },
    remove(index) {

        ferramenta.splice(index, 1)

        return index;
    },
    getMany(instituicao) {
        return ferramenta.filter(f => f.instituicao == instituicao);
    },
    getOne(device) {
        return ferramenta.find(f => f.device == device);
    },
    update(index, teste) {

        if (teste == 1) {
            ferramenta[index].acertou++
        } else {
            ferramenta[index].errou++
        }

        ferramenta[index].testes.push(teste)




        strapi.io.to(`instituicao${ferramenta[index].instituicao}`).emit('update', ferramenta[index])
            //strapi.io.to(`instituicao${ferramenta[index].instituicao}`).emit('close', ferramenta[index])

        return ferramenta[index];
    },
    get() {
        return ferramenta;
    },
    tempo() {

        for (let index = 0; index < ferramenta.length; index++) {
            ferramenta[index].tempo++

        }
    },
    save: async function(utente) {

        return await this.create_teste(utente, { f: `f${utente.ferramenta}`, ferr: utente.ferramenta })

    },
    create_teste: async function(data, op) {

        try {

            console.log('success,fx')


            let fname = `${op.f}`

            const utente = await this.getutente([data.instituicao, data.ferramenta, data.rfid])

            if (utente) {
                const teste = await strapi.entityService.create('api::teste.teste', {
                    data: {
                        acerto: data.acertou,
                        erro: data.errou,
                        utente: utente.id,
                        tempo: data.tempo,
                        ferr: fname,
                        ferramenta: [data.ferramenta],
                        instituicao: [data.instituicao],
                        p: (data.acertou + data.errou) > 0 ? (data.acertou / (data.acertou + data.errou)) : 0,
                        publishedAt: new Date()
                    },
                });



                data.tempo

                let fx = data.ferramentas[data.ferramenta].split(',')
                let f = data.ferramentas[0].split(':')[0].split(",")
                let media = data.ferramentas[0].split(':')[1].split(",")

                fx[0] = parseInt(fx[0]) + 1
                fx[1] = (data.acertou + data.errou) > 0 ? (parseFloat(fx[1]) + (data.acertou / (data.acertou + data.errou))).toFixed(2) : parseFloat(fx[1]).toFixed(2)
                fx[2] = parseInt(fx[2]) + data.tempo

                console.log(fx, 'fx')

                let ferr = ""
                let fxupdate = ""
                let m = 0,
                    t = 0;
                f.map((Fx, index) => {

                    if (index == (op.ferr - 1)) {
                        console.log(parseInt(fx), fx[1], fx[0], 'ddd')
                        ferr += `${fx[1] / fx[0]}-${fx[2]},`
                        t += fx[2]
                        m += fx[1] / fx[0]
                    } else {
                        if (index == 10) {
                            ferr += `${Fx}:`
                            t += parseFloat(Fx.split('-')[0])
                            m += parseInt(Fx.split('-')[1])
                            console.log(parseInt(Fx), 'dd')
                        } else {
                            ferr += `${Fx},`
                            t += parseFloat(Fx.split('-')[0])
                            m += parseInt(Fx.split('-')[1])
                            console.log(parseInt(Fx), 'dd')
                        }

                    }
                })


                fx.map((f_x, index) => {
                    if (index == 3) {
                        fxupdate += `${f_x}`
                    } else {
                        fxupdate += `${f_x},`
                    }
                })


                ferr += `${m},${t}`


                let updatedata = {
                    f: ferr
                }

                updatedata[fname] = fxupdate
                updatedata.f_testes = utente.f_testes + 1


                const utente_update = await strapi.entityService.update('api::utente.utente', utente.id, {
                    data: updatedata
                });




                console.log(ferr)


            }



            strapi.io.to(`instituicao${data.instituicao}`).emit('close', data)

            return data
        } catch (error) {
            return null
        }





    },

    save_file: async function(utente) {

        return await this.create_teste_file(utente, { f: `f${utente.ferramenta}`, ferr: utente.ferramenta })

    },
    create_teste_file: async function(data, op) {

        try {

            console.log('success,fx')


            let fname = `${op.f}`

            const utente = await this.getutente([data.instituicao, data.ferramenta, data.rfid])

            if (utente) {
                const teste = await strapi.entityService.create('api::teste.teste', {
                    data: {
                        acerto: data.acertou,
                        erro: data.errou,
                        utente: utente.id,
                        tempo: data.tempo,
                        ferr: fname,
                        createdAt: data.date,
                        ferramenta: [data.ferramenta],
                        instituicao: [data.instituicao],
                        p: (data.acertou + data.errou) > 0 ? (data.acertou / (data.acertou + data.errou)) : 0,
                        publishedAt: new Date()
                    },
                });



                data.tempo

                let fx = data.ferramentas[data.ferramenta].split(',')
                let f = data.ferramentas[0].split(':')[0].split(",")
                let media = data.ferramentas[0].split(':')[1].split(",")

                fx[0] = parseInt(fx[0]) + 1
                fx[1] = (data.acertou + data.errou) > 0 ? (parseFloat(fx[1]) + (data.acertou / (data.acertou + data.errou))).toFixed(2) : parseFloat(fx[1]).toFixed(2)
                fx[2] = parseInt(fx[2]) + data.tempo

                console.log(fx, 'fx')

                let ferr = ""
                let fxupdate = ""
                let m = 0,
                    t = 0;
                f.map((Fx, index) => {

                    if (index == (op.ferr - 1)) {
                        console.log(parseInt(fx), fx[1], fx[0], 'ddd')
                        ferr += `${fx[1] / fx[0]}-${fx[2]},`
                        t += fx[2]
                        m += fx[1] / fx[0]
                    } else {
                        if (index == 10) {
                            ferr += `${Fx}:`
                            t += parseFloat(Fx.split('-')[0])
                            m += parseInt(Fx.split('-')[1])
                            console.log(parseInt(Fx), 'dd')
                        } else {
                            ferr += `${Fx},`
                            t += parseFloat(Fx.split('-')[0])
                            m += parseInt(Fx.split('-')[1])
                            console.log(parseInt(Fx), 'dd')
                        }

                    }
                })


                fx.map((f_x, index) => {
                    if (index == 3) {
                        fxupdate += `${f_x}`
                    } else {
                        fxupdate += `${f_x},`
                    }
                })


                ferr += `${m},${t}`


                let updatedata = {
                    f: ferr
                }

                updatedata[fname] = fxupdate
                updatedata.f_testes = utente.f_testes + 1


                const utente_update = await strapi.entityService.update('api::utente.utente', utente.id, {
                    data: updatedata
                });




                console.log(ferr)


            }



            strapi.io.to(`instituicao${data.instituicao}`).emit('close', data)

            return data
        } catch (error) {
            return null
        }





    },

    getutente: async(data) => {







        const utente = await strapi.query('api::utente.utente')
            .findOne({
                where: {
                    rfid: data[2],
                    arquivar: false

                },
                populate: {
                    img: {
                        select: ['url']
                    },
                    instituicao: {
                        where: {
                            id: data[0]
                        },
                        populate: {
                            ferramentas: {
                                where: {
                                    id: data[1]
                                },
                                select: ['id', 'nome'],
                            }
                        }
                    }
                }


            });



        try {
            if (utente.instituicao.ferramentas.length) {


                return utente;




            }
        } catch (error) {
            return null;
        }









    },
    get_file: async function(user_, file) {
        console.log(file)





        try {



            const user = await strapi.query('plugin::users-permissions.user').findOne({
                select: ['username'],
                where: {
                    id: user_.id
                },
                populate: {
                    'instituicao': {
                        select: ['nome', 'id'],
                        populate: {

                            ferramentas: {
                                select: ['nome', 'descricao'],
                            },
                            utentes: {

                                select: [
                                    'nome',
                                    'id',
                                    'rfid',
                                    'f1',
                                    'f2',
                                    'f3',
                                    'f4',
                                    'f5',
                                    'f6',
                                    'f7',
                                    'f8',
                                    'f9',
                                    'f10',
                                    'f11',
                                    'f'
                                ],
                            }
                        }
                    }
                }


            });



            const result = excelToJson({
                sourceFile: file.url,
                header: {
                    rows: 1
                }
            });



            function* generator(array) {

                for (let index = 0; index < array.length; index++) {
                    yield array[index];

                }

            }

            const gen = generator(user.instituicao.utentes);

            let flag = false;

            while (!flag) {

                const { value: utente, done } = gen.next()
                if (utente) {
                    const data = result[`${utente.rfid}_${utente.nome}`]

                    if (Array.isArray(data)) {
                        const gen1 = generator(data);

                        let flag1 = false;

                        while (!flag1) {

                            const { value: teste, done: done1 } = gen1.next()
                            if (teste) {

                                if (teste.A && teste.B && teste.C && teste.D && teste.E) {
                                    let test = {
                                        nome: utente.nome,
                                        rfid: utente.rfid,
                                        instituicao: user.instituicao.id,
                                        ferramenta: teste.A,
                                        ferramentas: [utente.f,
                                            utente.f1,
                                            utente.f2,
                                            utente.f3,
                                            utente.f4,
                                            utente.f5,
                                            utente.f6,
                                            utente.f7,
                                            utente.f8,
                                            utente.f9,
                                            utente.f10,
                                            utente.f11,
                                        ],
                                        acertou: teste.B,
                                        errou: teste.C,
                                        tempo: teste.D,
                                        date: teste.E
                                    }


                                    this.save_file(test);


                                    console.log(test)
                                }
                            }
                            flag1 = done1
                        }
                    }

                }

                flag = done;
            }





        } catch (error) {
            console.log(error)
        }

    }

});
