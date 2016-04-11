import DS from 'ember-data';

export default DS.Model.extend({
  addr: DS.attr(),
  inQuorum: DS.attr(),
  name: DS.attr(),
  rank: DS.attr(),
  server: DS.attr()
});
