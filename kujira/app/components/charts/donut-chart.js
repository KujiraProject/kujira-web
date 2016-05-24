import Ember from 'ember';
import {
    createRefreshingChart
} from './chartsCommonContent';

export default Ember.Component.extend({
    height: null,
    width: null,
    chartDescription: null,
    dataType: null,
    refreshingInterval: null,

    willDestroyElement() {
        clearInterval(this.get('refreshingInterval'));
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
