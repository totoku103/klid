//  @파일설명 : 운영자용 관제실 > 침해카운트
//

define(function (require) {
    var d3 = require('d3'),
        evtCntHTML = require('text!./Extbrf_evtCntHTML.jsp');

    function Extbrf_evtCntController(id) {
        this.id = id || 'extbrf_evtCnt';
    }

    Extbrf_evtCntController.prototype = {
        getHTML: function () {
            return evtCntHTML.replace(/\#id/ig, this.id);
        },

        refreshInciType: function (model) {
            var data = model.getInciData();
            var $table = $('#{0}_inciType'.substitute(this.id));
            $table.find("tr").remove();
            var $frag = $(document.createDocumentFragment());
            var totalCnt = 0;
            $.each(data, function(idx, item) {
                totalCnt += item.evtCnt;
                var tr = $('<tr></tr>')
                            .append($('<td></td>', {class: 'TblTit', style: 'letter-spacing: -4px;'}).text(item.name || ''))
                            .append($('<td></td>', {class: 'ThrNum'}).text(HmUtil.commaNum(item.evtCnt)));
                $frag.append(tr);
            });
            if(data.length) $table.append($frag);
            else $table.append($('<tr></tr>')); // 접수데이터가 옆으로 밀리는 현상때문에 추가
            $('#{0}_inciCnt'.substitute(this.id)).text(HmUtil.commaNum(totalCnt));
        },

        refreshTbzledge: function (model) {
            var data = model.getTbzledgeData();
            var $table = $('#{0}_tbzledge'.substitute(this.id));
            $table.find("tr").not(':first').remove();
            var $frag = $(document.createDocumentFragment());
            $.each(data, function(idx, item) {
                var tr = $('<tr></tr>')
                    .append($('<td></td>').text(item.type))
                    .append($('<td></td>').text(HmUtil.commaNum(item.totalCnt)))
                    .append($('<td></td>').text(HmUtil.commaNum(item.completeCnt)))
                    .append($('<td></td>').text(HmUtil.commaNum(item.processCnt)));
                $frag.append(tr);
            });
            if(data.length) $table.append($frag);
            $('#{0}_tbzledgeCnt'.substitute(this.id)).text(HmUtil.commaNum(data[0].totalCnt));
        },

        //유형별 추이 갯수.
        refreshTypeChart : function (sData) {
            //차트 X축 이름.
            var categories = ['00','01','02','03','04','05','06','07','08', '09','10','11','12','13','14','15','16','17','18','19','20','21','22','23'];
            //웹해킹
            var webhacking = sData.getWebhacking();
            //악성코드
            var ackcode = sData.getAckcode();
            //비인가접근
            var noAccess = sData.getNoAccess();
            //서비스거부
            var noService = sData.getNoService();
            //정보수집
            var info = sData.getInfo();

            Highcharts.chart("{0}_typeChart".substitute(this.id), {
                lang: {
                    thousandsSep: ','
                },
                title: false,
                chart: {
                    backgroundColor: 'transparent',
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
                    formatter: function(){
                        var s = '';
                        $.each(this.points, function(i,point){
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
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle',
                    itemStyle: {color: '#fff'},
                    itemHoverStyle: {
                        color: '#FF0000'
                    }
                },
                series: [{
                    name: '웹해킹',
                    data:webhacking
                }, {
                    name: '악성코드',
                    data: ackcode
                }, {
                    name: '비인가접근',
                    data: noAccess
                }, {
                    name: '서비스거부',
                    data: noService
                }, {
                    name: '정보수집',
                    data: info
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

    return Extbrf_evtCntController;
});
