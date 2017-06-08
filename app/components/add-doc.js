import Ember from 'ember';

export default Ember.Component.extend({
  auth: Ember.inject.service(),

  user: Ember.computed.alias('auth.credentials.email'),
  isAuthenticated: Ember.computed.alias('auth.isAuthenticated'),
  docs: Ember.inject.service(),

  actions: {
    saveDoc() {
      console.log($('#newDoc').val());
      let input = $('#newDoc').val()
      let title = $('.docTitle').val()
      this.get('docs').saveDoc(input, title)
    },
    mouseUp() {
      console.log('in mouse up')
      window.mySelection = $('#newDoc').val().substring(this.selectionStart, this.selectionEnd);
      console.log(window.getSelection().toString());
    }
  }
})
