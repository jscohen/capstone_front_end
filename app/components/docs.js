import Ember from 'ember';

export default Ember.Component.extend({
  auth: Ember.inject.service(),

  user: Ember.computed.alias('auth.credentials.email'),
  isAuthenticated: Ember.computed.alias('auth.isAuthenticated'),
  docs: Ember.inject.service(),

  actions: {
    deleteDocs(id) {
      // this.get('docs').deleteDoc(id)
      return this.sendAction('deleteDocs')
    },
    edit(doc) {
      const title = this.get('doc.title')
      this.get('docs').set('currentDoc', doc)
      return this.sendAction('edit', doc)
    },
    toggle() {
      $('.toggle').show()
    },
  }
});
