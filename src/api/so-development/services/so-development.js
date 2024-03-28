'use strict';

/**
 * so-development service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::so-development.so-development');
