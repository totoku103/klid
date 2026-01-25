var $dailyGrid, $dailyTotGrid, $dateRange, $date1, $date2, $time;

$(function() {
    Main.initVariable();
    Main.observe();
    Main.initDesign();
    Main.initData();
});

var Main = {
    /** variable */
    initVariable: function() {
        $dailyGrid = $('#dailyGrid'), $dailyTotGrid = $('#dailyTotGrid');
        $dateRange = $('#dateRange'),
        $date1 = $('#date1'), $date2 = $('#date2'), $time = $('#time');

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
        // $('#mainSplitter').jqxSplitter({ width: '99.8%', height: '10.8%', orientation: 'horizon', theme: jqxTheme, panels: [{ size: 250, collapsible: false }, { size: '100%' }] });

        var toDate = new Date();
        var fromDate = new Date();

        //타임인풋생성
        $date1.jqxDateTimeInput({ width: '100px', height: '21px', formatString: "yyyy-MM-dd", theme: jqxTheme ,culture: 'ko-KR'});
        $date2.jqxDateTimeInput({ width: '100px', height: '21px', formatString: "yyyy-MM-dd", theme: jqxTheme ,culture: 'ko-KR'});

        // 올해 1월1일
        toDate.setFullYear(toDate.getFullYear(),0,1);

        //날짜 셋팅
        $date1.jqxDateTimeInput('setDate', toDate);
        $date2.jqxDateTimeInput('setDate', fromDate);

        //일치 생성
        $dateRange.jqxDropDownList({ width: 60, height: 21, theme: jqxTheme, autoDropDownHeight: true,
            displayMember: 'label', valueMember: 'value', selectedIndex: 0,
            source: [
                { label: '1일치', value: 0 },
                { label: '2일치', value: 1 },
                { label: '3일치', value: 2 },
                { label: '4일치', value: 3 },
                { label: '5일치', value: 4 },
                { label: '6일치', value: 5 },
                { label: '7일치', value: 6 },
                { label: '8일치', value: 7 },
                { label: '9일치', value: 8 },
                { label: '10일치', value: 9 },
                { label: '11일치', value: 10 }
            ]
        });

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

       // $('#bSplitter').jqxSplitter({ width: '100%', height: '100%', orientation: 'vertical', theme: jqxTheme, panels: [{ size: '50%' }, { size: '50%' }] });

        // 일일사고처리
        HmGrid.create($dailyGrid, {
            source: new $.jqx.dataAdapter(
                {
                    datatype: 'json',
                    datafields: [
                        { name: 'inst_nm',type: 'string' },
                        { name: 'total_cnt',    type: 'int' },
                        { name: 'end_cnt',    type: 'int' },
                        { name: 'ing_cnt',       type: 'int' }
                    ],
                    url: $('#ctxPath').val() + '/api/main/rpt/reportDailyInciState/getDailyList'
                },
                {
                    formatData: function(data) {
                        $.extend(data, Main.getCommParams());
                        return data;
                    }
                }
            ),
            height: '50%',
            pageable : true,
            pagermode: 'default',
            showtoolbar: true,
            rendertoolbar: function(toolbar) {
                HmGrid.titlerenderer(toolbar, '일일사고처리');
            },
            columns:
                [
                    { text: '구분', datafield: 'inst_nm', cellsalign : 'center', minwidth: '10' },
                    { text: '등록', datafield: 'total_cnt', cellsalign : 'right', minwidth: '30',cellsrenderer: HmGrid.commaRenderer},
                    { text: '처리완료', datafield: 'end_cnt', cellsalign : 'right', minwidth: '30',cellsrenderer :function (row, datafield, value,rowData) {
                        var totalCnt = $dailyGrid.jqxGrid('getrowdata', row).total_cnt;
                        var result = 0;
                        if(value == 0){
                            result = 0;
                        } else if(totalCnt == 0){
                            result =  0 ;
                        } else {
                            result = (value * 100 / totalCnt).toFixed(2);
                        }

                        return "<div style='margin-top: 4px; margin-right: 5px' class='jqx-right-align'>" + HmUtil.commaNum(value) + "("+ result + "%) </div>";
                    }},
                    { text: '처리중', datafield: 'ing_cnt', cellsalign : 'right', minwidth: '30',cellsrenderer: HmGrid.commaRenderer }
                ]
        }, CtxMenu.NONE);

        // 사고처리 누계
        HmGrid.create($dailyTotGrid, {
            source: new $.jqx.dataAdapter(
                {
                    datatype: 'json',
                    datafields: [
                        { name: 'inst_nm',type: 'string' },
                        { name: 'total_cnt',    type: 'int' },
                        { name: 'end_cnt',    type: 'int' },
                        { name: 'ing_cnt',       type: 'int' }
                    ],
                    url: $('#ctxPath').val() + '/api/main/rpt/reportDailyInciState/getDailyTotList'
                },
                {
                    formatData: function(data) {
                        $.extend(data, Main.getCommParams());
                        return data;
                    }
                }
            ),
            height: '46%',
            pageable : true,
            pagermode: 'default',
            showtoolbar: true,
            rendertoolbar: function(toolbar) {
                HmGrid.titlerenderer(toolbar, '사고처리 누계');
            },
            columns:
                [
                    { text: '구분', datafield: 'inst_nm', cellsalign : 'center', minwidth: '10' },
                    { text: '총계', datafield: 'total_cnt' , cellsalign : 'right' ,width: 'auto',cellsrenderer: HmGrid.commaRenderer },
                    { text: '처리완료', datafield: 'end_cnt' , cellsalign : 'right' , width: '30%',cellsrenderer :function (row, datafield, value,rowData) {
                        var totalCnt = $dailyTotGrid.jqxGrid('getrowdata', row).total_cnt;
                        var result = 0;
                        if(value == 0){
                            result = 0;
                        } else if(totalCnt == 0){
                            result =  0 ;
                        } else {
                            result = (value * 100 / totalCnt).toFixed(2);
                        }

                        return "<div style='margin-top: 4px; margin-right: 5px' class='jqx-right-align'>" + HmUtil.commaNum(value) + "("+ result + "%) </div>";
                    } },
                    // { text: '처리율', datafield: 'total_cnt',  cellsalign : 'right', width: '30%',cellsrenderer: HmGrid.commaRenderer },
                    { text: '처리중', datafield: 'ing_cnt',  cellsalign : 'right', width: '30%',cellsrenderer: HmGrid.commaRenderer }
                ]
        }, CtxMenu.NONE);

    },

    /** init data */
    initData: function() {
    },

    /** 공통 파라미터 */
    getCommParams: function() {
        var startDt = new Date($date2.val());
        //startDt =  $.format.date(startDt, "yyyyMMdd");
        var agoTime = ($time.val()-1)==-1?23:$time.val()-1;
        //startDt = startDt+HmDate.addZero(agoTime)+'5959';
        var endDate = new Date($date2.val());
        endDate.setDate(endDate.getDate() - parseInt($dateRange.val()));
        endDate =  $.format.date(endDate, "yyyyMMdd");
        endDate = endDate+HmDate.addZero($time.val())+'0000';

        if($time.val() == 0){
            startDt = $.format.date(startDt, "yyyyMM")+HmDate.addZero((startDt.getDate()));
        } else {
            startDt = Main.date_add(startDt,1);
        }

        var sumEndDt = new Date($date2.val());
        if($time.val() == 0){
            sumEndDt = $.format.date(sumEndDt, "yyyyMM")+HmDate.addZero((sumEndDt.getDate()));
        } else {
            sumEndDt = Main.date_add(sumEndDt,1);
        }

        startDt = startDt+HmDate.addZero(agoTime)+'5959'
        sumEndDt = sumEndDt+HmDate.addZero(agoTime)+'5959';

        var params = {
            sumStartDt: HmDate.getDateStr($('#date1'))+HmDate.addZero($time.val())+'0000',
            sumEndDt: sumEndDt,
            startDt: startDt,
            endDt: endDate,
            sAuthMain:$('#sAuthMain').val(),
            instCd: $('#sInstCd').val(),
            localCd:$('#sLocalCd').val()
        };

        return params;
    },

    search: function() {
        if($date1.val()>$date2.val()){
            alert('누계일자가 검색일자보다 작아야 합니다.')
        }else {
            HmGrid.updateBoundData($dailyGrid);
            HmGrid.updateBoundData($dailyTotGrid);
        }
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
            dailyGrid:$dailyGrid.jqxGrid('source').originaldata,
            dailyTotGrid:$dailyTotGrid.jqxGrid('source').originaldata
        };
        $.extend(hwpParams, Main.getCommParams());

        HmUtil.exportHwp(ctxPath + '/api/main/rpt/reportDailyInciState/makeReportDailyInciStateDownload', hwpParams);

    }

};
