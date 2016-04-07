import Ember from 'ember';
import io from 'socket.io';
import ENV from 'kujira/config/enviroment';
var socket;
var events = ["osdAdded", "osdRemoved"];

export default Ember.Service.extend(Ember.Evented, {

onInit: function() {
    socket = io.connect(ENV.APP.API_HOST, ENV.APP.API_PORT, ENV.APP.API_NAMESPACE);
    socket.on('eventNotification', this.eventNotification, this);
    alert(ENV.APP.API_HOST);
    socket.on('close', function() {
        socket = io.disconnect(ENV.APP.API_HOST, ENV.APP.API_PORT, ENV.APP.API_NAMESPACE);
    }, this);
}.on('init'),

eventNotification: function(message) {
    var obj = JSON.parse(message);
    var objMessage=obj.message;
    var tmp =Ember.$.inArray(objMessage, events);
        if (tmp) {
            this.trigger(tmp, obj);
        }
    alert(objMessage);
},

joinGraph: function(graphType, handler){
    socket.emit('join', graphType);
    var obj =JSON.parse(event);
    socket.on('eventNotification', handler(obj.data));
//???    this.get('event-handler-service').on('eventNotification', handler(obj.data));
//???    handler(obj.data);
},

closeGraph: function(graphType){
    socket.emit('leave',graphType);
},

graphNotification: function(event){
    var obj =JSON.parse(event);
    this.trigger(obj.type, obj.data);
}
});
