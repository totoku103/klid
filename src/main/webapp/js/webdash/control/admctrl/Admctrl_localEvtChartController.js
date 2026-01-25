//  @파일설명 : 운영자용 관제실 > 17개 기관별 탐지현황
//

define(function (require) {
    var d3 = require('d3'),
        chartHTML = require('text!./Admctrl_localEvtChartHTML.jsp');

    function Admctrl_localEvtChartController(id) {
        this.id = id || 'admctrl_localEvtChart';
    }

    Admctrl_localEvtChartController.prototype = {
        getHTML: function () {
            return chartHTML.replace(/\#id/ig, this.id);
        },

        initChart: function () {
            this.chart =
                HmHighchart.create2("{0}_chart".substitute(this.id), {
                    chart: {
                        type: 'column',
                        backgroundColor: 'transparent'
                    },
                    tooltip: {
                        formatter: function(){
                            var s = '';
                            $.each(this.points, function(i,point){
                                s += '<span style="color:' + point.color + '">●</span> ' + point.series.name + ':<b>' + HmUtil.commaNum(point.y) + ' 건</b>';
                            });//each
                            return s;
                        },
                        shared: true
                    },
                    xAxis: {
                        categories: [],
                        labels: {
                            style: {
                                color: '#fff'
                            }
                        }
                    },
                    yAxis: {
                        title: { text: null },
                        labels: {
                            style: {
                                color: '#fff'
                            }
                        }
                    },
                    legend: {
                        enabled: false
                    },
                    plotOptions: {
                        column: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: true,
                                style: {
                                    color: '#fff'
                                }
                            }
                        }
                    },
                    series: [{
                        name: '탐지건수',
                        colorByPoint: true,
                        data: []
                    }]
                });
        },

        refresh: function (model) {
            var data = model.getData();
            var category = [], chartData = [];
            $.each(data, function(idx, item) {
                category.push(item.name);
                chartData.push(item.evtCnt);
            });
            if(data.length == 0){
                category = [''], chartData = [''];
            }
            this.chart.xAxis[0].setCategories(category, false);
            this.chart.series[0].setData(chartData, true);
        }

    };

    return Admctrl_localEvtChartController;
});
