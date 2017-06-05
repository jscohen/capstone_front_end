import Ember from 'ember';

export default Ember.Component.extend({
  auth: Ember.inject.service(),

  user: Ember.computed.alias('auth.credentials.email'),
  isAuthenticated: Ember.computed.alias('auth.isAuthenticated'),
  docs: Ember.inject.service(),

  actions: {
    destroyDoc(id) {
      return this.get('ajax').destory('/docs/' + id, {
        }).then(() => {
          console.log('doc destroyed')
        })
    },
    getDocs() {
      console.log('in get docs component')
      this.sendAction('getDoc')
      this.get('docs').getDocs()
        const docs = this.get('docs.myDocs')
        $('deleteDoc').on('click', destroyDoc(this.id))
      },
    }
});
