const fs = require('fs');
const insertCss = require('insert-css');
const transform = require('feature/css')('transform');
const dot = require('dot');
const theme = dot.template(fs.readFileSync(__dirname + '/theme.css', 'utf8'));
const reFontOption = /^(\w)+Font$/;

/**
	# bespoke-theme-tweakable

	A simple [bespoke.js](https://github.com/markdalgleish/bespoke.js) theme
	that can be configured on the fly using client-side templating.

	## Example Usage

	To be completed.

**/
module.exports = function(opts) {
  const parsedOpts = parseFontOpts(opts);

  insertCss(theme(parsedOpts), { prepend: true });

  return function(deck) {
    var parent = deck.parent;

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

function parseFontOpts(opts) {
  let parsedOpts = {};

  Object.keys(opts || {}).forEach(function(key) {
    if (reFontOption.test(key)) {
      parsedOpts[`${key}Name`] = opts[key];
      parsedOpts[key] = opts[key].replace(' ', '+');
    }
  });

  return parsedOpts;
}
