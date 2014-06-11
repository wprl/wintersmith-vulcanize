// ## Dependencies
var vulcanize = require('vulcanize');
var deco = require('deco');
// ## Module Definition 
var plugin = module.exports = function (env, callback) {
  var defaults = {
    excludes: {
      imports: []
    }
  };
  var options = deco.merge(defaults, env.config.vulcanize);
  // ## Vulcanize plugin definition
  var VulcanizePlugin = deco(function (filepath) {
    this.filepath = filepath;
    var fileDefaults = {
      input: filepath.full,
      outputDir: '/'
    };
    var fileOptions = deco.merge(fileDefaults, options)
    this.vulcanized = vulcanize.processDocument(fileOptions);
  });

  VulcanizePlugin.inherit(env.ContentPlugin);
  // ### Public Static Methods
  VulcanizePlugin.fromFile = function (filepath, callback) {
    return callback(null, new VulcanizePlugin(filepath));
  };
  // ### Public Instance Methods
  VulcanizePlugin.prototype.getFilename = function () {
    return this.filepath.relative;
  };

  VulcanizePlugin.prototype.getView = function () {
    return function (env, locals, contents, templates, callback) {
      callback(null, new Buffer(this.vulcanized));
    };
  };

  env.registerContentPlugin('vulcanize', '**/*.*html', VulcanizePlugin);

  callback();
};
