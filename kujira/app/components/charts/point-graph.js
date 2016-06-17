import Ember from 'ember';
import Mixin from 'kujira/mixins/socketmixin';

export default Ember.Component.extend(Mixin, {
  dataType: '',
  data: '',

  drawChart: function() {
    let self = this;
    var div = this.get('element');
    div.innerHTML = "";
    var dat = self.graphData;
    var margin = {top: 20, right: 20, bottom: 30, left: 50},
      width = 560 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    var x = d3.scale.linear().domain([
      d3.min(dat, function(d) {
        return d.x;
      }) - 10,
      d3.max(dat, function(d) {
        return d.x;
      }) + 10
    ]).range([0, width]);
    var y = d3.scale.linear().domain([
      d3.min(dat, function(d) {
        return d.y;
      }) - 10,
      d3.max(dat, function(d) {
        return d.y;
      }) + 10
    ]).range([height, 0]);

    var xAxis = d3.svg.axis().scale(x).orient("bottom");
    var yAxis = d3.svg.axis().scale(y).orient("left");

    var canvas = d3.select(div).append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    canvas.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .append("text")
      .attr("x", width)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text("X");

    canvas.append("g")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Y")

    dat.forEach(function(point) {
      canvas.append("circle")
        .attr("r", 1.5)
        .attr("cx", x(point.x + 5))
        .attr("cy", y(point.y + 5))
    });
  },

  graphNotification: function(message) {
    let self = this;
    self.graphData.push(message);
    if(self.graphData.length > 100)
      self.graphData.shift();
    this.drawChart();
  },

  onInit: function() {
    this._super();
    this.setRoom('LoggedIn');
    this.join();
    this.setRoom('Graph1');
    this.join();
  }.on('init'),

  onDestroy: function() {
    this.close();
  }.on('willDestroy'),
});
