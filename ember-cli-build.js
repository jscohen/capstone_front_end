/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    sassOptions: {
      includePaths: [
        'bower_components/bootstrap-sass/assets/stylesheets'
      ]
    }
  });

  // import the main file
  app.import('bower_components/tinymce/tinymce.min.js', {destDir: 'assets/tinymce'});

  // import the jquery integration file
  app.import('bower_components/tinymce/jquery.tinymce.min.js', {destDir: 'assets/tinymce'});

  // import all the assets (technically you could be more precise in picking just the plugins and themes that you require, but for brevity's sake this will work)
  var tinymceAssets = pickFiles('bower_components/tinymce/', {
    srcDir: '/',
    files: ['**/*.min.js', '**/*.min.css', '**/*.woff', '**/*.ttf'],
    destDir: '/tinymce'
  });

  app.import('bower_components/bootstrap-sass/assets/javascripts/bootstrap.js');

  return app.toTree([tinymceAssets]);
};
