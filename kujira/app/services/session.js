import ESASession from "ember-simple-auth/services/session";
import Ember from 'ember';

export default ESASession.extend({

  store: Ember.inject.service(),
  suPermision: false,

  setCurrentUser: function() {
    if (this.get('isAuthenticated')) {

      this.get('store').queryRecord('user', {}).then((user) => {
        this.set('data.currentUser', user);
        if(user.get('email') === "suser@suser.com") {
          this.set('data.suPermision', true);
        }
        else {
          this.set('data.suPermision', false);
        }
      });

    }
  }.observes('isAuthenticated'),



});
