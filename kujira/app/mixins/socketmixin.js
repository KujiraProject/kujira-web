import Ember from 'ember';

export default Ember.Mixin.create({
  serv: Ember.inject.service('event-handler-service'),

  graphType: 'room_iops',

  dataHandler: function(data) {
    console.log(data);
  },

  onInit: function() {
    console.log('mixin init');
  }.on('init'),

  registerToService: function() {
    this.get('serv').on(this.get('graphType'), this.dataHandler);
  },

  join: function() {
    this.get('serv').joinGraph(this.get('graphType'));
  },

  close: function() {
    this.get('serv').closeGraph(this.get('graphType'));
  }

  onDestroy: function() {
    this.get('serv').off(this.get('graphType'));
  }.on('willDestroy'),

});
