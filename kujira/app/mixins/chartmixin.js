import Ember from 'ember';
import {
    createRefreshingChart
} from 'kujira/components/charts/chartsCommonContent';
export default Ember.Mixin.create({
  classNames: ['chart'],
  height: 350,
  width: 400,
  chartDescription: null,
  dataType: null,
  refreshingInterval: null,
  chartType: null,
  refreshPeriod: 1000,

  didRender() {
      var dataType = this.get('dataType'),
          chartProperties = {
            width: this.get('width'),
            height: this.get('height'),
            chartType: this.get('chartType'),
            chartDescription: this.get('chartDescription')
          },
          div = this.get('element'),
          refreshPeriod = this.get('refreshPeriod');

        this.set('refreshingInterval', createRefreshingChart(dataType, div, refreshPeriod, chartProperties));
  },

  willDestroyElement() {
      clearInterval(this.get('refreshingInterval'));
  },



});
