import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    save(user) {
      var role = $( "#user"+user.id+"RoleSelection" ).val();
      if(role === "superuser" || role === "user" || role === "observer") {
      user.set('role', role);
      user.save();
      }
    }
  }
});
