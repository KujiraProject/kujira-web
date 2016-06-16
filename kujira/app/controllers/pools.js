import Ember from 'ember';

export default Ember.Controller.extend({
    openModal: false,
    poolInModal: null,
    actions: {
        openDialog: function (pool) {
            console.log(pool);
            this.set('openModal', true);
            this.set('poolInModal', pool);
        }
    }
});
