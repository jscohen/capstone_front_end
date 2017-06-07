import Ember from 'ember';

export default Ember.TextArea.extend({
  didRender() {
    $('textarea').mouseup(function() {
      console.log('inside text area')
      window.mySelection = $('textarea').val().substring(this.selectionStart, this.selectionEnd);
      console.log(window.getSelection().toString());
    })
  }
});
