import DS from 'ember-data';

export default DS.Model.extend({
  errors: DS.attr('string')
});
