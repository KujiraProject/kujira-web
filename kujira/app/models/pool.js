import DS from 'ember-data';

export default DS.Model.extend({
  full: DS.attr(),
  name: DS.attr(),
  min_size: DS.attr(),
  pg_num: DS.attr(),
  pgp_num: DS.attr(),
  size: DS.attr(),
  crush_ruleset: DS.attr()
});
