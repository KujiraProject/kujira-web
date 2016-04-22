import Ember from 'ember';


export default Ember.Component.extend({
    didInsertElement() {
        var div = this.get('element');

        var up = 46;
        var inn = 55;
        var down = 60;
        var out = 6;
        var dataArray = [up, inn, down, out];

            var width = this.get('width');
            var height = this.get('height');
            var scaling = 0;

            for (var i = 0; i < dataArray.length; i++) {
                if (dataArray[i] > scaling)
                {
                    scaling =  dataArray[i]+0.2*dataArray[i];
                }
            }

            var heightScale = d3.scale.linear()
                .domain([0, scaling])
                .range([0, 0.71*height]);

            var yAxisScale = d3.scale.linear()
                .domain([0, scaling])
                .range([0.71*height, 0]);

            var xAxisScale = d3.scale.ordinal()
                .domain(["", "up", "in", "down", "out"])
                .range([0,0.08*width,0.32*width,0.54*width,0.78*width,0.90*width]);

            var color = d3.scale.ordinal()
                .range(["#ffcc00", "#ff9900","#ff6600","#ff2200"]);

            var canvas = d3.select(div)
                .append("svg")
                .attr("width", width)
                .attr("height", height)
                .append("g");

            var yAxis = d3.svg.axis()
                .scale(yAxisScale)
                .orient("right")
                .ticks(10);

            var xAxis = d3.svg.axis()
                .scale(xAxisScale)
                .orient("bottom")
                .ticks(4);

              canvas.selectAll("rect")
                .data(dataArray)
                .enter()
                .append("rect")
                .attr("height", function(d) {
                    return heightScale(d);
                })
                .attr("width", 0.17*width)
                .attr("fill", function(d) {
                    return color(d);
                })
                .attr("x", function(d, i) {
                    return i * 0.23*width;
                })
                .attr("y", function(d) {
                    return 0.71*height - heightScale(d);
                });

            canvas.append("g")
                .attr("transform", "translate("+ 0.9*width +",0)")
                .call(yAxis);

            canvas.append("g")
                .attr("transform", "translate(0,"+0.71*height+")")
                .call(xAxis)
                .append("text")
                .attr("font-size",""+0.002*width +"em")
                .attr("transform", "translate("+0.015*height+","+0.2*height+")")
                .text(""+ this.get('chartDescription') +"");
},
    height: null,
    width: null,
    chartDescription: null

});
