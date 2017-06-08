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
      const selected = $('#transDirection').find(":selected").text()
      const languages = selected.split(' to ')
      let text = $('.testTextArea').val()
      let id = doc.id
      const lang1 = languages[0].substring(0, 2)
      const lang2 = languages[1].substring(0, 2)
      const fromLanguage = lang1.toLowerCase()
      const toLanguage = lang2.toLowerCase()
      console.log(languages)
      console.log(fromLanguage)
      this.get('docs').translate(id, text, fromLanguage, toLanguage)
    }
  }
});
