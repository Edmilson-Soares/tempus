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
    async exec(body, params_) {
        const params = _.assign({}, body, params_);


        console.log(params, 'ddd')

        if (
            params.password &&
            params.confirmnewpassword &&
            params.newpassword &&
            params.newpassword === params.confirmnewpassword
        ) {
            const user = await strapi
                .query('plugin::users-permissions.user')
                .findOne({
                    where: { id: params.id },
                    populate: {
                        role: {
                            select: ['name']
                        }
                    }

                });

            if (!user) {
                throw new ValidationError('Incorrect provided');
            }


            console.log(user)

            const validPassword = await getService('user').validatePassword(
                params.password,
                user.password
            );


            if (!validPassword) {
                throw new ValidationError('Incorrect provided');
            }



            await getService('user').edit(user.id, { resetPasswordToken: null, password: params.newpassword });

            return {

            };
        } else if (
            params.password &&
            params.confirmnewpassword &&
            params.newpassword &&
            params.newpassword !== params.confirmnewpassword
        ) {
            throw new ValidationError('Passwords do not match');
        } else {
            throw new ValidationError('Incorrect params provided');
        }
    }
});
