var $grid
var editUserIds = [];
var userId;
var totalCnt = 0;
var Main = {
		/** variable */
		initVariable: function() {
			$grid = $('#grid');
		},
		
		/** add event */
		observe: function() {
            $('button').bind('click', function(event) { Main.eventControl(event); });
            $('.searchBox').bind('keyup', function(event) { Main.keyupEventControl(event); });
		},
		
		/** event handler */
		eventControl: function(event) {
            var curTarget = event.currentTarget;
            switch(curTarget.id) {
                case 'btnSearch':
                    this.search();
                    break;
                case 'btnAdd':
                    this.healthCheckUrlAdd();
                    break;
                case 'btnDel':
                    this.healthCheckUrlDel();
                    break;
                case 'btnWatchOn':
                    this.watchOnUrl();
                    break;
                case 'btnWatchOff':
                    this.watchOffUrl();
                    break;
                case 'btnExcel':
                    this.excelOfUrl();
                    break;
                case 'btnExcelUpload':
                    this.importOfUrl();
                    break;
            }
			
		},

        keyupEventControl: function(event) {
            if(event.keyCode == 13) {
                Main.search();
            }
        },
		/** init design */
		initDesign: function() {
		    if( $("#sAuthMain").val() == 'AUTH_MAIN_2'){
		        $("#btnAdd").css("display", "inline");
                $("#btnDel").css("display", "inline");
            }

            var instParams =
                {InstLevel:$('#sInstLevel').val(), instCd:$('#sInstCd').val(), instNm:$('#sInstName').val()}

            var srchLastRes = [{label: '전체', value: ''},{label: '정상', value: '200'},{label: '장애', value: '-1'}];
            $('#srchLastRes').jqxDropDownList({source: srchLastRes, width: 90, height:20 ,autoDropDownHeight: true, selectedIndex : 0 })

            var srchMoisYn = [{label: '전체', value: ''},{label: '중앙부처', value: '1'},{label: '지자체', value: '0'}];
            $('#srchMoisYn').jqxDropDownList({source: srchMoisYn, width: 90, height:20 ,autoDropDownHeight: true, selectedIndex : 0 })

            var srchUseYn = [{label: '전체', value: ''},{label: '예', value: '1'},{label: '아니오', value: '0'}];
            $('#srchUseYn').jqxDropDownList({source: srchUseYn, width: 90, height:20 ,autoDropDownHeight: true, selectedIndex : 0 })

            var srchCheckYn = [{label: '전체', value: ''},{label: '예', value: '1'},{label: '아니오', value: '0'}];
            $('#srchCheckYn').jqxDropDownList({source: srchUseYn, width: 90, height:20 ,autoDropDownHeight: true, selectedIndex : 0 })

            //메인에서 클릭해서 왔을때
            if($("#mainPageInstCd").val() != ''){
                Server.post('/api/main/home/forgeryUrl/getByInstNm', {
                    data : {instCd : $("#mainPageInstCd").val()},
                    success : function(result) {
                        instParams.instCd = $("#mainPageInstCd").val();
                        instParams.instNm = result.instNm;
                        $('#srchLastRes').val(-1);
                    }
                });
            }
            HmDropDownBtn.createDeptTreeGrid($('#srchInstCdArea'), $('#srchInstTree'), 'share', '13%', 22, '98%', 350, null, instParams);

            var columns;
            if($('#sAuthMain').val()=='AUTH_MAIN_2'){
                columns=[
                    { text: 'No', width: '5%', pinned: true, editable: false , sortable: false, cellsalign: 'center', filterable: false,
                        cellsrenderer: function(row, column, value, rowData) {
                            return "<div style='margin-top: 4px; margin-right: 5px' class='jqx-center-align'>" + (totalCnt - row)*1 +"</div>";
                        }
                    },
                    { text : '시도',   datafield  : 'parentName', width: '5%', editable: false, cellsalign: 'center'},
                    { text : '시군구',   datafield  : 'instNm', width: '8%', editable: false, cellsalign: 'center'},
                    { text : '홈페이지명',   datafield  : 'instCenterNm', width: '15%', editable: false, cellsalign: 'center'},
                    { text : 'URL',     datafield     : 'url', width : 'auto', editable: false, cellsalign: 'center'},
                    { text : '장애여부', datafield : 'lastRes', width : '10%', cellsalign: 'center',
                        cellsrenderer: function(row, column, value, rowData){
                            var moisYn = '장애';
                            if(value == 200){
                                moisYn = '정상'
                            }
                            return '<div class="jqx-grid-cell-middle-align" style="margin-top: 2.5px;">'+ moisYn +'</div>';
                        }
                    },
                    { text : '구분',   datafield   : 'moisYn', width : '8%', cellsalign: 'center',
                        cellsrenderer: function(row, column, value, rowData){
                            var moisYn = '지자체';
                            if(value == 1){
                                moisYn = '중앙부처'
                            }
                            return '<div class="jqx-grid-cell-middle-align" style="margin-top: 2.5px;">'+ moisYn +'</div>';
                        }
                    },
                    { text : '사용여부', datafield : 'useYn', width : '6%', cellsalign: 'center' ,
                        cellsrenderer: function(row, column, value, rowData){
                            var useYn = '아니오';
                            if(value == 1){
                                useYn = '예'
                            }
                            return '<div class="jqx-grid-cell-middle-align" style="margin-top: 2.5px;">'+ useYn +'</div>';
                        }
                    },
                    { text : '집중감시',   datafield   : 'checkYn', width : '8%', cellsalign: 'center',
                        cellsrenderer: function(row, column, value, rowData){
                            var checkYn = '아니오';
                            if(value == 1){
                                checkYn = '예'
                            }
                            return '<div class="jqx-grid-cell-middle-align" style="margin-top: 2.5px;">'+ checkYn +'</div>';
                        }
                    },
                    { text : '집중감시(시도)',   datafield   : 'checkSidoYn', hidden:true,width : '8%', cellsalign: 'center',
                        cellsrenderer: function(row, column, value, rowData){
                            var checkYn = '아니오';
                            if(value == 1){
                                checkYn = '예'
                            }
                            return '<div class="jqx-grid-cell-middle-align" style="margin-top: 2.5px;">'+ checkYn +'</div>';
                        }
                    },
                    { text : '등록시간', datafield : 'updtime', width : '10%', cellsalign: 'center'}

                ];
            }else {
                columns=[
                    { text: 'No', width: '5%', pinned: true, editable: false , sortable: false, cellsalign: 'center', filterable: false,
                        cellsrenderer: function(row, column, value, rowData) {
                            return "<div style='margin-top: 4px; margin-right: 5px' class='jqx-center-align'>" + (totalCnt - row)*1 +"</div>";
                        }
                    },
                    { text : '시도',   datafield  : 'parentName', width: '5%', editable: false, cellsalign: 'center'},
                    { text : '시군구',   datafield  : 'instNm', width: '8%', editable: false, cellsalign: 'center'},
                    { text : '홈페이지명',   datafield  : 'instCenterNm', width: '15%', editable: false, cellsalign: 'center'},
                    { text : 'URL',     datafield     : 'url', width : 'auto', editable: false, cellsalign: 'center'},
                    { text : '장애여부', datafield : 'lastRes', width : '10%', cellsalign: 'center',
                        cellsrenderer: function(row, column, value, rowData){
                            var moisYn = '장애';
                            if(value == 200){
                                moisYn = '정상'
                            }
                            return '<div class="jqx-grid-cell-middle-align" style="margin-top: 2.5px;">'+ moisYn +'</div>';
                        }
                    },
                    { text : '구분',   datafield   : 'moisYn', width : '8%', cellsalign: 'center',
                        cellsrenderer: function(row, column, value, rowData){
                            var moisYn = '지자체';
                            if(value == 1){
                                moisYn = '중앙부처'
                            }
                            return '<div class="jqx-grid-cell-middle-align" style="margin-top: 2.5px;">'+ moisYn +'</div>';
                        }
                    },
                    { text : '사용여부', datafield : 'useYn', width : '6%', cellsalign: 'center' ,
                        cellsrenderer: function(row, column, value, rowData){
                            var useYn = '아니오';
                            if(value == 1){
                                useYn = '예'
                            }
                            return '<div class="jqx-grid-cell-middle-align" style="margin-top: 2.5px;">'+ useYn +'</div>';
                        }
                    },
                    { text : '집중감시(지원센터)',   datafield   : 'checkYn', hidden:true,width : '8%', cellsalign: 'center',
                        cellsrenderer: function(row, column, value, rowData){
                            var checkYn = '아니오';
                            if(value == 1){
                                checkYn = '예'
                            }
                            return '<div class="jqx-grid-cell-middle-align" style="margin-top: 2.5px;">'+ checkYn +'</div>';
                        }
                    },
                    { text : '집중감시',   datafield   : 'checkSidoYn', width : '8%', cellsalign: 'center',
                        cellsrenderer: function(row, column, value, rowData){
                            var checkYn = '아니오';
                            if(value == 1){
                                checkYn = '예'
                            }
                            return '<div class="jqx-grid-cell-middle-align" style="margin-top: 2.5px;">'+ checkYn +'</div>';
                        }
                    },
                    { text : '등록시간', datafield : 'updtime', width : '10%', cellsalign: 'center'}

                ]
            }

            HmWindow.create($('#pwindow'), 100, 100);
			HmGrid.create($grid, {
				source: new $.jqx.dataAdapter(
						{
							datatype: 'json',
                            url: ctxPath + '/api/main/home/healthCheckUrl/getHealthCheckUrl',
							updaterow: function(rowid, rowdata, commit) {
								if(editUserIds.indexOf(rowid) == -1)
									editUserIds.push(rowid);
									commit(true);
				            },
							datafields: [
                                { name: 'seqNo',    type: 'int' },
                                { name: 'url',      type: 'string' },
                                { name: 'instCd',   type: 'int' },
                                { name: 'instNm',   type: 'string' },
                                { name: 'instCenterNm',   type: 'string' },
                                { name: 'updtime',  type: 'string' },
                                { name: 'useYn',    type: 'string' },
                                { name: 'lastRes',  type: 'int' },
                                { name: 'moisYn',   type: 'string' },
                                { name: 'resNm',   type: 'string' },
                                { name: 'checkYn',   type: 'int' },
                                { name: 'checkSidoYn',   type: 'int' },
                                { name: 'parentName',   type: 'int' }
                            ]
                            ,beforeprocessing: function(data) {
                                if(data != null){
                                    totalCnt = data.resultData.length;
                                }
                            }
						},
                        {
                            formatData : function(data) {
                                if($("#srchInstTree").val() == ""){
                                    if($("#mainPageInstCd").val() != ''){
                                        data.srchInstCd = $("#mainPageInstCd").val();
                                    }else{
                                        data.srchInstCd = $("#sInstCd").val();
                                    }
                                }else{
                                    data.srchInstCd = $("#srchInstTree").val();
                                }
                                data.srchInstNm = $("#srchInstNm").val();//홈페이지명 조회조건 추가 20190422
                                data.srchDomain = $("#srchDomain").val();
                                data.srchMoisYn = $("#srchMoisYn").val();
                                data.srchUseYn = $("#srchUseYn").val();
                                data.srchCheckYn = $("#srchCheckYn").val();
                                data.sAuthMain   = $("#sAuthMain").val();

                                if($("#srchInstTree").val() == ""){

                                    if($("#mainPageInstCd").val() != ''){
                                        data.srchLastRes = -1;
                                    }else{
                                        data.srchLastRes = $("#srchLastRes").val();
                                    }
                                }else{
                                    data.srchLastRes = $("#srchLastRes").val();
                                }

                                return data;
                            }
                        }
				),
                pageable : true,
                selectionmode: 'multiplerowsextended',
                pagermode: 'default',
                columns:columns
                    ,
                editable: false,
				editmode : 'selectedcell'
			});
            $grid.on('celldoubleclick', function (event) {
                Main.healthCheckUrlEdit();
			 });
		},
		
		/** init data */
		initData: function() {
            //Main.search();
		},

		search : function() {
			HmGrid.updateBoundData($grid, ctxPath + '/api/main/home/healthCheckUrl/getHealthCheckUrl');
		},

        healthCheckUrlAdd : function() {
            $.get(ctxPath + '/main/popup/home/pHealthCheckUrlAdd.do',
                function(result) {
                    HmWindow.open($('#pwindow'), '헬스체크URL 등록', result, 350, 250);
                    $('.jqx-window-modal').css("z-index", "799");
                    $('#pwindow').css("z-index", "800");
                }
            );
        },

        healthCheckUrlEdit: function() {
            var rowIdx = HmGrid.getRowIdx($grid);
            var rowdata = HmGrid.getRowData($grid, rowIdx);
            $.post(ctxPath + '/main/popup/home/pHealthCheckUrlEdit.do',
                function (result) {
                    HmWindow.open($('#pwindow'), '헬스체크URL 수정', result, 350, 250, 'pwindow_init', rowdata);
                    $('.jqx-window-modal').css("z-index", "799");
                    $('#pwindow').css("z-index", "800");
                }
            );
        },

        healthCheckUrlDel: function(){
            var selectedRowIndexes = HmGrid.getRowIdxes($grid);

            if(selectedRowIndexes.length==undefined){
                alert("데이터를 선택해주세요.");
                return;
            }

            if(!confirm('선택된 데이터를 삭제하시겠습니까?')) return;

            var list=[];

            for(var i=0; i<selectedRowIndexes.length; i++){
                var data_row2=$grid.jqxGrid('getcellvalue', selectedRowIndexes[i], 'seqNo');
                list.push(data_row2);
            }

            Server.post('/api/main/home/healthCheckUrl/delHealthCheckUrl', {
                data : {list : list},
                success : function(result) {
                    alert("삭제되었습니다.");
                    HmGrid.updateBoundData($grid, ctxPath + '/api/main/home/healthCheckUrl/getHealthCheckUrl');
                }
            });

            // var rowIdx = HmGrid.getRowIdx( $grid, '데이터를 선택해주세요.');
            //
            // if (rowIdx === false) return;
            // var rowdata = HmGrid.getRowData($grid, rowIdx);
            //
            // if(!confirm('선택된 데이터를 삭제하시겠습니까?')) return;
            //
            // Server.post('/main/home/healthCheckUrl/delHealthCheckUrl.do', {
            //     data : {seqNo : rowdata.seqNo},
            //     success : function(result) {
            //         alert("삭제되었습니다.");
            //         HmGrid.updateBoundData($grid, ctxPath + '/api/main/home/healthCheckUrl/getHealthCheckUrl');
            //     }
            // });
        },

    watchOnUrl: function(){

        var selectedRowIndexes = HmGrid.getRowIdxes($grid);

        if(selectedRowIndexes.length==undefined){
            alert("데이터를 선택해주세요.");
            return;
        }

        if (confirm("집중관리 등록 하시겠습니까?") != true)
            return;

        var list=[];

        for(var i=0; i<selectedRowIndexes.length; i++){
            var data_row2=$grid.jqxGrid('getcellvalue', selectedRowIndexes[i], 'seqNo');
            list.push(data_row2);
        }

        Server.post('/api/main/home/healthCheckUrl/editWatchOn', {
            data : {list : list, sAuthMain:$("#sAuthMain").val()},
            success : function(result) {
                alert("등록되었습니다.");
                HmGrid.updateBoundData($grid, ctxPath + '/api/main/home/healthCheckUrl/getHealthCheckUrl');
            }
        });
    },
    watchOffUrl: function(){
        var selectedRowIndexes = HmGrid.getRowIdxes($grid);

        if(selectedRowIndexes.length==undefined){
            alert("데이터를 선택해주세요.");
            return;
        }
        if (confirm("집중관리 해제 하시겠습니까?") != true)
            return;

        var list=[];

        for(var i=0; i<selectedRowIndexes.length; i++){
            var data_row2=$grid.jqxGrid('getcellvalue', selectedRowIndexes[i], 'seqNo');
            list.push(data_row2);
        }

        Server.post('/api/main/home/healthCheckUrl/editWatchOff', {
            data : {list : list, sAuthMain:$("#sAuthMain").val()},
            success : function(result) {
                alert("해제되었습니다.");
                HmGrid.updateBoundData($grid, ctxPath + '/api/main/home/healthCheckUrl/getHealthCheckUrl');
            }
        });

    },
    getCommParams: function(){
        var params = {};

        try{
            var srchInstCd = '';
            if($("#srchInstTree").val() == ""){
                if($("#mainPageInstCd").val() != ''){
                    srchInstCd = $("#mainPageInstCd").val();
                }else{
                    srchInstCd = $("#sInstCd").val();
                }
            }else{
                srchInstCd = $("#srchInstTree").val();
            }
            var srchLastRes = -1;
            if($("#srchInstTree").val() == ""){
                if($("#mainPageInstCd").val() != ''){
                    srchLastRes = -1;
                }else{
                    srchLastRes = $("#srchLastRes").val();
                }
            }else{
                srchLastRes = $("#srchLastRes").val();
            }

            $.extend(params, {
                srchInstCd: srchInstCd,
                srchInstNm: $("#srchInstNm").val(),
                srchDomain: $("#srchDomain").val(),
                srchMoisYn: $("#srchMoisYn").val(),
                srchUseYn: $("#srchUseYn").val(),
                srchCheckYn: $("#srchCheckYn").val(),
                sAuthMain: $("#sAuthMain").val(),
                srchLastRes: srchLastRes,
            });
        }catch(err){}

        return params;
    },
    excelOfUrl: function () {
        var params = {};
        $.extend(params, Main.getCommParams());

        HmUtil.exportExcel(ctxPath + '/api/main/home/healthCheckUrl/export', params);
    },
    importOfUrl: function () {
        //팝업
        var pwin = $('#pImportXlsWindow');
        try {
            if(pwin.length == 0) {
                pwin = $('<div id="pImportXlsWindow" style="position: absolute;"></div>')
                pwin.append($('<div></div>'));
                pwin.append($('<div></div>'));
                $('body').append(pwin);
            }
            HmWindow.create(pwin);
        } catch(e) {}
        $.post(ctxPath + '/main/popup/home/pImportXls.do',
            function (result) {
                HmWindow.open(pwin, '엑셀 파일 넣기', result, 300, 180, 'pwindow_init',{type : 'xls'});
            }
        );
    }
};


$(function() {
	Main.initVariable();
	Main.observe();
	Main.initDesign();
	Main.initData();
});