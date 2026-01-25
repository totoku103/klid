var $dataGrid, $date1, $date2, $time;

var totalCnt = 0;
$(function() {
    Main.initVariable();
    Main.observe();
    Main.initDesign();
    Main.initData();
});

var Main = {
    /** variable */
    initVariable: function() {
        $dataGrid = $('#dataGrid'),
        //$cbPeriod = $('#cbPeriod'),
        $date1 = $('#date1'), $date2 = $('#date2'), $time = $('#time');

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
       // Master.createPeriodCondition($cbPeriod,$date1,$date2);

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
            displayMember: 'label', valueMember: 'value', selectedIndex: 6,
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


        HmGrid.create($dataGrid, {
            source: new $.jqx.dataAdapter(
                {
                    datatype: 'json',
                    url: $('#ctxPath').val() + '/api/main/rpt/reportCollection/getSecuListDetail',
                    beforeprocessing: function(data) {
                        if(data != null){
                            totalCnt = data.resultData.length;
                        }
                    }
                },
                {
                    formatData: function(data) {
                        $.extend(data, Main.getCommParams());
                        return data;
                    }
                }
            ),
       /*     height: '100%',*/
            pageable : true,
            pagermode: 'default',
            showtoolbar: false,
            /*rendertoolbar: function(toolbar) {
                HmGrid.titlerenderer(toolbar, '보안자료실');
            },*/
            columns:
                [
                    { text: '순번', datafield: 'seqNo', cellsalign : 'center', width: '5%',
                        cellsrenderer: function(row, column, value, rowData) {
                            return "<div style='margin-top: 4px; margin-right: 5px' class='jqx-center-align'>" + (totalCnt - row)*1 +"</div>";
                    }},
                    { text: '분류', datafield: 'cateName',cellsalign : 'center', width: '5%' },
                    { text: '제목', datafield: 'bultnTitle',cellsalign : 'left', width: '60%'},
                    { text: '소속', datafield: 'instNm',cellsalign : 'center', width: '10%'},
                    { text: '게시자', datafield: 'userName',cellsalign : 'center', width: '10%'},
                    { text: '등록일', datafield: 'regDate',cellsalign : 'center', width: '10%' }
                ]
        });

        $dataGrid.on('celldoubleclick', function (event) {
            var rowIdx = HmGrid.getRowIdx($dataGrid);
            var rowdata = HmGrid.getRowData($dataGrid, rowIdx);
            var params = { boardNo : rowdata.bultnNo };
            HmUtil.createPopup('/main/board/pResourceBoardContents.do', $('#hForm'), 'pResourceBoardContents', 1000, 750, params);
        });

    },

    /** init data */
    initData: function() {

    },

    search: function() {
        HmGrid.updateBoundData($dataGrid);
    },

    /** 공통 파라미터 */
    getCommParams: function() {
        //var startDt = HmDate.getDateStr($('#date1'))+HmDate.addZero($time.val())+'5959';
        //var endDt = HmDate.getDateStr($('#date2'))+HmDate.addZero($time.val())+'5959';

        var agoTime = ($time.val()-1) == -1 ? 23 : $time.val()-1;

        var startDt = new Date($date1.val());

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
            sInstCd:$("#sInstCd").val(),
            startDt: startDt,
            //time1: HmDate.getTimeStr($('#date1')),
            endDt: endDt,
            // time2: HmDate.getTimeStr($('#date2'))
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
        HmUtil.exportExcel(ctxPath + '/api/main/rpt/reportCollection/exportSecuList', params);
    }

};
