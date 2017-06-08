import Ember from 'ember';
import { storageFor } from 'ember-local-storage';
import storage from '../storages/auth'
import Docs from '../storages/docs'

export default Ember.Component.extend({
  auth: Ember.inject.service(),

  user: Ember.computed.alias('auth.credentials.email'),
  isAuthenticated: Ember.computed.alias('auth.isAuthenticated'),
  docs: Ember.inject.service(),
  myDocs: storageFor('docs'),

  actions: {
    newDoc() {
      console.log($('#newText').val());
      let input = $('#newText').val()
      let title = $('.docTitle').val()
      this.get('docs').newDoc(input, title)
      $('.newDoc').hide()
    },
    saveDoc() {
        const id = this.get('myDocs.thisDocID')
        console.log($('.testTextArea').val());
        let input = $('.testTextArea').val()
        let title = $('.editedTitle').val()
        this.get('docs').saveDoc(input, title, id)
    },
    translate() {
      console.log('inside event handler translate')
      const from = $('#fromLangInNew').find(":selected").text()
      const to = $('#toLangInNew').find(":selected").text()
      let fromLanguage = ''
      let toLanguage =''
      let text = $('#newText').val()
      const id = this.get('myDocs.thisDocID')
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
})
