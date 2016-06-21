import DS from 'ember-data';

export default DS.Model.extend({
  full: DS.attr(),
  quotaMaxObjects: DS.attr(),
  hashpspool: DS.attr(),
  name: DS.attr(),
  crashReplayInterval: DS.attr(),
  minSize: DS.attr(),
  pgNum: DS.attr(),
  quotaMaxBytes: DS.attr(),
  pgpNum: DS.attr(),
  size: DS.attr(),
  crushRuleset: DS.attr()
});
