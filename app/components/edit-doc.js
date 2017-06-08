import Ember from 'ember';
import { storageFor } from 'ember-local-storage';
import storage from '../storages/auth'
import Docs from '../storages/docs'

export default Ember.Component.extend({
  auth: Ember.inject.service(),

  user: Ember.computed.alias('auth.credentials.email'),
  isAuthenticated: Ember.computed.alias('auth.isAuthenticated'),
  docs: Ember.inject.service(),

  actions: {
    edit(doc) {
      console.log(doc.title)
    },
    mouseUp() {
      console.log('in mouse up')
      window.mySelection = $('.testTextArea').val().substring(this.selectionStart, this.selectionEnd);
      console.log(window.getSelection().toString());
    },
    saveDoc() {
      console.log($('.testTextArea').val());
      let input = $('.testTextArea').val()
      let title = $('.editedTitle').val()
      this.get('docs').saveDoc(input, title)
    },
    translate(doc) {
      let text = $('.testTextArea').val()
      let id = doc.id
      let language = 'it'
      this.get('docs').translate(id, text, language)
    }
  }
});
