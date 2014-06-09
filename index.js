// ## Dependencies
var vulcanize = require('vulcanize');
var through = require('through');
var deco = require('deco');
// ## Private Module Members
function bufferIt () {
  var buffer = '';
  return through(
    function (chunk) { buffer += chunk },
    function () { 
      vulcanize.setOptions(options);
      var out = vulcanize.processDocument(buffer); // set in options TODO
      this.queue(out);
      this.queue(null);
    }
  );  
}
// ## Module Definition
var plugin = module.exports = function (file, options) {
  if (!html) return;
  options = deco.merge({}, options);
  vulcanize.setOptions(options);
  return bufferIt().pipe(vulcanizeIt());
}
