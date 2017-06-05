import Ember from 'ember';

export default Ember.Component.extend({
  auth: Ember.inject.service(),

  user: Ember.computed.alias('auth.credentials.email'),
  isAuthenticated: Ember.computed.alias('auth.isAuthenticated'),
  docs: Ember.inject.service(),

  actions: {
    deleteDocs() {
      console.log('in delete docs component')
      // this.get('docs').getDocs()
    },
  }
});
