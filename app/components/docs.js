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
    },
    edit(doc) {
      console.log('inside edit component')
      console.log(this.get('doc.title'))
      console.log(this.get('doc.text'))
      const title = this.get('doc.title')
      console.log(title)
      this.get('docs').set('currentDoc', doc)
      console.log(this.get('docs.currentDoc'))
      return this.sendAction('edit', doc)
    },
    toggle() {
      console.log('inside docs component')
    }
  }
});
