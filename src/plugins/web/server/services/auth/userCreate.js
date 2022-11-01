'use strict';



'use strict';

/**
 * Auth.js controller
 *
 * @description: A set of functions called "actions" for managing `Auth`.
 */

/* eslint-disable no-useless-escape */
const crypto = require('crypto');
const _ = require('lodash');
const utils = require('@strapi/utils');


const {
    validateCallbackBody,
    validateRegisterBody,
    validateSendEmailConfirmationBody,
} = require('./validation/auth');

const { sanitize } = utils;
const { ApplicationError, ValidationError } = utils.errors;

const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;



// getting a random RFC 4122 Version 4 UUID
// by using randomUUID() method



module.exports = ({ strapi }) => ({

    getService: name => {
        return strapi.plugin('users-permissions').service(name);
    },

    exec: async function(data, inst, url_server) {

        const pluginStore = await strapi.store({ type: 'plugin', name: 'users-permissions' });

        const settings = await pluginStore.get({
            key: 'advanced',
        });

        if (!settings.allow_register) {
            throw new ApplicationError('Register action is currently disabled');
        }

        const params = {
            password: crypto.randomUUID(),
            username: crypto.randomUUID(),
            ..._.omit(data, ['confirmed', 'confirmationToken', 'resetPasswordToken']),
            provider: 'local',
        };
        await validateRegisterBody(params);



        const role = await strapi
            .query('plugin::users-permissions.role')
            .findOne({ where: { type: settings.default_role } });

        if (!role) {
            throw new ApplicationError('Impossible to find the default role');
        }

        // Check if the provided email is valid or not.
        const isEmail = emailRegExp.test(params.email);

        if (isEmail) {
            params.email = params.email.toLowerCase();
        } else {
            throw new ValidationError('Please provide a valid email address');
        }

        params.role = 2;
        params.instituicao = inst.instituicao

        const user = await strapi.query('plugin::users-permissions.user').findOne({
            where: { email: params.email },
            populate: {
                role: {
                    select: ['id']
                }
            }
        });

        if (user && user.provider === params.provider) {
            throw new ApplicationError('Email is already taken');
        }

        if (user && user.provider !== params.provider && settings.unique_email) {
            throw new ApplicationError('Email is already taken');
        }

        try {
            if (!settings.email_confirmation) {
                params.confirmed = true;
            }
            const user = await strapi.plugin('users-permissions').service('user').add(params);

            try {


                const resetPasswordToken = crypto.randomBytes(64).toString('hex');

                let url = `${url_server}/auth/new_password?code=${resetPasswordToken}`;

                await strapi
                    .query('plugin::users-permissions.user')
                    .update({ where: { id: user.id }, data: { resetPasswordToken } });
                const options = {
                    from: '"Tempus" <edmilsonsoares120@gmail.com>',
                    to: user.email,
                    subject: "Criação da Conta no Tempus",
                    text: `

    `,
                    html: `
                            <!DOCTYPE html>
                            <html lang="pt">

                            <head>
                                <meta charset="UTF-8">
                                <meta content="width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no" name="viewport">
                                <title>Tempus</title>

                            </head>

                            <body>

                            <div class="card">
                            <div class="card-header">
                                <h4>Criação da Conta no Tempus</h4>
                            </div>
                            <div class="card-body">
                                <div class="form-group">
                                    <label for="inputPassword5">Nome da Instituição:</label>
                                    <small id="passwordHelpBlock" class="form-text text-muted">
                                    ${data.instituicao_name||"Tempus"}
                                    </small>
                                </div>
                                <div class="form-group">
                                <label for="inputPassword5">Acesso a plaforma:</label>
                                <small id="passwordHelpBlock" class="form-text text-muted">
                                Tecníco
                                </small>
                            </div>

                            <div class="form-group">
                            <label for="inputPassword5">Nome:</label>
                            <small id="passwordHelpBlock" class="form-text text-muted">
                            ${user.nome}
                            </small>
                        </div>

                        <div class="form-group">
                        <label for="inputPassword5">Username:</label>
                        <small id="passwordHelpBlock" class="form-text text-muted">
                                            ${user.username}
                              </small>
                          </div>

                            <div class="form-group">
                        <a href="${url}">Criar uma senha de acesso </a>
                        </div>

                            </div>
                        </div>
                            </body>

                            </html>


                            `
                };

                await strapi.plugin('app').service('email').send(options)

            } catch (error) {

                console.log(error.message)

            }



            return user


        } catch (err) {
            if (_.includes(err.message, 'username')) {
                throw new ApplicationError('Username already taken');
            } else if (_.includes(err.message, 'email')) {
                throw new ApplicationError('Email already taken');
            } else {
                strapi.log.error(err);
                throw new ApplicationError('An error occurred during account creation');
            }
        }
    },
});
