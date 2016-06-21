import Ember from 'ember';
export {
    createRefreshingChart
};

function createRefreshingChart(dataType, div, refreshPeriod, chartProperties) {
    createChart(dataType, div, chartProperties);
    return setInterval(function() {
        createChart(dataType, div, chartProperties);
    }, refreshPeriod);
}

var createChart = function(dataType, div, chartProperties) {
    var chartDataPromise = getDataFromAjaxCall(dataType);
    chartDataPromise.success(function(response) {
        div.innerHTML = '';
        try {
          div.appendChild(drawChart(response.data, chartProperties));
        } catch (e) {
          div.innerHTML = e;
        }
    });
};

var drawChart = function(chartData, chartProperties) {
    var chart;
    switch (chartProperties.chartType) {
        case 'pieChart':
            chart = drawRoundChart(chartData, chartProperties);
            break;
        case 'donutChart':
            chart = drawRoundChart(chartData, chartProperties);
            break;
        case 'barChart':
            chart = drawBarChart(chartData, chartProperties);
            break;
        default:
            throw 'Wrong type of chart';
    }
    return chart;
};
var getDataFromAjaxCall = function(dataType) {
    var chartDataPromise = Ember.$.ajax({
        url: '/kujira/api/v1/' + dataType + 'ChartData',
        async: true,
        type: 'GET'
    });
    return chartDataPromise;
};

var drawRoundChart = function(chartData, chartProperties) {

    var width = chartProperties.width,
        height = chartProperties.height,
        chartDescription = chartProperties.chartDescription,
        chartType = chartProperties.chartType;

    var chartDiv = document.createElement('div'),
        r = 0.35 * width,
        legendRectSize = 0.04 * width,
        legendSpacing = 0.004 * width,
        parametersNamesArray = [],
        parametersColorsArray = [],
        parametersValuesArray = [];
    fillArrays(parametersNamesArray, parametersColorsArray, parametersValuesArray, chartData, chartType);

    var color = d3.scale.ordinal()
        .range(parametersColorsArray);


    var canvas = d3.select(chartDiv)
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    var group = canvas.append("g")
        .attr("transform", "translate(" + r + "," + r + ")");

    var arc = d3.svg.arc()
        .innerRadius(
            function() {
                if (chartType === 'donutChart') {
                    return 0.5 * r;
                } else {
                    return 0;
                }
            }
        )
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
        .attr("transform", "translate(0," + 2 * r + ")")
        .append("text")
        .attr("font-size", "" + 0.002 * width + "em")
        .attr("transform", "translate(" + 0.015 * height + "," + 0.09 * height + ")")
        .text("" + chartDescription + "");


    arcs.append("path")
        .attr("d", arc)
        .attr("fill", function(d, i) {
            return color(i);
        });

    arcs.append("text")
        .attr("transform", function(d) {
            return "translate(" + arc.centroid(d) + ")";
        })
        .attr("text-anchor", "middle")
        .attr("font-size", "" + 0.002 * width + "em")
        .text(function(d) {
            return d.data;
        });


    var legend = arcs.selectAll('.legend')
        .data(color.domain())
        .enter()
        .append('g')
        .attr('class', 'legend')
        .attr('transform', function(d, i) {
            return 'translate(' + 0.4 * width + ',' + i * (legendRectSize + legendSpacing) + ')';
        });


    legend.append('rect')
        .attr('transform', 'translate(0,' + -0.8 * r + ')')
        .attr('width', legendRectSize)
        .attr('height', legendRectSize)
        .style('fill', color)
        .style('stroke', color);

    legend.append('text')
        .attr('transform', 'translate(0,' + -0.8 * r + ')')
        .attr("font-size", "" + 0.002 * width + "em")
        .attr('x', legendRectSize + legendSpacing)
        .attr('y', legendRectSize - legendSpacing)
        .text(function(d, i) {
            d = parametersNamesArray[i];
            return d;
        });

    return chartDiv;
};

var drawBarChart = function(chartData, chartProperties) {

    var width = chartProperties.width,
        height = chartProperties.height,
        chartDescription = chartProperties.chartDescription,
        chartType = chartProperties.chartType;

    var chartDiv = document.createElement('div'),
        scaling = 0,
        modif = (0.9 * width) / chartData.length,
        parametersNamesArray = [],
        parametersColorsArray = [],
        parametersValuesArray = [],
        parametersNamesPositionsArray = [];

    fillArrays(parametersNamesArray, parametersColorsArray, parametersValuesArray, chartData, chartType);
    parametersNamesArray.unshift('');
    parametersNamesPositionsArray.unshift(0);
    for (var i = 1; i < chartData.length + 1; i++) {
        parametersNamesPositionsArray[i] = i * 0.33 * modif + 0.66 * modif * (i - 1);
    }
    parametersNamesPositionsArray[chartData.length + 1] = 0.9 * width;


    for (i = 0; i < parametersValuesArray.length; i++) {
        if (parametersValuesArray[i] > scaling) {
            scaling = parametersValuesArray[i] + 0.2 * parametersValuesArray[i];
        }
    }

    var heightScale = d3.scale.linear()
        .domain([0, scaling])
        .range([0, 0.71 * height]);

    var yAxisScale = d3.scale.linear()
        .domain([0, scaling])
        .range([0.71 * height, 0]);


    var xAxisScale = d3.scale.ordinal()
        .domain(parametersNamesArray)
        .range(parametersNamesPositionsArray);

    var color = d3.scale.ordinal()
        .range(parametersColorsArray);

    var canvas = d3.select(chartDiv)
        .append("svg")
        .attr("transform", "translate(0,10)")
        .attr("width", width)
        .attr("height", height);

    var yAxis = d3.svg.axis()
        .scale(yAxisScale)
        .orient("right")
        .ticks(10);

    var xAxis = d3.svg.axis()
        .scale(xAxisScale)
        .orient("bottom")
        .ticks(chartData.length);

    canvas.selectAll("rect")
        .data(parametersValuesArray)
        .enter()
        .append("rect")
        .attr("height", function(d) {
            return heightScale(d);
        })
        .attr("width", 0.66 * modif)
        .attr("fill", function(d, i) {
            return color(i);
        })
        .attr("x", function(d, i) {
            return i * modif;
        })
        .attr("y", function(d) {
            return 0.71 * height - heightScale(d);
        });

    canvas.append("g")
        .attr("transform", "translate(" + 0.9 * width + ",0)")
        .call(yAxis);

    canvas.append("g")
        .attr("transform", "translate(0," + 0.71 * height + ")")
        .call(xAxis)
        .append("text")
        .attr("font-size", "" + 0.002 * width + "em")
        .attr("transform", "translate(" + 0.015 * height + "," + 0.2 * height + ")")
        .text("" + chartDescription + "");

    return chartDiv;
};

var fillArrays = function(parametersNamesArray, parametersColorsArray, parametersValuesArray, chartData) {
    for (var l = 0; l < chartData.length; l++) {
        parametersNamesArray[l] = chartData.get(l + '.name');
        parametersColorsArray[l] = chartData.get(l + '.color');
        parametersValuesArray[l] = chartData.get(l + '.value');
    }
};
