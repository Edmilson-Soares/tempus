'use strict';
//delete
module.exports = ({ strapi }) => ({
    tempus: async(id) => {
        return await strapi.query('plugin::users-permissions.user').findOne({
            select: ['username', 'email', 'nome', 'descricao', 'morada', 'contacto'],
            where: {
                id
            },
            populate: {
                'foto': {
                    select: ['url']
                },
                'instituicao': {

                    select: ['nome'],
                    populate: {
                        logo: {
                            select: ['url']
                        },
                        ferramentas: {
                            select: ['nome', 'descricao'],

                        },
                        utentes: {
                            select: ['*'],
                            where: {
                                arquivar: false
                            }

                        }
                    }
                }
            }


        });
    },

    tempustecnicos: async(id) => {
        return await strapi.query('plugin::users-permissions.user').findOne({
            select: ['username', 'email', 'nome', 'descricao', 'morada'],
            where: {
                id
            },
            populate: {
                'foto': {
                    select: ['url']
                },
                'instituicao': {
                    select: ['nome'],
                    populate: {
                        logo: {
                            select: ['url']
                        },
                        users: {
                            where: {
                                role: {
                                    id: 2
                                }
                            },
                            populate: {
                                'foto': {
                                    select: ['url']
                                }
                            }

                        }

                    }
                }
            }


        });
    },


    tempusperfil: async(id) => {
        return await strapi.query('plugin::users-permissions.user').findOne({
            select: ['username', 'email', 'nome', 'contacto', 'morada', 'genero', 'data'],
            where: {
                id
            },
            populate: {
                'foto': {
                    select: ['url']
                },
                'instituicao': {
                    select: ['nome', 'descricao'],
                    populate: {
                        logo: {
                            select: ['url']
                        },
                        users: {
                            select: ['id'],
                            where: {
                                role: {
                                    id: 2
                                }
                            }
                        },
                        ferramentas: {
                            select: ['nome', 'descricao'],
                        },
                        utentes: {
                            select: ['nome'],

                        }
                    }
                }
            }


        });
    },

    tempusalertas: async(id) => {
        return await strapi.query('plugin::users-permissions.user').findOne({
            select: ['username', 'email', 'nome', 'descricao', 'morada', 'contacto'],
            where: {
                id
            },
            populate: {
                'foto': {
                    select: ['url']
                },
                'instituicao': {
                    select: ['nome'],
                    populate: {
                        logo: {
                            select: ['url']
                        },
                        alertas: {

                            start: 0,
                            limit: 1,

                            orderBy: { createdAt: 'desc' },
                            populate: {
                                testes: {
                                    populate: {
                                        utente: {
                                            select: ['id']
                                        }
                                    }
                                },
                                utentes: {
                                    where: {
                                        arquivar: false
                                    },
                                    populate: {
                                        img: {
                                            select: ['url', 'id']
                                        }
                                    }
                                }
                            }
                        }

                    }
                }
            }


        });
    },

    tempusmonitorizacao: async(id) => {
        return await strapi.query('plugin::users-permissions.user').findOne({
            select: ['username', 'email', 'nome', 'descricao', 'morada', 'contacto'],
            where: {
                id
            },
            populate: {
                'foto': {
                    select: ['url']
                },
                'instituicao': {
                    select: ['nome', 'id'],
                    populate: {
                        logo: {
                            select: ['url']
                        },
                        ferramentas: {
                            select: ['id', 'nome', 'descricao'],

                        },
                        utentes: {
                            select: ['nome', 'id', 'rfid'],

                            populate: {
                                img: {
                                    select: ['url']
                                }
                            }


                        }
                    }
                }
            }


        });

    },

    tempusrelatorios: async(id) => {
        var dayjs = require('dayjs')

        let dia = dayjs().$D
        let semana = dayjs().day()

        let dia_start = dayjs().date(dia - semana)

        return await strapi.query('plugin::users-permissions.user').findOne({
            select: ['username', 'email', 'nome', 'descricao', 'morada', 'contacto'],
            where: {
                id
            },
            populate: {
                'foto': {
                    select: ['url']
                },
                'instituicao': {
                    select: ['nome'],
                    populate: {
                        logo: {
                            select: ['url']
                        },
                        utentes: {
                            select: ['*'],
                            where: {
                                arquivar: false
                            },
                            populate: {
                                img: {
                                    select: ['url']
                                },
                                testes: {
                                    select: ['*'],
                                    where: {
                                        createdAt: {
                                            $between: [dia_start.$d, dayjs().date(dia_start.$D + 6).$d],
                                        }
                                    }
                                }
                            }

                        }
                    }
                }
            }


        });
    },

    tempusutentes: async(id) => {
        return await strapi.query('plugin::users-permissions.user').findOne({
            select: ['username', 'email', 'nome', 'descricao', 'morada', 'contacto'],
            where: {
                id
            },
            populate: {
                'foto': {
                    select: ['url']
                },
                'instituicao': {
                    select: ['nome'],
                    populate: {
                        logo: {
                            select: ['url']
                        },

                        utentes: {
                            select: ['*'],
                            populate: {
                                img: {
                                    select: ['url', 'id']
                                }
                            },
                            where: {
                                arquivar: false
                            }

                        }
                    }
                }
            }


        });
    },

    tempusutente: async(id = 1, utente) => {
        return await strapi.query('plugin::users-permissions.user').findOne({
            select: ['username', 'email', 'nome', 'descricao', 'morada', 'contacto'],
            where: {
                id
            },
            populate: {
                'foto': {
                    select: ['url']
                },
                'instituicao': {
                    select: ['nome'],
                    populate: {
                        logo: {
                            select: ['url']
                        },
                        utentes: {
                            select: ['*'],
                            where: {
                                id: utente,
                                arquivar: false
                            },

                            populate: {
                                img: {
                                    select: ['url']
                                },
                                observacaos: {
                                    select: ['*'],
                                    orderBy: { createdAt: 'desc' },
                                },
                                alerta: {
                                    start: 0,
                                    limit: 1,

                                    orderBy: { createdAt: 'desc' },
                                    populate: {
                                        testes: {
                                            where: {
                                                utente: {
                                                    id: utente
                                                }

                                            },

                                            select: ['*'],



                                        },
                                    }
                                }
                            }

                        }
                    }
                }
            }


        });
    },

    tempusarquivar: async(id) => {
        return await strapi.query('plugin::users-permissions.user').findOne({
            select: ['username', 'email', 'nome', 'descricao', 'morada', 'contacto'],
            where: {
                id
            },
            populate: {
                'foto': {
                    select: ['url']
                },
                'instituicao': {
                    select: ['nome'],
                    populate: {
                        logo: {
                            select: ['url']
                        },
                        utentes: {
                            select: ['*'],

                            populate: {
                                img: {
                                    select: ['url']
                                }
                            },

                            where: {
                                arquivar: true
                            }

                        }
                    }
                }
            }


        });
    },
    get_inst: async(id) => {
        return await strapi.query('plugin::users-permissions.user').findOne({
            select: ['username', 'id'],
            where: {
                id
            },
            populate: {
                'foto': {
                    select: ['url']
                },
                'instituicao': {
                    select: ['nome', 'id'],

                }
            }


        });

    },



});
