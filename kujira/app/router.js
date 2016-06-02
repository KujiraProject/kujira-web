import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('dashboard');
  this.route('clusters');
  this.route('cluster');
  this.route('nodes');
  this.route('node', {path: 'node/:hostname'});
  this.route('osds');
  this.route('monitors');
  this.route('pools');
  this.route('settings', function() {
    this.route('users');
  });
});

export default Router;
