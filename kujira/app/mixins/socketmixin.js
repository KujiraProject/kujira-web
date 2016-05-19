import Ember from 'ember';

export default Ember.Mixin.create({
    serv: Ember.inject.service('event-handler-service'),

    graphType: 'room_iops',

    setRoom: function(roomName) {
      this.set('graphType', roomName);
    },

    onInit: function() {
      this.get('serv').on(this.get('graphType'), this.graphNotification, this);
      this.get('serv').on('eventNotification', this.eventNotification, this);
    }.on('init'),

    graphNotification: function(message) {
      console.log(message.message);
    },

    eventNotification: function(message) {
      console.log(message.message);
    },

    join: function() {
      var room = new Object();
      room.room = this.get('graphType');
      this.get('serv').joinGraph(room);
    },

    close: function() {
      this.get('serv').closeGraph(this.get('graphType'));
    },

    onDestroy: function() {
      this.get('serv').off(this.get('graphType'));
    }.on('willDestroy')
});
