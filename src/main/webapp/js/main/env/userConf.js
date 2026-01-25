var $userGrid
var editUserIds = [];
var userId;
var totalCnt = 0;
var Main = {
		/** variable */
		initVariable: function() {
			$userGrid = $('#userGrid');
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
                    this.add();
                    break;
                case 'btnDel':
                    this.del();
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
            /*$('#checkAll').jqxCheckBox({ checked: true })
                .on('change', function(event) {
                    var ischecked = event.args.checked;
                    if(ischecked){
                        checkYn = 'Y';
                        $("#srchInstCd").val('');
                        $('#srchInstCdArea').jqxDropDownButton({ disabled: true});
                    }else{
                        checkYn = 'N';
                        $('#srchInstCdArea').jqxDropDownButton({ disabled: false});
                    }
                });
            $('#srchInstCdArea').jqxDropDownButton({ disabled: true});
             */

            HmDropDownBtn.createDeptTreeGrid($('#srchInstCdArea'), $('#srchInstTree'), 'area', '15%', 22, '98%', 350, null);

            $('#srchUseYn').jqxDropDownList({ source: [
                {label: '예', value: 'Y'},
                {label: '아니오', value: 'N'},

            ],displayMember: 'label', valueMember: 'value', width: 80, height: 19, theme: jqxTheme, selectedIndex: 0, autoDropDownHeight: true })

			HmWindow.create($('#pwindow'), 100, 100);
			HmGrid.create($userGrid, {
				source: new $.jqx.dataAdapter(
						{
							datatype: 'json',
                            url: ctxPath + '/api/main/env/userConf/getUserConfList',
							updaterow: function(rowid, rowdata, commit) {
								if(editUserIds.indexOf(rowid) == -1)
									editUserIds.push(rowid);
									commit(true);
				            },
							datafields: [
                                { name: 'userId', type: 'string' },
                                { name: 'instCd', type: 'string' },
                                { name: 'userName', type: 'string' },
                                { name: 'grade', type: 'string' },
                                { name: 'moblPhnNo', type: 'string' },
                                { name: 'homeTelNo', type: 'string' },
                                { name: 'offcTelNo', type: 'string' },
                                { name: 'offcFaxNo', type: 'string' },
                                { name: 'emailAddr', type: 'string' },
                                { name: 'smsYn', type: 'string' },
                                { name: 'emailYn', type: 'string' },
                                { name: 'useYn', type: 'string' },
                                { name: 'centerUserYn', type: 'string' },
                                { name: 'regDt', type: 'string' },
                                { name: 'instNm', type: 'string' },
                                { name: 'authMain', type: 'string' },
                                { name: 'authSub', type: 'string' }

                            ],
                            beforeprocessing: function(data) {
                                if(data != null){
                                    totalCnt = data.resultData.length;
                                }
                            }
						},
                        {
                            formatData : function(data) {

                                    /*$.extend(data, {
                                        useYn    : $("#srchUseYn").val(),
                                        userName : $("#srchUserName").val(),
                                        userId   : $("#srchUserId").val(),
                                        instCd   : $("#srchInstCd").val()
                                    });*/
                                if($("#srchInstCd").val() == ''){
                                    data.instCd = '1100000';
                                }else{
                                    data.instCd = $("#srchInstCd").val();
                                }
                                data.useYn = $("#srchUseYn").val();
                                data.userId = $("#srchUserId").val();
                                data.userName = $("#srchUserName").val();
                                return data;
                            }
                        }
				),
                pageable : true,
                pagermode: 'default',
                columns:
                    [
                        { text: 'No', width: '5%', pinned: true, editable: false , sortable: false, cellsalign: 'center', filterable: false,
                            cellsrenderer: function(row, column, value, rowData) {
                                return "<div style='margin-top: 4px; margin-right: 5px' class='jqx-center-align'>" + (row+1)*1 +"</div>";
                            }
                        },
                        { text : '이름', datafield : 'userName', width: 'auto', editable: false, cellsalign: 'left'},
                        { text : '아이디', datafield : 'userId', width : '10%', editable: false, cellsalign: 'left'},
                        { text : '직급', datafield : 'grade', width : '10%', editable: false, cellsalign: 'center', hidden: true},
                        { text : '소속기관', datafield : 'instNm', width : '10%', editable: false, cellsalign: 'left'},
                        { text : '사무실 전화번호', datafield : 'offcTelNo', width : '8%', cellsalign: 'left'},
                        { text : '휴대폰 번호', datafield : 'moblPhnNo', width : '8%', cellsalign: 'left',
                            validation: function(cell, value) {
                                if(!$.isBlank(value)) {
                                    if(/[^0-9\-]/.test(value)) {
                                        return { result: false, message: '숫자와 특수문자[-]만 입력가능합니다.' };
                                    }
                                }
                                return true;
                            }
                        },
                        { text : 'E-Mail', datafield : 'emailAddr', width: '10%' },
                        { text : '메인권한', datafield : 'authMain', width: '8%' ,
                            cellsrenderer: function(row, column, value, rowData){
                                var authMain = "";
                                if(value == 'AUTH_MAIN_1'){
                                    authMain = '관리자';
                                }else if(value == 'AUTH_MAIN_2'){
                                    authMain = '중앙지원센터';
                                }else if(value == 'AUTH_MAIN_3'){
                                    authMain = '시도';
                                }else if(value == 'AUTH_MAIN_4'){
                                    authMain = '시군구';
                                }
                                else{
                                    authMain = '-';
                                }
                                return '<div class="jqx-grid-cell-left-align" style="margin-top: 2.5px;">'+authMain+'</div>';
                            }
                        },
                        { text : '서브권한', datafield : 'authSub', width: '8%' ,
                            cellsrenderer: function(row, column, value, rowData){
                                var authSub = "";
                                if(value == 'AUTH_SUB_1'){
                                    authSub = '관리자';
                                }else if(value == 'AUTH_SUB_2'){
                                    authSub = '담당자';
                                }else if(value == 'AUTH_SUB_3'){
                                    authSub = '운영자';
                                }
                                else{
                                    authSub = '-';
                                }
                                return '<div class="jqx-grid-cell-left-align" style="margin-top: 2.5px;">'+authSub+'</div>';
                            }
                        },
                        { text: '등록일', width: '10%', datafield: 'regDt',
                            cellsrenderer: function(row, column, value, rowData){
                                var parseDate = "";
                                parseDate = HmUtil.parseDate(value);
                                return '<div class="jqx-grid-cell-middle-align" style="margin-top: 2.5px;">'+parseDate+'</div>';
                            }
                        }
                    ],
                editable: false,
				editmode : 'selectedcell'
			});
			$userGrid.on('celldoubleclick', function (event) {
                var rowIdx = HmGrid.getRowIdx($userGrid);
                var rowdata = HmGrid.getRowData($userGrid, rowIdx);
				console.log('rowdata',rowdata);
                var url = "";
                //main/popup/env/pUserConfDetail.do
                //main/popup/env/pUserConfEdit.do
                var popupTile = "상세";
                $.post(ctxPath + '/main/popup/env/pUserConfEdit.do',
                    function (result) {
                        HmWindow.open($('#pwindow'), '사용자관리 수정', result, 900, 390, 'pwindow_init', rowdata);
                        $('.jqx-window-modal').css("z-index", "799");
                        $('#pwindow').css("z-index", "800");
                    }
                );
			     
			 });
		},
		
		/** init data */
		initData: function() {

		},

		search : function() {
			HmGrid.updateBoundData($userGrid, ctxPath + '/api/main/env/userConf/getUserConfList');
		},

		add: function () {
			$.post(ctxPath + '/main/popup/env/pUserConfAdd.do',
				function (result) {
					HmWindow.open($('#pwindow'), '사용자 등록', result, 900, 390, 'pwindow_init');
                    $('.jqx-window-modal').css("z-index", "799");
                    $('#pwindow').css("z-index", "800");
				}
			);
		},

        del: function () {
            var rowIdx = HmGrid.getRowIdx($userGrid, '데이터를 선택해주세요.');

            if (rowIdx === false) return;
            var rowdata = HmGrid.getRowData($userGrid, rowIdx);

            if(!confirm('선택된 데이터를 삭제하시겠습니까?')) return;

            Server.post('/api/main/env/userConf/delUser', {
                data : {userId : rowdata.userId},
                success : function(result) {
                    alert("삭제 되었습니다.")
                    Main.search();
                }
            });
        }

};


$(function() {
	Main.initVariable();
	Main.observe();
	Main.initDesign();
	Main.initData();
});