import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  osdStatus: DS.attr(),
  osdWeight: DS.attr(),
  server: DS.attr(),
  dataDevicePath: DS.attr(),
  dataDeviceStatus: DS.attr(),
  dataDeviceCapacityMB: DS.attr(),
  dataDeviceUsedMB: DS.attr(),
  dataDeviceAvailableMB: DS.attr(),
  journalDevicePath: DS.attr(),
  journalDeviceStatus: DS.attr(),
  inOSD: function() {
    return this.get('osdStatus') === 'IN';
  }.property('osdStatus')
});