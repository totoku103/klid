var $detailGrid, $detailGrid2, $detailGrid3, $detailGrid4, $detailGrid5, $detailGrid6, $detailGrid7, $detailGrid8, $detailGrid9,
     $time,$date1, $date2;

var totalCnt,totalCnt2,totalCnt3,totalCnt4,totalCnt5,totalCnt6,totalCnt7,totalCnt8,totalCnt9 = 0;

$(function() {
    Main.initVariable();
    Main.observe();
    Main.initDesign();
    Main.initData();
});

var Main = {
    /** variable */
    initVariable: function() {
        $detailGrid = $('#detailGrid'), $detailGrid2 = $('#detailGrid2'), $detailGrid3 = $('#detailGrid3'), $detailGrid4 = $('#detailGrid4'),
        $detailGrid5 = $('#detailGrid5'), $detailGrid6 = $('#detailGrid6'), $detailGrid7 = $('#detailGrid7'), $detailGrid8 = $('#detailGrid8'), $detailGrid9 = $('#detailGrid9');
        $time = $('#time'), $date1 = $('#date1'), $date2 = $('#date2');

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
            case "btnExcel": this.exportExcel(); break;
        }
    },

    /** init design */
    initDesign: function() {

        //Master.createPeriodCondition($cbPeriod,$date1,$date2);

        //사고유형
        var accd_typ_cd = new Array();
        $.ajax({
            type: 'GET',
            url: ctxPath + '/api/code/getCommonCode',
            data: {comCode1: '3002' , codeLvl: '2'},
            async: false,
            success: function (data) {
                accd_typ_cd.push({label: '전체', value: ''});
                $.each(data.resultData, function (index, data) {
                    accd_typ_cd.push({label: data.codeName, value: data.comCode2})
                });
            }
        });
        $('#accd_typ_cd').jqxDropDownList({source: accd_typ_cd, width: 140, height:20 ,autoDropDownHeight: true, selectedIndex : 0 })

        //공격국가
        // var attack_nation = new Array();
        // $.ajax({
        //     type: 'GET',
        //     url: ctxPath + '/main/env/nationIPMgmt/getNationMgmtList.do',
        //     data: {},
        //     async: false,
        //     success: function (data) {
        //         attack_nation.push({label: '전체', value: ''});
        //         $.each(data.resultData, function (index, data) {
        //             attack_nation.push({label: data.nationNm, value: data.nationCd})
        //         });
        //     }
        // });
        // $('#attack_nation').jqxComboBox({source: attack_nation, width: 140, height:20 ,selectedIndex : 0 })

        var toDate = new Date();
        var fromDate = new Date();

        //타임인풋생성
        $date1.jqxDateTimeInput({width: '100px', height: '21px', formatString: "yyyy-MM-dd", theme: jqxTheme, culture: 'ko-KR'});
        $date2.jqxDateTimeInput({ width: '100px', height: '21px', formatString: "yyyy-MM-dd", theme: jqxTheme, culture: 'ko-KR'});

        // 올해 1월1일
        // toDate.setFullYear(toDate.getFullYear(),0,1);

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

        HmGrid.create($detailGrid, {
            source: new $.jqx.dataAdapter(
                {
                    datatype: 'json',
                    beforeprocessing: function(data) {
                        if(data != null){
                            totalCnt = data.resultData.length;
                        }
                    },
                    url: $('#ctxPath').val() + '/api/main/rpt/reportCollection/getRetrieveIncidentDetail'
                },
                {
                    formatData: function(data) {
                        $.extend(data, Main.getCommParams());
                        $.extend(data, {type:'all'});
                        return data;
                    }
                }
            ),
            height: '30%',
            pageable : true,
            pagermode: 'default',
            showtoolbar: true,
            rendertoolbar: function(toolbar) {
                HmGrid.titlerenderer(toolbar, '접수전체현황');
            },
            columns:
                [
                    { text: 'No', width: '4%', datafield : 'num',pinned: true, editable: false , sortable: false, cellsalign: 'center', filterable: false,
                        cellsrenderer: function(row, column, value, rowData) {
                            return "<div style='margin-top: 4px; margin-right: 5px' class='jqx-center-align'>" + (totalCnt - row )*1 +"</div>";
                        }
                    },
                    { text: '사고번호', datafield: 'inciNo', cellsalign : 'center',  width: '8%'},
                    { text: '피해기관', datafield: 'dmgInstNm',cellsalign : 'center', width: '5%'},
                    { text: '사고처리기관', datafield: 'dclInstNm', cellsalign : 'center', width: '10%' },
                    {text: '제목(탐지명)',    datafield: 'inciTtlDtt', minwidth: 100, cellsalign: 'left', editable: false,columnsreorder: true,
                        cellsrenderer: function(row, column, value, rowData){
                            var data = $detailGrid.jqxGrid('getrowdata', row);

                            var str = value.split("[");
                            if(str.length>2)
                                value = data.inciTtl;

                            return '<div class="jqx-grid-cell-left-align" style="margin-top: 2.5px;">'+value+'</div>';
                        }
                    },
                    { text: '사고유형', datafield: 'attCodeName', cellsalign : 'center', width: '10%' },
                    { text: '접수날짜', datafield: 'inciAcpnDt', cellsalign : 'center', width: '8%' },
                    { text: '처리상태', datafield: 'inciPrcsStatCodeNm', cellsalign : 'center', width: '6%' },
                    { text: '마지막수정날짜', datafield: 'inciUpdDt', cellsalign : 'center', width: '8%' },
                    { text: '경과일', datafield: 'termDay', cellsalign : 'center', width: '4%',cellsrenderer: function(row, column, value, rowData){
                        return '<div class="jqx-center-align" style="margin-top: 2.5px;">'+value+'일'+'</div>';
                        }
                    },
                    { text: '경과시간', datafield: 'termTime', cellsalign : 'center', width: '4%',cellsrenderer: function(row, column, value, rowData){
                        return '<div class="jqx-center-align" style="margin-top: 2.5px;">'+value+'</div>';
                    }
                    },
                ]
        });

        HmGrid.create($detailGrid2, {
            source: new $.jqx.dataAdapter(
                {
                    datatype: 'json',
                    beforeprocessing: function(data) {
                        if(data != null){
                            totalCnt2 = data.resultData.length;
                        }
                    },
                    url: $('#ctxPath').val() + '/api/main/rpt/reportCollection/getRetrieveIncidentDetail'
                },
                {
                    formatData: function(data) {
                        $.extend(data, Main.getCommParams());
                        $.extend(data, {type:'closed'});
                        return data;
                    }
                }
            ),
            height: '30%',
            pageable : true,
            pagermode: 'default',
            showtoolbar: true,
            rendertoolbar: function(toolbar) {
                HmGrid.titlerenderer(toolbar, '종결현황');
            },
            columns:
                [
                    { text: 'No', width: '4%', datafield : 'num',pinned: true, editable: false , sortable: false, cellsalign: 'center', filterable: false,
                        cellsrenderer: function(row, column, value, rowData) {
                            return "<div style='margin-top: 4px; margin-right: 5px' class='jqx-center-align'>" + (totalCnt2 - row )*1 +"</div>";
                        }
                    },
                    { text: '사고번호', datafield: 'inciNo', cellsalign : 'center',  width: '8%'},
                    { text: '피해기관', datafield: 'dmgInstNm',cellsalign : 'center', width: '5%'},
                    { text: '사고처리기관', datafield: 'dclInstNm', cellsalign : 'center', width: '10%' },
                    {text: '제목(탐지명)',    datafield: 'inciTtlDtt', minwidth: 100, cellsalign: 'left', editable: false,columnsreorder: true,
                        cellsrenderer: function(row, column, value, rowData){
                            var data = $detailGrid2.jqxGrid('getrowdata', row);

                            var str = value.split("[");
                            if(str.length>2)
                                value = data.inciTtl;

                            return '<div class="jqx-grid-cell-left-align" style="margin-top: 2.5px;">'+value+'</div>';
                        }
                    },
                    { text: '사고유형', datafield: 'attCodeName', cellsalign : 'center', width: '10%' },
                    { text: '접수날짜', datafield: 'inciAcpnDt', cellsalign : 'center', width: '8%' },
                    { text: '처리상태', datafield: 'inciPrcsStatCodeNm', cellsalign : 'center', width: '6%' },
                    { text: '마지막수정날짜', datafield: 'inciUpdDt', cellsalign : 'center', width: '8%' },

                ]
        });

        HmGrid.create($detailGrid3, {
            source: new $.jqx.dataAdapter(
                {
                    datatype: 'json',
                    beforeprocessing: function(data) {
                        if(data != null){
                            totalCnt3 = data.resultData.length;
                        }
                    },
                    url: $('#ctxPath').val() + '/api/main/rpt/reportCollection/getRetrieveIncidentDetail'
                },
                {
                    formatData: function(data) {
                        $.extend(data, Main.getCommParams());
                        $.extend(data, {type:'abrogated'});
                        return data;
                    }
                }
            ),
            height: '30%',
            pageable : true,
            pagermode: 'default',
            showtoolbar: true,
            rendertoolbar: function(toolbar) {
                HmGrid.titlerenderer(toolbar, '폐기종결현황');
            },
            columns:
                [
                    { text: 'No', width: '4%', datafield : 'num',pinned: true, editable: false , sortable: false, cellsalign: 'center', filterable: false,
                        cellsrenderer: function(row, column, value, rowData) {
                            return "<div style='margin-top: 4px; margin-right: 5px' class='jqx-center-align'>" + (totalCnt3 - row )*1 +"</div>";
                        }
                    },
                    { text: '사고번호', datafield: 'inciNo', cellsalign : 'center',  width: '8%'},
                    { text: '피해기관', datafield: 'dmgInstNm',cellsalign : 'center', width: '5%'},
                    { text: '사고처리기관', datafield: 'dclInstNm', cellsalign : 'center', width: '10%' },
                    {text: '제목(탐지명)',    datafield: 'inciTtlDtt', minwidth: 100, cellsalign: 'left', editable: false,columnsreorder: true,
                        cellsrenderer: function(row, column, value, rowData){
                            var data = $detailGrid3.jqxGrid('getrowdata', row);

                            var str = value.split("[");
                            if(str.length>2)
                                value = data.inciTtl;

                            return '<div class="jqx-grid-cell-left-align" style="margin-top: 2.5px;">'+value+'</div>';
                        }
                    },
                    { text: '사고유형', datafield: 'attCodeName', cellsalign : 'center', width: '10%' },
                    { text: '접수날짜', datafield: 'inciAcpnDt', cellsalign : 'center', width: '8%' },
                    { text: '처리상태', datafield: 'inciPrcsStatCodeNm', cellsalign : 'center', width: '6%' },
                    { text: '마지막수정날짜', datafield: 'inciUpdDt', cellsalign : 'center', width: '8%' },
                ]
        });

        HmGrid.create($detailGrid4, {
            source: new $.jqx.dataAdapter(
                {
                    datatype: 'json',
                    beforeprocessing: function(data) {
                        if(data != null){
                            totalCnt4 = data.resultData.length;
                        }
                    },
                    url: $('#ctxPath').val() + '/api/main/rpt/reportCollection/getRetrieveIncidentDetail'
                },
                {
                    formatData: function(data) {
                        $.extend(data, Main.getCommParams());
                        $.extend(data, {type:'mistake'});
                        return data;
                    }
                }
            ),
            height: '30%',
            pageable : true,
            pagermode: 'default',
            showtoolbar: true,
            rendertoolbar: function(toolbar) {
                HmGrid.titlerenderer(toolbar, '오탐현황');
            },
            columns:
                [
                    { text: 'No', width: '4%', datafield : 'num',pinned: true, editable: false , sortable: false, cellsalign: 'center', filterable: false,
                        cellsrenderer: function(row, column, value, rowData) {
                            return "<div style='margin-top: 4px; margin-right: 5px' class='jqx-center-align'>" + (totalCnt4 - row )*1 +"</div>";
                        }
                    },
                    { text: '사고번호', datafield: 'inciNo', cellsalign : 'center',  width: '8%'},
                    { text: '피해기관', datafield: 'dmgInstNm',cellsalign : 'center', width: '5%'},
                    { text: '사고처리기관', datafield: 'dclInstNm', cellsalign : 'center', width: '10%' },
                    {text: '제목(탐지명)',    datafield: 'inciTtlDtt', minwidth: 100, cellsalign: 'left', editable: false,columnsreorder: true,
                        cellsrenderer: function(row, column, value, rowData){
                            var data = $detailGrid4.jqxGrid('getrowdata', row);

                            var str = value.split("[");
                            if(str.length>2)
                                value = data.inciTtl;

                            return '<div class="jqx-grid-cell-left-align" style="margin-top: 2.5px;">'+value+'</div>';
                        }
                    },
                    { text: '사고유형', datafield: 'attCodeName', cellsalign : 'center', width: '10%' },
                    { text: '접수날짜', datafield: 'inciAcpnDt', cellsalign : 'center', width: '8%' },
                    { text: '처리상태', datafield: 'inciPrcsStatCodeNm', cellsalign : 'center', width: '6%' },
                    { text: '마지막수정날짜', datafield: 'inciUpdDt', cellsalign : 'center', width: '8%' },
                ]
        });

        HmGrid.create($detailGrid5, {
            source: new $.jqx.dataAdapter(
                {
                    datatype: 'json',
                    beforeprocessing: function(data) {
                        if(data != null){
                            totalCnt5 = data.resultData.length;
                        }
                    },
                    url: $('#ctxPath').val() + '/api/main/rpt/reportCollection/getRetrieveIncidentDetail'
                },
                {
                    formatData: function(data) {
                        $.extend(data, Main.getCommParams());
                        $.extend(data, {type:'control'});
                        return data;
                    }
                }
            ),
            height: '30%',
            pageable : true,
            pagermode: 'default',
            showtoolbar: true,
            rendertoolbar: function(toolbar) {
                HmGrid.titlerenderer(toolbar, '주의관제현황');
            },
            columns:
                [
                    { text: 'No', width: '4%', datafield : 'num',pinned: true, editable: false , sortable: false, cellsalign: 'center', filterable: false,
                        cellsrenderer: function(row, column, value, rowData) {
                            return "<div style='margin-top: 4px; margin-right: 5px' class='jqx-center-align'>" + (totalCnt5 - row )*1 +"</div>";
                        }
                    },
                    { text: '사고번호', datafield: 'inciNo', cellsalign : 'center',  width: '8%'},
                    { text: '피해기관', datafield: 'dmgInstNm',cellsalign : 'center', width: '5%'},
                    { text: '사고처리기관', datafield: 'dclInstNm', cellsalign : 'center', width: '10%' },
                    {text: '제목(탐지명)',    datafield: 'inciTtlDtt', minwidth: 100, cellsalign: 'left', editable: false,columnsreorder: true,
                        cellsrenderer: function(row, column, value, rowData){
                            var data = $detailGrid5.jqxGrid('getrowdata', row);

                            var str = value.split("[");
                            if(str.length>2)
                                value = data.inciTtl;

                            return '<div class="jqx-grid-cell-left-align" style="margin-top: 2.5px;">'+value+'</div>';
                        }
                    },
                    { text: '사고유형', datafield: 'attCodeName', cellsalign : 'center', width: '10%' },
                    { text: '접수날짜', datafield: 'inciAcpnDt', cellsalign : 'center', width: '8%' },
                    { text: '처리상태', datafield: 'inciPrcsStatCodeNm', cellsalign : 'center', width: '6%' },
                    { text: '마지막수정날짜', datafield: 'inciUpdDt', cellsalign : 'center', width: '8%' },
                ]
        });

        HmGrid.create($detailGrid6, {
            source: new $.jqx.dataAdapter(
                {
                    datatype: 'json',
                    beforeprocessing: function(data) {
                        if(data != null){
                            totalCnt6 = data.resultData.length;
                        }
                    },
                    url: $('#ctxPath').val() + '/api/main/rpt/reportCollection/getRetrieveIncidentDetail'
                },
                {
                    formatData: function(data) {
                        $.extend(data, Main.getCommParams());
                        $.extend(data, {type:'sidoClosed'});
                        return data;
                    }
                }
            ),
            height: '30%',
            pageable : true,
            pagermode: 'default',
            showtoolbar: true,
            rendertoolbar: function(toolbar) {
                HmGrid.titlerenderer(toolbar, '시도종결현황');
            },
            columns:
                [
                    { text: 'No', width: '4%', datafield : 'num',pinned: true, editable: false , sortable: false, cellsalign: 'center', filterable: false,
                        cellsrenderer: function(row, column, value, rowData) {
                            return "<div style='margin-top: 4px; margin-right: 5px' class='jqx-center-align'>" + (totalCnt6 - row )*1 +"</div>";
                        }
                    },
                    { text: '사고번호', datafield: 'inciNo', cellsalign : 'center',  width: '8%'},
                    { text: '피해기관', datafield: 'dmgInstNm',cellsalign : 'center', width: '5%'},
                    { text: '사고처리기관', datafield: 'dclInstNm', cellsalign : 'center', width: '10%' },
                    {text: '제목(탐지명)',    datafield: 'inciTtlDtt', minwidth: 100, cellsalign: 'left', editable: false,columnsreorder: true,
                        cellsrenderer: function(row, column, value, rowData){
                            var data = $detailGrid6.jqxGrid('getrowdata', row);

                            var str = value.split("[");
                            if(str.length>2)
                                value = data.inciTtl;

                            return '<div class="jqx-grid-cell-left-align" style="margin-top: 2.5px;">'+value+'</div>';
                        }
                    },
                    { text: '사고유형', datafield: 'attCodeName', cellsalign : 'center', width: '10%' },
                    { text: '접수날짜', datafield: 'inciAcpnDt', cellsalign : 'center', width: '8%' },
                    { text: '개발원처리상태', datafield: 'inciPrcsStatCodeNm', cellsalign : 'center', width: '6%' },
                    { text: '시도처리상태', datafield: 'transInciPrcsStatCodeNm', cellsalign : 'center', width: '6%' },
                    { text: '마지막수정날짜', datafield: 'inciUpdDt', cellsalign : 'center', width: '8%' },
                ]
        });

        // HmGrid.create($detailGrid6, {
        //     source: new $.jqx.dataAdapter(
        //         {
        //             datatype: 'json',
        //             url: $('#ctxPath').val() + '/api/main/rpt/reportCollection/getRetrieveIncidentDetail'
        //         },
        //         {
        //             formatData: function(data) {
        //                 $.extend(data, Main.getCommParams());
        //                 $.extend(data, {type:'control'});
        //                 return data;
        //             }
        //         }
        //     ),
        //     height: '30%',
        //     pageable : true,
        //     pagermode: 'default',
        //     showtoolbar: true,
        //     rendertoolbar: function(toolbar) {
        //         HmGrid.titlerenderer(toolbar, '주의관제현황');
        //     },
        //     columns:
        //         [
        //             { text: '순번', datafield: 'seqNo', cellsalign : 'center', width: '2%'  },
        //             { text: '접수날짜', datafield: 'inciAcpnDts', cellsalign : 'center', width: '8%' },
        //             { text: '사고번호', datafield: 'inciNo', cellsalign : 'center',  width: '8%'},
        //             // { text: '피해기관', datafield: 'dmgInstNm',cellsalign : 'center', width: '5%'},
        //             { text: '사고처리기관', datafield: 'dclInstNm', cellsalign : 'center', width: '10%' },
        //             {text: '제목(탐지명)',    datafield: 'inciTtlDtt', minwidth: 100, cellsalign: 'left', editable: false,columnsreorder: true,
        //                 cellsrenderer: function(row, column, value, rowData){
        //                     var data = $detailGrid6.jqxGrid('getrowdata', row);
        //
        //                     var str = value.split("[");
        //                     if(str.length>2)
        //                         value = data.inciTtl;
        //
        //                     return '<div class="jqx-grid-cell-left-align" style="margin-top: 2.5px;">'+value+'</div>';
        //                 }
        //             },
        //             // { text: '탐지명', datafield: 'inciDttNm', cellsalign : 'center', minwidth: '10%' },
        //             { text: '사고유형', datafield: 'attCodeName', cellsalign : 'center', width: '10%' },
        //          /*   { text: '접수일자', datafield: 'inciAcpnDate', cellsalign : 'center', width: '7%' },
        //             { text: '접수일시', datafield: 'inciAcpnTime', cellsalign : 'center', width: '7%' },*/
        //             { text: '처리상태', datafield: 'inciPrcsStatNm', cellsalign : 'center', width: '6%' },
        //             { text: '조치결과', datafield: 'inciPrcsStatCodeNm', cellsalign : 'center',width: '6%' },
        //             { text: '접수자', datafield: 'dclCrgr',cellsalign : 'center', width: '6%' },
        //             { text: '국가', datafield: 'nationNm',cellsalign : 'center', width: '6%' },
        //             { text: '피해기관', datafield: 'dmgInstNm',cellsalign : 'center', width: '5%'},
        //             { text: '우선순위', datafield: 'prty',cellsalign : 'center', width: '6%' }
        //             // { text: '시군구', datafield: 'sigun', cellsalign : 'center',width: '6%' }
        //         ]
        // });
        //
        // HmGrid.create($detailGrid7, {
        //     source: new $.jqx.dataAdapter(
        //         {
        //             datatype: 'json',
        //             url: $('#ctxPath').val() + '/api/main/rpt/reportCollection/getRetrieveIncidentDetail'
        //         },
        //         {
        //             formatData: function(data) {
        //                 $.extend(data, Main.getCommParams());
        //                 $.extend(data, {type:'sidoCompleted'});
        //                 return data;
        //             }
        //         }
        //     ),
        //     height: '30%',
        //     pageable : true,
        //     pagermode: 'default',
        //     showtoolbar: true,
        //     rendertoolbar: function(toolbar) {
        //         HmGrid.titlerenderer(toolbar, '시도종결현황');
        //     },
        //     columns:
        //         [
        //             { text: '순번', datafield: 'seqNo', cellsalign : 'center', width: '2%'  },
        //             { text: '접수날짜', datafield: 'inciAcpnDts', cellsalign : 'center', width: '8%' },
        //             { text: '사고번호', datafield: 'inciNo', cellsalign : 'center',  width: '8%'},
        //             // { text: '피해기관', datafield: 'dmgInstNm',cellsalign : 'center', width: '5%'},
        //             { text: '사고처리기관', datafield: 'dclInstNm', cellsalign : 'center', width: '10%' },
        //             {text: '제목(탐지명)',    datafield: 'inciTtlDtt', minwidth: 100, cellsalign: 'left', editable: false,columnsreorder: true,
        //                 cellsrenderer: function(row, column, value, rowData){
        //                     var data = $detailGrid7.jqxGrid('getrowdata', row);
        //
        //                     var str = value.split("[");
        //                     if(str.length>2)
        //                         value = data.inciTtl;
        //
        //                     return '<div class="jqx-grid-cell-left-align" style="margin-top: 2.5px;">'+value+'</div>';
        //                 }
        //             },
        //             // { text: '탐지명', datafield: 'inciDttNm', cellsalign : 'center', minwidth: '10%' },
        //             { text: '사고유형', datafield: 'attCodeName', cellsalign : 'center', width: '10%' },
        //        /*     { text: '접수일자', datafield: 'inciAcpnDate', cellsalign : 'center', width: '7%' },
        //             { text: '접수일시', datafield: 'inciAcpnTime', cellsalign : 'center', width: '7%' },*/
        //             { text: '처리상태', datafield: 'inciPrcsStatNm', cellsalign : 'center', width: '6%' },
        //             { text: '조치결과', datafield: 'inciPrcsStatCodeNm', cellsalign : 'center',width: '6%' },
        //             { text: '접수자', datafield: 'dclCrgr',cellsalign : 'center', width: '6%' },
        //             { text: '국가', datafield: 'nationNm',cellsalign : 'center', width: '6%' },
        //             { text: '피해기관', datafield: 'dmgInstNm',cellsalign : 'center', width: '5%'},
        //             { text: '우선순위', datafield: 'prty',cellsalign : 'center', width: '6%' }
        //             // { text: '시군구', datafield: 'sigun', cellsalign : 'center',width: '6%' }
        //         ]
        // });
        //
        // HmGrid.create($detailGrid8, {
        //     source: new $.jqx.dataAdapter(
        //         {
        //             datatype: 'json',
        //             url: $('#ctxPath').val() + '/api/main/rpt/reportCollection/getRetrieveIncidentDetail'
        //         },
        //         {
        //             formatData: function(data) {
        //                 $.extend(data, Main.getCommParams());
        //                 $.extend(data, {type:'sidoMistake'});
        //                 return data;
        //             }
        //         }
        //     ),
        //     height: '30%',
        //     pageable : true,
        //     pagermode: 'default',
        //     showtoolbar: true,
        //     rendertoolbar: function(toolbar) {
        //         HmGrid.titlerenderer(toolbar, '시도오탐현황');
        //     },
        //     columns:
        //         [
        //             { text: '순번', datafield: 'seqNo', cellsalign : 'center', width: '2%'  },
        //             { text: '접수날짜', datafield: 'inciAcpnDts', cellsalign : 'center', width: '8%' },
        //             { text: '사고번호', datafield: 'inciNo', cellsalign : 'center',  width: '8%'},
        //             // { text: '피해기관', datafield: 'dmgInstNm',cellsalign : 'center', width: '5%'},
        //             { text: '사고처리기관', datafield: 'dclInstNm', cellsalign : 'center', width: '10%' },
        //             {text: '제목(탐지명)',    datafield: 'inciTtlDtt', minwidth: 100, cellsalign: 'left', editable: false,columnsreorder: true,
        //                 cellsrenderer: function(row, column, value, rowData){
        //                     var data = $detailGrid8.jqxGrid('getrowdata', row);
        //
        //                     var str = value.split("[");
        //                     if(str.length>2)
        //                         value = data.inciTtl;
        //
        //                     return '<div class="jqx-grid-cell-left-align" style="margin-top: 2.5px;">'+value+'</div>';
        //                 }
        //             },
        //             // { text: '탐지명', datafield: 'inciDttNm', cellsalign : 'center', minwidth: '10%' },
        //             { text: '사고유형', datafield: 'attCodeName', cellsalign : 'center', width: '10%' },
        //        /*     { text: '접수일자', datafield: 'inciAcpnDate', cellsalign : 'center', width: '7%' },
        //             { text: '접수일시', datafield: 'inciAcpnTime', cellsalign : 'center', width: '7%' },*/
        //             { text: '처리상태', datafield: 'inciPrcsStatNm', cellsalign : 'center', width: '6%' },
        //             { text: '조치결과', datafield: 'inciPrcsStatCodeNm', cellsalign : 'center',width: '6%' },
        //             { text: '접수자', datafield: 'dclCrgr',cellsalign : 'center', width: '6%' },
        //             { text: '국가', datafield: 'nationNm',cellsalign : 'center', width: '6%' },
        //             { text: '피해기관', datafield: 'dmgInstNm',cellsalign : 'center', width: '5%'},
        //             { text: '우선순위', datafield: 'prty',cellsalign : 'center', width: '6%' }
        //             // { text: '시군구', datafield: 'sigun', cellsalign : 'center',width: '6%' }
        //         ]
        // });
        //
        // HmGrid.create($detailGrid9, {
        //     source: new $.jqx.dataAdapter(
        //         {
        //             datatype: 'json',
        //             url: $('#ctxPath').val() + '/api/main/rpt/reportCollection/getRetrieveIncidentDetail'
        //         },
        //         {
        //             formatData: function(data) {
        //                 $.extend(data, Main.getCommParams());
        //                 $.extend(data, {type:'sidoControl'});
        //                 return data;
        //             }
        //         }
        //     ),
        //     height: '30%',
        //     pageable : true,
        //     pagermode: 'default',
        //     showtoolbar: true,
        //     rendertoolbar: function(toolbar) {
        //         HmGrid.titlerenderer(toolbar, '시도주의관제현황');
        //     },
        //     columns:
        //         [
        //             { text: '순번', datafield: 'seqNo', cellsalign : 'center', width: '2%'  },
        //             { text: '접수날짜', datafield: 'inciAcpnDts', cellsalign : 'center', width: '8%' },
        //             { text: '사고번호', datafield: 'inciNo', cellsalign : 'center',  width: '8%'},
        //             // { text: '피해기관', datafield: 'dmgInstNm',cellsalign : 'center', width: '5%'},
        //             { text: '사고처리기관', datafield: 'dclInstNm', cellsalign : 'center', width: '10%' },
        //             {text: '제목(탐지명)',    datafield: 'inciTtlDtt', minwidth: 100, cellsalign: 'left', editable: false,columnsreorder: true,
        //                 cellsrenderer: function(row, column, value, rowData){
        //                     var data = $detailGrid9.jqxGrid('getrowdata', row);
        //
        //                     var str = value.split("[");
        //                     if(str.length>2)
        //                         value = data.inciTtl;
        //
        //                     return '<div class="jqx-grid-cell-left-align" style="margin-top: 2.5px;">'+value+'</div>';
        //                 }
        //             },
        //             // { text: '탐지명', datafield: 'inciDttNm', cellsalign : 'center', minwidth: '10%' },
        //             { text: '사고유형', datafield: 'attCodeName', cellsalign : 'center', width: '10%' },
        //      /*       { text: '접수일자', datafield: 'inciAcpnDate', cellsalign : 'center', width: '7%' },
        //             { text: '접수일시', datafield: 'inciAcpnTime', cellsalign : 'center', width: '7%' },*/
        //             { text: '처리상태', datafield: 'inciPrcsStatNm', cellsalign : 'center', width: '6%' },
        //             { text: '조치결과', datafield: 'inciPrcsStatCodeNm', cellsalign : 'center',width: '6%' },
        //             { text: '접수자', datafield: 'dclCrgr',cellsalign : 'center', width: '6%' },
        //             { text: '국가', datafield: 'nationNm',cellsalign : 'center', width: '6%' },
        //             { text: '피해기관', datafield: 'dmgInstNm',cellsalign : 'center', width: '5%'},
        //             { text: '우선순위', datafield: 'prty',cellsalign : 'center', width: '6%' }
        //             // { text: '시군구', datafield: 'sigun', cellsalign : 'center',width: '6%' }
        //         ]
        // });
        //
        Main.doubleClickCell($detailGrid);
        Main.doubleClickCell($detailGrid2);
        Main.doubleClickCell($detailGrid3);
        Main.doubleClickCell($detailGrid4);
        Main.doubleClickCell($detailGrid5);
        Main.doubleClickCell($detailGrid6);
        // Main.doubleClickCell($detailGrid7);
        // Main.doubleClickCell($detailGrid8);
        // Main.doubleClickCell($detailGrid9);
    },

    doubleClickCell:function ($Grid) {
        $Grid.on('celldoubleclick', function (event) {
            var rowIdx = HmGrid.getRowIdx($Grid);
            var rowdata = HmGrid.getRowData($Grid, rowIdx);
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
        if($('#date1').val()>$('#date2').val()){
            var tempDate = $('#date1').val();
            $('#date1').val($('#date2').val());
            $('#date2').val(tempDate);
        }

        HmGrid.updateBoundData($detailGrid);
        HmGrid.updateBoundData($detailGrid2);
        HmGrid.updateBoundData($detailGrid3);
        HmGrid.updateBoundData($detailGrid4);
        HmGrid.updateBoundData($detailGrid5);
        HmGrid.updateBoundData($detailGrid6);
        // HmGrid.updateBoundData($detailGrid7);
        // HmGrid.updateBoundData($detailGrid8);
        // HmGrid.updateBoundData($detailGrid9);
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
            startDt : startDt,
            endDt: endDt,
            dmgInstNm: $("#dmgInstNmText").val(),
            accdTypeCd: $("#accd_typ_cd").val(),
            // dclCrgr: $("#dclCrgrText").val(),
            // attNatnCd: $("#attack_nation").val(),
            inciDttNm: $("#inci_dtt_nm").val(),
            inciDttNmExclude: $("#inci_dtt_nm_exclude").val(),
            inciNo          : $('#srchInciNo').val(),
            sInstCd          : $('#sInstCd').val(),
            sAuthMain          : $('#sAuthMain').val(),
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
    exportExcel: function() {
        var excelParams = {
            detailGrid:$detailGrid.jqxGrid('source').originaldata,
            detailGrid2:$detailGrid2.jqxGrid('source').originaldata,
            detailGrid3:$detailGrid3.jqxGrid('source').originaldata,
            detailGrid4:$detailGrid4.jqxGrid('source').originaldata,
            detailGrid5:$detailGrid5.jqxGrid('source').originaldata,
            detailGrid6:$detailGrid6.jqxGrid('source').originaldata
        };
         //var params = Main.getCommParams();
        $.extend(excelParams, Main.getCommParams());
         HmUtil.exportExcel(ctxPath + '/api/main/rpt/reportCollection/exportReportCtrsDaily', excelParams);
    }

};
