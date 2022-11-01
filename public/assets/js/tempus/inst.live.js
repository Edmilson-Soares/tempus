const uuidutente = uuid.v4()

$(document).ready(function() {


    document.getElementById('chat-scroll').style.display = "block";
    document.getElementById('tela').style.display = "block";
});

let u = {}
u[uuidutente] = {}
u[`${uuidutente}_t`] = 0
u[`${uuidutente}_teste_tempo`] = []
u[`${uuidutente}_teste`] = 0
u[`${uuidutente}_errou`] = 0
u[`${uuidutente}_acertou`] = 0


const socket = io({
    extraHeaders: {
        Authorization: jwt
    }
});

socket.emit('utentes');

var app1 = new Vue({
    el: '#app',

    data: {

        user,
        uuidutente,
        utentes: [],
        utente_: {},
        utentes_: user.instituicao.utentes,
        utente: {},
        u,
        observacao: "",
        utente_acertou: 0,
        testes_tempo: [],
        utente_errou: 0,
        utente_teste: 0,
        utente_t: 0,
        ferrameta: 0
    },
    methods: {

        gdesempenho: async(index) => {
            // console.log(utente.teste,"sss",myChart.data.datasets[0])

            app1.u[uuidutente] = app1.utentes[index];
            app1.u[uuidutente].device = `${app1.u[uuidutente].device}-${uuidutente}`
            app1.u[`${uuidutente}_t`] = app1.utentes[index].tempo
            app1.u[`${uuidutente}_teste_tempo`] = app1.u[uuidutente].testes
            app1.u[`${uuidutente}_teste`] = app1.utentes[index].testes.length
            app1.u[`${uuidutente}_errou`] = app1.utentes[index].errou
            app1.u[`${uuidutente}_acertou`] = app1.utentes[index].acertou

            /*

            app1.u[uuidutente].testes.forEach((teste, index) => {

                app1.u[`${uuidutente}_teste_tempo`].push(teste)

            });

*/



        },
        obsCreate(event) {
            event.preventDefault();

            let obs = {

                utente: this.utente.id,
                descricao: this.observacao,


            }

            console.log(obs, this.utente.id)
            axios
                .post('/api/observacaos', {
                    data: obs,

                })
                .then(({
                    data
                }) => {

                    swal('Observação', 'Ação feita com sucesso!!', 'success').then(() => {

                        $('#add').modal({
                            show: false,

                        });

                    });


                    console.log(data)
                })
                .catch(error => {
                    console.log('An error occurred:', error.response);

                    iziToast.error({
                        title: '3@Mente!',
                        message: "Falha ao adicionar a observação",
                        position: 'topRight'
                    });

                });


        },
        usar(utente_) {


            // alert(utente.rfid)

            app1.utente_ = utente_

            app1.ferrs = [...user.instituicao.ferramentas]


            app1.utentes.map(utente => {

                utente.f = false

                app1.user.instituicao.ferramentas.forEach((f, index) => {

                    console.log(f.id, utente)

                    app1.ferrs[index][utente.rfid] = {}

                    if (f.id == utente.ferramenta) {

                        app1.ferrs[index].state = 2

                        if (utente.rfid == app1.utente_.rfid) {
                            app1.ferrs[index][utente.rfid].state = 1
                            app1.ferrs[index][utente.rfid].device = utente.device
                            utente.f = true
                            app1.ferrs[index][utente.rfid].rfid = utente.rfid
                        } else {

                            if (utente.f) {
                                app1.ferrs[index][utente.rfid].state = 3
                                app1.ferrs[index][utente.rfid].rfid = utente.rfid
                            } else {
                                app1.ferrs[index][utente.rfid].state = 2
                                app1.ferrs[index][utente.rfid].rfid = utente.rfid
                            }

                        }

                    } else {
                        if (app1.ferrs[index].state > 0) {

                        } else {
                            app1.ferrs[index].state = 0
                        }

                        if (utente.f) {
                            app1.ferrs[index][utente.rfid].state = 4

                        } else {
                            app1.ferrs[index][utente.rfid].state = 0
                        }

                        // app1.ferrs[index].rfid=utente.rfid
                    }




                });

            })

            app1.user.instituicao.ferramentas.forEach((f, index) => {


                if (!app1.ferrs[index][utente_.rfid]) {

                    app1.ferrs[index][utente_.rfid] = {
                        state: app1.ferrs[index].state || 0
                    }

                } else {
                    console.log(app1.ferrs[index])
                    if (app1.ferrs[index].state == 2) {

                        if (!app1.ferrs[index][utente_.rfid].rfid) {
                            app1.ferrs[index][utente_.rfid].state = 2
                        }
                    } else {

                    }
                }



            });


            // alert(app.utente_.rfid)


        },
        utilizar: (index) => {


            const ferr = app1.ferrs[index]


            switch (app1.ferrs[index][app1.utente_.rfid].state) {
                case 0:

                    swal({
                            title: 'Iniciar a utilização',
                            text: `Esta operação, abrirá uma sessão de ${app1.utente_.nome} para utilização de ${ferr.nome} !`,
                            icon: 'warning',
                            buttons: true,
                            dangerMode: true,
                        })
                        .then((willDelete) => {
                            if (willDelete) {
                                axios
                                    .post('/web/instituicao/live', {
                                        data: `${app1.user.instituicao.id},${ferr.id},${app1.utente_.rfid},00`,

                                    }, {
                                        headers: {
                                            authorization: jwt
                                        },
                                    })
                                    .then(({
                                        data
                                    }) => {

                                        swal('Utilização', 'Ação feita com sucesso!!', 'success').then(() => {
                                            socket.emit('utentes');
                                            app1.usar(app1.utente_)
                                        });


                                        console.log(data)
                                    })
                                    .catch(error => {
                                        console.log('An error occurred:', error.response);
                                        iziToast.error({
                                            title: 'Tempus!',
                                            message: "Falha  na operação",
                                            position: 'topRight'
                                        });

                                    });
                            } else {

                            }
                        });

                    break;
                case 1:

                    swal({
                            title: 'Terminar a utilização?',
                            text: 'Esta operação irá registar o dados!',
                            icon: 'warning',
                            buttons: true,
                            dangerMode: true,
                        })
                        .then((willDelete) => {
                            if (willDelete) {
                                axios
                                    .delete(`/web/instituicao/live/${app1.user.instituicao.id}_${ferr.id}_00`, {
                                        headers: {
                                            authorization: jwt
                                        },

                                    })
                                    .then(({
                                        data
                                    }) => {

                                        swal('Utilização', 'Ação feita com sucesso!!', 'success').then(() => {
                                            socket.emit('utentes');
                                            app1.usar(app1.utente_)

                                        });


                                        console.log(data)
                                    })
                                    .catch(error => {
                                        console.log('An error occurred:', error.response);

                                        iziToast.error({
                                            title: 'Tempus!',
                                            message: "Falha  na operação",
                                            position: 'topRight'
                                        });

                                    });
                            } else {

                            }
                        });
                    break;
                case 2:

                    iziToast.warning({
                        title: 'Indisponível!',
                        message: 'Está sendo utilizado no momento',
                        position: 'topRight'
                    });

                    break;
                case 3:
                    iziToast.warning({
                        title: 'Indisponível!',
                        message: 'Está sendo utilizado no momento',
                        position: 'topRight'
                    });
                    break;
                case 4:

                    iziToast.warning({
                        title: 'Disponível!',
                        message: 'Mas primeiro, termina a outra utilização',
                        position: 'topRight'
                    });

                    break;
                default:
                    swal({
                            title: 'Iniciar a utilização',
                            text: `Esta operação, abrirá uma sessão de ${app1.utente_.nome} para utilização de ${ferr.nome} !`,
                            icon: 'warning',
                            buttons: true,
                            dangerMode: true,
                        })
                        .then((willDelete) => {
                            if (willDelete) {
                                axios
                                    .post('/web/instituicao/live', {
                                        data: `${app1.user.instituicao.id},${ferr.id},${app1.utente_.rfid},00`,

                                    }, {
                                        headers: {
                                            authorization: jwt
                                        },
                                    })
                                    .then(({
                                        data
                                    }) => {

                                        swal('Utilização', 'Ação feita com sucesso!!', 'success').then(() => {

                                            socket.emit('utentes');
                                            app1.usar(app1.utente_)
                                        });


                                        console.log(data)
                                    })
                                    .catch(error => {
                                        console.log('An error occurred:', error.response);
                                        iziToast.error({
                                            title: 'Tempus!',
                                            message: "Falha  na operação",
                                            position: 'topRight'
                                        });

                                    });
                            } else {

                            }
                        });
                    break;
            }




        },
        close_all: () => {



            swal({
                    title: 'Terminar todas as utilizações?',
                    text: 'Esta operação irá registar o dados!',
                    icon: 'warning',
                    buttons: true,
                    dangerMode: true,
                })
                .then((willDelete) => {
                    if (willDelete) {
                        axios
                            .delete('/web/instituicao/lives', {
                                headers: {
                                    authorization: jwt
                                },

                            })
                            .then(({
                                data
                            }) => {

                                $('.utentes').modal('hide')

                                swal('Utilização', 'Ação feita com sucesso!!', 'success').then(() => {
                                    socket.emit('utentes');

                                    app1.utente_ = {}
                                    app1.ferrs = [...user.instituicao.ferramentas]

                                });


                                console.log(data)
                            })
                            .catch(error => {
                                console.log('An error occurred:', error.response);
                                iziToast.error({
                                    title: 'Tempus!',
                                    message: "Falha  na operação",
                                    position: 'topRight'
                                });

                            });

                    } else {

                    }
                });


        }
    },
    created: async() => {






    }
});




socket.on('gets', (data) => {
    console.log(data, 'dd')
    console.log(data);

    console.log(app1.u)

    let a = false;

    if (data.length > app1.utentes.length) {
        a = true
    }

    app1.utentes = [...data];

    app1.ferrs = [...user.instituicao.ferramentas]


    app1.utentes.map(utente => {






        if (utente.rfid == app1.u[uuidutente].rfid) {
            app1.u[uuidutente] = utente;
            app1.u[uuidutente].device = `${app1.u[uuidutente].device}-${uuidutente}`
            app1.u[`${uuidutente}_t`] = ++utente.tempo
            app1.u[`${uuidutente}_teste_tempo`] = []
            app1.u[`${uuidutente}_teste`] = utente.testes.length
            app1.u[`${uuidutente}_errou`] = utente.errou
            app1.u[`${uuidutente}_acertou`] = utente.acertou

            app1.u[uuidutente].testes.forEach((teste, index) => {

                app1.u[`${uuidutente}_teste_tempo`].push(teste)

            });
        }
    })


    if (a) {
        iziToast.info({
            title: 'Tempus!',
            message: app1.utentes.length > 0 ? `${app1.utentes.length} utentes activo no momento` : 'Nenhum utente activo no momento',
            position: 'topRight'
        });


    }

})


socket.on('update', (data) => {
    console.log(data, 'update')

    if (data.rfid == app1.u[uuidutente].rfid) {
        app1.u[`${uuidutente}_teste_tempo`] = []
        app1.u[`${uuidutente}_teste`] = data.testes.length
        app1.u[`${uuidutente}_errou`] = data.errou
        app1.u[`${uuidutente}_acertou`] = data.acertou

        data.testes.forEach((teste, index) => {

            app1.u[`${uuidutente}_teste_tempo`].push(teste)

        });



    }

    app1.utentes.map(utente => {

        if (utente.rfid == data.rfid) {
            utente.testes = data.testes
            utente.errou = data.errou
            utente.acertou = data.acertou

        }


        return utente
    })


    console.log(app1.u)


})


socket.on('close', (data) => {
    console.log(data, 'update')
    if (app1.u[uuidutente].device == `${data.device}-${uuidutente}`) {
        app1.u[uuidutente] = {};
        app1.u[`${uuidutente}_t`] = 0
        app1.u[`${uuidutente}_teste_tempo`] = []
        app1.u[`${uuidutente}_teste`] = 0
        app1.u[`${uuidutente}_errou`] = 0
        app1.u[`${uuidutente}_acertou`] = 0
    }


    app1.ferrs = [...user.instituicao.ferramentas]


    socket.emit('utentes');


})





const form1 = document.querySelector('#data_excel');

form1.addEventListener('submit', async(e) => {
    e.preventDefault();

    try {

        const response = await fetch('/web/instituicao/excel', {
            method: 'post',
            body: new FormData(e.target),
            headers: {
                'Authorization': jwt,

            }
        });

        const data = await response.json()

        console.log(data)


        if (data.file) {
            swal('Operação feita com sucesso!', {
                icon: 'success',
            }).then(() => {
                $('.uploads').modal('hide');
            })
        } else {
            iziToast.error({
                title: 'Tempus!',
                message: "Falha  na operação",
                position: 'topRight'
            });
        }


    } catch (error) {
        iziToast.error({
            title: 'Tempus!',
            message: "Falha  na operação",
            position: 'topRight'
        });
    }



})
