import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    newDoc () {
      this.get('flashMessages').success('Document Created')
    }
  }
});
