var $dailyGrid, $typeAccidentGrid, $dailyTotGrid,  $date1, $date2, $time;
// $dateRange,
//$rotationGrid,$DetectionGrid

$(function() {
    Main.initVariable();
    Main.observe();
    Main.initDesign();
    Main.initData();
});

var Main = {
    /** variable */
    initVariable: function() {
        $dailyGrid = $('#dailyGrid'), $typeAccidentGrid = $('#typeAccidentGrid'), $dailyTotGrid = $('#dailyTotGrid');
         $date1 = $('#date1'), $date2 = $('#date2'), $time = $('#time');
        // $dateRange = $('#dateRange'),

         if($('#sAuthMain').val()=='AUTH_MAIN_4'){
            $('#btnExport').css('display','none');
         }
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

        if($("#sAuthMain").val()=='AUTH_MAIN_4'){
            $("#btnExport").css('display','none');
        }

        var toDate = new Date();
        var fromDate = new Date();
        $('#splitter').jqxSplitter({ width: '99.7%', height: '100%', orientation: 'horizontal', theme: jqxTheme, panels: [{ size: '50%', collapsible: false }, { size: '40%' }] });
        $('#splitterSub').jqxSplitter({ width: '100%', height: '100%', orientation: 'vertical', theme: jqxTheme, showSplitBar: false, splitBarSize: 40, resizable: false, panels: [{ size: '50%' }, { size: '50%' }] });
        
        //타임인풋생성
        $date1.jqxDateTimeInput({ width: '100px', height: '21px', formatString: "yyyy-MM-dd", theme: jqxTheme , culture: 'ko-KR'});
        $date2.jqxDateTimeInput({ width: '100px', height: '21px', formatString: "yyyy-MM-dd", theme: jqxTheme , culture: 'ko-KR'});

        // 올해 1월1일
        toDate.setFullYear(toDate.getFullYear(),0,1);

        //날짜 셋팅
        $date1.jqxDateTimeInput('setDate', toDate);
        $date2.jqxDateTimeInput('setDate', fromDate);

        //일치 생성
        // $dateRange.jqxDropDownList({ width: 60, height: 21, theme: jqxTheme, autoDropDownHeight: true,
        //     displayMember: 'label', valueMember: 'value', selectedIndex: 0,
        //     source: [
        //         { label: '1일치', value: 1 },
        //         { label: '2일치', value: 2 },
        //         { label: '3일치', value: 3 },
        //         { label: '4일치', value: 4 },
        //         { label: '5일치', value: 5 },
        //         { label: '6일치', value: 6 },
        //         { label: '7일치', value: 7 },
        //         { label: '8일치', value: 8 },
        //         { label: '9일치', value: 9 },
        //         { label: '10일치', value: 10 },
        //         { label: '11일치', value: 11 }
        //     ]
        // });
        var selectedIndex=0;
        if($("#sAuthMain").val()=='AUTH_MAIN_3'||$("#sAuthMain").val()=='AUTH_MAIN_4'){
            selectedIndex=0;
        }else if($("#sAuthMain").val()=='AUTH_MAIN_2'||$("#sAuthMain").val()=='AUTH_MAIN_1'){
            selectedIndex=6;
        }

        //시간 생성
        $time.jqxDropDownList({ width: 50, height: 21, theme: jqxTheme, autoDropDownHeight: true,
            displayMember: 'label', valueMember: 'value', selectedIndex: selectedIndex,
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

       // $('#bSplitter').jqxSplitter({ width: '100%', height: '30%', orientation: 'vertical', theme: jqxTheme, panels: [{ size: '50%' }, { size: '50%' }] });

        // HmGrid.create($rotationGrid, {
        //     source: new $.jqx.dataAdapter(
        //         {
        //             datatype: 'json',
        //             // url: $('#ctxPath').val() + '/main/rpt/reportDailyState/getRotationList.do'
        //         },
        //         {
        //             formatData: function(data) {
        //                 $.extend(data, Main.getCommParams());
        //                 return data;
        //             }
        //         }
        //     ),
        //     height: '30%',
        //     pageable: false,
        //     showtoolbar: true,
        //     columns:
        //         [
        //             { text: '근무자', datafield: 'evtName' },
        //             { text: '근무시간', datafield: 'errCnt', width: 500 },
        //             { text: '비고', datafield: 'errTime', width: 500, cellsrenderer: HmGrid.cTimerenderer }
        //         ]
        // }, CtxMenu.NONE);

        // 일일사고처리
        HmGrid.create($dailyGrid, {
            source: new $.jqx.dataAdapter(
                {
                    datatype: 'json',
                    url: $('#ctxPath').val() + '/api/main/rpt/reportDailyState/getDailyList'
                },
                {
                    formatData: function(data) {
                        $.extend(data, Main.getCommParams());
                        return data;
                    }
                }
            ),
            height: '100%',
            pageable: false,
            showtoolbar: true,
            rendertoolbar: function(toolbar) {
                HmGrid.titlerenderer(toolbar, '일일사고처리');
            },
            columns:
                [
                    { text: '등록', datafield: 'total_cnt', cellsalign : 'right',width: '10%', cellsrenderer:function (row, datafield, value,rowData) {

                        return "<div style='margin-top: 4px; margin-right: 5px' class='jqx-right-align'>" + HmUtil.commaNum(value)  + "</div>";
                    }},
                    { text: '처리완료', datafield: 'end_cnt',cellsalign : 'right',minwidth: '100',cellsrenderer:function (row, datafield, value,rowData) {
                        var tEndCnt = $dailyGrid.jqxGrid('getrowdata', row).t_end_cnt;

                        return "<div style='margin-top: 4px; margin-right: 5px' class='jqx-right-align'>" + HmUtil.commaNum(value) + "(" + tEndCnt + ")</div>";
                    }},
                    { text: '처리중', datafield: 'ing_cnt', cellsalign : 'right',minwidth: '100', cellsrenderer:function (row, datafield, value,rowData) {
                        return "<div style='margin-top: 4px; margin-right: 5px' class='jqx-right-align'>" + HmUtil.commaNum(value) + "</div>";
                    }}
                ]
        }, CtxMenu.NONE);

        // 사고처리누계
        HmGrid.create($dailyTotGrid, {
            source: new $.jqx.dataAdapter(
                {
                    datatype: 'json',
                    url: $('#ctxPath').val() + '/api/main/rpt/reportDailyState/getDailyTotList'
                },
                {
                    formatData: function(data) {
                        $.extend(data, Main.getCommParams());
                        return data;
                    }
                }
            ),
            height: '100%',
            pageable: false,
            showtoolbar: true,
            rendertoolbar: function(toolbar) {
                HmGrid.titlerenderer(toolbar, '사고처리누계');
            },
            columns:
                [
                    { text: '총계', datafield: 'total_cnt', cellsalign : 'right',width: '10%', cellsrenderer:function (row, datafield, value,rowData) {

                        return "<div style='margin-top: 4px; margin-right: 5px' class='jqx-right-align'>" + HmUtil.commaNum(value) +"</div>";
                    }},
                    { text: '처리완료', datafield: 'end_cnt',cellsalign : 'right',minwidth: '100', cellsrenderer :function (row, datafield, value,rowData) {
                        var totalCnt = $dailyTotGrid.jqxGrid('getrowdata', row).total_cnt;
                        var result = 0;
                        if(value == 0){
                            result = 0;
                        } else if(totalCnt == 0){
                            result =  0 ;
                        } else {
                            result = (value * 100 / totalCnt).toFixed(1);
                        }

                        return "<div style='margin-top: 4px; margin-right: 5px' class='jqx-right-align'>" + HmUtil.commaNum(value) + "("+ result + "%) </div>";
                    } },
                    { text: '처리중', datafield: 'ing_cnt', cellsalign : 'right',minwidth: '100', cellsrenderer:HmGrid.commaRenderer }
                ]
        }, CtxMenu.NONE);

        var hiddenColumn = [];

        if($("#sAuthMain").val()=='AUTH_MAIN_3'){
            hiddenColumn.push({ text: '구분', datafield: 'inci_type_nm',cellsalign : 'center',minwidth: '200px',
                    cellsrenderer:function (row, column, value, rowData) {
                        return '<div class="jqx-grid-cell-middle-align" style="margin-top: 2.5px;">'+value.replace(/[0-9]/g,"")+'</div>';
                    }
                },
                { text: '계', datafield: 'total_cnt', cellsalign : 'right',width: '10%', cellsrenderer:function (row, datafield, value,rowData) {
                    var rowdata = $typeAccidentGrid.jqxGrid('getrowdata', row);

                    return "<div style='margin-top: 4px; margin-right: 5px' class='jqx-right-align'>" + HmUtil.commaNum(value) + "</div>";
                }},
                { text: '본청', datafield: 'inci_type_inst5', cellsalign : 'right',width: '10%',hidden:false,cellsrenderer:HmGrid.commaRenderer},
                { text: '개발원', datafield: 'inci_type_inst1',cellsalign : 'right', width: '10%',cellsrenderer:HmGrid.commaRenderer},
                { text: '국정원', datafield: 'inci_type_inst2', cellsalign : 'right',width: '10%',cellsrenderer:HmGrid.commaRenderer},
                { text: '관리원', datafield: 'inci_type_inst3', cellsalign : 'right',width: '10%',cellsrenderer:HmGrid.commaRenderer},
                //{ text: '위험분석', datafield: 'inci_type_inst4', cellsalign : 'right',width: '10%'},
                { text: '누계', datafield: 'sums', cellsalign : 'right', width: '10%', cellsrenderer:HmGrid.commaRenderer });
        }else{
            hiddenColumn.push({ text: '구분', datafield: 'inci_type_nm',cellsalign : 'center',minwidth: '200px',
                    cellsrenderer:function (row, column, value, rowData) {
                        return '<div class="jqx-grid-cell-middle-align" style="margin-top: 2.5px;">'+value.replace(/[0-9]/g,"")+'</div>';
                    }
                },
                { text: '계', datafield: 'total_cnt', cellsalign : 'right',width: '10%', cellsrenderer:function (row, datafield, value,rowData) {
                    var rowdata = $typeAccidentGrid.jqxGrid('getrowdata', row);

                    return "<div style='margin-top: 4px; margin-right: 5px' class='jqx-right-align'>" + HmUtil.commaNum(value) + "</div>";
                }},
                { text: '본청', datafield: 'inci_type_inst5', cellsalign : 'right',width: '10%',hidden:true,cellsrenderer:HmGrid.commaRenderer},
                { text: '국정원악성코드', datafield: 'ncsc_code_cnt', cellsalign : 'right',width: '10%',hidden:true,cellsrenderer:HmGrid.commaRenderer},
                { text: '국정원기타', datafield: 'ncsc_etc_cnt', cellsalign : 'right',width: '10%',hidden:true,cellsrenderer:HmGrid.commaRenderer},
                { text: '개발원', datafield: 'inci_type_inst1',cellsalign : 'right', width: '10%',cellsrenderer:HmGrid.commaRenderer},
                { text: '국정원', datafield: 'inci_type_inst2', cellsalign : 'right',width: '10%',cellsrenderer:HmGrid.commaRenderer},
                { text: '관리원', datafield: 'inci_type_inst3', cellsalign : 'right',width: '10%',cellsrenderer:HmGrid.commaRenderer},
                //{ text: '위험분석', datafield: 'inci_type_inst4', cellsalign : 'right',width: '10%'},
                { text: '누계', datafield: 'sums', cellsalign : 'right', width: '10%', cellsrenderer:HmGrid.commaRenderer });
        }

            //유형별 사고내역
            HmGrid.create($typeAccidentGrid, {
                source: new $.jqx.dataAdapter(
                    {
                        datatype: 'json',
                        url: $('#ctxPath').val() + '/api/main/rpt/reportDailyState/getTypeAccidentList'
                    },
                    {
                        formatData: function(data) {
                            $.extend(data, Main.getCommParams());
                            return data;
                        }
                    }
                ),
                height: '100%',
                pageable : true,
                pagermode: 'default',
                showtoolbar: true,
                rendertoolbar: function(toolbar) {
                    HmGrid.titlerenderer(toolbar, '유형별 사고내역');
                },
                columns:hiddenColumn
            }, CtxMenu.NONE);



        // HmGrid.create($DetectionGrid, {
        //     source: new $.jqx.dataAdapter(
        //         {
        //             datatype: 'json',
        //             // url: $('#ctxPath').val() + '/main/rpt/reportDailyState/getDetectionList.do'
        //         },
        //         {
        //             formatData: function(data) {
        //                 $.extend(data, Main.getCommParams());
        //                 return data;
        //             }
        //         }
        //     ),
        //     height: '33%',
        //     pageable: false,
        //     showtoolbar: true,
        //     rendertoolbar: function(toolbar) {
        //         HmGrid.titlerenderer(toolbar, '탐지규칙 실적');
        //     },
        //     columngroups:
        //         [
        //             { text: '탐지규칙 검증현황', name: 'verificationStat', align: 'center' },
        //             { text: '탐지규칙 배포현황(검증확인)', name: 'VerificationCom', align: 'center' }
        //         ],
        //     columns:
        //         [
        //             { text: '구분', datafield: 'kind' },
        //             { text: '합계', columngroup: 'verificationStat', datafield: 'total', width: 80, cellsalign: 'right', cellsformat: 'n' },
        //             { text: '웹해킹', columngroup: 'verificationStat', datafield: 'jw', width: 80, cellsalign: 'right', cellsformat: 'n' },
        //             { text: '악성코드', columngroup: 'verificationStat', datafield: 'aj', width: 120, cellsrenderer: HmGrid.cTimerenderer },
        //             { text: '합계', columngroup: 'VerificationCom', datafield: 'th', width: 120, cellsrenderer: HmGrid.cTimerenderer },
        //             { text: '웹해킹', columngroup: 'VerificationCom', datafield: 'wh', width: 120, cellsrenderer: HmGrid.cTimerenderer },
        //             { text: '악성코드', columngroup: 'VerificationCom', datafield: 'code_c', width: 120, cellsrenderer: HmGrid.cTimerenderer },
        //             { text: '누계', datafield: 'sum', width: 120, cellsrenderer: HmGrid.cTimerenderer }
        //         ]
        // }, CtxMenu.NONE);

    },

    /** init data */
    initData: function() {

    },

    search: function() {
        if($date1.val()>=$date2.val()){
            alert('누계일자가 검색일자보다 작아야 합니다.')
        }else{
            HmGrid.updateBoundData($dailyGrid);
            HmGrid.updateBoundData($dailyTotGrid);
            HmGrid.updateBoundData($typeAccidentGrid);
        }
    },

    /** 공통 파라미터 */
    getCommParams: function() {

        var agoTime = ($time.val()-1) == -1 ? 23 : $time.val()-1;

        var startDt = new Date($date2.val());
        // startDt.setDate(startDt.getDate() - parseInt($dateRange.val()));

        var endDt= new Date($date2.val());
        if($time.val() == 0){
            endDt = $.format.date(endDt, "yyyyMM")+HmDate.addZero((endDt.getDate()));
        } else {
            endDt = Main.date_add(endDt,1);
        }

        startDt =  $.format.date(startDt, "yyyyMMdd");
        var startNcscDt = startDt+'150000';
        var endNcscDt = endDt+'145959';

        startDt = startDt+HmDate.addZero($time.val())+'0000';
        // var endDt = HmDate.getDateStr($('#date2'));//+HmDate.addZero($time.val())+'0000';
        // var endDt = HmDate.getDateStr($('#date2'))+HmDate.addZero($time.val()-1)+'5959';
        endDt = endDt+HmDate.addZero(agoTime)+'5959';

        var report_type="0";
        if($('#sAuthMain').val()=='AUTH_MAIN_2'||$('#sAuthMain').val()=='AUTH_MAIN_1'){
            var report_type="1";
        }else if($('#sAuthMain').val()=='AUTH_MAIN_3'){
            var report_type="2";
        }else if($('#sAuthMain').val()=='AUTH_MAIN_4'){
            var report_type="3";
        }

        var sumEndDt = new Date($date2.val());
        if($time.val() == 0){
            sumEndDt = $.format.date(sumEndDt, "yyyyMM")+HmDate.addZero((sumEndDt.getDate()));
        } else {
            sumEndDt = Main.date_add(sumEndDt,1);
        }
        sumEndDt = sumEndDt+HmDate.addZero(agoTime)+'5959';

        var sYear = $.format.date(new Date($date2.val()),"yyyyMMdd");
        var params = {
            atype: Main.getDates(),
            sInstCd : Number($('#sInstCd').val()),
            sAuthMain : $('#sAuthMain').val(),
            startDt : startDt,
            endDt: endDt,
            sumDay: HmDate.getDateStr($('#date1'))+HmDate.addZero($time.val())+'0000',
            sumEndDt:sumEndDt,
            // days:HmDate.addZero($dateRange.val()),
            startNcscDt:startNcscDt,
            endNcscDt:endNcscDt,
            instCd:$('#sInstCd').val(),
            sYear : sYear,
            reportType: report_type
        }

        return params;
    },

    /** export */
    exportRpt: function() {
        var hwpParams = {
            dailyGrid:$dailyGrid.jqxGrid('source').originaldata,
            dailyTotGrid:$dailyTotGrid.jqxGrid('source').originaldata,
            typeAccidentGrid:$typeAccidentGrid.jqxGrid('source').originaldata,
        };

        $.extend(hwpParams, Main.getCommParams());

        HmUtil.exportHwp(ctxPath + '/api/main/rpt/reportDailyState/makeReportDailyStateDownload', hwpParams);
    },

    date_add: function(sDate, nDays){
      var result = new Date(sDate);
      result.setDate(result.getDate()+nDays);
      result =$.format.date(result, "yyyyMMdd");
      return result;
    },

    returnTwo: function (str) {
        str="0"+str;
        return str.slice(-2);
    },
    getDates: function () {
        var today = new Date();
        var hhmmss = Main.returnTwo(today.getHours())+ Main.returnTwo(today.getMinutes())+ Main.returnTwo(today.getSeconds());
        if(hhmmss>="000000"&& hhmmss<="060000"){
            return 0;
        }
        return 1;
    },

};
