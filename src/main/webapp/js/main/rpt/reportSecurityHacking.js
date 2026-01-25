var $hackGrid, $date1, $date2, $time;

$(function() {
    Main.initVariable();
    Main.observe();
    Main.initDesign();
    Main.initData();
});

var Main = {
    /** variable */
    initVariable: function() {
        $hackGrid = $('#hackGrid')
        //$cbPeriod = $('#cbPeriod'),
        $time = $('#time'),$date1 = $('#date1'), $date2 = $('#date2');

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
        //Master.createPeriodCondition($cbPeriod,$date1,$date2);

        //구분
        // var instTypeCd = new Array();
        // $.ajax({
        //     type: 'GET',
        //     url: ctxPath + '/code/getCommonCode.do',
        //     data: {comCode1: '4010' , codeLvl: '2'},
        //     async: false,
        //     success: function (data) {
        //         instTypeCd.push({label: '전체', value: ''});
        //         $.each(data.resultData, function (index, data) {
        //             instTypeCd.push({label: data.codeName, value: data.comCode2})
        //         });
        //     }
        // });
        // $('#instTypeCd').jqxDropDownList({source: instTypeCd, width: 140, height:20 ,autoDropDownHeight: true, selectedIndex : 0 })
        var toDate = new Date();
        var fromDate = new Date();

        //타임인풋생성
        $date1.jqxDateTimeInput({width: '100px', height: '21px', formatString: "yyyy-MM-dd", theme: jqxTheme, culture: 'ko-KR'});
        $date2.jqxDateTimeInput({ width: '100px', height: '21px', formatString: "yyyy-MM-dd", theme: jqxTheme, culture: 'ko-KR'});

        // 올해 1월1일
        toDate.setFullYear(toDate.getFullYear(),0,1);

        //날짜 셋팅
        $date1.jqxDateTimeInput('setDate', toDate);
        $date2.jqxDateTimeInput('setDate', fromDate);

        //시간 생성
        $time.jqxDropDownList({ width: 50, height: 21, theme: jqxTheme, autoDropDownHeight: true,
            displayMember: 'label', valueMember: 'value', selectedIndex:6,
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

        HmGrid.create($hackGrid, {
            source: new $.jqx.dataAdapter(
                {
                    datatype: 'json',
                    url: $('#ctxPath').val() + '/api/main/rpt/reportCollection/getRetrieveSecurityHackingDetail'
                },
                {
                    formatData: function(data) {
                        $.extend(data, Main.getCommParams());
                        return data;
                    }
                }
            ),
          /*  height: '100%',*/
            pageable : true,
            pagermode: 'default',
            showtoolbar: false,
          /*  rendertoolbar: function(toolbar) {
                HmGrid.titlerenderer(toolbar, '해킹관리대장');
            },*/
            columns:
                [
                    { text: '순번', datafield: 'seqNo', cellsalign : 'center', width: '3%',
                        cellsrenderer: function(row, column, value, rowData) {
                            return "<div style='margin-top: 4px; margin-right: 5px' class='jqx-center-align'>" + (row+1) +"</div>";
                        }
                    },
                    { text: '사고번호', datafield: 'inciNo',cellsalign : 'center',  width: '7%' },
                    { text: '피해기관', datafield: 'dmgInstNm', cellsalign : 'center', width: '5%'},
                    { text: '해킹일자', datafield: 'hackingDt', cellsalign : 'center', width: '4%'},
                    { text: '사고대상', datafield: 'inciTarget',cellsalign : 'center',  width: '7%'},
                    { text: 'IP정보', datafield: 'ipAddress',cellsalign : 'center',  width: '7%' },
                    // { text: '사업소', datafield: 'instType', cellsalign : 'center', width: 120 },
                    { text: '도메인', datafield: 'domainNm', cellsalign : 'center', width: '7%' },
                    { text: '망구분', datafield: 'netDiv', cellsalign : 'center', width: '7%' },
                    { text: '내용', datafield: 'hackingCont',cellsalign : 'center',  width: '11%' },
                    { text: '공격유형', datafield: 'attackTypeNm',cellsalign : 'center',  width: '7%' },
                    { text: '비고', datafield: 'remark', cellsalign : 'center', width: '7%' },
                    { text: '언론보도', datafield: 'mediaReport', cellsalign : 'center', width: '7%' },
                    { text: '사고히스토리', datafield: 'inciHistory', cellsalign : 'center', width: '7%' },
                    { text: '분석히스토리', datafield: 'analysisHistory',cellsalign : 'center',  width: '7%' },
                    { text: '종결', datafield: 'inciPrcsStatNm',cellsalign : 'center',  width: '7%' }
                ]
        });

        $hackGrid.on('rowdoubleclick', function (event) {
            var rowdata = HmGrid.getRowData($hackGrid, event.args.rowindex);
            $.post(ctxPath + '/main/popup/acc/pAccidentDetail.do',
                function (result) {
                    HmWindow.open($('#pwindow'), '침해사고 신고 조회', result, 900, 950, 'pwindow_init', rowdata);
                }
            );
        });

    },

    /** init data */
    initData: function() {

    },

    search: function() {
        HmGrid.updateBoundData($hackGrid);
    },

    /** 공통 파라미터 */
    getCommParams: function() {
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

        var params = {
            startDt: startDt,
            endDt: endDt,
            // inst_type: $("#instTypeCd").val(),
            attackTypeNm: $("#attackText").val(),
            hackCont : $("#hackCont").val(),
            hackIp : $("#hackIp").val(),
            instNm : $("#hackInstNm").val(),
            inciNo : $("#hackInciNo").val()
        }
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
        var params = Main.getCommParams();
        HmUtil.exportExcel(ctxPath + '/api/main/rpt/reportCollection/exportRetrieveSecurityHacking', params);
    }

};
