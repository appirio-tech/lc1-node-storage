'use strict';
/**
 * Helper library
 *
 * @author      spanhawk
 * @version     0.0.1
 */

var _ = require('lodash');

var helper = {};

/**
 * This method validates the configuration object
 * @param {Object}    config      object to validate
 * 
 */
helper.checkConfiguration = function(config) {
  // some very strict configuration checking
  if(_.isUndefined(config) || _.isUndefined(config.aws)) {
    throw new Error('Invalid configuration');
  } else if(!_.isString(config.aws.accessKeyId) || !_.isString(config.aws.secretAccessKey) || !_.isString(config.aws.bucket) || !_.isString(config.aws.region)) {
    throw new Error('Invalid aws configuration');
  }
  this.config = config;
};

helper.getConfig = function() {
  return this.config;
};