import Ember from 'ember';
import { storageFor } from 'ember-local-storage';
import storage from '../storages/auth'
import Docs from '../storages/docs'


export default Ember.Route.extend({
  tester: Ember.inject.service(),

  actions: {
    getDocs () {
      console.log('inside my-docs route')
    }
  }
});
