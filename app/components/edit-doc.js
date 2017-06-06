import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    edit(doc) {
      console.log('inside edit component')
      console.log(this.get('doc.title'))
      console.log(this.get('doc.text'))
      const title = this.get('doc.title')
      console.log(title)
      return this.sendAction('edit', doc)
    }
  }
});
