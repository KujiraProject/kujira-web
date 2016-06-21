import Ember from 'ember';

export default Ember.Controller.extend({
    openModal: false,
    diskInModal: null,
    actions: {
        openDialog: function (disk) {
            console.log(disk);
            this.set('openModal', true);
            this.set('diskInModal', disk);
        }
    }
});
