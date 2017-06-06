import Ember from 'ember';
import { storageFor } from 'ember-local-storage';
import storage from '../storages/auth'
import Docs from '../storages/docs'

export default Ember.Service.extend({
  ajax: Ember.inject.service(),
  credentials: storageFor('auth'),
  isAuthenticated: Ember.computed.bool('credentials.token'),
  docs: storageFor('docs'),

  newDoc () {
    console.log('inside service')
    console.log(this.get('credentials.id'))

    let id = this.get('credentials.id')
    return this.get('ajax').post('/docs', {
      data: {
        doc: {
          text: '',
          _owner: id
        }
      }
    }).then(console.log('created'))
    .then((result) => {
      console.log(result)
      this.get('docs').set('thisDocID', result.doc._id)
    })
    .then(() => {console.log(this.get('docs.thisDocID'))})
    .then(() => {
      $('#createSuccess').modal('show')
    })
  },

  saveDoc (input, title) {
    console.log('inside service')
    let id = this.get('credentials.id')
    $('#saveSuccess').modal('show')
    return this.get('ajax').patch(`/docs/${this.get('docs.thisDocID')}`, {
      data: {
        doc: {
          text: input,
          title: title,
          _owner: id
        }
      }
    })
  },

  deleteDoc(id) {
    return this.get('ajax').request('/docs/' + id, {
      method: 'DELETE'
      }).then(() => {
        console.log('doc destroyed')
      }).then(() => {
        docsRoute.model()
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
    .then(() => {
      console.log(this.get('docs.myDocs'))
    })
  }
});
