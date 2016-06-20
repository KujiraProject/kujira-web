import Ember from 'ember';

/* global io */
export default Ember.Service.extend(Ember.Evented, {
    socket: '',

    init: function() {
        let self = this;
        this.set('socket', io.connect('http://localhost:7000', {
            transports: ['websocket']
        }));
        var socket = this.get('socket');
        let eventNotification = function(message) {
            console.log(message);
            self.trigger('eventNotification', message);

        };

        let graphNotification = function(event) {
            console.log(event.Room);
            self.trigger(event.Room, event.Data);
        };
        socket.on('event notification', eventNotification);
        socket.on('graph notification', graphNotification, this);
        socket.on('close', function() {
            this.set('socket', io.connect('http://localhost:7000', {
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
