import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  value: DS.attr(),
  number: DS.attr()
});
