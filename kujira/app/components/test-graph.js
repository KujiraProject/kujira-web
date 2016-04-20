import Ember from 'ember';
import Mixin from 'kujira/mixins/socketmixin';

export default Ember.Component.extend(Mixin, {
    dataHandler: function(data) {
      console.log('zmieniona funkcja dataHandler');
      console.log(data);
    },

    onInit: function() {
      this._super();
      this.set('graphType', 'speedDataGraph');
      console.log('component init');
      this.registerToService();
      this.join();
    }.on('init'),

    onDestroy: function() {
      this.close();
    }.on('willDestroy')
});
