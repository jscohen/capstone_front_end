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
  },

  saveDoc (input) {
    let id = this.get('credentials.id')
    return this.get('ajax').patch(`/docs/${this.get('docs.thisDocID')}`, {
      data: {
        doc: {
          text: input,
          _owner: id
        }
      }
    })
    .then(result => console.log(result))
  },

  destroyDoc(id) {
    return this.get('ajax').destory('/docs/' + id, {
      }).then(() => {
        console.log('doc destroyed')
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
