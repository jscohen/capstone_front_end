import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service(),

  actions: {
    authenticate: function() {
      const credentials = this.get('identification', 'password')
      authenticator = 'authenticator:tokent';

      this.get('session').authenticate(authenticator)
    }
  }
});
