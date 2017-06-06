import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
});

Router.map(function () {
  this.route('sign-up');
  this.route('sign-in');
  this.route('change-password');
  this.route('users');
  this.route('testResource');
  this.route('new-document');
  this.route('my-documents');
  this.route('test-docs');
  this.route('documents');
  this.route('docs');
  this.route('doc', { path: '/docs/:doc_id'});
  this.route('edit-doc');
});

export default Router;
