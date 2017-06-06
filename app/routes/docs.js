import Ember from 'ember';

export default Ember.Route.extend({
  model () {
    return this.get('store').findAll('doc');
  },
  actions: {
    deleteDocs (item) {
      console.log('inside delete route')
      console.log(item)
      item.destroyRecord();
    }
  }
});
