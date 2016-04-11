import DS from 'ember-data';

export default DS.Model.extend({
  managed: DS.attr(),
  lastContact: DS.attr(),
  hostname: DS.attr(),
  bootTime: DS.attr(),
  cephVersion: DS.attr()
});
