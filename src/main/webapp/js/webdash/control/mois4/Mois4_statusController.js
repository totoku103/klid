//  @파일설명 : 전자정부 사이버보안 종합현황
//
define(function (require) {
    var mois4HTML = require('text!./Mois4_statusHTML.jsp');
    function Mois4_statusController(id) {
    }

    //전자정부 사이버보안 종합현황 데이터.
    Mois4_statusController.prototype = {
        getHTML: function () {
            return mois4HTML;
        },
        refresh: function (sData) {
            var statusData = sData.getData();
            if (statusData != null) {
                (statusData.workCp1 == " ") ? $("#workCp1").text("-") : $("#workCp1").text(statusData.workCp1);
                (statusData.workCp2 == " ") ? $("#workCp2").text("-") : $("#workCp2").text(statusData.workCp2);
                (statusData.workCp3 == " ") ? $("#workCp3").text("-") : $("#workCp3").text(statusData.workCp3);
                (statusData.workPs1 == " ") ? $("#workPs1").text("-") : $("#workPs1").text(statusData.workPs1 + "명");
                (statusData.workPs2 == " ") ? $("#workPs2").text("-") : $("#workPs2").text(statusData.workPs2 + "명");
                (statusData.workPs3 == " ") ? $("#workPs3").text("-") : $("#workPs3").text(statusData.workPs3 + "명");
                (statusData.workMng1 == " ") ? $("#workMng1").text("-") : $("#workMng1").text(statusData.workMng1);
                (statusData.workMng2 == " ") ? $("#workMng2").text("-") : $("#workMng2").text(statusData.workMng2);
                (statusData.workMng3 == " ") ? $("#workMng3").text("-") : $("#workMng3").text(statusData.workMng3);
                (statusData.workCon1 == " ") ? $("#workCon1").text("-") : $("#workCon1").text(statusData.workCon1);
                (statusData.workCon2 == " ") ? $("#workCon2").text("-") : $("#workCon2").text(statusData.workCon2);
                (statusData.workCon3 == " ") ? $("#workCon3").text("-") : $("#workCon3").text(statusData.workCon3);
                $("#nirsCdM").text(HmUtil.commaNum(statusData.nirsCdM));
                $("#nirsCdA").text(HmUtil.commaNum(statusData.nirsCdA));
                $("#nirsCdD").text(HmUtil.commaNum(statusData.nirsCdD));
                $("#nirsDdM").text(HmUtil.commaNum(statusData.nirsDdM));
                $("#nirsDdA").text(HmUtil.commaNum(statusData.nirsDdA));
                $("#nirsDdD").text(HmUtil.commaNum(statusData.nirsDdD));
                $("#nirsHkM").text(HmUtil.commaNum(statusData.nirsHkM));
                $("#nirsHkA").text(HmUtil.commaNum(statusData.nirsHkA));
                $("#nirsHkD").text(HmUtil.commaNum(statusData.nirsHkD));
                $("#nirsEtM").text(HmUtil.commaNum(statusData.nirsEtM));
                $("#nirsEtA").text(HmUtil.commaNum(statusData.nirsEtA));
                $("#nirsEtD").text(HmUtil.commaNum(statusData.nirsEtD));
                $("#klidCdM").text(HmUtil.commaNum(statusData.klidCdM));
                $("#klidCdA").text(HmUtil.commaNum(statusData.klidCdA));
                $("#klidCdD").text(HmUtil.commaNum(statusData.klidCdD));
                $("#klidDdM").text(HmUtil.commaNum(statusData.klidDdM));
                $("#klidDdA").text(HmUtil.commaNum(statusData.klidDdA));
                $("#klidDdD").text(HmUtil.commaNum(statusData.klidDdD));
                $("#klidHkM").text(HmUtil.commaNum(statusData.klidHkM));
                $("#klidHkA").text(HmUtil.commaNum(statusData.klidHkA));
                $("#klidHkD").text(HmUtil.commaNum(statusData.klidHkD));
                $("#klidEtM").text(HmUtil.commaNum(statusData.klidEtM));
                $("#klidEtA").text(HmUtil.commaNum(statusData.klidEtA));
                $("#klidEtD").text(HmUtil.commaNum(statusData.klidEtD));
                $("#gtAv").text(statusData.gtAv + "G");
                $("#gtMax").text(statusData.gtMax + "G");
                $("#ctAv").text(statusData.ctAv + "G");
                $("#ctMax").text(statusData.ctMax + "G");
                $("#ssAv").text(statusData.ssAv + "MB");
                $("#ssMax").text(statusData.ssMax + "MB");
                (statusData.gtRst == " ") ? $("#gtRst").text("-") : (statusData.gtRst == "1") ? $("#gtRst").text("양호") : $("#gtRst").text("-");
                (statusData.ctRst == " ") ? $("#ctRst").text("-") : (statusData.ctRst == "1") ? $("#ctRst").text("양호") : $("#ctRst").text("-");
                (statusData.ssRst == " ") ? $("#ssRst").text("-") : (statusData.ssRst == "1") ? $("#ssRst").text("양호") : $("#ssRst").text("-");
                $("#errSvr").text(HmUtil.commaNum(statusData.errSvr));
                $("#errNet").text(HmUtil.commaNum(statusData.errNet));
                $("#errStr").text(HmUtil.commaNum(statusData.errStr));
                $("#errBak").text(HmUtil.commaNum(statusData.errBak));
                $("#errHom").text(HmUtil.commaNum(statusData.errHom));
                (statusData.noti1 == " ") ? $("#noti1").text("-") : $("#noti1").text(statusData.noti1);
                (statusData.noti2 == " ") ? $("#noti2").text("-") : $("#noti2").text(statusData.noti2);
                (statusData.secu1 == " ") ? $("#secu1").text("-") : $("#secu1").text(statusData.secu1);
                (statusData.secu2 == " ") ? $("#secu2").text("-") : $("#secu2").text(statusData.secu2);
                $("#niraSum1").text(HmUtil.commaNum(Number(statusData.nirsCdM) + Number(statusData.nirsCdA) + Number(statusData.nirsCdD)));
                $("#niraSum2").text(HmUtil.commaNum(Number(statusData.nirsDdM) + Number(statusData.nirsDdA) + Number(statusData.nirsDdD)));
                $("#niraSum3").text(HmUtil.commaNum(Number(statusData.nirsHkM) + Number(statusData.nirsHkA) + Number(statusData.nirsHkD)));
                $("#niraSum4").text(HmUtil.commaNum(Number(statusData.nirsEtM) + Number(statusData.nirsEtA) + Number(statusData.nirsEtD)));
                $("#klidSum1").text(HmUtil.commaNum(Number(statusData.klidCdM) + Number(statusData.klidCdA) + Number(statusData.klidCdD)));
                $("#klidSum2").text(HmUtil.commaNum(Number(statusData.klidDdM) + Number(statusData.klidDdA) + Number(statusData.klidDdD)));
                $("#klidSum3").text(HmUtil.commaNum(Number(statusData.klidHkM) + Number(statusData.klidHkA) + Number(statusData.klidHkD)));
                $("#klidSum4").text(HmUtil.commaNum(Number(statusData.klidEtM) + Number(statusData.klidEtA) + Number(statusData.klidEtD)));
                $("#sum1").text(Number(statusData.nirsCdM) + Number(statusData.nirsDdM) + Number(statusData.nirsHkM) + Number(statusData.nirsEtM));
                $("#sum2").text(Number(statusData.klidCdM) + Number(statusData.klidDdM) + Number(statusData.klidHkM) + Number(statusData.klidEtM));
                $("#sum3").text(Number(statusData.nirsCdA) + Number(statusData.nirsDdA) + Number(statusData.nirsHkA) + Number(statusData.nirsEtA));
                $("#sum4").text(Number(statusData.klidCdA) + Number(statusData.klidDdA) + Number(statusData.klidHkA) + Number(statusData.klidEtA));
                $("#sum5").text(Number(statusData.nirsCdD) + Number(statusData.nirsDdD) + Number(statusData.nirsHkD) + Number(statusData.nirsEtD));
                $("#sum6").text(Number(statusData.klidCdD) + Number(statusData.klidDdD) + Number(statusData.klidHkD) + Number(statusData.klidEtD));
                $("#sum7").text(Number($("#sum1").text()) + Number($("#sum3").text()) + Number($("#sum5").text()));
                $("#sum8").text(Number($("#sum2").text()) + Number($("#sum4").text()) + Number($("#sum6").text()));
                $("#sum1").text(HmUtil.commaNum($("#sum1").text()));
                $("#sum2").text(HmUtil.commaNum($("#sum2").text()));
                $("#sum3").text(HmUtil.commaNum($("#sum3").text()));
                $("#sum4").text(HmUtil.commaNum($("#sum4").text()));
                $("#sum5").text(HmUtil.commaNum($("#sum5").text()));
                $("#sum6").text(HmUtil.commaNum($("#sum6").text()));
                $("#sum7").text(HmUtil.commaNum($("#sum7").text()));
                $("#sum8").text(HmUtil.commaNum($("#sum8").text()));
                var cnt = Number(statusData.workPs1) + Number(statusData.workPs2) + Number(statusData.workPs3);
                $("#totalCnt").text("총" + cnt + "명");
            } else {
                $("#workCp1").text("-");
                $("#workCp2").text("-");
                $("#workCp3").text("-");
                $("#workPs1").text("-");
                $("#workPs2").text("-");
                $("#workPs3").text("-");
                $("#workMng1").text("-");
                $("#workMng2").text("-");
                $("#workMng3").text("-");
                $("#workCon1").text("-");
                $("#workCon2").text("-");
                $("#workCon3").text("-");
                $("#nirsCdM").text("0");
                $("#nirsCdA").text("0");
                $("#nirsCdD").text("0");
                $("#nirsDdM").text("0");
                $("#nirsDdA").text("0");
                $("#nirsDdD").text("0");
                $("#nirsHkM").text("0");
                $("#nirsHkA").text("0");
                $("#nirsHkD").text("0");
                $("#nirsEtM").text("0");
                $("#nirsEtA").text("0");
                $("#nirsEtD").text("0");
                $("#klidCdM").text("0");
                $("#klidCdA").text("0");
                $("#klidCdD").text("0");
                $("#klidDdM").text("0");
                $("#klidDdA").text("0");
                $("#klidDdD").text("0");
                $("#klidHkM").text("0");
                $("#klidHkA").text("0");
                $("#klidHkD").text("0");
                $("#klidEtM").text("0");
                $("#klidEtA").text("0");
                $("#klidEtD").text("0");
                $("#gtAv").text("0G");
                $("#gtMax").text("0G");
                $("#ctAv").text("0G");
                $("#ctMax").text("0G");
                $("#ssAv").text("0MB");
                $("#ssMax").text("0MB");
                $("#gtRst").text("-");
                $("#ctRst").text("-");
                $("#ssRst").text("-");
                $("#errSvr").text("0");
                $("#errNet").text("0");
                $("#errStr").text("0");
                $("#errBak").text("0");
                $("#errHom").text("0");
                $("#noti1").text("-");
                $("#noti2").text("-");
                $("#secu1").text("-");
                $("#secu2").text("-");
                $("#niraSum1").text("0");
                $("#niraSum2").text("0");
                $("#niraSum3").text("0");
                $("#niraSum4").text("0");
                $("#klidSum1").text("0");
                $("#klidSum2").text("0");
                $("#klidSum3").text("0");
                $("#klidSum4").text("0");
                $("#sum1").text("0");
                $("#sum2").text("0");
                $("#sum3").text("0");
                $("#sum4").text("0");
                $("#sum5").text("0");
                $("#sum6").text("0");
                $("#sum7").text("0");
                $("#sum8").text("0");
                $("#totalCnt").text("총0명");
            }
        },

        // 중앙,지방 차트.
        refreshChart: function (sData) {
            var statusData = sData.getData();
            //차트 X축 이름.
            var categories = new Array();
            //중앙자동차단
            var nirsAsum = new Array();
            //중앙수동차단
            var nirsMsum = new Array();
            //지방자동차단
            var klidAsum = new Array();
            //지방수동차단
            var klidMsum = new Array();

            if (statusData.length > 0) {
                $.each(statusData, function (index, data) {
                    var newDate = new Date(data.datTime.substring(0, 4),Number(data.datTime.substring(5, 7))-1,Number(data.datTime.substring(8, 10))+1);
                    var date = newDate.getDate();
                    var month = newDate.getMonth()+1;
                    categories[index] = month + "월" + date + "일";
                    nirsAsum[index] = Number(data.nirsAsum);
                    nirsMsum[index] = Number(data.nirsMsum);
                    klidAsum[index] = Number(data.klidAsum);
                    klidMsum[index] = Number(data.klidMsum);
                });
            }
            Highcharts.setOptions({
                lang: {
                    thousandsSep: ','
                },
                chart: {
                    zoomType: 'xy',
                    backgroundColor: '#191919',
                },
                navigation: {
                    buttonOptions: {
                        enabled: false
                    }
                },
                credits: {
                    enabled: false
                },
                title: {
                    useHTML: true,
                    style: {
                        color: '#fff',
                        fontSize: '22px',
                        fontWeight: 'bold',
                        textAlign: 'center',
                    },

                },
                xAxis: [{
                    categories: categories,
                    gridLineWidth: 0,
                    labels: {
                        style: {
                            color: '#fff'
                        }
                    }
                }
                ],
                yAxis: [
                    { // Primary yAxis
                        labels: {
                            formatter: function () {
                                return HmUtil.commaNum(this.value);
                            },
                            style: {
                                color: '#fff'
                            }
                        },
                        title: {
                            text: '',
                            style: {
                                color: '#fff'
                            }
                        }
                    },
                    { // Secondary yAxis
                        title: {
                            text: '',
                            style: {
                                color: '#fff'
                            }
                        },
                        labels: {
                            formatter: function () {
                                return HmUtil.commaNum(this.value);
                            },
                            style: {
                                color: '#fff'
                            }
                        },
                        opposite: true,
                        /*
                          plotLines: [{
                               color: '#FF0000',
                               width: 2,
                               value: 4000,

                               label: {
                                   rotation: 0,
                                   y: 50,
                                   style: {
                                       fontStyle: 'italic'
                                   },
                                   text: 'Safe fat intake 65g/day'
                               }
                           }]*/
                    }
                ],
                tooltip: {
                    shared: true
                },
                legend: {
                    layout: 'horizontal',
                    align: 'right',
                    x: 10,
                    verticalAlign: 'top',
                    y: 5,
                    floating: true,
                    itemStyle: {color: '#fff'},
                    itemHoverStyle: {
                        color: '#FF0000'
                    }
                }
            });
            Highcharts.chart('gChart1', {
                title: {
                    text: '중앙행정기관 (탐지, 자동차단)',
                },
                series: [{
                    name: '자동차단',
                    type: 'spline',
                    data: nirsAsum,
                    tooltip: {},
                    color: '#982cab',
                    animation: {
                        duration: 1000
                    },
                    dataLabels: {
                        enabled: true,
                        color: '#982cab',
                    },
                    enableMouseTracking: true

                }, {
                    name: '수동차단',
                    type: 'spline',
                    yAxis: 1,
                    data: nirsMsum,
                    tooltip: {},
                    color: '#51a351',
                    animation: {
                        duration: 1000
                    },
                    dataLabels: {
                        enabled: true,
                        color: '#51a351',
                    },
                    enableMouseTracking: true
                },
                ]
            }); //chart

            Highcharts.chart('gChart2', {
                title: {
                    text: '지방자치단체 (탐지, 자동차단)',
                },
                series: [{
                    name: '자동차단',
                    type: 'spline',
                    data: klidAsum,
                    tooltip: {},
                    color: '#982cab',
                    animation: {
                        duration: 1000
                    },
                    dataLabels: {
                        enabled: true,
                        color: '#982cab',
                    },
                    enableMouseTracking: true

                }, {
                    name: '수동차단',
                    type: 'spline',
                    yAxis: 1,
                    data: klidMsum,
                    tooltip: {},
                    color: '#51a351',
                    animation: {
                        duration: 1000
                    },
                    dataLabels: {
                        enabled: true,
                        color: '#51a351',
                    },
                    enableMouseTracking: true
                },
                ]
            }); //chart
        }

    }
    return Mois4_statusController;
});
