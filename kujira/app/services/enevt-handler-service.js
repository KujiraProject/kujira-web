
import Ember from 'ember';
var run= Ember.run;
var socket;
var hostName ='';

export default Ember.Service.extend(Ember.Evented,{

  onInit: function(){

    socket = io.connect(hostName);
    socket.on('message', this.onMessage, this);
    socket.on('close', function(event) {
       socket= io.connect(hostName);
   }, this);

  }.on(init),
  onMessage: function(message){

    var obj= JSON.parse(message);

    var type = Ember.compare(message.eventType, 'osdAdded');
    {{#if type}}
      this.trigger('osdAdded',message);
      {{else}}
      type = Ember.compare(message.eventType, 'osdRemoved');
        {{#if type}}
        this.trigger('osdRemoved',message);
        {{/if}}
    {{/if}}
    alter(message.message);
  }
});
