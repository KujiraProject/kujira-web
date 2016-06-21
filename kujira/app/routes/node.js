import Ember from 'ember';

export default Ember.Route.extend({
    model: function (param) {
        let nodeDetails = this.store.findRecord('server', param.hostname);
        let disksList = this.store.query('disk', {server: param.hostname});

        let model = {
            server: nodeDetails,
            disks: disksList
        };

        return model;
    }
});
