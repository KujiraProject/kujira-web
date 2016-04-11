import DS from 'ember-data';

export default DS.Model.extend({
  server: DS.attr(),
  reweight: DS.attr(),
  up: DS.attr(),
  in: DS.attr()
});
