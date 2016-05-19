import Ember from 'ember';

export default Ember.Service.extend(Ember.Evented, {
    socket: null,
    events: ["osdAdded", "osdRemoved", "OSDup", "OSDdown", "OSDrebalanced"],

    onInit: function() {
      this.set('socket',io.connect('http://localhost:5000/kujira', {
        transports: ['websocket']
      }));
      var socket = this.get('socket');
      socket.on('event notification', this.eventNotification, this);
      socket.on('close', function() {
        this.get('socket').set(io.close());
      }, this);
    }.on('init'),

    eventNotification: function(message) {
      var tmp = Ember.$.inArray(message.eventType, this.events);
      if (tmp) {
        this.trigger('eventNotification', message.message);
      }
    },

    joinGraph: function(graphType){
      var socket = this.get('socket');
      socket.emit('join', graphType);
      socket.on('graph notification', this.graphNotification, this);
    },

    closeGraph: function(graphType){
      var socket = this.get('socket');
      socket.emit('leave', graphType);
    },

    graphNotification: function(event){
      var obj = event;
      var data = [obj.X, obj.Y];
      this.trigger(obj.graphType, data);
    }
});
