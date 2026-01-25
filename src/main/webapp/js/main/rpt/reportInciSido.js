var $localGrid, $dateType, $date1, $date2, $rptChart,$time;

$(function() {
    Main.initVariable();
    Main.observe();
    Main.initDesign();
    Main.initData();
});

var Main = {
    /** variable */
    initVariable: function() {
        $rptChart = $('#rptChart'), $localGrid = $('#localGrid');
        $dateType = $('#dateType'),
            $date1 = $('#date1'), $date2 = $('#date2'),$time=$('#time');

    },

    /** add event */
    observe: function() {
        $('button').bind('click', function(event) {
            Main.eventControl(event);
        });
    },

    /** event handler */
    eventControl: function(event) {
        var curTarget = event.currentTarget;
        switch(curTarget.id) {
            case "btnSearch": this.search(); break;
            case "btnExport": this.exportRpt(); break;
        }
    },

    /** init design */
    initDesign: function() {
        $dateType.jqxDropDownList({ width: 100, height: 21, theme: jqxTheme, autoDropDownHeight: true,
            displayMember: 'label', valueMember: 'value', selectedIndex: 0,
            source: [
                { label: '접수일자', value: 'inci_acpn_dt' },
                { label: '완료일자', value: 'inci_upd_dt' }
            ]
        });
        HmDate.create($date1, $date2, HmDate.MONTH, 1);

        $date1.jqxDateTimeInput({formatString: 'yyyy-MM-dd'});
        $date2.jqxDateTimeInput({formatString: 'yyyy-MM-dd'});

        //시간 생성
        $time.jqxDropDownList({ width: 50, height: 21, theme: jqxTheme, autoDropDownHeight: true,
            displayMember: 'label', valueMember: 'value', selectedIndex:0,
            source: [
                { label: '00', value: 0 },
                { label: '01', value: 1 },
                { label: '02', value: 2 },
                { label: '03', value: 3 },
                { label: '04', value: 4 },
                { label: '05', value: 5 },
                { label: '06', value: 6 },
                { label: '07', value: 7 },
                { label: '08', value: 8 },
                { label: '09', value: 9 },
                { label: '10', value: 10 },
                { label: '11', value: 11 },
                { label: '12', value: 12 },
                { label: '13', value: 13 },
                { label: '14', value: 14 },
                { label: '15', value: 15 },
                { label: '16', value: 16 },
                { label: '17', value: 17 },
                { label: '18', value: 18 },
                { label: '19', value: 19 },
                { label: '20', value: 20 },
                { label: '21', value: 21 },
                { label: '22', value: 22 },
                { label: '23', value: 23 }
            ]
        });

        $('#bSplitter').jqxSplitter({ width: '100%', height: '100%', orientation: 'vertical', theme: jqxTheme, panels: [{ size: '70%' }, { size: '30%' }] })
            .on('resize', function () {
                HmHighchart.setResize($('#container').highcharts(), $('#container').width(), $('#container').height());
            });

        $(window).resize(function () {
            HmHighchart.setResize($('#container').highcharts(), $('#container').width(), $('#container').height());
        });
        
        // 좌측
        this.createChart();

        // 우측 그리드
        HmGrid.create($localGrid, {
            source: new $.jqx.dataAdapter(
                {
                    datatype: 'json',
                    url: $('#ctxPath').val() + '/api/main/rpt/reportInciLocal/getInciSidoList'
                },
                {
                    formatData: function(data) {
                        $.extend(data, Main.getCommParams());
                        return data;
                    }
                }
            ),
            pageable: false,
            showstatusbar: true,
            statusbarheight:40,
            showaggregates: true,
            columns:
                [
                    { text: '시도', datafield: 'name', cellsalign: 'center', width: '60%' },
                    { text: '건수', datafield: 'y', width: '40%', cellsalign: 'right', cellsrenderer: HmGrid.commaRenderer,
                        aggregates: ['sum'], aggregatesrenderer: HmGrid.agg_sumrenderer}
                ]
        }, CtxMenu.NONE);
    },

    /** init data */
    initData: function() {
    },

    search: function() {
        if($('#date1').val()>$('#date2').val()){
            var tempDate = $('#date1').val();
            $('#date1').val($('#date2').val());
            $('#date2').val(tempDate);
        }

        HmGrid.updateBoundData($localGrid);
        Main.createChart();
    },

    /* 차트 생성 */
    createChart: function(){
        var params = Main.getCommParams();

        Server.get('/api/main/rpt/reportInciLocal/getInciSidoList', {
            data: params,
            success : function(result) {
                if(result.length>0){
                    HmHighchart.create2('container', {
                        chart: {
                            type: 'column',
                            events: {
                                load: function (event) {
                                    HmHighchart.setResize(event.target, $('#container').width(), $('#container').height());
                                }
                            }
                        },
                        legend: {
                            enabled: false
                        },
                        tooltip: {
                            headerFormat: '',
                            pointFormat:  '<span style="color:{point.color}">●</span> {point.name}:<b>{point.y} 건</b>'
                        },
                        xAxis: {
                            type: 'category'
                        },
                        yAxis: {
                            min: 0,
                            allowDecimals: false,
                            title: {
                                text: ''
                            }
                        },
                        series: [{
                            name: '시군구',
                            colorByPoint: true,
                            data: result
                        }]
                    });

                    HmHighchart.create2('container2', {
                        chart: {
                            type: 'column',
                            events: {
                                load: function (event) {
                                    HmHighchart.setResize(event.target, $('#container2').width(), $('#container2').height());
                                }
                            }
                        },
                        legend: {
                            enabled: false
                        },
                        tooltip: {
                            headerFormat: '',
                            pointFormat:  '<span style="color:{point.color}">●</span> {point.name}:<b>{point.y} 건</b>'
                        },
                        xAxis: {
                            type: 'category'
                        },
                        yAxis: {
                            min: 0,
                            allowDecimals: false,
                            title: {
                                text: ''
                            }
                        },
                        series: [{
                            name: '시군구',
                            colorByPoint: true,
                            data: result
                        }]
                    });
                }
            }
        });
    },

    /** 공통 파라미터 */
    getCommParams: function() {
        /*var agoTime = ($time.val()-1)==-1?23:$time.val()-1;
        var params = {
            startDt : HmDate.getDateStr($('#date1'))+HmDate.addZero($time.val())+'0000',
            endDt: HmDate.getDateStr($('#date2'))+HmDate.addZero(agoTime)+'5959',
            dateType: $dateType.val(),
            //startDt: HmDate.getDateStr($('#date1')),
            time1: HmDate.getTimeStr($('#date1')),
            //endDt: HmDate.getDateStr($('#date2')),
            time2: HmDate.getTimeStr($('#date2')),
            instCd: $('#sInstCd').val()
        }*/


        // var params = {
        //     dateType: $dateType.val(),
        //     startDt: HmDate.getDateStr($('#date1')),
        //     time1: HmDate.getTimeStr($('#date1')),
        //     endDt: HmDate.getDateStr($('#date2')),
        //     time2: HmDate.getTimeStr($('#date2')),
        //     instCd: $('#sInstCd').val()
        // }
        //return params;
        var agoTime = ($time.val()-1) == -1 ? 23 : $time.val()-1;

        var startDt = new Date($date1.val());
        // startDt.setDate(startDt.getDate() - parseInt($dateRange.val()));

        var endDt=new Date($date2.val());
        if($time.val() == 0){
            endDt = $.format.date(endDt, "yyyyMM")+HmDate.addZero((endDt.getDate()));
        } else {
            endDt = Main.date_add(endDt,1);
            // endDt = $.format.date(endDt, "yyyyMM")+HmDate.addZero((endDt.getDate()+1));
        }
        startDt =  $.format.date(startDt, "yyyyMMdd");
        startDt = startDt+HmDate.addZero($time.val())+'0000';
        endDt = endDt+HmDate.addZero(agoTime)+'5959';

        var report_type="0";
        if($('#sAuthMain').val()=='AUTH_MAIN_2'||$('#sAuthMain').val()=='AUTH_MAIN_1'){
            var report_type="1";
        }else if($('#sAuthMain').val()=='AUTH_MAIN_3'){
            var report_type="2";
        }else if($('#sAuthMain').val()=='AUTH_MAIN_4'){
            var report_type="3";
        }

        var sYear = $.format.date(new Date($date2.val()),"yyyyMMdd");

        var params = {
            sAuthMain : $('#sAuthMain').val(),
            dateType: $dateType.val(),
            startDt : startDt,
            endDt: endDt,
            sumDay: HmDate.getDateStr($('#date1'))+HmDate.addZero($time.val())+'0000',
            sumEndDt:HmDate.getDateStr($('#date2'))+HmDate.addZero(agoTime)+'5959',
            instCd:$('#sInstCd').val(),
            sYear : sYear,
            reportType: report_type,
            sTitle:"시군구조회"
        };

        return params;
    },

    date_add: function(sDate, nDays){
        var result = new Date(sDate);
        result.setDate(result.getDate()+nDays);
        result =$.format.date(result, "yyyyMMdd");
        return result;
    },

    /** export */
    exportRpt: function() {

        var hwpParams = {
            localGrid:$localGrid.jqxGrid('source').originaldata
        };
        $.extend(hwpParams, Main.getCommParams());

        if($localGrid.jqxGrid('source').originaldata.length==0){
            alert("표시할 데이터가 없습니다.");
            return;
        }

        var fname = $.format.date(new Date(), 'yyyyMMddHHmmssSSS') + '.png';
        var chart = $('#container2').highcharts();
        var svg = chart.getSVG({
            exporting: {
                sourceWidth: chart.chartWidth,
                sourceHeight: chart.chartHeight
            }
        });

        var canvas = document.createElement('canvas');
        canvg(canvas, svg); //svg -> canvas draw
        var imgData = canvas.toDataURL("image/png"); // png이미지로 변환
        var ch_params = {fname:fname,imgData:imgData,sType:"sido"};

        Server.post('/api/main/rpt/reportInciLocal/saveHighChartImg', {
            data: ch_params,
            success: function(result) {
                $.extend(hwpParams, ch_params);
                HmUtil.exportHwp(ctxPath + '/api/main/rpt/reportInciLocal/exportReportInciLocal', hwpParams);
            }
        });
    }

};
