import Ember from 'ember';
//import ENV from 'kujira/config/enviroment';
/* global io */

export default Ember.Service.extend(Ember.Evented, {
    socket: '',
    events: ["osdAdded", "osdRemoved", "OSDup", "OSDdown", "OSDrebalanced"],

    init: function() {
        let self = this;
        this.set('socket', io.connect('http://localhost:5000/kujira', {
            transports: ['websocket']
        }));
        var socket = this.get('socket');
        let eventNotification = function(message) {
            var tmp = Ember.$.inArray(message.eventType, self.events);
            if (tmp) {
                self.trigger(message.eventType, message.message);
            }
        };

        let graphNotification = function(event) {
            self.trigger(event.Room, event.Data);
        };
        socket.on('event notification', eventNotification, this);
        socket.on('graph notification', graphNotification, this);
        socket.on('close', function() {
            this.set('socket', io.connect('http://localhost:5000', {
                transports: ['websocket']
            }, this));
        });
    },

    joinGraph: function(graphType) {
        this.socket.emit('join', graphType);
    },

    closeGraph: function(graphType) {
        this.socket.emit('leave', graphType);
    },


});
