var $detailGrid, $cbPeriod, $date1, $date2;
$(function() {
    Main.initVariable();
    Main.observe();
    Main.initDesign();
    Main.initData();
});

var Main = {
    /** variable */
    initVariable: function() {
        $detailGrid = $('#detailGrid');
            $cbPeriod = $('#cbPeriod'),
            $date1 = $('#date1'), $date2 = $('#date2');

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
        var imagerenderer = function (row, datafield, value) {
            var code = value;
            if(value == ''){
                code = 0;
            };
            var cell = "<div style='margin-top: 2px' class='jqx-center-align'>";
            cell += '<img alt="processIcon" height="18" width="52" src="../../img/codeImg/code_' + code + '.png"/>';
            cell += "</div>";
            return cell;
        };
        // $('#mainSplitter').jqxSplitter({ width: '99.8%', height: '10.8%', orientation: 'horizon', theme: jqxTheme, panels: [{ size: 250, collapsible: false }, { size: '100%' }] });
        Master.createPeriodCondition($cbPeriod,$date1,$date2);
        $date1.jqxDateTimeInput({formatString: 'yyyy-MM-dd'});
        $date2.jqxDateTimeInput({formatString: 'yyyy-MM-dd'});

        //사고유형
        var accdTypCd = new Array();
        $.ajax({
            type: 'GET',
            url: ctxPath + '/api/code/getCommonCode',
            data: {comCode1: '3002' , codeLvl: '2'},
            async: false,
            success: function (data) {
                accdTypCd.push({label: '전체', value: ''});
                $.each(data.resultData, function (index, data) {
                    accdTypCd.push({label: data.codeName, value: data.comCode2})
                });
            }
        });
        $('#srchAccdTypCd').jqxDropDownList({source: accdTypCd, width: 140, height:20 ,autoDropDownHeight: true, selectedIndex : 0 })

        //처리상태
        var inciPrcsStatCd = new Array();
        $.ajax({
            type: 'GET',
            url: ctxPath + '/api/code/getCommonCode',
            data: {comCode1: '3001' , codeLvl: '2'},
            async: false,
            success: function (data) {
                inciPrcsStatCd.push({label: '전체', value: ''});
                $.each(data.resultData, function (index, data) {
                    inciPrcsStatCd.push({label: data.codeName, value: data.comCode2})
                });
            }
        });
        $('#srchInciPrcsStatCd').jqxDropDownList({source: inciPrcsStatCd, width: 140, height:20 ,autoDropDownHeight: true, selectedIndex : 0 })

        //우선순위
        var inciPrtyCd = new Array();
        $.ajax({
            type: 'GET',
            url: ctxPath + '/api/code/getCommonCode',
            data: {comCode1: '3006' , codeLvl: '2'},
            async: false,
            success: function (data) {
                inciPrtyCd.push({label: '전체', value: ''});
                $.each(data.resultData, function (index, data) {
                    inciPrtyCd.push({label: data.codeName, value: data.comCode2})
                });
            }
        });
        $('#srchInciPrtyCd').jqxDropDownList({source: inciPrtyCd, width: 120, height:20 ,autoDropDownHeight: true, selectedIndex : 0 })

        HmGrid.create($detailGrid, {
            source: new $.jqx.dataAdapter(
                {
                    datatype: 'json',
                    url: $('#ctxPath').val() + '/api/main/rpt/reportInciDetail/getDetailList'
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
            columns:
                [
                    { text: '순번', datafield: 'seqNo', width: '5%' },
                    { text: '접수일자', datafield: 'inciAcpnDt', width: '10%' },
                    { text: '사고번호', datafield: 'inciNo',  width: '10%'},
                    { text: '접수기관', datafield: 'instNm', width: '10%'},
                    {text: '제목(탐지명)',    datafield: 'inciTtlDtt', minwidth: '10%', cellsalign: 'left', editable: false,columnsreorder: true,
                        cellsrenderer: function(row, column, value, rowData){
                            var data = $detailGrid.jqxGrid('getrowdata', row);

                            var str = value.split("[");
                            if(str.length>2)
                                value = data.inciTtl;

                            return '<div class="jqx-grid-cell-left-align" style="margin-top: 2.5px;">'+value+'</div>';
                        }
                    },
                    { text: '사고유형', datafield: 'accdTypeCdNm', width: '10%' },
                    { text: '접수자', datafield: 'dclCrgr', width: '10%' },
                    { text: '국가', datafield: 'nationNm', width: '10%' },
                    {text: '지원센터처리상태', datafield: 'inciPrcsStat', width: '6%', cellsalign: 'center', editable: false,columnsreorder: true,
                        cellsrenderer: imagerenderer
                    },
                    {text: '시도처리상태', datafield: 'transInciPrcsStat', width: '6%', cellsalign: 'center', editable: false,columnsreorder: true,
                        cellsrenderer: imagerenderer
                    },
                    {text: '시군구처리상태', datafield: 'transSidoPrcsStat', width: '6%', cellsalign: 'center', editable: false,columnsreorder: true,
                        cellsrenderer: imagerenderer
                    },
                    //{ text: '수정일자', datafield: 'inciUpdDt', width: '10%' },
                    { text: '우선순위', datafield: 'inciPrty', width: '5%' }
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
        HmGrid.updateBoundData($detailGrid);
    },

    getCommParams: function() {
        var params = {
            grpNo: 1,
            // recoInciCd      : $('#srchRecoInciCd').val(),
            inciPrcsStatCd  : $('#srchInciPrcsStatCd').val(),
            accdTypCd       : $('#srchAccdTypCd').val(),
            inciPrtyCd      : $('#srchInciPrtyCd').val(),
            inciTtl         : $('#sInciTtl').val(),
            inciNo          : $('#sInciNo').val(),
            dmgInstNm          : $('#srchDmgInstNm').val(),

            period          : $cbPeriod.val(),
            inciDclCont : $('#srchInciDclCont').val(), //사고내용
            inciInvsCont : $('#srchInciInvsCont').val(), //조사내용
            inciBelowCont : $('#srchInciBelowCont').val(), //시도의견
            weekYn : $('#srchWeekYn').val(),

            startDt: HmDate.getDateStr($('#date1')),
            time1: HmDate.getTimeStr($('#date1')),
            endDt: HmDate.getDateStr($('#date2')),
            time2: HmDate.getTimeStr($('#date2'))

        }

        return params;
    },

    /** export */
    exportRpt: function() {
        var hwpParams = {
            detailGrid:$detailGrid.jqxGrid('source').originaldata
        };
        $.extend(hwpParams, Main.getCommParams());

        HmUtil.exportHwp(ctxPath + '/api/main/rpt/reportInciDetail/makeReportWeeklyDownload', hwpParams);
    }

};
