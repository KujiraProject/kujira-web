import DS from 'ember-data';

export default DS.Model.extend({
  full: DS.attr(),
  name: DS.attr(),
  minSize: DS.attr(),
  pgNum: DS.attr(),
  pgpNum: DS.attr(),
  size: DS.attr(),
  crushRuleset: DS.attr()
});
