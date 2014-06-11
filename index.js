// ## Dependencies
var vulcanize = require('vulcanize');
var deco = require('deco');
// ## Module Definition 
var plugin = module.exports = function (env, callback) {
  var defaults = {};
  var options = deco.merge(defaults, env.config.vulcanize);
  var VulcanizePlugin = deco(function (filepath) {
    var fileDefaults = {
      input: filepath,
      outputDir: '/'
    };
    var fileOptions = deco.merge(fileDefaults, options)
    this.vulcanized = vulcanize.processDocument(fileOptions);
  });

  VulcanizePlugin.inherit(env.ContentPlugin);

  VulcanizePlugin.prototype.getFilename = function() {
    return this.filepath.relative;
  };

  VulcanizePlugin.prototype.getView = function() {
    return function (env, locals, contents, templates, callback) {
      callback(null, this.vulcanized);
    };
  };

  VulcanizePlugin.prototype.fromFile = function (filepath, callback) {
    return callback(null, new VulcanizePlugin(filepath));
  };

  env.registerContentPlugin('vulcanize', '**/*.html', VulcanizePlugin);

  return VulcanizePlugin;
};
