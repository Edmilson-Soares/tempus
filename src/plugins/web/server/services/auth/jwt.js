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
    async exec(authorization) {

        let ctx = {
            request: {
                header: {
                    authorization
                }
            }
        }


        if (ctx.request && ctx.request.header && ctx.request.header.authorization) {
            try {
                const { id, role, instituicao, instituicao_name, isAdmin = false } = await strapi.plugins[
                    'users-permissions'
                ].services.jwt.getToken(ctx);

                return {
                    data: {
                        id,
                        role,
                        instituicao_name,
                        instituicao
                    }
                }

            } catch (error) {
                throw new ValidationError('Incorrect jwt');
            }

        } else {
            throw new ValidationError('Incorrect jwt');
        }


    },
    async issue(data) {

        return await getService('jwt').issue(data)

    }
});
