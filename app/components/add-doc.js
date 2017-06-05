import Ember from 'ember';

export default Ember.Component.extend({
  auth: Ember.inject.service(),

  user: Ember.computed.alias('auth.credentials.email'),
  isAuthenticated: Ember.computed.alias('auth.isAuthenticated'),
  docs: Ember.inject.service(),

  actions: {
    saveDoc() {
      console.log($('textarea').val());
      let input = $('textarea').val()
      let title = $('.title').val()
      this.get('docs').saveDoc(input, title)
    },
    mouseUp() {
      console.log('in mouse up')
      window.mySelection = $('textarea').val().substring(this.selectionStart, this.selectionEnd);
      console.log(window.getSelection().toString());
    }
  }
})
