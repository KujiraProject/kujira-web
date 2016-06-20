import Ember from 'ember';
import Mixin from 'kujira/mixins/socketmixin';

export default Ember.Component.extend(Mixin, {
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
