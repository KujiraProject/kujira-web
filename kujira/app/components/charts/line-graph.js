import Ember from 'ember';


export default Ember.Component.extend({
    didInsertElement() {
        var div = this.get('element');



        var margin = {top: 20, right: 20, bottom: 30, left: 50},
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;
        var data = [
{datee: "14-03-07", value: 66.24},
{datee: "25-03-07",	value: 95.35},
{datee: "26-04-07",	value: 33.84},
{datee: "27-04-07",	value: 55.92},
{datee: "30-04-07",	value: 99.80},
{datee: "1-05-07",	value: 44.47},
{datee: "2-05-07",	value: 100.39},
{datee: "3-05-07",	value: 144.40},
{datee: "4-06-07",	value: 100.81},
{datee: "22-06-07",	value: 43.92},
{datee: "30-06-07",	value: 105.06},
{datee: "9-07-07",	value: 46.88},
{datee: "10-07-07",	value: 147.34},
{datee: "18-07-07",	value: 48.74}];

var dateArray = [];
var valueArray = [];
var formatDate = d3.time.format("%d-%m-%y");
data.forEach(function (d, i) {
    dateArray[i] = formatDate.parse(d.datee);
    valueArray[i] = d.value;
});

        var x = d3.time.scale()
            .range([0, width]);

        var y = d3.scale.linear()
            .range([height, 0]);

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left");

        var line = d3.svg.line()
            .x(function(d, i) { return x(dateArray[i]); })
            .y(function(d, i) { return y(valueArray[i]); });

        var svg = d3.select(div).append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



          x.domain(d3.extent(dateArray));
          y.domain(d3.extent(data, function(d) { return d.value; }));

          svg.append("g")
              .attr("class", "x axis")
              .attr("transform", "translate(0," + height + ")")
              .call(xAxis);

          svg.append("g")
              .attr("class", "y axis")
              .call(yAxis)
            .append("text")
              .attr("transform", "rotate(-90)")
              .attr("y", 6)
              .attr("dy", ".71em")
              .style("text-anchor", "end")
              .text("IOPS");

          svg.append("path")
              .datum(data)
              .attr("class", "line")
              .attr("d", line);



        },

});
