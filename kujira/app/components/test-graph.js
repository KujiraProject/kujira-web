import Ember from 'ember';
import Mixin from 'kujira/mixins/socketmixin';

export default Ember.Component.extend(Mixin, {


  graphNotification: function(message) {
    console.log('aaa');
    console.log('x: ' + message.x);
    console.log('y: ' + message.y);
  },

    onInit: function() {
      this._super();
      this.setRoom('LoggedIn');
      this.join();
      this.setRoom('Graph1');
      this.join();
    }.on('init'),

    onDestroy: function() {
      this.close();
    }.on('willDestroy')
});
