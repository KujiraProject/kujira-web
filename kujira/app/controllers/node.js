import Ember from 'ember';

export default Ember.Controller.extend({
    openModal: false,
    diskInModal: null,
    actions: {
        openDialog: function (disc) {
            console.log(disc);
            this.set('openModal', true);
            this.set('diskInModal', disc);
        }
    }
});
