//  @파일설명 : 대외용 대시보드 유형별추이.
//
define(function (require) {
    var d3 = require('d3'),
        evtCntHTML = require('text!./Extctrl_evtCntHTML.jsp');

    function Extctrl_evtCntController(id) {
        this.id = id || 'extctrl_evtCnt';
    }

    Extctrl_evtCntController.prototype={
        getHTML: function () {
            return evtCntHTML.replace(/\#id/ig, this.id);
        },
        //위협이벤트갯수
        refreshInci : function (sData) {
            var data = sData.getInciData();
            var totalCnt = 0;
            $.each(data, function (idx, item) {
                totalCnt += item.evtCnt;
            });
            $('#{0}_inciCnt'.substitute(this.id)).text(HmUtil.commaNum(totalCnt));
        },
        //고위협공격시도 갯수
        refreshTbz : function (sData) {
            var data = sData.getTbzledgeData();
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


            //2019.08.19 추가 사고접수 유형별 집계카운트 추가
            var inciTypeDatas = sData.getInciTypeCnt();
            var webhackingCnt = 0;
            var ackcodeCnt = 0;
            var noAccessCnt = 0;
            var noServiceCnt = 0;
            var infoCnt = 0;

            for(var i=0; i < inciTypeDatas.length; i++){
                console.log(inciTypeDatas[i].typeCd + "    " +  inciTypeDatas[i].typeCnt)
                var typeCd = inciTypeDatas[i].typeCd;

                if(typeCd == '40'){ //웹취약점공격
                    webhackingCnt = inciTypeDatas[i].typeCnt;
                }else if(typeCd == '10'){ //악성코드
                    ackcodeCnt = inciTypeDatas[i].typeCnt;
                }else if(typeCd == '20'){ //비인가접근공격
                    noAccessCnt = inciTypeDatas[i].typeCnt;
                }else if(typeCd == '30'){ //서비스거부
                    noServiceCnt = inciTypeDatas[i].typeCnt;
                }else if(typeCd == '70'){
                    infoCnt = inciTypeDatas[i].typeCnt;
                }
            }

            Highcharts.chart("{0}_typeChart".substitute(this.id), {
                lang: {
                    thousandsSep: ','
                },
                title:false,
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
                    name: '웹해킹'+' '+webhackingCnt+'건',
                    data:webhacking
                }, {
                    name: '악성코드'+' '+ackcodeCnt+'건',
                    data: ackcode
                }, {
                    name: '비인가접근'+' '+noAccessCnt+'건',
                    data: noAccess
                }, {
                    name: '서비스거부'+' '+noServiceCnt+'건',
                    data: noService
                }, {
                    name: '정보수집'+' '+infoCnt+'건',
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
    return Extctrl_evtCntController;
});
