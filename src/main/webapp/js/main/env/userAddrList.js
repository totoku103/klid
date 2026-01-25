var $userGrid, isAdmin = false;
var editUserIds = [], editSendFlag = [];
var userId;
var checkYn = 'Y';
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
            }
		},

		keyupEventControl: function(event) {
			if(event.keyCode == 13) {
				Main.search();
			}
		},
		
		/** init design */
		initDesign: function() {
            HmDropDownBtn.createDeptTreeGrid($('#instCdArea'), $('#instCd'), 'area', '15%', 22, '98%', 350, null);

			HmWindow.create($('#pwindow'), 100, 100);
			HmGrid.create($userGrid, {
				source: new $.jqx.dataAdapter(
						{
							datatype: 'json',
                            url: ctxPath + '/api/main/env/userConf/getUserAddrList',
							updaterow: function(rowid, rowdata, commit) {
								if(editUserIds.indexOf(rowid) == -1)
									editUserIds.push(rowid);
									commit(true);
				            },
							datafields: [
					             { name: 'userId', type: 'string' },
					             { name: 'userName', type: 'string' },
                                 { name: 'instNm', type: 'string' },
                                 { name: 'grade', type: 'string' },
					             { name: 'offcTelNo', type: 'string' },
					             { name: 'moblPhnNo', type: 'string' },
					             { name: 'emailAddr', type: 'string' }
				            ]
						},
						{
                        	formatData : function(data) {
                                if($("#dmgInstCd").val() == ''){
                                    data.instCd = '1100000';
                                }else{
                                    data.instCd = $("#dmgInstCd").val();
                                }
                                return data;

                        	}
                    	}
				),
				editable: false,
				editmode : 'selectedcell',
				columns: 
				[
                    { text: 'No', width: '5%', pinned: true, editable: false , sortable: false, cellsalign: 'center', filterable: false,
						cellsrenderer: function(row, column, value, rowData) {
                            return "<div style='margin-top: 4px; margin-right: 5px' class='jqx-center-align'>" + (row + 1) +"</div>";
                    	}
					},
                    { text : '지역', datafield : 'instNm', width : '10%', editable: false, cellsalign: 'center'},
                    { text : '직급/지위', datafield : 'grade', width : '10%', editable: false, cellsalign: 'center'},
					{ text : '이름', datafield : 'userName', width: '10%', editable: false, cellsalign: 'center'},
                    { text : '아이디', datafield : 'userId', width : '15%', editable: false, cellsalign: 'center'},
					{ text : '연락처', datafield : 'moblPhnNo', width : '15%', editable: false, cellsalign: 'center',
						validation: function(cell, value) {
							if(!$.isBlank(value)) {
								if(/[^0-9\-]/.test(value)) {
									return { result: false, message: '숫자와 특수문자[-]만 입력가능합니다.' };
								}
							}
							return true;
						}
					},
                    { text : 'E-Mail', datafield : 'emailAddr', width: '20%' ,cellsalign: 'center'},
					{ text : '대표전화', datafield : 'offcTelNo', width : '15%', editable: false, cellsalign: 'center',
						validation: function(cell, value) {
							if(!$.isBlank(value)) {
								if(/[^0-9\-]/.test(value)) {
									return { result: false, message: '숫자와 특수문자[-]만 입력가능합니다.' };
								}
							}
							return true;
						}
					},
					

			    ]
			});
		},
		
		/** init data */
		initData: function() {
            //Main.search();
		},

    	search : function() {
        	HmGrid.updateBoundData($userGrid, ctxPath + '/api/main/env/userConf/getUserAddrList');
    	},

		getCommParams: function() {
			if(checkYn == 'N'){
                var params = {
                    instCd : $('#dmgInstCd').val()
                }
                return params;
            }
		}
};


$(function() {
	Main.initVariable();
	Main.observe();
	Main.initDesign();
	Main.initData();
});