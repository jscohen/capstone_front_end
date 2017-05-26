import Ember from 'ember';

export default Ember.Route.extend({
  auth: Ember.inject.service(),
  tester: Ember.inject.service(),
  actions: {
    getTests () {
      console.log('testing')
      this.get('tester').getTests().then((tests) => $('.tests').text(tests.tests[0].totalPrice))
      //$('.tests').text(tests.totalPrice))
    }
  }
});
