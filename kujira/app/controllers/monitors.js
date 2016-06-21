import Ember from 'ember';

export default Ember.Controller.extend({
    openModal: false,
    monInModal: null,
    actions: {
        openDialog: function (mon) {
            console.log(mon);
            this.set('openModal', true);
            this.set('monInModal', mon);
        }
    }
});
