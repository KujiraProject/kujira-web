import Ember from 'ember';

export default Ember.Route.extend({
  model(){
      return this.store.findRecord('cluster', 0);
  },
  redirect: function(){
    //this.transitionTo('dashboard');
  }
});
