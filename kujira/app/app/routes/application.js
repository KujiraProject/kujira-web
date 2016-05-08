import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';


export default Ember.Route.extend(ApplicationRouteMixin,{
  redirect: function(){
    this.transitionTo('dashboard');
  },
  model(){
    // If the user is already signed in this fetches the current user from the server
    //console.log(' Zalogowal: ' + this.get('session.data.currentUser.email'));
    //return this.get('session.data.currentUser');
  },

});
