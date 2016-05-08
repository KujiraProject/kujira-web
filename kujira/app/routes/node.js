import Ember from 'ember';

export default Ember.Route.extend({
    model: function (param) {
        let nodeDetails = this.store.findRecord('server', param.hostname);
        let discsList = this.store.query('disc', {server: param.hostname});

        let model = {
            server: nodeDetails,
            discs: discsList
        };

        return model;
    }
});
