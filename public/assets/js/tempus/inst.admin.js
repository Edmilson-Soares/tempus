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



socket.on(`addinstituicao:${id}`, (data) => {

    app.selet(data)

    $('#edit').modal({
        show: true,

    });

});

*/

let t_instituicaoes = null;

console.log(instituicoes)


$(document).ready(function() {


    t_instituicaoes = $('#instituicoes').DataTable({
        lengthMenu: [10, 20, 30, 50],
        "oLanguage": {
            "sSearch": "Buscar"
        }
    });


    $('#instituicoes tbody').on('click', 'tr', function() {
        $(this).toggleClass('selected');

        app.instituicao = {
            users: [{}]
        }
        let data = t_instituicaoes.row(this).data();



        app.instituicao = app.instituicoes.find(instituicao => instituicao.id == data[0])

        if (app.instituicao) {

            app.instituicao.ferrs = []
            app.instituicao.ferramentas.map(fer => {
                app.instituicao.ferrs.push(fer.id)
            })
            app.instituicao.this = this



            $('#edit').modal('show');

            console.log(data, this)
        }





    });




    let ano = 2022



    instituicoes.map(instituicao => {

        let newRow = `

                <tr style="cursor: pointer;">
                    <td>${instituicao.id}</td>

                    <td>${instituicao.nome}</td>

                    <td>
                        <img alt="image" src="${instituicao.logo?instituicao.logo.url:'/assets/img/AddedSolutions.jpg'}" width="35">
                    </td>
                    <td>${instituicao.descricao}</td>
                    <td>${instituicao.users.length? instituicao.users[0].nome:''}</td>
                    <td>${instituicao.users.length?instituicao.users[0].contacto:''}</td>

                 </tr>

     `
        t_instituicaoes.row.add($(newRow)).draw()



        instituicao.index = app.instituicoes.length
        app.instituicoes.push(instituicao)


    })





})




const app = Vue.createApp({
    data() {
        return {

            instituicao: {
                users: [{}]
            },
            instituicao_add: {
                ferrs: []
            },

            ferramentas,
            instituicoes: []

        }
    },
    methods: {
        add() {

            axios
                .post('/api/tempus/instituicao', {
                    data: this.instituicao_add,

                }, {
                    headers: {
                        Authorization: jwt
                    }
                })
                .then(({
                    data
                }) => {

                    swal('Instituição', 'Ação feita com sucesso!!', 'success').then(() => {

                        //$('#add').modal('hide');

                        location.reload()


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

        },

        update() {

            axios
                .put('/api/tempus/instituicao/' + app.instituicao.id, {
                    data: app.instituicao.ferrs,

                }, {
                    headers: {
                        Authorization: jwt
                    }
                })
                .then(({
                    data
                }) => {

                    swal('Instituicao', 'Ação feita com sucesso!!', 'success').then(() => {

                        // $('#edit').modal('hide');

                        location.reload()


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

        },
        desbloquear() {

            axios
                .post('/api/tempus/instituicao/' + app.instituicao.id + '/desbloquear', {
                    data: {},

                }, {
                    headers: {
                        Authorization: jwt
                    }
                })
                .then(({
                    data
                }) => {

                    swal('Instituição Desbloqueada', 'Ação feita com sucesso!!', 'success').then(() => {

                        // $('#edit').modal('hide');

                        location.reload()


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

        },
        bloquear() {

            axios
                .post('/api/tempus/instituicao/' + app.instituicao.id + '/bloquear', {
                    data: {},

                }, {
                    headers: {
                        Authorization: jwt
                    }
                })
                .then(({
                    data
                }) => {

                    swal('Instituição Bloqueada', 'Ação feita com sucesso!!', 'success').then(() => {

                        location.reload()


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

        },


    },
}).mount('#app');
