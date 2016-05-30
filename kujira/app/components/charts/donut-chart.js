import Ember from 'ember';
import {
    createRefreshingChart
} from './chartsCommonContent';

export default Ember.Component.extend({
    height: 400,
    width: 500,
    chartDescription: null,
    dataType: null,
    refreshingInterval: null,

    willDestroyElement() {
        if (this.get('refreshingInterval') !== 'undefined') {
            clearInterval(this.get('refreshingInterval'));
        }
    },
    didRender() {

        var dataType = this.get('dataType'),
            div = this.get('element'),
            width = this.get('width'),
            height = this.get('height'),
            chartDescription = this.get('chartDescription'),
            refreshPeriod = 4000,
            chartType = 'donutChart',
            chartData;

        this.set('refreshingInterval', createRefreshingChart(dataType, chartData, div, width, height, chartDescription, refreshPeriod, chartType));

    }
});
