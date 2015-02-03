'use strict';
/**
 * Common serenity storage module
 * This module handles file upload and download functionality for serenity lc1-challenge-service
 *
 * @author      spanhawk
 * @version     1.0.0
 *
 * * The module exports two methods
 * 1. getDownloadUrl
 * 2. getUploadUrl
 *
 * Each method has two arguments one file model and other is callback function to call after processing.
 *
 * File model must have a string property that should equal any one of storage provider supported by this module.
 *
 * Currently supported providers
 * 1. local (for local disk storage)
 * 2. s3 (for amazon s3 storage)
 *
 * Each of the provider has to be initialized based on the configuration
 *
 * Standard configuration for this module
 * aws: {
 *   accessKeyId:       <REQUIRED> <STRING> 'aws s3 access id',
 *   secretAccessKey:   <REQUIRED> <STRING> 'aws s3 secret key',
 *   bucket:            <REQUIRED> <STRING> 'aws s3 bucket name',
 *   region:            <REQUIRED> <STRING> 'aws s3 bucket region'
 * }
 *
 * For a list of all regions visit aws s3 website
 */

var helper = require('./helper');

function loadProvider(providerName) {
  providerName = providerName.toLowerCase();
  return require('./providers/' + providerName);
}
module.exports = function(config) {
  // if invalid configuration error will be thrown.
  // Application should handler error condition
  helper.checkConfiguration(config);
  return {
    /**
     * Create a download URL based upon the provider
     *
     * @param     file    The File model
     * @param     cb      Callback (err, url)
     */
    getDownloadUrl: function(file, cb) {
      // Get storage provider
      var provider = loadProvider(file.storageLocation);
      provider.getDownloadURL(file.fileUrl, cb);
    },

    getUploadUrl: function(file, cb) {
      var provider = loadProvider(file.storageLocation);
      provider.getUploadURL(file.fileUrl, cb);
    }
  };
};