//  @파일설명 : 대외용 대시보드 유형별추이.
//
define(function (require) {
    var d3 = require('d3'),
        evtCntHTML = require('text!./BrMgr_evtCntHTML.jsp'),
        evtLocalCntHTML = require('text!./BrMgr_evtLocalCntHTML.jsp');

    function Extctrl_evtCntController(id) {
        this.id = id || 'extctrl_evtCnt';
    }

    Extctrl_evtCntController.prototype={
        getHTML: function () {
            return evtCntHTML.replace(/\#id/ig, this.id);
        },
        getLocalHTML: function () {
            return evtLocalCntHTML.replace(/\#id/ig, this.id);
        },

        //전체경보 차트.
        refreshTypeChart : function (sData) {
            //차트 X축 이름.
            var categories = ['00','01','02','03','04','05','06','07','08', '09','10','11','12','13','14','15','16','17','18','19','20','21','22','23'];

            var todayCnt = sData.getTodayCnt();
            var yesterdayCnt = sData.getYesterdayCnt();
            var lastWeekCnt = sData.getLastWeekCnt();

            Highcharts.chart("{0}_typeChart".substitute(this.id), {
                colors: ['#7cb5ec', '#FAED7D', '#90ed7d'],
                lang: {
                    thousandsSep: ','
                },
                title: false,
                chart: {
                   backgroundColor: '#1C1C1C',
                },
                navigation: {
                    buttonOptions: {
                        enabled: false
                    }
                },
                credits: {
                    enabled: false
                },
                tooltip: {
                    formatter: function () {
                        var s = '';
                        $.each(this.points, function (i, point) {
                            s += '<span style="color:' + point.color + '">●</span> ' + point.series.name + ':<b>' + HmUtil.commaNum(point.y) + ' 건</b><br>';
                        });//each
                        return s;
                    },
                    shared: true
                },
                yAxis: {
                    title: {
                        text: ''
                    },
                    labels: {
                        style: {
                            color: '#fff'
                        }
                    }
                },
                xAxis: {
                    labels: {
                        style: {
                            color: '#fff'
                        }
                    },
                    categories:categories
                },
                legend: {
                    layout: 'horizontal',
                    align: 'right',
                    //verticalAlign: 'middle',
                    itemStyle: {color: '#fff'},
                    itemHoverStyle: {
                        color: '#FF0000'
                    }
                },
                series: [{
                    name: '금일',
                    data:todayCnt,
                    colors:'#333333'
                }, {
                    name: '전일',
                    data: yesterdayCnt
                }, {
                    name: '전주평균',
                    data: lastWeekCnt
                }],
                responsive: {
                    rules: [{
                        condition: {
                            maxWidth: 500
                        },
                        chartOptions: {
                            legend: {
                                layout: 'horizontal',
                                align: 'center',
                                verticalAlign: 'bottom'
                            }
                        }
                    }]
                }

            });

        },

        //지역별 경보 차트
        refreshTypeLocalChart : function (sData) {
            //차트 X축 이름.
            var categories = ['00','01','02','03','04','05','06','07','08', '09','10','11','12','13','14','15','16','17','18','19','20','21','22','23'];

            var todayCnt = sData.getTodayCnt();
            var yesterdayCnt = sData.getYesterdayCnt();
            var lastWeekCnt = sData.getLastWeekCnt();

            Highcharts.chart("{0}_typeLocalChart".substitute(this.id), {
                colors: ['#7cb5ec', '#FAED7D', '#90ed7d'],
                lang: {
                    thousandsSep: ','
                },
                title: false,
                chart: {
                    backgroundColor: '#1C1C1C',
                },
                navigation: {
                    buttonOptions: {
                        enabled: false
                    }
                },
                credits: {
                    enabled: false
                },
                yAxis: {
                    title: {
                        text: ''
                    },
                    labels: {
                        style: {
                            color: '#fff'
                        }
                    }
                },
                xAxis: {
                    labels: {
                        style: {
                            color: '#fff'
                        }
                    },
                    categories:categories
                },
                legend: {
                    layout: 'horizontal',
                    align: 'right',
                    //verticalAlign: 'middle',
                    itemStyle: {color: '#fff'},
                    itemHoverStyle: {
                        color: '#FF0000'
                    }
                },
                series: [{
                    name: '금일',
                    data:todayCnt
                }, {
                    name: '전일',
                    data: yesterdayCnt
                }, {
                    name: '전주평균',
                    data: lastWeekCnt
                }],
                responsive: {
                    rules: [{
                        condition: {
                            maxWidth: 500
                        },
                        chartOptions: {
                            legend: {
                                layout: 'horizontal',
                                align: 'center',
                                verticalAlign: 'bottom'
                            }
                        }
                    }]
                }

            });

        }
    };

    return Extctrl_evtCntController;
});
