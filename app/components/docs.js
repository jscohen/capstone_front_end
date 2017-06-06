import Ember from 'ember';

export default Ember.Component.extend({
  auth: Ember.inject.service(),

  user: Ember.computed.alias('auth.credentials.email'),
  isAuthenticated: Ember.computed.alias('auth.isAuthenticated'),
  docs: Ember.inject.service(),

  actions: {
    deleteDocs(id) {
      console.log(id)
      console.log('in new delete component')
      // this.get('docs').deleteDoc(id)
      return this.sendAction('deleteDocs')
    }
  }
});
