import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    toggle(id) {
      console.log('inside docs component')
      console.log(id)
      $('#' + id).show()
    }
  }
});
