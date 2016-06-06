import Ember from 'ember';
import {
    createRefreshingChart
} from './chartsCommonContent';

export default Ember.Component.extend({
    classNames: ['chart'],
    height: 250,
    width: 300,
    chartDescription: null,
    dataType: null,
    refreshingInterval: null,

    willDestroyElement() {
        clearInterval(this.get('refreshingInterval'));
    },
    didRender() {

        var dataType = this.get('dataType'),
            chartProperties = {
              width: this.get('width'),
              height: this.get('height'),
              chartType: 'pieChart',
              chartDescription: this.get('chartDescription')
            },
            div = this.get('element'),
            refreshPeriod = 4000;

          this.set('refreshingInterval', createRefreshingChart(dataType, div, refreshPeriod, chartProperties));
    }
});
