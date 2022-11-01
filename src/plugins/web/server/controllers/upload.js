'use strict';

/**
 * A set of functions called "actions" for `xicola`
 *
 */

const _ = require('lodash');
const utils = require('@strapi/utils');
const { getService } = require('./../upload/utils');
const validateSettings = require('./../upload/validation/settings');
const validateUploadBody = require('./../upload/validation/upload');
const { auth } = require("../policies");


const excelToJson = require('convert-excel-to-json');

const { sanitize } = utils;
const { ValidationError } = utils.errors;

const sanitizeOutput = (data, ctx) => {
    const schema = strapi.getModel('plugin::upload.file');
    const { auth } = ctx.state;

    return sanitize.contentAPI.output(data, schema, { auth });
};

function* alunos(alunos) {

    for (let index = 0; index < alunos.length; index++) {
        yield alunos[index];

    }


}

function* disciplinas(disciplinas) {

    for (let index = 0; index < disciplinas.length; index++) {
        yield disciplinas[index];

    }


}



module.exports = {


    async uploadFiles(ctx) {


        const {
            request: { body, files: { files } = {} },
        } = ctx;

        const uploadedFiles = await getService('upload').upload({
            data: await validateUploadBody(body),
            files,
        });
        let file = await sanitizeOutput(uploadedFiles, ctx);

        ctx.body = { file }
    },

    async upload(ctx) {

        const {
            query: { id },
            request: { files: { files } = {} },
        } = ctx;

        if (id && (_.isEmpty(files) || files.size === 0)) {
            return this.updateFileInfo(ctx);
        }

        if (_.isEmpty(files) || files.size === 0) {
            throw new ValidationError('Files are empty');
        }


        await this.uploadFiles(ctx);


    },
    async uploadFilesExcel(ctx) {

        const {
            request: { body, files: { files } = {} },
        } = ctx;

        const uploadedFiles = await getService('upload').upload({
            data: await validateUploadBody(body),
            files,
        });
        let file = await sanitizeOutput(uploadedFiles, ctx);



        const url = 'http://localhost:1337' + file[0].url;

        //  const download = require('download');

        var http = require('http');
        var fs = require('fs');

        var download = function(url, dest, cb) {
            var file = fs.createWriteStream(dest);
            var request = http.get(url, function(response) {
                response.pipe(file);
                file.on('finish', function() {
                    file.close(cb); // close() is async, call cb after close completes.
                });
            }).on('error', function(err) { // Handle errors
                fs.unlink(dest); // Delete the file async. (But we don't check the result)
                if (cb) cb(err.message);
            });
        };

        // Path at which image will get downloaded

        const filePath = `dados_excel.xlsx`;

        download(url, filePath, async() => {
            console.log('Download Completed');

            try {

                await strapi.plugin('app').service('ferramenta').get_file(ctx.request.user, { url: filePath });

                await getService('upload').remove(file[0]);






            } catch (error) {


                console.log(error, 'ddd')



            }




        })


        ctx.body = { file }


    },

    async uploadExcel(ctx) {


        try {
            const { data } = await strapi.plugin('web').service('auth').jwt(ctx.request.header.authorization);

            /*  if (data.role != 'cliente' || data.role != 'tecnico') {
                  ctx.assert.equal('object', typeof ctx.body, 403, { message: 'Não autorizado' })
              }

              */
            ctx.request.user = data
            const {
                query: { id },
                request: { files: { files } = {} },
            } = ctx;

            if (id && (_.isEmpty(files) || files.size === 0)) {
                return this.updateFileInfo(ctx);
            }

            if (_.isEmpty(files) || files.size === 0) {
                throw new ValidationError('Files are empty');
            }
            await this.uploadFilesExcel(ctx);
        } catch (error) {
            return ctx.body = { file: null }
        }




    },
    async upload_update_utente(ctx) {


        const {
            request: { body, files: { files } = {} },
        } = ctx;

        const uploadedFiles = await getService('upload').upload({
            data: await validateUploadBody(body),
            files,
        });
        let file = await sanitizeOutput(uploadedFiles, ctx);


        ctx.request.body.data.img = [file[0].id]



        const body3 = await strapi.plugin('app').service('instituicao').update_utente(ctx.request.body.user, ctx.request.body.data, ctx.params.id)

        return { file: file[0], img: body3 }
    },

    async update_utente(ctx) {

        try {

            let jwt = ctx.cookies.get(`${process.env.COOKIES_NAME}:jwt`)
            const { data } = await strapi.plugin('web').service('auth').jwt(jwt);
            if (data.role != 'cliente') {
                ctx.assert.equal('object', typeof ctx.body, 403, { message: 'Não autorizado' })
            }

            ctx.request.body.user = data
            ctx.request.body.data = JSON.parse(ctx.request.body.data)

            const {
                query: { id },
                request: { files: { files } = {} },
            } = ctx;

            if (id && (_.isEmpty(files) || files.size === 0)) {
                return this.updateFileInfo(ctx);
            }

            if (_.isEmpty(files) || files.size === 0) {


                console.log('dd---a')


                await strapi.plugin('app').service('instituicao').update_utente(data, ctx.request.body.data, ctx.params.id)
                ctx.body = null

            }


            ctx.body = await this.upload_update_utente(ctx);




        } catch (error) {
            ctx.assert.equal('object', typeof ctx.body, 400, error)
        }




    },
    async uploadFilesCreateTecnico(ctx) {
        const {
            request: { body, files: { files } = {} },
        } = ctx;

        const uploadedFiles = await getService('upload').upload({
            data: await validateUploadBody(body),
            files,
        });
        let file = await sanitizeOutput(uploadedFiles, ctx);
        ctx.request.body.data.foto = file[0].id
        const tecnico = await strapi.plugin('web').service('auth').create_tecnico(ctx.request.body.data, data, ctx.request.header.referer.split('/instituicao')[0]);
        return { tecnico, file: file[0] }
    },

    async create_tecnico(ctx) {

        try {

            let jwt = ctx.cookies.get(`${process.env.COOKIES_NAME}:jwt`)
            const { data } = await strapi.plugin('web').service('auth').jwt(jwt);

            if (data.role != 'cliente') {
                ctx.assert.equal('object', typeof ctx.body, 403, { message: 'Não autorizado' })
            }

            ctx.request.body.user = data
            ctx.request.body.data = JSON.parse(ctx.request.body.data)



            const {
                query: { id },
                request: { files: { files } = {} },
            } = ctx;

            if (id && (_.isEmpty(files) || files.size === 0)) {
                return this.updateFileInfo(ctx);
            }

            if (_.isEmpty(files) || files.size === 0) {

                // ctx.request.header.referer.split('/instituicao')[0]
                console.log('dd---a', ctx.request.header.referer.split('/instituicao')[0])
                const tecnico = await strapi.plugin('web').service('auth').create_tecnico(ctx.request.body.data, data, ctx.request.header.referer.split('/instituicao')[0]);
                return ctx.body = { tecnico, file: null }
            }


            ctx.body = await this.uploadFilesCreateTecnico(ctx);

        } catch (error) {
            ctx.assert.equal('object', typeof ctx.body, 400, error)
        }





    },
    async uploadFilesUpdateTecnico(ctx) {


        const {
            request: { body, files: { files } = {} },
        } = ctx;

        const uploadedFiles = await getService('upload').upload({
            data: await validateUploadBody(body),
            files,
        });
        let file = await sanitizeOutput(uploadedFiles, ctx);

        ctx.body = { file }
    },
    async update_tecnico(ctx) {

        try {

            let jwt = ctx.cookies.get(`${process.env.COOKIES_NAME}:jwt`)
            const { data } = await strapi.plugin('web').service('auth').jwt(jwt);


            ctx.request.body.user = data
            ctx.request.body.data = JSON.parse(ctx.request.body.data)



            const {
                query: { id },
                request: { files: { files } = {} },
            } = ctx;

            if (id && (_.isEmpty(files) || files.size === 0)) {
                return this.updateFileInfo(ctx);
            }

            if (_.isEmpty(files) || files.size === 0) {


                console.log('dd---a')
                await strapi.plugin('app').service('instituicao').update_user(data, ctx.request.body.data, ctx.params.id)
                return ctx.body = { file: null }
                    // ctx.body = await strapi.plugin('web').service('auth').create_tecnico(ctx.request.body.data, data);

            }


            ctx.body = await this.uploadFilesUpdateTecnico(ctx);

        } catch (error) {
            ctx.assert.equal('object', typeof ctx.body, 400, error)
        }





    },
    async uploadFilesInstituicao(ctx) {


        const {
            request: { body, files: { files } = {} },
        } = ctx;

        const uploadedFiles = await getService('upload').upload({
            data: await validateUploadBody(body),
            files,
        });
        let file = await sanitizeOutput(uploadedFiles, ctx);

        ctx.body = { file }
    },

    async uploadInstituicao(ctx) {

        try {

            let jwt = ctx.cookies.get(`${process.env.COOKIES_NAME}:jwt`)
            const { data } = await strapi.plugin('web').service('auth').jwt(jwt);

            if (data.role != 'cliente') {
                ctx.assert.equal('object', typeof ctx.body, 403, { message: 'Não autorizado' })
            }

            ctx.request.body.user = data
            ctx.request.body.data = JSON.parse(ctx.request.body.data)

            console.log(ctx.request.body.user, ctx.request.body.data)

            const {
                query: { id },
                request: { files: { files } = {} },
            } = ctx;

            if (id && (_.isEmpty(files) || files.size === 0)) {
                return this.updateFileInfo(ctx);
            }

            if (_.isEmpty(files) || files.size === 0) {

                await strapi.plugin('app').service('instituicao').update_instituicao(data, ctx.request.body.data)
                return ctx.body = {}


            }


            ctx.body = await this.uploadFilesInstituicao(ctx);;

        } catch (error) {
            ctx.assert.equal('object', typeof ctx.body, 400, error)
        }




    },

};
