import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
});

Router.map(function () {
  this.route('sign-up');
  this.route('sign-in');
  this.route('change-password');
  this.route('testResource');
  this.route('new-document');
  this.route('docs');
  this.route('edit-doc');
});

export default Router;
