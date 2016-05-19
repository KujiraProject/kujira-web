import Ember from 'ember';
import Mixin from 'kujira/mixins/socketmixin';

export default Ember.Component.extend(Mixin, {

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
