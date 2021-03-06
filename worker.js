'use strict';

var os = require('os');
var path = require('path');
var JSONStream = require('json-stream');
var build = require('./lib/build');

// Export.
module.exports = {
  // Initialize the plugin for a job
  //   config:     taken from DB config extended by flat file config
  //   job & repo: see strider-runner-core
  //   cb(err, initialized plugin)
  init: function (configuration, job, context, cb) {

    // Get the config (if any.)
    var config = configuration || {};

      // The options to pass to the callback.
    var options = {};

    // Add the build instructions here.
    options[config.buildPhase] = build(config);

    // Register the plugin and it's options.
    cb(null, options);
  },

  // If provided, autodetect is run if the project has *no* plugin
  // configuration at all.
  autodetect: {
    filename: 'Dockerfile',
    exists: true,
    language: 'docker',
    framework: null
  }
};
