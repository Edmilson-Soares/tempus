let t_tecnicos = null;

console.log(user)


$(document).ready(function() {


    t_tecnicos = $('#tecnicos').DataTable({
        lengthMenu: [10, 20, 30, 50],
        "oLanguage": {
            "sSearch": "Buscar"
        }
    });


    $('#tecnicos tbody').on('click', 'tr', function() {
        $(this).toggleClass('selected');


        app.tecnicos

        app.tecnico = {}
        let data = t_tecnicos.row(this).data();

        app.tecnico = app.tecnicos.find(tecnico => tecnico.id == data[0])

        if (app.tecnico) {

            app.tecnico.this = this;
            $('#edit').modal('show');

        }




    });




    let ano = 2022

    user.instituicao.users.map(tecnico => {

        let newRow = `

        <tr >
        <td>
        ${tecnico.id}
    </td>
        <td>
        <img style="width: 30px;height: 30px;" alt="image" src="${tecnico.foto?tecnico.foto.url:'/assets/img/AddedSolutions.jpg'}" class="user-img-radious-style">
        </td>
        <td>
            ${tecnico.nome}
        </td>
        <td>
        ${tecnico.contacto}
        </td>
        <td>
        ${ tecnico.email }
        </td>
        <td>
        ${ tecnico.morada}
        </td>
        <td>
        ${tecnico.data}
        </td>

    </tr>

    `
        t_tecnicos.row.add($(newRow)).draw()



        tecnico.index = app.tecnicos.length
        app.tecnicos.push(tecnico)


    })



})




const app = Vue.createApp({
    data() {
        return {
            user: user,
            tecnicos: [],
            nome: '',
            username: "",
            sobre: "",
            email: "",
            contacto: "",
            data: "",
            sexo: "M",
            morada: "",
            arquivo: [],
            tecnico: {

            }

        }
    },
    methods: {


        eliminar() {
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
                            .delete('/web/instituicao/tecnicos/' + app.tecnico.id, {
                                headers: {
                                    Authorization: jwt
                                }
                            })
                            .then(({
                                data
                            }) => {

                                swal('Edição de técnico', 'Ação feita com sucesso!!', 'success').then(() => {

                                    $('#edit').modal('hide');

                                    t_tecnicos.row(app.tecnico.this)
                                        .remove()
                                        .draw();

                                    app.tecnicos.splice(app.tecnico.index, 1)
                                });

                                console.log(data)
                            })
                            .catch(error => {
                                iziToast.error({
                                    title: 'Tempus!',
                                    message: "Falha na operação",
                                    position: 'topRight'
                                });
                            });

                    } else {

                    }
                });
        },
        bloquear() {
            swal({
                    title: 'Tens Certeza que queres bloquear?',
                    text: '',
                    icon: 'warning',
                    buttons: true,
                    dangerMode: true,
                })
                .then((willDelete) => {
                    if (willDelete) {

                        axios
                            .put('/web/instituicao/tecnicos/' + app.tecnico.id + '/acesso', {

                            }, {
                                headers: {
                                    Authorization: jwt
                                }
                            })
                            .then(({
                                data
                            }) => {

                                swal('Edição de técnico', 'Ação feita com sucesso!!', 'success').then(() => {

                                    $('#edit').modal('hide');

                                    app.tecnico.blocked = data.blocked
                                    app.tecnicos[app.tecnico.index] = app.tecnico

                                    console.log(app.tecnico)

                                    t_tecnicos.row(app.tecnico.this).data([
                                        `${app.tecnico.id}`,
                                        `<img style="width: 30px;height: 30px;" alt="image" src="${app.tecnico.foto?app.tecnico.foto.url:'/assets/img/logo.png'}" class="user-img-radious-style">`,
                                        `${app.tecnico.nome}`,
                                        `${app.tecnico.contacto}`,
                                        `${app.tecnico.email}`,
                                        `${app.tecnico.morada}`,
                                        `${app.tecnico.data}`
                                    ]).draw();


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
        },

    },
}).mount('#app');







const form1 = document.querySelector('#add_tecnico');

form1.addEventListener('submit', async(e) => {

    e.preventDefault();



    try {

        const body = new FormData(e.target)

        let tecnico = {
            email: app.email,
            username: app.username,
            nome: app.nome,
            morada: app.morada,
            contacto: app.contacto,
            data: app.data,
            genero: app.sexo,

        }
        body.append('data', JSON.stringify(tecnico));

        const response = await fetch('/web/instituicao/tecnicos', {
            method: 'post',
            body,
            headers: {
                'Authorization': jwt,

            }
        });

        const data = await response.json()



        swal('Adição de Técnico', 'Ação feita com sucesso!!', 'success').then(() => {



            $('#add').modal('hide');
            let newRow = `

          <tr >
          <td>
          ${data.tecnico.id}
      </td>
          <td>
          <img style="width: 30px;height: 30px;" alt="image" src="${data.tecnico.foto?data.tecnico.foto.url:'/assets/img/AddedSolutions.jpg'}" class="user-img-radious-style">
          </td>
          <td>
              ${data.tecnico.nome}
          </td>
          <td>
          ${data.tecnico.contacto}
          </td>
          <td>
          ${ data.tecnico.email }
          </td>
          <td>
          ${ data.tecnico.morada}
          </td>
          <td>
          ${data.tecnico.data}
          </td>

      </tr>

      `
            t_tecnicos.row.add($(newRow)).draw()



            data.tecnico.index = app.tecnicos.length
            app.tecnicos.push(data.tecnico)



        });





    } catch (error) {
        iziToast.error({
            title: 'Tempus!',
            message: "Falha ao adicionar o técnico",
            position: 'topRight'
        });
    }





})



const form2 = document.querySelector('#edit_tecnico');

form2.addEventListener('submit', async(e) => {

    e.preventDefault();



    try {

        const body = new FormData(e.target)

        let tecnico = {
            email: app.tecnico.email,
            username: app.tecnico.username,
            nome: app.tecnico.nome,
            morada: app.tecnico.morada,
            contacto: app.tecnico.contacto,
            data: app.tecnico.data,
            genero: app.tecnico.genero
        }
        body.append('data', JSON.stringify(tecnico));

        const response = await fetch('/web/instituicao/tecnicos/' + app.tecnico.id, {
            method: 'put',
            body,
            headers: {
                'Authorization': jwt,

            }
        });

        const data = await response.json()

        console.log(data)



        swal('Edição de Técnico', 'Ação feita com sucesso!!', 'success').then(() => {
            //  location.reload()

            $('#edit').modal('hide');

            app.tecnico.foto = data
            app.tecnicos[app.tecnico.index] = app.tecnico

            console.log(app.tecnico)

            t_tecnicos.row(app.tecnico.this).data([
                `${app.tecnico.id}`,
                `<img style="width: 30px;height: 30px;" alt="image" src="${data.id?data.url:'/assets/img/logo.png'}" class="user-img-radious-style">`,
                `${app.tecnico.nome}`,
                `${app.tecnico.contacto}`,
                `${app.tecnico.email}`,
                `${app.tecnico.morada}`,
                `${app.tecnico.data}`
            ]).draw();


        });





    } catch (error) {
        console.log(error)
        iziToast.error({
            title: 'Tempus!',
            message: "Falha ao adicionar o técnico",
            position: 'topRight'
        });
    }





})
