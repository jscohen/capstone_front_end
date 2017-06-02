import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    getInput() {
      console.log($('textarea').val());
    },
    mouseUp() {
      console.log('in mouse up')
      window.mySelection = $('textarea').val().substring(this.selectionStart, this.selectionEnd);
      console.log(window.getSelection().toString());
    }
  }
})
