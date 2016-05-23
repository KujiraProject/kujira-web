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
      var width = this.get('width');
      var height = this.get('height');
      var scaling = 0;
      var modif = (0.9*width)/data.length;
      var parametersNamesArray = new Array(data.length+1);
      var parametersColorsArray = new Array(data.length);
      var parametersValuesArray = new Array(data.length);
      var parametersNamesPositionsArray = new Array(data.length+2);

      parametersNamesArray[0]="";
      for (var i = 1; i < data.length+1; i++) {
          parametersNamesArray[i]=data.get( i-1 +'._data.name');
      }


      for (i = 0; i < data.length; i++) {
          parametersColorsArray[i]=data.get( i +'._data.value');
      }

      for ( i = 0; i < data.length; i++) {
          parametersValuesArray[i]=data.get( i +'._data.number');
      }

      parametersNamesPositionsArray[0]=0;
      for ( i = 1; i < data.length+1; i++) {
          parametersNamesPositionsArray[i]=i*0.33*modif+0.66*modif*(i-1);
      }
      parametersNamesPositionsArray[data.length+1]=0.9*width;



            for (i = 0; i < parametersValuesArray.length; i++) {
                if (parametersValuesArray[i] > scaling)
                {
                    scaling =  parametersValuesArray[i]+0.2*parametersValuesArray[i];
                }
            }

            var heightScale = d3.scale.linear()
                .domain([0, scaling])
                .range([0, 0.71*height]);

            var yAxisScale = d3.scale.linear()
                .domain([0, scaling])
                .range([0.71*height, 0]);


            var xAxisScale = d3.scale.ordinal()
                .domain(parametersNamesArray)
                .range(parametersNamesPositionsArray);

            var color = d3.scale.ordinal()
                .range(parametersColorsArray);

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
                .ticks(data.length);

              canvas.selectAll("rect")
                .data(parametersValuesArray)
                .enter()
                .append("rect")
                .attr("height", function(d) {
                    return heightScale(d);
                })
                .attr("width", 0.66*modif)
                .attr("fill", function(d) {
                    return color(d);
                })
                .attr("x", function(d, i) {
                    return i * modif;
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
}


});
