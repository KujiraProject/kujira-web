import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    save(user) {
      var allRoles = ["superusers", "admins", "guests"];
      var role = Ember.$( "#user"+user.id+"RoleSelection" ).val();
      var roleFound = Ember.$.inArray(role, allRoles);

      if(roleFound > -1) {
      user.set('role', role);
      user.save();
      }
    }
  }
});
