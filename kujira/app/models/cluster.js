import DS from 'ember-data';

export default DS.Model.extend({
  updateTime: DS.attr(),
  name: DS.attr()
});
