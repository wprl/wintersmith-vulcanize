// ## Dependencies
var vulcanize = require('vulcanize');
var deco = require('deco');
var fs = require('fs');
// ## Module Definition 
var plugin = module.exports = function (env, callback) {
  var defaults = {};
  var options = deco.merge(defaults, env.config.vulcanize);  
  var VulcanizePlugin = deco().inherit(ContentPlugin);

  VulcanizePlugin.prototype.getView = function() {
    return function (env, locals, contents, templates, callback) {
      vulcanize.setOptions(options);
      callback(null, vulcanize.processDocument());
    };
  };

  return VulcanizePlugin;
};

env.registerContentPlugin('scripts', '**/*.html', VulcanizePlugin);
