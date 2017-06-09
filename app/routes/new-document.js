import Ember from 'ember';

export default Ember.Route.extend({
  model () {
    return this.get('store').findAll('doc');
  },
  actions: {
    newDoc () {
      this.get('flashMessages').success('Document Created')
    }
  }
});
