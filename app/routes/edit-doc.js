import Ember from 'ember';
import { storageFor } from 'ember-local-storage';
import storage from '../storages/auth'
import Docs from '../storages/docs'

export default Ember.Route.extend({
  docs: storageFor('docs'),

  activate: function(params) {
    console.log('inside edit route')
    console.log(this.get('docs.currentDoc.title'))
    const docTitle = this.get('docs.currentDoc.title')
    const docText = this.get('docs.currentDoc.text')
    console.log(docTitle)
    $('.editedTitle').val(docTitle)
    $('textarea').val(docText)
  }
});
