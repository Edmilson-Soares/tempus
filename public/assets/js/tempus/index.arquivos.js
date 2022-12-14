var options = {
    chart: {
        height: 200,
        type: 'bar',
    },
    plotOptions: {
        bar: {
            horizontal: false,
            endingShape: 'rounded',
            columnWidth: '55%',
        },
    },
    dataLabels: {
        enabled: true,
        style: {
            fontSize: '12px',
            colors: ["#000"]
        },

        offsetY: 10
    },
    stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
    },
    series: [{
        name: 'Tempo',
        data: []
    }],
    xaxis: {
        categories: ["Ferr.1", "Ferr.2", "Ferr.3", "Ferr.4", "Ferr.5", "Ferr.6", "Ferr.7", "Ferr.8", "Ferr.9", "Ferr.10", "Ferr.11"],
        labels: {
            style: {
                colors: '#9aa0ac',
            }
        }
    },
    yaxis: {
        title: {
            text: 'Tempo (min)'
        },
        labels: {
            style: {
                color: '#9aa0ac',
            }
        }
    },
    fill: {
        opacity: 1

    },
    tooltip: {
        y: {
            formatter: function(val) {
                return +val + " min"
            }
        }
    }
}


var chart;


$(function() {



    chart = new ApexCharts(
        document.querySelector("#chart2"),
        options
    );

    chart.render();


});





Vue.createApp({
    data() {
        return {
            nome: '',
            observacao: "",
            data: "",
            sexo: "M",
            rfid: "",
            utente: {

            },
            utente_d: [],
            utente_t: [],
            start: '',
            end: '',
            index: 0

        }
    },
    methods: {



        utenteUpdate_arquivar(event) {
            event.preventDefault();

            let id = this.utente.id
            let index = this.index

            swal({
                    title: 'Tens Certeza que queres Desarquivar?',
                    text: '',
                    icon: 'warning',
                    buttons: true,
                    dangerMode: true,
                })
                .then((willDelete) => {
                    if (willDelete) {

                        axios
                            .post('/web/instituicao/utentes/' + id + '/desarquivar', {
                                data: {
                                    arquivar: false
                                },

                            }, {
                                headers: {
                                    Authorization: jwt
                                }
                            })
                            .then(({
                                data
                            }) => {

                                swal('Edi????o de Utente', 'A????o feita com sucesso!!', 'success').then(() => {
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



        seletgrafigo(option) {


            ///calcular os teste global feitos  this.utente.f1.split(',')[1]+ .....+  this.utente.f11.split(',')[1]
            //  this.utente.f_testes = this.utente.f1.split(',')[1]



            console.log(this.start, this.end)


            if (option == 1 && !this.start && !this.end) {


                let t = [
                    parseInt(this.utente.f1.split(',')[2]).toFixed(0),
                    parseInt(this.utente.f2.split(',')[2]).toFixed(0),
                    parseInt(this.utente.f3.split(',')[2]).toFixed(0),
                    parseInt(this.utente.f4.split(',')[2]).toFixed(0),
                    parseInt(this.utente.f5.split(',')[2]).toFixed(0),
                    parseInt(this.utente.f6.split(',')[2]).toFixed(0),
                    parseInt(this.utente.f7.split(',')[2]).toFixed(0),
                    parseInt(this.utente.f8.split(',')[2]).toFixed(0),
                    parseInt(this.utente.f9.split(',')[2]).toFixed(0),
                    parseInt(this.utente.f10.split(',')[2]).toFixed(0),
                    parseInt(this.utente.f11.split(',')[2]).toFixed(0),

                ]

                chart.updateOptions({
                    yaxis: {
                        title: {
                            text: 'Tempo (min)'
                        },
                        labels: {
                            style: {
                                color: '#9aa0ac',
                            }
                        }
                    },

                    tooltip: {
                        y: {
                            formatter: function(val) {
                                return +val + " min"
                            }
                        }
                    }
                })
                chart.updateSeries([{
                    data: t
                }])

            } else if (option == 2 && !this.start && !this.end) {

                let f1 = Number(parseFloat(this.utente.f.split(',')[0]).toFixed(0))


                let d = [
                    Number(parseFloat(this.utente.f.split(',')[0]).toFixed(0)),
                    Number(parseFloat(this.utente.f.split(',')[1]).toFixed(0)),
                    Number(parseFloat(this.utente.f.split(',')[2]).toFixed(0)),
                    Number(parseFloat(this.utente.f.split(',')[3]).toFixed(0)),
                    Number(parseFloat(this.utente.f.split(',')[4]).toFixed(0)),
                    Number(parseFloat(this.utente.f.split(',')[5]).toFixed(0)),
                    Number(parseFloat(this.utente.f.split(',')[6]).toFixed(0)),
                    Number(parseFloat(this.utente.f.split(',')[7]).toFixed(0)),
                    Number(parseFloat(this.utente.f.split(',')[8]).toFixed(0)),
                    Number(parseFloat(this.utente.f.split(',')[9]).toFixed(0)),
                    Number(parseFloat(this.utente.f.split(',')[10]).toFixed(0)),
                ]

                chart.updateOptions({
                    yaxis: {
                        title: {
                            text: 'Taxa de acerto (%)'
                        },
                        labels: {
                            style: {
                                color: '#9aa0ac',
                            }
                        }
                    },

                    tooltip: {
                        y: {
                            formatter: function(val) {
                                return +val + " %"
                            }
                        }
                    }
                })
                chart.updateSeries([{
                    data: d
                }])

            } else if (this.start && this.end) {


                let data1 = Date.parse(this.start)
                let data2 = Date.parse(this.end)


                if (data1 > data2) {
                    swal('Intervalo de Tempo Inv??lido', 'A data de ??nicio ?? maior que a data do fim!', 'warning');
                } else {
                    axios
                        .get(`/web/instituicao/relatorio/${this.start}/${this.end}/${this.utente.id}`, {
                            headers: {
                                Authorization: jwt
                            }
                        })
                        .then(({
                            data
                        }) => {


                            app.utente_d = []
                            app.utente_t = []
                            data.data.map(teste => {


                                let d = teste.q > 0 ? (teste.d / teste.q) : 0

                                app.utente_d.push(d.toFixed(2))
                                app.utente_t.push(teste.t)

                            })



                            if (option == 2) {

                                chart.updateOptions({
                                    yaxis: {
                                        title: {
                                            text: 'Taxa de acerto (%)'
                                        },
                                        labels: {
                                            style: {
                                                color: '#9aa0ac',
                                            }
                                        }
                                    },

                                    tooltip: {
                                        y: {
                                            formatter: function(val) {
                                                return +val + " %"
                                            }
                                        }
                                    }
                                })
                                chart.updateSeries([{
                                    data: app.utente_d
                                }])
                            } else if (option == 1) {

                                chart.updateOptions({
                                    yaxis: {
                                        title: {
                                            text: 'Tempo (min)'
                                        },
                                        labels: {
                                            style: {
                                                color: '#9aa0ac',
                                            }
                                        }
                                    },

                                    tooltip: {
                                        y: {
                                            formatter: function(val) {
                                                return +val + " min"
                                            }
                                        }
                                    }
                                })
                                chart.updateSeries([{
                                    data: app.utente_t
                                }])
                            }
                        })
                        .catch(error => {
                            console.log('An  error occurred:', error.response);
                        });
                }








            }

        },

        selet(event, utente, index, length) {

            this.index = index

            console.log(utente)
            let a = document.getElementsByClassName(`utente`)

            /*a.map(u => {

                console.log(u)
            })

            */






            for (let index2 = 0; index2 < a.length; index2++) {


                if (a[index2].id == `utente${index}`) {
                    console.log("fff")
                    document.getElementById(a[index2].id).classList.add("select_utente")
                } else {
                    document.getElementById(a[index2].id).classList.remove("select_utente")
                }
                //  console.log(a[index2].id, a.length, `utente${index}`)

            }

            this.utente = utente


            console.log(utente.f.split(':')[1].split(',')[0])

            ///calcular os tempo global feitos  this.utente.f1.split(',')[3]+ .....+  this.utente.f11.split(',')[3]

            this.utente.f_tempo = utente.f.split(':')[1].split(',')[1]

            ///calcular os teste global feitos  this.utente.f1.split(',')[1]+ .....+  this.utente.f11.split(',')[1]
            this.utente.f_testes = parseInt(this.utente.f1.split(',')[1]) +
                parseInt(this.utente.f2.split(',')[0]) +
                parseInt(this.utente.f3.split(',')[0]) +
                parseInt(this.utente.f4.split(',')[0]) +
                parseInt(this.utente.f5.split(',')[0]) +
                parseInt(this.utente.f6.split(',')[0]) +
                parseInt(this.utente.f7.split(',')[0]) +
                parseInt(this.utente.f8.split(',')[0]) +
                parseInt(this.utente.f9.split(',')[0]) +
                parseInt(this.utente.f10.split(',')[0]) +
                parseInt(this.utente.f11.split(',')[0])







            let t = [
                parseInt(this.utente.f1.split(',')[2]),
                parseInt(this.utente.f2.split(',')[2]),
                parseInt(this.utente.f3.split(',')[2]),
                parseInt(this.utente.f4.split(',')[2]),
                parseInt(this.utente.f5.split(',')[2]),
                parseInt(this.utente.f6.split(',')[2]),
                parseInt(this.utente.f7.split(',')[2]),
                parseInt(this.utente.f8.split(',')[2]),
                parseInt(this.utente.f9.split(',')[2]),
                parseInt(this.utente.f10.split(',')[2]),
                parseInt(this.utente.f11.split(',')[2]),
            ]
            console.log(t, "tempo")



            chart.updateSeries([{
                data: t
            }])

        },
    },
}).mount('#app');








console.log(id_instituicao);
let table = $('#utentes').DataTable({
    lengthMenu: [10, 20, 30, 50],
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
