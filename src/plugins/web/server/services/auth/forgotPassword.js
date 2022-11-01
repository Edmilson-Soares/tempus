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
const { getService } = require('./utils');

const {
    validateCallbackBody,
    validateRegisterBody,
    validateSendEmailConfirmationBody,
} = require('./validation/auth');

const { sanitize } = utils;
const { ApplicationError, ValidationError } = utils.errors;

const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;






module.exports = ({ strapi }) => ({
    async exec({ email }, url_server) {


        // Check if the provided email is valid or not.
        const isEmail = emailRegExp.test(email);

        if (isEmail) {
            email = email.toLowerCase();
        } else {
            throw new ValidationError('Please provide a valid email address');
        }

        const pluginStore = await strapi.store({ type: 'plugin', name: 'users-permissions' });

        // Find the user by email.
        const user = await strapi
            .query('plugin::users-permissions.user')
            .findOne({
                where: { email: email.toLowerCase() },
                populate: {
                    role: {

                    },
                    instituicao: {

                    }
                }

            });

        // User not found.
        if (!user) {
            throw new ApplicationError('This email does not exist');
        }

        // User blocked
        if (user.blocked) {
            throw new ApplicationError('This user is disabled');
        }

        // Generate random token.
        const resetPasswordToken = crypto.randomBytes(64).toString('hex');

        const settings = await pluginStore.get({ key: 'email' }).then(storeEmail => {
            try {
                return storeEmail['reset_password'].options;
            } catch (error) {
                throw new ApplicationError(error.message)
            }
        });

        const advanced = await pluginStore.get({
            key: 'advanced',
        });


        let url = `${url_server}/auth/new_password?code=${resetPasswordToken}`;


        const options = {
            from: '"Tempus" <edmilsonsoares120@gmail.com>',
            to: user.email,
            subject: "Recuperação de Acesso",
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
                          ${user.instituicao.nome||"Tempus"}
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
              <a href="${url}">Redifinir uma nova senha de acesso </a>
              </div>

                  </div>
              </div>
                  </body>

                  </html>


                  `
        };

        await strapi.plugin('app').service('email').send(options)

        // Update the user.
        await strapi
            .query('plugin::users-permissions.user')
            .update({ where: { id: user.id }, data: { resetPasswordToken } });

        return { ok: true };
    },
});
