const auth = require('./auth/api')
const instituicao = require('./instituicao/api')



const routes = [...auth, ...instituicao, {
    method: 'GET',
    path: '/',
    handler: 'myController.index',
    config: {
        policies: [],
    },
}]


module.exports = routes;
