import Ember from 'ember';
import { storageFor } from 'ember-local-storage';
import storage from '../storages/auth'
import Docs from '../storages/docs'

export default Ember.Component.extend({
  docs: storageFor('docs'),
  actions: {
    edit(doc) {
      console.log('inside edit component')
      this.get('docs').set('currentDoc', doc)
      console.log(this.get('docs.currentDoc.title'))
    }
  }
});
