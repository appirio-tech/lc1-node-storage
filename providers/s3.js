'use strict';

/**
 * Amazon s3 storage provider
 *
 * @author      spanhawk
 * @version     0.0.1
 */
var helper = require('../helper'),
  config = helper.getConfig();

var aws = require('aws-sdk');

function getAWSUrl(operation, fileUrl, cb) {
  aws.config.update({
    accessKeyId: config.get('aws.key'),
    secretAccessKey: config.get('aws.secret'),
    region: config.get('aws.region')
  });

  var s3 = new aws.S3();

  var s3Params = {
    Bucket: config.get('aws.bucket'),
    Key: fileUrl
  };

  s3.getSignedUrl(operation, s3Params, cb);
}

/**
 * Module exports
 */
module.exports = {
  getDownloadURL: function(fileUrl, cb) {
    getAWSUrl('getObject', fileUrl, cb);
  },

  getUploadURL: function(fileUrl, cb) {
    getAWSUrl('putObject', fileUrl, cb);
  }
};
