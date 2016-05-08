import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service('session'),

  actions: {
    authenticate() {

      var credentials = this.getProperties('identification', 'password'),
        authenticator = 'authenticator:token';

      this.get('session').authenticate(authenticator, credentials).then(() => {
        console.log('Login Succedd');
      }).catch((reason) => {
        console.log('Auth error');

        if(reason === null) {}
        else alert(reason.errors.toString());
      });
    }
  }
});
