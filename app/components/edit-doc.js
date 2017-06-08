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
      const from = $('#fromLang').find(":selected").text()
      const to = $('#toLang').find(":selected").text()
      let fromLanguage = ''
      let toLanguage =''
      let text = $('.testTextArea').val()
      let id = doc.id
      if (from === 'Spanish') {
        fromLanguage = 'es'
      } else {
        fromLanguage = from.toLowerCase().substring(0, 2)
      }
      if (to === 'Spanish') {
        toLanguage = 'es'
      } else {
        toLanguage = to.toLowerCase().substring(0, 2)
      }
      this.get('docs').translate(id, text, fromLanguage, toLanguage)
    }
  }
});
