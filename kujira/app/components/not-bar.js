import Ember from 'ember';
import Mixin from 'kujira/mixins/socketmixin';

export default Ember.Component.extend(Mixin, {
    store: Ember.inject.service(),
    changeModel: true,
    tasks: ' ',
    events: [],
    eventsSize: 0,

    actions: {

        removeFromModel: function(id) {
            var tab = this.get('events');
            for (var i = 0; i < tab.length; i++) {
                if (tab[i].id === id) {
                    tab.splice(i, 1);
                }
            }
            this.rerender();
        },
        changeModel() {
            if(this.changeModel===true) {
              this.set('changeModel',false);
            }
            else {
              this.set('changeModel',true);
            }
            console.log(this.changeModel);
        }
    },

    model() {
        return this.get('events');
    },

    onInit: function() {
        let self = this;
        this._super();
        var room = new Object();
        room.room = 'LoggedIn';
        this.set('graphType', room);
        this.get('store').findAll('task').then(function (result) {
          self.set('tasks',result._prevContent);
          console.log(self.tasks[0]._data);
        });
        this.join();
        this.get('serv').on('eventNotification', function(event) {
            var eventColor;
            if (event.eventType === "Warning") {
                eventColor = "blue";
            }
            self.get('events').pushObject({
                id: self.get('eventsSize'),
                name: event.message,
                color: eventColor
            });
            self.set('eventsSize', self.get('eventsSize') + 1);
        });
    }.on('init'),

    onDestroy: function() {
        this.close();
    }.on('willDestroy')
});
