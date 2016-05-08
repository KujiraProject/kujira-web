import ESASession from "ember-simple-auth/services/session";
import Ember from 'ember';

export default ESASession.extend({

  store: Ember.inject.service(),
  isUser: false,
  isAdmin: false,
  isSuser: false,

  setCurrentGroup: function() {

        if (this.get('data').authenticated!== 'null')
        {
          console.log(this.get('data').authenticated.data[1].id);
          if(this.get('data').currentUser.group === "admins") {
            this.set('data.isAdmin', true);
          }
          else {
            this.set('data.isAdmin', false);
          }
          if(this.get('data').currentUser.group === "susers") {
            this.set('data.isSuser', true);
            this.set('data.isAdmin', true);
          }
          else {
            this.set('data.isSuser', false);
          }
          if(this.get('data').currentUser.group === "users") {
            this.set('data.isUser', true);
          }
          else {
            this.set('data.isUser', false);
          }
        }
  }.observes('isAuthenticated'),

});
