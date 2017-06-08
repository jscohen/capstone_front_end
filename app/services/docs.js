import Ember from 'ember';
import { storageFor } from 'ember-local-storage';
import storage from '../storages/auth'
import Docs from '../storages/docs'

export default Ember.Service.extend({
  ajax: Ember.inject.service(),
  credentials: storageFor('auth'),
  isAuthenticated: Ember.computed.bool('credentials.token'),
  docs: storageFor('docs'),

  newDoc (input, title) {
    let id = this.get('credentials.id')
    return this.get('ajax').post('/docs', {
      data: {
        doc: {
          text: input,
          title: title,
          _owner: id
        }
      }
    })
    .then((result) => {
      this.get('docs').set('thisDocID', result.doc._id)
    })
    .then(() => {
      $('#createSuccess').modal('show')
    })
    .then(() => {
      $('.save').show()
    })
  },

  saveDoc (input, title, docID) {
    const id = this.get('credentials.id')
    $('#saveSuccess').modal('show')
    return this.get('ajax').patch('/docs/' + docID, {
      data: {
        doc: {
          text: input,
          title: title,
          _owner: id
        }
      }
    })
  },

  getDocs() {
    let id = this.get('credentials.id')
    return this.get('ajax').request('/docs', {
      method: 'GET'
    })
    .then((result) => {
      this.get('docs').set('myDocs', result);
    })
  },

  translate(id, text, fromLanguage, toLanguage) {
    return this.get('ajax').patch('/translate/' + id, {
      data: {
        doc: {
          id: id,
          text: text,
          fromLanguage: fromLanguage,
          toLanguage: toLanguage
        }
      }
    })
    .catch(result => {
      return this.get('ajax').request('/docs/' + id, {
        method: 'GET'
      }).then(result => {
        $('#newText').val(result.doc.text)
        $('#' + id + '.textToTranslate').val(result.doc.text)
      })
      .catch(error => console.log(error))
    })
}
});
