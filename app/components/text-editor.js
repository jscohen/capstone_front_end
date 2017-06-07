// app/components/text-editor.js

import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['text-editor'],

  _options: {
    skin_url: '/tinymce/skins/lightgray',
    theme_url: '/tinymce/themes/modern/theme.min.js',
    external_plugins: {
      image: '/tinymce/plugins/image/plugin.min.js',
      link: '/tinymce/plugins/link/plugin.min.js',
      table: '/tinymce/plugins/table/plugin.min.js'
    },
    menubar: false,
    toolbar1: 'bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link table image'
  },

  didInsertElement: function() {
    var component = this;
    var options = this.get('_options')

    Ember.merge(options, {
      setup: function(editor) {
        // bind change event
        editor.on('change', function() {
          component.set('value',
             editor.getContent());
        });
      }
    });

    this.$('textarea').tinymce(options);
  }.on('didInsertElement'),
});
