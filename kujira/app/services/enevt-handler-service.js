import Ember from 'ember';
import ENV from 'kujira/config/enviroment';
var socket;
var events = ["osdAdded", "osdRemoved"];

export default Ember.Service.extend(Ember.Evented, {

    onInit: function() {
        socket = io.connect(ENV.APP.API_HOST);
        socket.on('message', this.onMessage, this);
        socket.on('close', function(event) {
            socket = io.connect(hostName);
        }, this);
    }.on(init),

    onMessage: function(message) {
        var obj = JSON.parse(message);
        var len = events.length;
        var objMessage = obj.message;
        for (var i = 0; i < len; i++) {
            if (objMessage == events[i]) {
                this.trigger(events[i], obj);
            }
        }
        alter(objMessage);
    }
});
