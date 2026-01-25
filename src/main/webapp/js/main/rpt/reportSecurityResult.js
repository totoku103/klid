var $totalGrid, $listGrid, $exceptlistGrid,  $date1,$date2, $time;
// $date1,
$(function() {
    Main.initVariable();
    Main.observe();
    Main.initDesign();
    Main.initData();
});

var Main = {
    /** variable */
    initVariable: function() {
        $totalGrid = $('#totalGrid'), $listGrid = $('#listGrid'), $exceptlistGrid = $('#exceptlistGrid');
         $date2 = $('#date2'), $time = $('#time'), $date1 = $('#date1');
        // $date1 = $('#date1'),

        if($('#sAuthMain').val()!='AUTH_MAIN_2'){
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

        var toDate = new Date();
        var fromDate = new Date();

        //타임인풋생성
        $date1.jqxDateTimeInput({ width: '100px', height: '21px', formatString: "yyyy-MM-dd", theme: jqxTheme ,culture: 'ko-KR'});
        $date2.jqxDateTimeInput({ width: '100px', height: '21px', formatString: "yyyy-MM-dd", theme: jqxTheme ,culture: 'ko-KR'});

        // 올해 1월1일
        toDate.setFullYear(toDate.getFullYear(),0,1);

        //날짜 셋팅
        $date1.jqxDateTimeInput('setDate', fromDate);
        $date2.jqxDateTimeInput('setDate', fromDate);

        //시간 생성
        $time.jqxDropDownList({ width: 50, height: 21, theme: jqxTheme, autoDropDownHeight: true,
            displayMember: 'label', valueMember: 'value', selectedIndex:15,
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

        $('#bSplitter').jqxSplitter({ width: '100%', height: '50%', orientation: 'vertical', theme: jqxTheme, panels: [{ size: '50%' }, { size: '50%' }] });

        HmGrid.create($totalGrid, {
            source: new $.jqx.dataAdapter(
                {
                    datatype: 'json',
                    url: $('#ctxPath').val() + '/api/main/rpt/reportSecurityResult/getResultTotal'
                },
                {
                    formatData: function(data) {
                        $.extend(data, Main.getCommParams());
                        return data;
                    }
                }
            ),
            height: '100%',
            width: '100%',
            pageable: false,
            showtoolbar: true,
            rendertoolbar: function(toolbar) {
                HmGrid.titlerenderer(toolbar, '전체현황');
            },
            columns:
                [
                    { text: '총 건수', datafield: 'totCnt', cellsalign : 'right',width:'15%', cellsrenderer:HmGrid.commaRenderer},
                    { text: '웜바이러스 건수', datafield: 'wormCnt', cellsalign : 'right', width:'15%', cellsrenderer:HmGrid.commaRenderer},
                    { text: '국가사이버안보센터', datafield: 'nisCnt', cellsalign : 'right', width:'15%', cellsrenderer:HmGrid.commaRenderer },
                    { text: '중앙지원센터', datafield: 'cntCnt', cellsalign : 'right', width:'15%', cellsrenderer:HmGrid.commaRenderer },
                    { text: '국가정보자원관리원', datafield: 'tngCnt', cellsalign : 'right', width:'15%', cellsrenderer:HmGrid.commaRenderer },
                    { text: '세부처리내용(웜바이러스 제외)', datafield: 'webCnt', cellsalign : 'right', width:'auto', cellsrenderer:HmGrid.commaRenderer}
                ]
        }, CtxMenu.NONE);

        HmGrid.create($listGrid, {
            source: new $.jqx.dataAdapter(
                {
                    datatype: 'json',
                    url: $('#ctxPath').val() + '/api/main/rpt/reportSecurityResult/getResultList'
                },
                {
                    formatData: function(data) {
                        $.extend(data, Main.getCommParams());
                        return data;
                    }
                }
            ),
            height: '100%',
            width: '100%',
            pageable : true,
            pagermode: 'default',
            showtoolbar: true,
            rendertoolbar: function(toolbar) {
                HmGrid.titlerenderer(toolbar, '웜바이러스현황');
            },
            columns:
                [
                    { text : 'NO', datafield : 'bultnNo', cellsalign : 'center', width : '5%' ,
                        cellsrenderer: function(row, column, value, rowData) {
                            return "<div style='margin-top: 4px; margin-right: 5px' class='jqx-center-align'>" + (row+1) +"</div>";
                        }
                    },
                    { text: '제목(탐지명)', datafield: 'inciDttTtlNm', cellsalign : 'center', minwidth:'100',
                        cellsrenderer: function(row, column, value, rowData){
                            var data = $listGrid.jqxGrid('getrowdata', row);
                            // console.log(data);

                            var str = value.split("[");
                            if(str.length>2)
                                value = data.inciTtl;

                            return '<div class="jqx-grid-cell-left-align" style="margin-top: 2.5px;">'+value+'</div>';
                        }
                    },
                    { text: '사고유형', datafield: 'attdTypCdNm', cellsalign : 'center', width:'150' },
                    { text: '신고기관', datafield: 'dclInstNm', cellsalign : 'center', width:'100'},
                    { text: '피해기관', datafield: 'dmgInstNm', cellsalign : 'center', width:'100' }
                ]
        }, CtxMenu.NONE);

        HmGrid.create($exceptlistGrid, {
            source: new $.jqx.dataAdapter(
                {
                    datatype: 'json',
                    url: $('#ctxPath').val() + '/api/main/rpt/reportSecurityResult/getResultExceptlist'
                },
                {
                    formatData: function(data) {
                        $.extend(data, Main.getCommParams());
                        return data;
                    }
                }
            ),
            height: '49.9%',
            pageable : true,
            pagermode: 'default',
            showtoolbar: true,
            rendertoolbar: function(toolbar) {
                HmGrid.titlerenderer(toolbar, '웜바이러스제외현황');
            },
            columns:
                [
                    { text : 'NO', datafield : 'bultnNo', cellsalign : 'center', width : '5%' ,
                        cellsrenderer: function(row, column, value, rowData) {
                            return "<div style='margin-top: 4px; margin-right: 5px' class='jqx-center-align'>" + (row+1) +"</div>";
                        }
                    },
                    { text: '사고번호', datafield: 'inciNo', cellsalign : 'center' , width: '16%'},
                    { text: '접수일시', datafield: 'inciAcpnDt', cellsalign : 'center' ,width: '16%' },
                    { text: '피해기관', datafield: 'instNm' , cellsalign : 'center' ,width: '200'},
                    { text: '사고유형', datafield: 'accdTypCdNm',cellsalign : 'center' , width: '250'},
                    { text: '공격IP', datafield: 'ipAddr', cellsalign : 'center' ,minwidth: '150' }
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

        HmGrid.updateBoundData($totalGrid);
        HmGrid.updateBoundData($listGrid);
        HmGrid.updateBoundData($exceptlistGrid);
    },

    getCommParams: function() {

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
            sInstCd : $("#sInstCd").val(),
            sAuthMain : $('#sAuthMain').val(),
            startDt : startDt,
            endDt: endDt
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
            totalGrid:$totalGrid.jqxGrid('source').originaldata,
            listGrid:$listGrid.jqxGrid('source').originaldata,
            exceptlistGrid:$exceptlistGrid.jqxGrid('source').originaldata,
            hwpStartDt:$('#date1').val(),
            hwpEndDt:$('#date2').val(),
            hwpTime:$('#time').val()
        };
        $.extend(hwpParams, Main.getCommParams());
        HmUtil.exportHwp(ctxPath + '/api/main/rpt/reportSecurityResult/makeReportSecurityDownload', hwpParams);

        // $.post(ctxPath + '/main/popup/rpt/pNcscAlert.do',
        //     function (result) {
        //         HmWindow.open($('#pwindow'), '국정원 보고서', result, 840, 500, 'pwindow_init', hwpParams);
        //         $('.jqx-window-modal').css("z-index", "799");
        //         $('#pwindow').css("z-index", "800");
        //     }
        // );

    },

};
