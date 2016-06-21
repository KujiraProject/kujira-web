import Ember from 'ember';

export default Ember.Mixin.create({
    serv: Ember.inject.service('event-handler-service'),

    graphType: 'room_iops',
    events: ["Warning"],
    graphData: [],

    setRoom: function(roomName) {
      this.set('graphType', roomName);
    },

    onInit: function() {
      this.get('serv').on('eventNotification', this.eventNotification, this);
      for (var i = 0; i < this.get('events').length; i++) {
        this.get('serv').on('Warning', function(message) {
          console.log(message);
        });
      }
    }.on('init'),

    graphNotification: function(message) {
      console.log('x: ' + message.x);
      console.log('y: ' + message.y);
    },

    join: function() {
      var room = new Object();
      room.room = this.get('graphType');
      this.get('serv').joinGraph(room);
      this.get('serv').on(this.get('graphType'), this, this.graphNotification);
    },

    close: function() {
      this.get('serv').closeGraph(this.get('graphType'));
    },

    onDestroy: function() {
      this.get('serv').off(this.get('graphType'));
      this.get('serv').off('Warning');
    }.on('willDestroy')
});
