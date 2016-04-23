import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    save(user) {
      var userType = $( "#userTypeSelection" ).val();
      if(userType == "superuser" || userType == "user" || userType == "observer") {
      user.set('userType', userType);
      }
    }
  }
});
