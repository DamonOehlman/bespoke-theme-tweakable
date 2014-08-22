var fs = require('fs');
var insertCss = require('insert-css');
var transform = require('feature/css')('transform');
var dot = require('dot');
var theme = dot.template(fs.readFileSync(__dirname + '/theme.css', 'utf8'));

module.exports = function(opts) {
  var css = theme(opts);

  return function(deck) {
    var parent = deck.parent;

    insertCss(css, { prepend: true });
    require('bespoke-classes')()(deck);

    deck.on('activate', function(evt) {
      var valX = (evt.index * 100);

      if (transform) {
        transform(parent, 'translateX(-' + valX + '%) translateZ(0)');
      }
      else {
        parent.position = 'absolute';
        parent.left = '-' + valX + '%';
      }
    });
  };
};
