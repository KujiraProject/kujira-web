import DS from 'ember-data';

export default DS.Model.extend({
  status: DS.attr(),
  title: DS.attr(),
  date: DS.attr(),
  command: DS.attr(),
  subtasks: DS.attr()
});
