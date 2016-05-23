import Ember from 'ember';


export default Ember.Component.extend({
  height: null,
  width: null,
  chartDescription: null,
  inputParameters: null,
  dynamicValues: null,

    didInsertElement() {

      var div = this.get('element');
      var data =this.get('inputParameters._prevContent');
      var parametersNamesArray = new Array(data.length);
      var parametersColorsArray = new Array(data.length);
      var parametersValuesArray = new Array(data.length);

      for (var i = 0; i < data.length; i++) {
          parametersNamesArray[i]=data.get( i +'._data.name');
      }

      for (i = 0; i < data.length; i++) {
          parametersColorsArray[i]=data.get( i +'._data.value');
      }

      for ( i = 0; i < data.length; i++) {
          parametersValuesArray[i]=data.get( i +'._data.number');
      }

        var width = this.get('width');
        var height = this.get('height');
        var r = 0.35*width;
        var legendRectSize = 0.04*width;
        var legendSpacing = 0.004*width;


        var color = d3.scale.ordinal()
            .range(parametersColorsArray);

        var canvas = d3.select(div)
            .append("svg")
            .attr("width",width)
            .attr("height", height);

        var group = canvas.append("g")
            .attr("transform", "translate("+ r +","+ r +")");

        var arc = d3.svg.arc()
            .innerRadius(0)
            .outerRadius(r);

        var pie = d3.layout.pie()
            .value(function(d) {
                return d;
            });

        var arcs = group.selectAll(".arc")
            .data(pie(parametersValuesArray))
            .enter()
            .append("g")
            .attr("class", "arc");

        canvas.append("g")
            .attr("transform", "translate(0,"+2*r+")")
            .append("text")
            .attr("font-size",""+0.002*width +"em")
            .attr("transform", "translate("+0.015*height+","+0.09*height+")")
            .text(""+ this.get('chartDescription') +"");


        arcs.append("path")
            .attr("d", arc)
            .attr("fill", function(d) {
                return color(d.data);
            });

        arcs.append("text")
            .attr("transform", function(d) {
                return "translate(" + arc.centroid(d) + ")";
            })
            .attr("text-anchor", "middle")
            .attr("font-size",""+0.002*width +"em")
            .text(function(d) {
                return d.data;
            });


        var legend = arcs.selectAll('.legend')
            .data(color.domain())
            .enter()
            .append('g')
            .attr('class', 'legend')
            .attr('transform', function(d, i) {
                return 'translate(' + 0.4*width + ',' + i *(legendRectSize + legendSpacing)  + ')';
            });


        legend.append('rect')
            .attr('transform', 'translate(0,'+ -0.8*r +')')
            .attr('width', legendRectSize)
            .attr('height', legendRectSize)
            .style('fill', color)
            .style('stroke', color);

        legend.append('text')
            .attr('transform', 'translate(0,'+ -0.8*r +')')
            .attr("font-size",""+0.002*width +"em")
            .attr('x', legendRectSize + legendSpacing)
            .attr('y', legendRectSize - legendSpacing)
            .text(function(d,i) {
                d=parametersNamesArray[i];
                return d;
              });


    }

});
