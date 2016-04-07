import Ember from 'ember';

export default Ember.Mixin.create({
  serv: Ember.inject.service('event-handler-service'),

  graphType: 'room_iops',

  onInit: function() {
    var handler = function(data) {
      console.log(data);
    };
    this.get('serv').joinGraph(this.get('graphType'), handler);
  }.on('init'),

  onDestroy: function() {
    this.get('serv').closeGraph(this.get('graphType'));
  }.on('willDestroy')
});
