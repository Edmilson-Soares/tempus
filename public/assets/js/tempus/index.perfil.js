const app = Vue.createApp({
    data() {
        return {
            nome: '',
            username: "",
            sobre: "",
            email: "",
            contacto: "",
            data: "",
            sexo: "M",
            morada: "",
            senha: {},
            arquivo: [],
            user,
            inst: {

            }

        }
    },
    methods: {

        processFile(event) {
            this.arquivo = event.target.files
            console.log(this.arquivo)
        },


        selectuser(user) {

            this.user = user
            console.log(user)

        },

        selectinst(inst) {

            this.inst = inst
            console.log(inst)

        },

        alterar() {



            if (this.senha.password && this.senha.newpassword && this.senha.confirmnewpassword) {

                if (this.senha.newpassword == this.senha.confirmnewpassword) {



                    axios
                        .post('/web/auth/new_password_conta', {
                            ...app.senha
                        }, {
                            headers: {
                                Authorization: jwt
                            }
                        })
                        .then(({
                            data
                        }) => {

                            swal('Alteração de senha', 'Ação feita com sucesso!!', 'success').then(() => {

                            });

                            app.senha = {}

                            $('#senha').modal('hide');
                        })
                        .catch(error => {
                            iziToast.error({
                                title: 'Tempus!',
                                message: "Operação autorizada!",
                                position: 'topRight'
                            });
                        });

                } else {
                    iziToast.error({
                        title: 'Tempus!',
                        message: "As senha não são iguais",
                        position: 'topRight'
                    });
                }
            } else {
                iziToast.error({
                    title: 'Tempus!',
                    message: "Informe os dados",
                    position: 'topRight'
                });
            }

        },



    },
}).mount('#app');


//instituicao



const form1 = document.querySelector('#instituicao');

form1.addEventListener('submit', async(e) => {

    e.preventDefault();



    try {

        const body = new FormData(e.target)

        let inst = {
            nome: app.inst.nome,
            descricao: app.inst.descricao

        }
        body.append('data', JSON.stringify(inst));

        const response = await fetch('/web/instituicao', {
            method: 'put',
            body,
            headers: {
                'Authorization': jwt,

            }
        });

        const data = await response.json()


        swal('Edição da Instituição', 'Ação feita com sucesso!!', 'success').then(() => {


            location.reload()

        });





    } catch (error) {
        iziToast.error({
            title: 'Tempus!',
            message: "Falha  na operação",
            position: 'topRight'
        });
    }





})



const form2 = document.querySelector('#edit_user');

form2.addEventListener('submit', async(e) => {

    e.preventDefault();



    try {

        const body = new FormData(e.target)

        let user = {
            email: app.user.email,
            username: app.user.username,
            nome: app.user.nome,
            morada: app.user.morada,
            contacto: app.user.contacto,
            data: app.user.data,
            genero: app.user.genero
        }
        body.append('data', JSON.stringify(user));

        const response = await fetch('/web/instituicao/perfil', {
            method: 'put',
            body,
            headers: {
                'Authorization': jwt,

            }
        });

        const data = await response.json()

        console.log(data)



        swal('Edição de Perfil', 'Ação feita com sucesso!!', 'success').then(() => {
            location.reload()



        });





    } catch (error) {
        console.log(error)
        iziToast.error({
            title: '3@Mente!',
            message: "Falha ao adicionar a observação",
            position: 'topRight'
        });
    }





})








console.log(id_instituicao)

var table = $('#tecnicos').DataTable({

    lengthMenu: [10, 20, 30, 50],
    "oLanguage": {
        "sSearch": "Buscar"
    }
});

$('#tecnicos tbody').on('click', 'tr', function() {
    $(this).toggleClass('selected');

    $('#exampleModal').modal({
        show: true,

    });
});
