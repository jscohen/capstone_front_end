import Ember from 'ember';

export default Ember.Route.extend({
  model () {
    return this.get('store').findAll('doc');
  },
  actions: {
    deleteDocs (item) {
      item.destroyRecord();
      this.get('flashMessages').success('Document Deleted')
    }
  }
});
