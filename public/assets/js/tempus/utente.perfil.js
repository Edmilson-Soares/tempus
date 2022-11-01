console.log(JSON.parse(utente))
console.log(DesempenhoUtente.split(",")[11])
var options1 = {
    series: [parseFloat(DesempenhoUtente.split(",")[11]).toFixed(0)],
    grid: {
        padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        },
    },
    chart: {
        height: 150,
        width: 150,
        type: 'radialBar',
    },
    plotOptions: {
        radialBar: {
            hollow: {
                size: '50%',
            },
            dataLabels: {
                name: {
                    show: false,
                    color: '#fff'
                },
                value: {
                    show: true,
                    color: '#000',
                    offsetY: 5,
                    fontSize: '15px'
                }
            }
        }
    },
    colors: ['#ecf0f4'],
    fill: {
        type: 'gradient',
        gradient: {
            shade: 'dark',
            type: 'diagonal1',
            shadeIntensity: 1,
            gradientToColors: ['#009688'],
            inverseColors: false,
            opacityFrom: [1, 0.2],
            opacityTo: 1,
            stops: [0, 100],
        }
    },
    states: {
        normal: {
            filter: {
                type: 'none',
                value: 0,
            }
        },
        hover: {
            filter: {
                type: 'none',
                value: 0,
            }
        },
        active: {
            filter: {
                type: 'none',
                value: 0,
            }
        },
    }
};

chart1 = new ApexCharts(document.querySelector("#chart_f1"), options1);
chart1.render();


let app = new Vue({
    el: "#app",
    data: {


    },
    created: function() {


    },
    methods: {

        selet(utente, obs) {



            app1.obs = obs

            console.log(obs)

        },
    },
})



let app1 = new Vue({
    el: "#add_",
    data: {
        utente: JSON.parse(utente),
        observacao: "",
        obs: {

        }


    },
    created: function() {


    },
    methods: {
        obsCreate(event) {
            event.preventDefault();

            let obs = {
                descricao: this.observacao
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

                        $('#addObs').modal({
                            show: false,

                        });
                        location.reload()
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




        obsUpdate(event) {
            event.preventDefault();

            swal({
                    title: 'Tens Certeza que quer atualizar?',
                    text: '',
                    icon: 'warning',
                    buttons: true,
                    dangerMode: true,
                })
                .then((willDelete) => {
                    if (willDelete) {

                        axios
                            .put(`/web/instituicao/utentes/${this.utente.id}/observacao/${app1.obs.id}`, {
                                data: {
                                    descricao: this.obs.descricao
                                },

                            }, {
                                headers: {
                                    Authorization: jwt
                                }
                            })
                            .then(({
                                data
                            }) => {

                                swal('Edição da Observação', 'Ação feita com sucesso!!', 'success').then(() => {
                                    location.reload()
                                });

                                console.log(data)
                            })
                            .catch(error => {
                                console.log('An error occurred:', error.response);
                            });


                    } else {

                    }
                });








        },


    },
})


var table = $('#tecnicos').DataTable({

    lengthMenu: [5, 10, 20, 50],
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



var table2 = $('#utentes').DataTable({
    lengthMenu: [5, 10, 20, 50],
    "oLanguage": {
        "sSearch": "Buscar"
    }
});


$('#utentes tbody').on('click', 'tr', () => {
    $(this).toggleClass('selected');


    $('#edit').modal({
        show: true,

    });


});
