import Ember from 'ember';

export default Ember.Route.extend({
  model () {
    return this.get('store').findAll('doc');
  },
  activate: function() {
    console.log('activated')
  },

  actions: {
    deleteDocs (item) {
      console.log('inside delete route')
      console.log(item)
      item.destroyRecord();
      this.get('flashMessages').success('Document Deleted')
    },
    edit(title, text) {
      console.log('inside edit route')
      console.log(title)
      console.log(text)
      console.log('still in docs route')
    },
    toggle(id) {
      console.log('inside docs route')
      console.log(id)
      $('#' + id).show()
    }
  }
});
