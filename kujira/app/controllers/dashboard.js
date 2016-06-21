 import Ember from 'ember';

 export default Ember.Controller.extend({
    tagName: 'li',
    cluster: function() {
        return this.get('clusters.firstObject');
    }.property('clusters')
 });
