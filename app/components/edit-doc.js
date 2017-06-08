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
    saveDoc(id) {
      let input = $('#' + id + '.textToTranslate').val()
      let title = $('#title.' + id).val()
      this.get('docs').saveDoc(input, title, id)
    },
    translate(doc) {
      const from = $('#' + doc.id + '.from').find(":selected").text()
      const to = $('#' + doc.id + '.to').find(":selected").text()
      let fromLanguage = ''
      let toLanguage =''
      let text = $('#' + doc.id + '.textToTranslate').val()
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
