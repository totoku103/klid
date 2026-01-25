var totalSrchYn = 'N';
var $accidentGrid;
var $time, $date1, $date2;
var editIds = [];
var $cbPeriod;
var totalCnt = 0;
var Main = {
    /** variable */
    initVariable: function () {
        $accidentGrid = $('#accidentGrid');
        $cbPeriod = $('#cbPeriod');
        $date1 = $('#date1'), $date2 = $('#date2'), $time = $('#time');
    },

    /** add event */
    observe: function () {
        $('button').bind('click', function (event) {
            Main.eventControl(event);
        });
    },

    /** event handler */
    eventControl: function (event) {
        var curTarget = event.currentTarget;
        switch (curTarget.id) {
            case 'btnSearch':
                this.search();
                break;
            case 'btnAdd':
                this.add();
                break;
            case 'btnEdit':
                this.edit();
                break;
            case 'btnDel':
                this.del();
                break;
            case 'btnColumnSet':
                this.setChangeColumn();
                break;
            case 'btnExportExcel':
                this.exportExcel();
                break;
            case 'btnAccCopy':
                this.copy();
                break;
        }
    },

    /** init design */
    initDesign: function () {
        //HmWindow.create($('#pwindow'), 100, 100);
        $("#srchDateType").jqxDropDownList({ width: 90, height: 21, theme: jqxTheme, autoDropDownHeight: true,
            displayMember: 'label', valueMember: 'value', selectedIndex:0,
            source: [
                { label: '접수일시', value: 'inciAcpnDt' },
                { label: '완료일시', value: 'inciUpdDt' },
                { label: '종결일시', value: 'siEndDt' }
            ]
        });


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


        $(".searchBox2").hide();
        $(".scontent").css("top", 65);

        $('#checkAll').jqxCheckBox({ checked: false })
            .on('change', function(event) {
                //각 항목값 초기화
                $("#srchAccdTypCd").val('');
                $('#srchInciPrcsStatCd').val('');
                $("#transInciPrcsStatCd").val('');
                $("#tansSidoPrcsStatCd").val('');
                $('#srchInciPrtyCd').val('');
                $('#sNetDiv').val('');
                $('#srchException').val('');
                $('#srchDclInstName').val(null);
                $('#srchDmgInstName').val(null);
                $('#srchInciTtl').val(null);
                $('#srchInciNo').val(null);
                $('#srchInciDclCont').val(null);
                $('#srchInciInvsCont').val(null);
                $('#srchInciBelowCont').val(null);
                $('#srchAttIp').val(null);
                $('#srchDmgIp').val(null);

                var ischecked = event.args.checked;
                if(ischecked){
                    $(".searchBox2").show();
                    $(".scontent").css('top', 203);
                    $("#totalTitle").attr('disabled', true);
                    totalSrchYn = 'Y';
                    $("#totalTitle").val(null);
                }else{
                    $(".searchBox2").hide();
                    $(".scontent").css("top", 65);
                    $("#totalTitle").attr('disabled', false);
                    totalSrchYn = 'N'
                }
            });
        //$('#srchInstCdArea').jqxDropDownButton({ disabled: true});

        //HmDropDownBtn.createTreeGrid($('#ddbGrp'), $('#grpTree'), HmTree.T_GRP_AUTH, 200, 22, 300, 350, null);
        //인지기관명
        var recoInciCd = new Array();
        $.ajax({
            type: 'GET',
            url: ctxPath + '/api/common/code/getCommonCode',
            data: {comCode1: '4001' , codeLvl: '2'},
            async: false,
            success: function (data) {
                recoInciCd.push({label: '전체', value: ''});
                $.each(data.resultData, function (index, data) {
                    recoInciCd.push({label: data.codeName, value: data.comCode2})
                });
            }
        });
        // $('#srchRecoInciCd').jqxDropDownList({source: recoInciCd, width: 140, height:20 ,dropDownHeight: 130, selectedIndex : 0 })


        //처리상태
        var inciPrcsStatCd = new Array();
        $.ajax({
            type: 'GET',
            url: ctxPath + '/api/common/code/getCommonCode',
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
        $('#transInciPrcsStatCd').jqxDropDownList({source: inciPrcsStatCd, width: 140, height:20 ,autoDropDownHeight: true, selectedIndex : 0 })
        $('#tansSidoPrcsStatCd').jqxDropDownList({source: inciPrcsStatCd, width: 140, height:20 ,autoDropDownHeight: true, selectedIndex : 0 })

        //사고유형
        var accdTypCd = new Array();
        $.ajax({
            type: 'GET',
            url: ctxPath + '/api/common/code/getCommonCode',
            data: {comCode1: '3002' , codeLvl: '2'},
            async: false,
            success: function (data) {
                accdTypCd.push({label: '전체', value: ''});
                $.each(data.resultData, function (index, data) {
                    accdTypCd.push({label: data.codeName, value: data.comCode2})
                });
            }
        });
        $('#srchAccdTypCd').jqxDropDownList({source: accdTypCd, width: 140, height:20 ,autoDropDownHeight: true, selectedIndex : 0 });

        //우선순위
        var inciPrtyCd = new Array();
        $.ajax({
            type: 'GET',
            url: ctxPath + '/api/common/code/getCommonCode',
            data: {comCode1: '3006' , codeLvl: '2'},
            async: false,
            success: function (data) {
                inciPrtyCd.push({label: '전체', value: ''});
                $.each(data.resultData, function (index, data) {
                    inciPrtyCd.push({label: data.codeName, value: '00'+data.comCode2})
                });
            }
        });
        $('#srchInciPrtyCd').jqxDropDownList({source: inciPrtyCd, width: 120, height:20 ,autoDropDownHeight: true, selectedIndex : 0 })

        //망구분
        $('#sNetDiv').jqxDropDownList({
            /*source: new $.jqx.dataAdapter(
             {
             datatype: 'json',
             url: ctxPath + '/combo/getCodeComboData.do',
             data: { cdKind: 'PRI_SEQ' }
             }
             ),*/
            source: [
                {label: '전체', value: ''},
                {label: '외부', value: 0},
                {label: '내부', value: 1}
            ],
            displayMember: 'label',
            valueMember: 'value',
            width: 100,
            height: 21,
            autoDropDownHeight: true,
            selectedIndex: 0
        }).on('bindingComplete', function (event) {
            $('#sNetDiv').jqxDropDownList('insertAt', {label: '전체', value: '-1'}, 0);
        });
        //공격유형
        // var attTypCd = new Array();
        // $.ajax({
        //     type: 'GET',
        //     url: ctxPath + '/code/getCommonCode.do',
        //     data: {comCode1: '3003' , codeLvl: '2'},
        //     async: false,
        //     success: function (data) {
        //         attTypCd.push({label: '전체', value: ''});
        //         $.each(data.resultData, function (index, data) {
        //             attTypCd.push({label: data.codeName, value: data.comCode2})
        //         });
        //     }
        // });
        // $('#srchAttTypCd').jqxDropDownList({ source: attTypCd, width: 120, height:20 ,autoDropDownHeight: true, selectedIndex : 0 })

        //공격루트
        // var attVia = new Array();
        // $.ajax({
        //     type: 'GET',
        //     url: ctxPath + '/code/getCommonCode.do',
        //     data: {comCode1: '3009' , codeLvl: '2'},
        //     async: false,
        //     success: function (data) {
        //         attVia.push({label: '전체', value: ''});
        //         $.each(data.resultData, function (index, data) {
        //             attVia.push({label: data.codeName, value: data.comCode2})
        //         });
        //     }
        // });
        // $('#srchAttVia').jqxDropDownList({source: attVia, width: 120, height:20 ,autoDropDownHeight: true, selectedIndex : 0 })

        //주중주말
        //var arrWeekYn = [{label: '전체', value: ''},{label: '주중', value: '0'},{label: '주말', value: '1'}];
        //$('#srchWeekYn').jqxDropDownList({source: arrWeekYn, width: 120, height:20 ,autoDropDownHeight: true, selectedIndex : 0 })

        //예외처리
        var arrException = [{label: '전체', value: ''},{label: '예외처리', value: '0'},{label: '예외제외', value: '1'}];
        $('#srchException').jqxDropDownList({source: arrException, width: 120, height:20 ,autoDropDownHeight: true, selectedIndex : 0 })

        var srchAcpnMthd = new Array();
        $.ajax({
            type: 'GET',
            url: ctxPath + '/api/common/code/getCommonCode',
            data: {comCode1: '3004' , codeLvl: '2'},
            async: false,
            success: function (data) {
                // srchAcpnMthd.push({label: '전체', value: ''});
                $.each(data.resultData, function (index, data) {
                    srchAcpnMthd.push({label: data.codeName, value: '00'+data.comCode2})
                });
            }
        });
        $('#srchAcpnMthd').jqxDropDownList({
            source: srchAcpnMthd, width: 120, height:20 ,autoDropDownHeight: true, selectedIndex : 0 , checkboxes:true,placeHolder: '전체'
        }).on('select', function (e) {
            var value = e.args.item.value;
            var checkedItems = $('#srchAcpnMthd').jqxDropDownList('getCheckedItems');

        }).on('bindingComplete', function () {

        });

        // var arrEsmVer = [{label: '전체', value: ''},{label: '3.0', value: '0'},{label: '4.0', value: '1'},{label: '5.0', value: '2'}];;
        // $('#srchEsmVer').jqxDropDownList({source: arrEsmVer, width: 120, height:20 ,autoDropDownHeight: true, selectedIndex : 0 })

        Master.createPeriodCondition4($cbPeriod, $('#date1'), $('#date2'));
        $cbPeriod.jqxDropDownList({ selectedIndex: 2});

        $('#date1').jqxDateTimeInput({formatString: 'yyyy-MM-dd'});
        $('#date2').jqxDateTimeInput({formatString: 'yyyy-MM-dd'});

        Main.create();
    },

    /** init data */
    initData: function () {
        $('#' + $('#navPage').text() + '').css('display', 'block');

        if($("#authTbz01").val() == 'N'){
            $('#btnAdd').css('display', 'none');
        }
        if($("#authTbz02").val() == 'N'){
            $('#btnEdit').css('display', 'none');
        }

        if($("#sAuthMain").val()=='AUTH_MAIN_1'){
            $('#btnAccCopy').css('display', 'none');
        }

        $('#btnDel').css('display', 'none');
        //$('#btnExcel').css('display', 'none');
    },
    create: function () {
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

        HmGrid.create($accidentGrid, {
            source : new $.jqx.dataAdapter(
                {
                    datatype : 'json',
                    datafields: [
                        { name: 'inciNo', type: 'string' },
                        { name: 'netDivName', type: 'string' },
                        { name: 'dclInstName', type: 'string' },
                        { name: 'dmgInstName', type: 'string' },
                        { name: 'inciTtl', type: 'string' },
                        { name: 'inciDttNm', type: 'string' },
                        { name: 'accdTypName', type: 'string' },
                        { name: 'inciPrcsStatName', type: 'string' },
                        { name: 'transInciPrcsStatName', type: 'string' },
                        { name: 'transSidoPrcsStatName', type: 'string' },
                        { name: 'dclCrgr', type: 'string' },
                        { name: 'inciAcpnDt', type: 'string' },
                        { name: 'inciUpdDt', type: 'string' },
                        { name: 'inciPrty', type: 'string' },
                        { name: 'inciPrtyName', type: 'string' },
                        { name: 'inciDclCont', type: 'string' },
                        { name: 'inciInvsCont', type: 'string' },
                        { name: 'remarks', type: 'string' },
                        { name: 'weekYn', type: 'string' },
                        { name: 'dclInstCd', type: 'string' },
                        { name: 'dmgInstCd', type: 'string' },
                        { name: 'accdTypCd', type: 'string' },
                        { name: 'inciPrcsStat', type: 'string' },
                        { name: 'transInciPrcsStat', type: 'string' },
                        { name: 'transSidoPrcsStat', type: 'string' },
                        { name: 'inciTtlDtt', type: 'string' },
                        { name: 'tranSigunName', type: 'string' },
                        { name: 'siEndDt', type: 'string' },
                        { name: 'dmgHpNo', type: 'string' },
                        { name: 'acpnMthdName', type: 'string' },
                        { name: 'dclHpNo', type: 'string' },
                        { name: 'inciDt', type: 'string' }
                    ],
                    beforeprocessing: function(data) {
                        if(data != null && data.resultData != null){
                            totalCnt = data.resultData.length;
                        }
                    },
                    url: $('#ctxPath').val() + '/api/main/acc/accidentApply/getAccidentList'
                },
                {
                    formatData: function (data) {

                        var params = Main.getCommParams();

                        // console.log(params);

                        $.extend(data, Main.getCommParams());
                        $.extend(data, {});
                        return data;
                    }
                }
            ),
            //source: dataAdapter,
            editable: true,
            pageable : true,
            pagermode: 'default',
            editmode: 'selectedrow',
            columns: [
                { text: 'No', width: '3%', datafield : 'num',pinned: true, editable: false , sortable: false, cellsalign: 'center', filterable: false,
                    cellsrenderer: function(row, column, value, rowData) {
                        return "<div style='margin-top: 4px; margin-right: 5px' class='jqx-center-align'>" + (totalCnt - row )*1 +"</div>";
                    }
                },
                {text: '사고일자', datafield : 'inciDt', cellsalign : 'center', width : '8%'},
                {text: '접수날짜', datafield : 'inciAcpnDt', cellsalign : 'center', width : '8%'},
                {text: '완료일시', datafield : 'inciUpdDt', cellsalign : 'center', width : '8%', hidden: true},
                {text: '종결일시(시도)', datafield : 'siEndDt', cellsalign : 'center', width : '8%', hidden: true},
                //{text: '선택',    datafield: 'select', width: 40, columntype: 'checkbox',columnsreorder: true},
                {text: '접수번호', datafield: 'inciNo', width: '6%', cellsalign: 'center', editable: false,columnsreorder: true},
                {text: '망구분',   datafield: 'netDivName', width: '4%', cellsalign: 'center', editable: false,columnsreorder: true},
                //{text: '인지기관', datafield: 'recoInciName', width: 140, cellsalign: 'left', editable: false},
                {text: '신고기관', datafield: 'dclInstName', width: '7%', cellsalign: 'center', editable: false,columnsreorder: true},
                {text: '접수기관', datafield: 'dmgInstName', width: '7%', cellsalign: 'center', editable: false,columnsreorder: true},
                // {text: '제목',    datafield: 'inciTtl', minwidth: 100, cellsalign: 'left', editable: false,columnsreorder: true,
                //     cellsrenderer: function(row, column, value, rowData){
                //         var data = $accidentGrid.jqxGrid('getrowdata', row);
                //
                //         var str = data.inciTtl.split("[");
                //         if(str.length>1)
                //             value = str[0];
                //
                //         return '<div class="jqx-grid-cell-left-align" style="margin-top: 2.5px;">'+value+'</div>';
                //     }
                // },
                {text: '제목(탐지명)',    datafield: 'inciTtlDtt', minwidth: '220px', cellsalign: 'left', editable: false,columnsreorder: true,
                    cellsrenderer: function(row, column, value, rowData){
                        var data = $accidentGrid.jqxGrid('getrowdata', row);

                        var str = value.split("[");
                        if(str.length>2)
                            value = data.inciTtl;

                        return '<div class="jqx-grid-cell-left-align" style="margin-top: 2.5px;">'+value+'</div>';
                    }
                },
                // {text: '탐지명',    datafield: 'inciDttNm', minwidth: 100, cellsalign: 'left', editable: false,columnsreorder: true,
                //     cellsrenderer: function(row, column, value, rowData){
                //         var data = $accidentGrid.jqxGrid('getrowdata', row);
                //
                //         if(value==""){
                //             var str = data.inciTtl.split("[");
                //             if(str[1] !== undefined){
                //                 value = str[1].substring(0,str[1].length-1);
                //             }
                //         }
                //         return '<div class="jqx-grid-cell-left-align" style="margin-top: 2.5px;">'+value+'</div>';
                //     }
                // },
                {text: '사고유형', datafield: 'accdTypName', width: '6%', cellsalign: 'center', editable: false,columnsreorder: true},
                {text: '접수방법', datafield: 'acpnMthdName',  cellsalign: 'center', width: '5%', editable: false},
                {text: '사고유형(5분류)', datafield: 'dclHpNo',  cellsalign: 'center', width: '6%', editable: false, hidden: true},
                {text: '심각도', datafield: 'dmgHpNo',  cellsalign: 'center', width: '5%', editable: false, hidden: true},
                {text: '지원센터처리상태', datafield: 'inciPrcsStat', width: '6%', cellsalign: 'center', editable: false,columnsreorder: true,
                    cellsrenderer: imagerenderer
                },
                {text: '시도처리상태', datafield: 'transInciPrcsStat', width: '6%', cellsalign: 'center', editable: false,columnsreorder: true,
                    cellsrenderer: imagerenderer
                },
                {text: '시군구처리상태', datafield: 'transSidoPrcsStat', width: '6%', cellsalign: 'center', editable: false,columnsreorder: true,
                    cellsrenderer: imagerenderer
                },
                {text: '담당자',   datafield: 'dclCrgr', width: '3%',  cellsalign: 'center', editable: false},
                {text: '우선순위', datafield: 'inciPrty', width: '4%', cellsalign: 'center', editable: false,
                    cellsrenderer: imagerenderer
                },

                {text: '사고내용', datafield: 'inciDclCont',  cellsalign: 'center', editable: false, hidden: true},
                {text: '조사내용', datafield: 'inciInvsCont',  cellsalign: 'center', editable: false, hidden: true},
                {text: '비고', datafield: 'remarks', width: '7%', cellsalign: 'center', editable: false, hidden: true},
                {text: '주중주말', datafield: 'weekYn',  cellsalign: 'center', editable: false, hidden: true},
                {text: '피해기관코드', datafield: 'dmgInstCd',  cellsalign: 'center', editable: false, hidden: true},
                {text: '신고기관코드', datafield: 'dclInstCd',  cellsalign: 'center', editable: false, hidden: true},
                {text: '신고유형코드', datafield: 'accdTypCd',  cellsalign: 'center', editable: false, hidden: true},
                {text: '이관기관', datafield: 'tranSigunName', width: '5%', cellsalign: 'center', editable: false,columnsreorder: true}
            ]
        }, 0);
        $accidentGrid.on('rowdoubleclick', function (event) {
            Main.showDetail(event.args.rowindex);
        });
    },

    search: function () {
        if($('#date1').val()>$('#date2').val()){
            var tempDate = $('#date1').val();
            $('#date1').val($('#date2').val());
            $('#date2').val(tempDate);
        }
        HmGrid.updateBoundData($accidentGrid);
    },

    showDetail: function (rowindex) {
        var rowdata = HmGrid.getRowData($accidentGrid, rowindex);
        $.post(ctxPath + '/main/popup/acc/pAccidentDetail.do',
            function (result) {
                HmWindow.open($('#pwindow'), '침해사고 신고 조회', result, 900, 950, 'pwindow_init', rowdata);
                $('.jqx-window-modal').css("z-index", "799");
                $('#pwindow').css("z-index", "800");
            }
        );
    },

    add: function () {
        $.post(ctxPath + '/main/popup/acc/pAccidentAdd.do',
            function (result) {
                HmWindow.open($('#pwindow'), '침해사고 신고 등록', result, 900, 880);
                $('.jqx-window-modal').css("z-index", "799");
                $('#pwindow').css("z-index", "800");
            }
        );
    },

    edit: function () {
        var rowIdx = HmGrid.getRowIdx($accidentGrid, '데이터를 선택해주세요.');
        if (rowIdx === false) return;
        var rowdata = HmGrid.getRowData($accidentGrid, rowIdx);

        var inciPrcsStat = rowdata.inciPrcsStat;
        var transInciPrcsStat = rowdata.transInciPrcsStat;
        var transSidoPrcsStat = rowdata.transSidoPrcsStat;

        if(inciPrcsStat == 13 || transInciPrcsStat == 13 || transSidoPrcsStat == 13){
            alert("종결된 사고는 수정이 불가능 합니다.");
            return
        }

        $.post(ctxPath + '/main/popup/acc/pAccidentEdit.do',
            function (result) {
                HmWindow.open($('#pwindow'), '침해사고 수정', result, 900, 950, 'pwindow_init', rowdata);
                $('.jqx-window-modal').css("z-index", "799");
                $('#pwindow').css("z-index", "800");
            }
        );
    },

    del: function () {
        var rowIdx = HmGrid.getRowIdx($accidentGrid, '데이터를 선택해주세요.');
        var rowdata = HmGrid.getRowData($accidentGrid, rowIdx);

        Server.post('/api/main/acc/accidentApply/deleteAccidentApply', {
            data : {inciNo : rowdata.inciNo},
            success : function(result) {
                alert("삭제되었습니다.");
                Main.search();
            }
        });
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

        var report_type="0";
        if($('#sAuthMain').val()=='AUTH_MAIN_2'||$('#sAuthMain').val()=='AUTH_MAIN_1'){
            var report_type="1";
        }else if($('#sAuthMain').val()=='AUTH_MAIN_3'){
            var report_type="2";
        }else if($('#sAuthMain').val()=='AUTH_MAIN_4'){
            var report_type="3";
        }

        var sYear = $.format.date(new Date($date2.val()),"yyyyMMdd");

        //접수방법 복수 선택
        var srchAcpnMthd = "";
        var checkedItems = $('#srchAcpnMthd').jqxDropDownList('getCheckedItems');
        for(var i = 0; i < checkedItems.length; i++) {
            var item = checkedItems[i];
            srchAcpnMthd += item.originalItem.value + ',';
        }

        var params = {
            grpNo: 1,
            sInstCd         :  $("#sInstCd").val(),
            sAuthMain       :  $("#sAuthMain").val(),
            // recoInciCd      : $('#srchRecoInciCd').val(),
            netDiv         : $('#sNetDiv').val(),
            inciPrcsStatCd  : $('#srchInciPrcsStatCd').val(),
            transInciPrcsStatCd: $('#transInciPrcsStatCd').val(),
            transSidoPrcsStatCd: $('#tansSidoPrcsStatCd').val(),
            accdTypCd       : $('#srchAccdTypCd').val(),
            inciPrtyCd      : $('#srchInciPrtyCd').val(),
            dclInstName     : $('#srchDclInstName').val(),
            dmgInstName     : $('#srchDmgInstName').val(),
            inciTtl         : $('#srchInciTtl').val(),
            inciNo          : $('#srchInciNo').val(),
            period          : $cbPeriod.val(),
            date1           : HmDate.getDateStr($('#date1')),
            time1           : HmDate.getTimeStr($('#date1')),
            date2: HmDate.getDateStr($('#date2')),
            time2: HmDate.getTimeStr($('#date2')),
            inciDclCont : $('#srchInciDclCont').val(), //사고내용
            inciInvsCont : $('#srchInciInvsCont').val(), //조사내용
            inciBelowCont : $('#srchInciBelowCont').val(), //시도의견
            //weekYn : $('#srchWeekYn').val(),
            date1: HmDate.getDateStr($('#date1'))+'000000',
            date2: HmDate.getDateStr($('#date2'))+'235959',
            attIp :$('#srchAttIp').val(),
            dmgIp :$('#srchDmgIp').val(),


            startDt : startDt,
            endDt: endDt,
            sumDay: HmDate.getDateStr($('#date1'))+HmDate.addZero($time.val())+'0000',
            sumEndDt:HmDate.getDateStr($('#date2'))+HmDate.addZero(agoTime)+'5959',
            // days:HmDate.addZero($dateRange.val()),
            sYear : sYear,
            // srchAcpnMthd : $("#srchAcpnMthd").val(),
            srchAcpnMthd : srchAcpnMthd,
            srchDateType: $("#srchDateType").val()
        }
        if(totalSrchYn == 'N'){
            var totalTitle = $("#totalTitle").val();
            if(totalTitle != ''){
                params.totalTitle = $("#totalTitle").val();
            }
        }
        return params;
    },

    date_add: function(sDate, nDays){
        var result = new Date(sDate);
        result.setDate(result.getDate()+nDays);
        result =$.format.date(result, "yyyyMMdd");
        return result;
    },

    setChangeColumn: function () {
        $.post(ctxPath + '/main/popup/comm/pGridColsMgr.do',
            function(result) {
                HmWindow.open($('#pwindow'), '컬럼 관리', result, 300, 400, 'pwindow_init', $accidentGrid);
            }
        );
    },

    exportExcel: function () {

        var params = Main.getCommParams();

        // console.log(params);

        HmUtil.exportGrid($("#accidentGrid"),'사고접수목록',false, params);
    },

    copy: function () {
        var rowIdx = HmGrid.getRowIdx($accidentGrid, '데이터를 선택해주세요.');
        if (rowIdx === false) return;
        var rowdata = HmGrid.getRowData($accidentGrid, rowIdx);

        $.post(ctxPath + '/main/popup/acc/pAccidentCopy.do',
            function (result) {
                HmWindow.open($('#pwindow'), '침해사고 신고 복사', result, 900, 950, 'pwindow_init', rowdata);
                $('.jqx-window-modal').css("z-index", "799");
                $('#pwindow').css("z-index", "800");
            }
        );
    },
};

$(function () {
    Main.initVariable();
    Main.observe();
    Main.initDesign();
    Main.initData();
});
