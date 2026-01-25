var $leftGrid;
var editGrpIds = [];
var $rightGrid, $authGrpTree, $bottomGrid;
var comCode1 = '';
var comCode2 = '';
var codeName = '';
var codeName2 = '';
var editCodeLv1Params= {}
var editCodeLv2Params = {}
var Main = {
    /** variable */
    initVariable: function () {
        $leftGrid = $('#leftGrid');
        $rightGrid = $('#rightGrid');
        $bottomGrid = $('#bottomGrid');
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
            case 'btnAdd_left':
                this.addCodeLv1();
                break;
            case 'btnEdit_left':
                this.editCodeLv1();
                break;
            case 'btnAdd_right':
                this.addCodeLv2();
                break;
            case 'btnEdit_right':
                this.editCodeLv2();
                break;
            case 'btnDel_left':
                this.deleteCodeLv1();
                break;
            case 'btnDel_right':
                this.deleteCodeLv2();
                break;

            case 'btnAdd_bottom':
                this.addCodeLv3();
                break;
            case 'btnEdit_bottom':
                this.editCodeLv3();
                break;
        }
    },

    /** init design */
    initDesign: function () {
        $('#mainSplitter').jqxSplitter({
            width: '100%',
            height: '100%',
            orientation: 'vertical',
            theme: jqxTheme,
            panels: [{size: 250, min: 150}, {size: '100%'}]
        });
        $('#subSplitter').jqxSplitter({ width: '100%', height: '100%', orientation: 'horizontal', theme: jqxTheme, panels: [{ collapsible: false, size: '50%' }, { size: '50%' }] });
        $('#subSplitter').jqxSplitter('collapse');
        $('#subSplitter').jqxSplitter('showSplitBar', false);
        HmWindow.create($('#pwindow'), 100, 100);
        
        //좌측 대메뉴 코드 목록
        HmGrid.create($leftGrid, {
            source: new $.jqx.dataAdapter(
                {
                    datatype: 'json',
                    url: ctxPath + '/api/main/sys/getCodeList',
                    data: {codeLvl : 1, sortType : 'nameRise'},
                    updaterow: function (rowid, rowdata, commit) {
                        if (editGrpIds.indexOf(rowid) == -1)
                            editGrpIds.push(rowid);
                        commit(true);
                    },
                    addrow: function (rowid, rowdata, commit) {
                        Server.post('/api/main/sys/addCode', {
                            data: rowdata,
                            success: function () {
                                HmGrid.updateBoundData($leftGrid);
                                $('#pwindow').jqxWindow('close');
                                alert('추가되었습니다.');
                            }
                        });
                        commit(true);
                    },
                    datafields:
                        [
                            {name: 'codeName', type: 'string'},
                            {name: 'comCode1', type: 'string'}
                        ]
                },
                {
                    loadComplete: function (records) {
                        editGrpIds = [];
                    }
                }
            ),
            editable: false,
            editmode: 'selectedrow',
            filterable: true,
            showfilterrow: true,
            pageable: false,
            ready: function () {
                //$leftGrid.jqxGrid('selectrow', 0);
                //comCode1 = $leftGrid.jqxGrid('getrowdata', 0).comCode1;

            },
            columns:
                [
                    {text: '코드 그룹명', datafield: 'codeName'}
                ]
        });

        $leftGrid.on('bindingcomplete', function() {
            $leftGrid.jqxGrid('selectrow', 0);
            comCode1 = $leftGrid.jqxGrid('getrowdata', 0).comCode1;
            codeName = $leftGrid.jqxGrid('getrowdata', 0).codeName;
            Main.searchCode();
        });

        $leftGrid.on('click', function (event) {

            var rowIdx = HmGrid.getRowIdx($leftGrid);
            var rowData = $leftGrid.jqxGrid('getrowdata', rowIdx);

            comCode1 = rowData.comCode1;
            codeName = rowData.codeName;

            if(comCode1 == '4007'){ //코드 4007 : 설문 일 경우 분류 뎁스가 3단계가 된다. 나머지는 2단계
            	$('#subSplitter').jqxSplitter('expand');
            	$('#subSplitter').jqxSplitter('showSplitBar', true);
            }else if(comCode1 == '3002'){ //코드 3002 : 사고유형 일 경우 분류 뎁스가 3단계가 된다. 나머지는 2단계
                $('#subSplitter').jqxSplitter('expand');
                $('#subSplitter').jqxSplitter('showSplitBar', true);
            }else{
            	$('#subSplitter').jqxSplitter('collapse');
            	$('#subSplitter').jqxSplitter('showSplitBar', false);
            }
            
            Main.searchCode();
        });
        Main.settingGrid();

    },

    /** init data */
    initData: function () {
    },
    
    settingGrid: function () {
        
        //우측 중메뉴 코드
        // 상단 grid 세팅
        HmGrid.create($rightGrid, {
            source: new $.jqx.dataAdapter({
                dataType: 'json',
            },{
            	formatData : function(data) {
					try{
						var rowIdx = HmGrid.getRowIdx($leftGrid);
				        comCode1 = $leftGrid.jqxGrid('getrowdata', rowIdx).comCode1;
						$.extend(data, {
							comCode1 : comCode1, 
		                	codeLvl: 2
						});
					}catch(err){}
					return data;
				}
            }),
            columns: [
                {text: '코드명', width: 250, datafield: 'codeName'},
                {text: '코드값', width: 120, datafield: 'comCode2'},
                //{text: '코드값2', width: 120, datafield: 'comCode3'},
                {text: '설명', minwidth: 250, datafield: 'codeCont'},
                {text: '사용여부', width: 120, datafield: 'useYn',
                    cellsrenderer: function(row, column, value, rowData){
                        var val = "아니오";
                        if(value == 'Y'){
                            val = '예';
                        }
                        return '<div class="jqx-grid-cell-middle-align" style="margin-top: 2.5px;">'+val+'</div>';
                    }
                },
                {text: '수정일', width: 150, datafield: 'trnsDt', cellsalign: 'center'},
                {text: '등록일', width: 150, datafield: 'regDt', cellsalign: 'center' },
            ]
            , pageable: false
            , editable: false
        });

        $rightGrid.on('bindingcomplete', function() {
            $rightGrid.jqxGrid('selectrow', 0);
            Main.searchCode3();

            if(comCode1 == '3002'){
                $bottomGrid.jqxGrid('setcolumnproperty','codeName','text','탐지명');
            }else if(comCode1 == '4007'){
                $bottomGrid.jqxGrid('setcolumnproperty','codeName','text','분류명');
            }
        });

        $rightGrid.on('click', function(event) {
        	if(comCode1 == '4007'){
        		Main.searchCode3();
        	}else if(comCode1 == '3002'){
                Main.searchCode3();
            }
        });
        
        // 하단 grid 세팅
        HmGrid.create($bottomGrid, {
            source: new $.jqx.dataAdapter({
                dataType: 'json',
            },{
            	formatData : function(data) {
					try{
		            	var rowIdx = HmGrid.getRowIdx($rightGrid);
		                comCode2 = $rightGrid.jqxGrid('getrowdata', rowIdx).comCode2;
		                codeName2 = $rightGrid.jqxGrid('getrowdata', rowIdx).codeName;
		                
		                $.extend(data, {
		                	comCode1 : comCode1, 
		                	comCode2: comCode2, 
		                	codeLvl: 3
						});
					}catch(err){}
					return data;
				}
            }),
            columns: [
                {text: '분류명', width: 250, datafield: 'codeName'},
                //{text: '코드값', width: 120, datafield: 'comCode2'},
                //{text: '코드값2', width: 120, datafield: 'comCode3'},
                {text: '설명', minwidth: 250, datafield: 'codeCont'},
                {text: '사용여부', width: 120, datafield: 'useYn',
                    cellsrenderer: function(row, column, value, rowData){
                        var val = "아니오";
                        if(value == 'Y'){
                            val = '예';
                        }
                        return '<div class="jqx-grid-cell-middle-align" style="margin-top: 2.5px;">'+val+'</div>';
                    }
                },
                {text: '수정일', width: 150, datafield: 'trnsDt', cellsalign: 'center' },
                {text: '등록일', width: 150, datafield: 'regDt', cellsalign: 'center' },
            ]
            , pageable: false
            , editable: false
        });
    },

    searchCode: function () {
    	HmGrid.updateBoundData($rightGrid, ctxPath + '/api/main/sys/getCodeList');
    },
    
    //좌측 상단 중분류 값에 대한 소분류 값
    searchCode3: function () {
        HmGrid.updateBoundData($bottomGrid, ctxPath + '/api/main/sys/getCodeList');
    },
    
    //좌측 대분류 코드 추가
    addCodeLv1: function () {
        /*$.get(ctxPath + '/main/popup/sys/pCodeLv1Add.do', function (result) {
            $('#pwindow').jqxWindow({
                width: 300,
                height: 120,
                title: '<h1>코드 등록</h1>',
                content: result,
                position: 'center',
                resizable: false
            });
            $('#pwindow').jqxWindow('open');
        });*/

        $.get(ctxPath + '/main/popup/sys/pCodeLv1Add.do',
            function(result) {
                HmWindow.open($('#pwindow'), '코드그룹 등록', result, 300, 150);
            }
        );
    },


    //좌측 코드(대분류) 수정 팝업
    editCodeLv1 : function () {
        var rowdata = HmGrid.getRowData($leftGrid);
        var params={comCode1: rowdata.comCode1};

        editCodeLv1Params = {
            codeName  : rowdata.codeName,
            comCode1  : rowdata.comCode1
        };


        $.get(ctxPath + '/main/popup/sys/pCodeLv1Edit.do',
            function(result) {
                HmWindow.open($('#pwindow'), '코드그룹 수정', result, 300, 130);
            }
        );
    },

    //좌측 코드 삭제
    deleteCodeLv1: function() {

    },

    //우측 중분류 코드 추가
    addCodeLv2: function () {
        /*$.get(ctxPath + '/main/popup/sys/pCodeLv2Add.do', function (result) {
            $('#pwindow').jqxWindow({
                width: 300,
                height: 250,
                title: '<h1>코드 등록</h1>',
                content: result,
                position: 'center',
                resizable: false
            });
            $('#pwindow').jqxWindow('open');
        });*/
        var sHeight=270;
        if(comCode1==3002)
            sHeight=310;

        $.get(ctxPath + '/main/popup/sys/pCodeLv2Add.do',
            function(result) {
                HmWindow.open($('#pwindow'), '코드 등록', result, 300, sHeight);
            }
        );
    },

    //우측 코드(중분류) 수정 팝업
    editCodeLv2 : function () {
        var rowdata = HmGrid.getRowData($rightGrid);
        if(rowdata == null){
            alert("수정할 코드를 선택해주세요.")
            return false;
        }
        editCodeLv2Params = {
            codeTitle : codeName,
            codeName  : rowdata.codeName,
            comCode1  : rowdata.comCode1,
            comCode2  : rowdata.comCode2,
            comCode3  : rowdata.comCode3,
            useYn     : rowdata.useYn,
            codeCont  : rowdata.codeCont
        };

        var sHeight=250;
        if(comCode1==3002)
            sHeight=290;

        $.get(ctxPath + '/main/popup/sys/pCodeLv2Edit.do',
            function(result) {
                HmWindow.open($('#pwindow'), '코드 수정', result, 300, sHeight);
            }
        );
    },


    //우측 하단 코드(소분류) 추가 팝업
    addCodeLv3: function () {
        $.get(ctxPath + '/main/popup/sys/pCodeLv3Add.do',
            function(result) {
                HmWindow.open($('#pwindow'), '코드 등록', result, 300, 180);
            }
        );
    },

    //우측 하단 코드(소분류) 수정 팝업
    editCodeLv3 : function () {
        var rowdata = HmGrid.getRowData($bottomGrid);
        if(rowdata == null){
            alert("수정할 코드를 선택해주세요.")
            return false;
        }
        editCodeLv2Params = {
            codeTitle : codeName,
            codeName  : rowdata.codeName,
            comCode1  : rowdata.comCode1,
            comCode2  : rowdata.comCode2,
            comCode3  : rowdata.comCode3,
            useYn     : rowdata.useYn,
            codeCont  : rowdata.codeCont

        };
        $.get(ctxPath + '/main/popup/sys/pCodeLv3Edit.do',
            function(result) {
                HmWindow.open($('#pwindow'), '분류 수정', result, 300, 180);
            }
        );
    },

    //새로고침
    reload: function (depth) {
        if(depth == 2){
            HmGrid.updateBoundData($rightGrid, ctxPath + '/api/main/sys/getCodeList');
        }else if(depth == 3){
            HmGrid.updateBoundData($bottomGrid, ctxPath + '/api/main/sys/getCodeList');
        }else{
            HmGrid.updateBoundData($leftGrid, ctxPath + '/api/main/sys/getCodeList');
        }

    },


};

//코드등록 콜백
function addCodeLv1Result(addData) {
    $leftGrid.jqxGrid('addrow', null, addData);
}


function save(addData, depth) {
    Server.post('/api/main/sys/addCode', {
        data: addData,
        success: function (data) {
            alert("추가되었습니다.")
            $('#pwindow').jqxWindow('close');
            if(depth == 2){
                HmGrid.updateBoundData($rightGrid, ctxPath + '/api/main/sys/getCodeList');
            }else{
                HmGrid.updateBoundData($bottomGrid, ctxPath + '/api/main/sys/getCodeList');
            }
            
            //사고유형 도움말 첨부파일
            $('#codeFileUpload').jqxFileUpload({
                uploadUrl : ctxPath + '/file/codeUpload.do?code2='+ addData.comCode2
            });
            try{
                $('#codeFileUpload').jqxFileUpload('uploadAll');
            }catch (e) {
                console.log(e);
            }
        }
    });
}
$(function () {
    Main.initVariable();
    Main.initDesign();
    Main.initData();
    Main.observe();
});