import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    deleteDocs(id) {
      console.log(id)
      console.log('in delete component')
      // this.get('docs').deleteDoc(id)
    }
  }
});
