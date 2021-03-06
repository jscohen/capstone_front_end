import Ember from 'ember';
import { storageFor } from 'ember-local-storage';
import storage from '../storages/auth'
import Docs from '../storages/docs'

export default Ember.Route.extend({
  docs: storageFor('docs'),

  activate: function(params) {
    const ourDoc = this.get('docs.currentDoc')
    const docTitle = this.get('docs.currentDoc.title')
    const docText = this.get('docs.currentDoc.text')
  }
});
