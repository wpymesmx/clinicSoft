'use strict';

var Highcharts = {

  gauge: function({dias,banEstadoCaducidad,aux_day,aux_restan}) {
     var day=dias;
     console.log('valores entran grafica:');
     console.log(aux_day,aux_restan);
    $('#container').highcharts({
        chart: {
            type: 'gauge',
            plotBackgroundColor: null,
            plotBackgroundImage: null,
            plotBorderWidth: 0,
            plotShadow: false
        },
        title: {
            text: banEstadoCaducidad+', '+day
        },
        pane: {
            startAngle: -150,
            endAngle: 150,
            background: [{
                backgroundColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                    stops: [
                        [0, '#FFF'],
                        [1, '#333']
                    ]
                },
                borderWidth: 0,
                outerRadius: '109%'
            }, {
                backgroundColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                    stops: [
                        [0, '#333'],
                        [1, '#FFF']
                    ]
                },
                borderWidth: 1,
                outerRadius: '107%'
            }, {
                // default background
            }, {
                backgroundColor: '#DDD',
                borderWidth: 0,
                outerRadius: '105%',
                innerRadius: '103%'
            }]
        },
        // the value axis
        yAxis: {
            min: 0,
            max: 200,
            reversed: true,

            minorTickInterval: 'auto',
            minorTickWidth: 1,
            minorTickLength: 10,
            minorTickPosition: 'inside',
            minorTickColor: '#666',

            tickPixelInterval: 30,
            tickWidth: 2,
            tickPosition: 'inside',
            tickLength: 10,
            tickColor: '#666',
            labels: {
                step: 2,
                rotation: 'auto'
            },
            title: {
                text: 'km/h'
            },
            plotBands: [{
                from: 0,
                to: 66,
                color: '#DF5353' // green
            }, {
                from: 66,
                to: 132,
                color: '#DDDF0D' // yellow
            }, {
                from: 132,
                to: 200,
                color: '#55BF3B' // red
            }]
        },
        series: [{
            name: aux_restan,
            data: [day],
            tooltip: {
                valueSuffix: '  '+aux_day
            }
        }]
    });
  }
};

module.exports = Highcharts;
