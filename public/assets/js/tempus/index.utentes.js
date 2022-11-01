/*const socket = io({
    extraHeaders: {
        Authorization: jwt
    }
});

console.log(id)

socket.on(`bem-vindo:${id}`, (data) => {
    console.log(data)
    iziToast.info({
        title: 'MicroAITec!',
        message: data.message,
        position: 'topRight'
    });
})



socket.on(`addUtente:${id}`, (data) => {

    app.selet(data)

    $('#edit').modal({
        show: true,

    });

});

*/

let t_utentes = null;

console.log(user)


$(document).ready(function() {


    t_utentes = $('#utentes').DataTable({
        lengthMenu: [10, 20, 30, 50],
        "oLanguage": {
            "sSearch": "Buscar"
        }
    });


    $('#utentes tbody').on('click', 'tr', function() {
        $(this).toggleClass('selected');

        app.utente = {}
        let data = t_utentes.row(this).data();



        app.utente = app.utentes.find(utente => utente.rfid == data[0])

        if (app.utente) {
            app.utente.this = this



            $('#edit').modal('show');

            console.log(data, this)
        }





    });




    let ano = 2022

    user.instituicao.utentes.map(utente => {

        let newRow = `

          <tr >
             <td>
              ${utente.rfid}
             </td>
              <td>
                  <img style="width: 30px;height: 30px;" alt="image" src="${utente.img?utente.img[0].url:'/assets/img/AddedSolutions.jpg'}" class="user-img-radious-style">
              </td>
              <td>
                  ${utente.nome}
              </td>
              <td>
                  ${utente.caracteristica}
              </td>
              <td>
                 ${utente.genero}
              </td>
              <td>
                  ${utente.data?(ano-parseInt(utente.data.split('-')[0])):0}
              </td>

          </tr>

    `
        t_utentes.row.add($(newRow)).draw()



        utente.index = app.utentes.length
        app.utentes.push(utente)


    })



})




const app = Vue.createApp({
    data() {
        return {
            nome: '',
            caracteristica: "",
            data: "",
            genero: "M",
            rfid: "",
            arquivo: [],
            idade: '',
            utente: {

            },
            utente_select: {},
            utentes: []

        }
    },
    methods: {
        processFile(event) {
            this.arquivo = event.target.files
            console.log(this.arquivo)
        },
        obsCreate(event) {
            event.preventDefault();

            let obs = {
                descricao: this.observacao,
            }

            console.log(obs, this.utente.id)
            axios
                .post(`/web/instituicao/utentes/${this.utente.id}/observacao`, {
                    data: obs,

                }, {
                    headers: {
                        Authorization: jwt
                    }
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
                    swal('Adição de Utente', error.response.data.error.message, 'warning').then(() => {
                        //location.reload()
                    });

                });


        },

        uploadFoto(event) {
            event.preventDefault();

            let formData = new FormData();

            Array.from(this.arquivo).forEach(image => {

                formData.append('files', image);
                console.log(formData, image)
            });

            if (this.arquivo.length) {
                axios.post(`/api/upload`, formData)
                    .then(async res1 => {

                        let fotos = []
                        fotos.push(res1.data[0].id)

                        if (this.utente.img) {
                            this.user.img.map(foto => {
                                fotos.push(foto.id)
                            })
                        }

                        axios.put(`/api/tempus/instituicao/utentes/${this.utente.id}`, {
                                foto: fotos
                            }, {
                                headers: {
                                    Authorization: jwt
                                }
                            })
                            .then(response => {
                                console.log(response.data);
                                location.reload()
                            }).catch(function(error) {
                                console.log(error);
                                swal('Adição de Utente', error.response.data.error.message, 'warning').then(() => {
                                    //location.reload()
                                });

                            });

                    }).catch(function(error) {
                        console.log("ffff", error);
                        swal('Adição de Utente', error.response.data.error.message, 'warning').then(() => {
                            //location.reload()
                        });
                    })

            }
        },

        selet(utente) {


            this.utente = utente
            console.log(utente)

        },
        selectFoto(foto) {
            //  this.user=user

            let fotos = []
            fotos.push(foto.id)

            this.utente.img.map((fot) => {

                if (foto.id != fot.id) {
                    fotos.push(fot.id)
                }
            })

            axios.put(`/web/instituicao/utentes/${this.utente.id}/fotos`, {
                    data: {
                        img: fotos
                    }
                }, {
                    headers: {
                        Authorization: jwt
                    }
                })
                .then(({ data }) => {


                    console.log(data, 'ddd')



                    swal('Edição de Utente', 'Ação feita com sucesso!!', 'success').then(() => {
                        //  location.reload()

                        $('#foto').modal('hide');

                        //  app.utente.img.sr
                        app.utente.img = data
                        app.utentes[app.utente.index].img = data

                        let ano = new Date().getFullYear()
                        t_utentes.row(app.utente.this).data([
                            `${app.utente.rfid}`,
                            `<img style="width: 30px;height: 30px;" alt="image" src="${foto?foto.url:'/assets/img/logo.png'}" class="user-img-radious-style">`,
                            `${app.utente.nome}`,
                            `${app.utente.caracteristica}`,
                            `${app.utente.genero}`,
                            `${app.utente.data?(ano-parseInt(app.utente.data.split('-')[0])):0}`
                        ]).draw();




                    });






                }).catch(function(error) {
                    console.log(error);
                    swal('Adição de Utente', "dd", 'warning').then(() => {
                        //location.reload()
                    });

                });

            console.log(fotos)
        },
        selectFotoEliminar(foto) {

            console.log(foto, 'dd')


            swal({
                    title: 'Are you sure you want to delete?',
                    text: 'Yes or No?',
                    icon: 'warning',
                    buttons: true,
                    dangerMode: true,
                })
                .then((willDelete) => {
                    if (willDelete) {
                        axios.delete(`/web/instituicao/utentes/${app.utente.id}/fotos/${foto.id}`)
                            .then(({ data }) => {
                                console.log(data);
                                swal('Good Job', 'Photo deleted successfully!', 'success').then(() => {
                                    //location.reload()

                                    $('#foto').modal('hide');

                                    app.utente.img = data
                                    app.utentes[app.utente.index].img = data

                                    let ano = new Date().getFullYear()
                                    t_utentes.row(app.utente.this).data([
                                        `${app.utente.rfid}`,
                                        `<img style="width: 30px;height: 30px;" alt="image" src="${data.length?data[0].url:'/assets/img/logo.png'}" class="user-img-radious-style">`,
                                        `${app.utente.nome}`,
                                        `${app.utente.caracteristica}`,
                                        `${app.utente.genero}`,
                                        `${app.utente.data?(ano-parseInt(app.utente.data.split('-')[0])):0}`
                                    ]).draw();



                                })


                            }).catch(function(error) {
                                console.log(error);
                                swal('Adição de Utente', error.response.data.error.message, 'warning').then(() => {
                                    //location.reload()
                                });

                            });
                    } else {
                        swal('Photo not deleted successfully!');
                    }
                });


        },
        eliminar: () => {

            swal({
                    title: 'Tens Certeza que queres eliminar?',
                    text: '',
                    icon: 'warning',
                    buttons: true,
                    dangerMode: true,
                })
                .then((willDelete) => {
                    if (willDelete) {

                        axios
                            .delete('/web/instituicao/utentes/' + app.utente.id, {
                                headers: {
                                    Authorization: jwt
                                }
                            })
                            .then(({ data }) => {

                                swal('Eliminação do Utente', 'Ação feita com sucesso!!', 'success').then(() => {
                                    //  location.reload()

                                    $('#edit').modal('hide');


                                    t_utentes.row(app.utente.this)
                                        .remove()
                                        .draw();

                                    app.utentes.splice(app.utente.index, 1)


                                });

                                console.log(data, app.utente, "ddd")
                            })
                            .catch(error => {
                                console.log('An error occurred:', error.response);
                                swal('Adição de Utente', error.response.data.error.message, 'warning').then(() => {
                                    //location.reload()
                                });
                            });


                    } else {

                    }
                });





        },

        utenteCreate(event) {

            event.preventDefault();


            let utente = {
                nome: this.nome,
                caracteristica: this.caracteristica,
                data: this.data.length ? this.data : "01/01/2000",
                genero: this.genero,
                rfid: this.rfid,
                instituicao: parseInt(id_instituicao),
                "f": "0-0,0-0,0-0,0-0,0-0,0-0,0-0,0-0,0-0,0-0,0-0:0,0",
                "f1": "0,0,0,0",
                "f2": "0,0,0,0",
                "f3": "0,0,0,0",
                "f4": "0,0,0,0",
                "f5": "0,0,0,0",
                "f6": "0,0,0,0",
                "f7": "0,0,0,0",
                "f8": "0,0,0,0",
                "f9": "0,0,0,0",
                "f10": "0,0,0,0",
                "f11": "0,0,0,0"
            }




            axios
                .post('/web/instituicao/utentes', {
                    data: utente

                }, {
                    headers: {
                        Authorization: jwt
                    }
                })
                .then(({ data }) => {

                    swal('Edição de Utente', 'Ação feita com sucesso!!', 'success').then(() => {
                        //  location.reload()

                        $('#add').modal('hide');


                        let ano = 2022
                        let newRow = `

                        <tr >
                           <td>
                            ${data.rfid}
                           </td>
                            <td>
                                <img style="width: 30px;height: 30px;" alt="image" src="${data.img?data.img[0].url:'/assets/img/logo.png'}" class="user-img-radious-style">
                            </td>
                            <td>
                                ${data.nome}
                            </td>
                            <td>
                                ${data.caracteristica}
                            </td>
                            <td>
                               ${data.genero}
                            </td>
                            <td>
                                ${data.data?(ano-parseInt(data.data.split('-')[0])):0}
                            </td>

                        </tr>

                  `
                        t_utentes.row.add($(newRow)).draw()



                        data.index = app.utentes.length
                        app.utentes.push(data)



                    });

                    console.log(data, app.utente, "ddd")
                })
                .catch(error => {
                    console.log('An error occurred:', error.response);
                    swal('Adição de Utente', error.response.data.error.message, 'warning').then(() => {
                        //location.reload()
                    });
                });



        },

        utenteUpdate_arquivar(event) {
            event.preventDefault();

            swal({
                    title: 'Tens Certeza que queres arquivar?',
                    text: '',
                    icon: 'warning',
                    buttons: true,
                    dangerMode: true,
                })
                .then((willSave) => {
                    if (willSave) {
                        axios
                            .post('/web/instituicao/utentes/' + app.utente.id + '/arquivar', {}, {
                                headers: {
                                    Authorization: jwt
                                }
                            })
                            .then(({ data }) => {

                                swal('Eliminação do Utente', 'Ação feita com sucesso!!', 'success').then(() => {
                                    //  location.reload()

                                    $('#edit').modal('hide');


                                    t_utentes.row(app.utente.this)
                                        .remove()
                                        .draw();



                                });

                                console.log(data, app.utente, "ddd")
                            })
                            .catch(error => {
                                console.log('An error occurred:', error.response);
                                swal('Adição de Utente', error.response.data.error.message, 'warning').then(() => {
                                    //location.reload()
                                });
                            });

                    } else {

                    }
                });










        }
    },
}).mount('#app');


const form1 = document.querySelector('#ddddd');

form1.addEventListener('submit', async(e) => {

    e.preventDefault();



    try {

        const body = new FormData(e.target)

        let utente = {
            nome: app.utente.nome,
            caracteristica: app.utente.caracteristica,
            data: app.utente.data,
            genero: app.utente.genero,
            rfid: app.utente.rfid

        }
        body.append('data', JSON.stringify(utente));

        const response = await fetch('/web/instituicao/utentes/' + app.utente.id, {
            method: 'put',
            body,
            headers: {
                'Authorization': jwt,

            }
        });

        const data = await response.json()


        swal('Edição de Utente', 'Ação feita com sucesso!!', 'success').then(() => {
            //  location.reload()

            $('#edit').modal('hide');

            if (data) {
                app.utente.img = data.img
            }

            app.utentes[app.utente.index] = app.utente

            let ano = new Date().getFullYear()
            t_utentes.row(app.utente.this).data([
                `${app.utente.rfid}`,
                `<img style="width: 30px;height: 30px;" alt="image" src="${data?data.file.url:'/assets/img/AddedSolutions.jpg'}" class="user-img-radious-style">`,
                `${app.utente.nome}`,
                `${app.utente.caracteristica}`,
                `${app.utente.genero}`,
                `${app.utente.data?(ano-parseInt(app.utente.data.split('-')[0])):0}`
            ]).draw();




        });





    } catch (error) {
        iziToast.error({
            title: '3@Mente!',
            message: "Falha ao adicionar a observação",
            position: 'topRight'
        });
    }





})
