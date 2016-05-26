import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'li',
    cluster: function() {
        return this.get('clusters.firstObject');
    }.property('clusters')
});
