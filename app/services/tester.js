import Ember from 'ember';
import { storageFor } from 'ember-local-storage';

export default Ember.Service.extend({
  ajax: Ember.inject.service(),
  credentials: storageFor('auth'),

  getTests () {
    console.log('in tester')
    return this.get('ajax').request('/tests', {
      method: 'GET'
    })
  }
});
