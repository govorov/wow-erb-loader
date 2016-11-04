var exec = require('child_process').exec;
var path = require('path');
var uuid = require('node-uuid');
var qs   = require('querystring');

module.exports = function(source, map) {

  var callback = this.async();
  var query    = qs.parse(this.query.substring(1) || '');
  var rails    = query.rails || './bin/rails';

  var ioDelimiter = uuid.v4();
  var child = exec(
    rails + ' runner ' + path.join(__dirname, 'erb_transformer.rb') + ' ' + ioDelimiter,
    function(error, stdout) {
      var sourceRegex = new RegExp(ioDelimiter + '([\\s\\S]+)' + ioDelimiter);
      var matches     = stdout.match(sourceRegex);
      var transformedSource = matches && matches[1];
      callback(error, transformedSource, map);
    }
  );

  child.stdin.write(source);
  child.stdin.end();
}
