'use strict';
var HighchartsPie = {

      gauge: function({restaMedicament,aux_existencia,title,title_existen,title_consumidos}) {
        var existen=aux_existencia;
        var resta= restaMedicament;
        console.log('valores entran grafica:');
        console.log(existen,resta);
        // Build the chart
        $('#contain').highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: title
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            series: [{
                name: 'Brands',
                data: [{
                    color:'#3498DB',
                    name: title_existen+'  ' + existen,
                    y: existen
                }, {
                    color:'#7D3C98',
                    name: title_consumidos +'  '+ resta,
                    y: resta,
                    sliced: true,
                    selected: true
                }]
            }]
        });
    }
};

module.exports = HighchartsPie;