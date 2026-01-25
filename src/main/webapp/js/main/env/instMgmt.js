var $dGrpTreeGrid;
var $instGrid, isAdmin = false;
var editInstIds = [], editSendFlag = [];
var userId;
var localList = [], typeMidList = [], typeSmlList = [];
var Main = {
		/** variable */
		initVariable: function() {
			$instGrid = $('#instGrid');
			$dGrpTreeGrid = $('#dGrpTreeGrid');
		},
		
		/** add event */
		observe: function() {
			$('button').bind('click', function(event) { Main.eventControl(event); });
			$('.searchBox input:text').bind('keyup', function(event) { Main.keyupEventControl(event); });
		},
		
		/** event handler */
		eventControl: function(event) {
			var curTarget = event.currentTarget;
			switch(curTarget.id) {
			case 'btnAdd': this.add(); break;
			case 'btnAdj': this.edit(); break;
			case 'btnDel': this.del(); break;
			case 'btnSearch': this.search(); break;
			case 'btnExcel': this.exportExcel(); break;
			}
		},

		/** keyup event handler */
		keyupEventControl: function(event) {
			if(event.keyCode == 13) {
				Main.search();
			}
		},
		
		/** init design */
		initDesign: function() {
			HmWindow.create($('#pwindow'), 100, 100);
			
			$('#mainSplitter').jqxSplitter({ width: '99.8%', height: '99.8%', orientation: 'vertical', theme: jqxTheme, panels: [{ size: 254, collapsible: true }, { size: '100%' }] });
			// 좌측 탭영역
			HmTreeGrid.create($dGrpTreeGrid, HmTree.T_GRP_INST, Main.search, {}, ['instNm']);

			var columns;

			if($('#sAuthMain').val()=='AUTH_MAIN_2'){
                columns=[
                    { text : '기관코드', datafield : 'instCd', width : '10%', editable: false, cellsalign: 'center' },
                    { text : '차상위기관', datafield : 'pntSInstCd', displayfield: 'pntSInstCdNm', width : '10%', cellsalign: 'center' },
                    { text : '기관명', datafield : 'instNm', width: 'auto', cellsalign: 'center' },
                    { text : '지역', datafield : 'localCd', displayfield: 'localCdNm', width : '8%', cellsalign: 'center', columntype: 'dropdownlist',
                        createeditor : function(row, value, editor) {
                            editor.jqxDropDownList({ source : localList, displayMember : 'localNm', valueMember : 'localCd', placeHolder: '선택해 주세요' });
                        },
                        validation : function(cell, value) {
                            if (value == 0 || value == null) {
                                return {
                                    result : false,
                                    message : '지역을 선택해주세요.' };
                            }
                            return true;
                        }},
                    { text : '유형분류 중', datafield : 'typeMid', displayfield: 'typeMidNm', width : '10%', cellsalign: 'center' },
                    { text : '유형분류 소', datafield : 'typeSml', displayfield: 'typeSmlNm', width : '10%', cellsalign: 'center' },
                    { text : '사용여부', datafield : 'useYn', displayfield: 'useYnNm', cellsalign: 'center', width: '8%', columntype: 'dropdownlist',
                        createeditor: function(row, value, editor) {
                            var s = [
                                { label: '미사용',	value: 'N' },
                                { label: '사용',	value: 'Y' }
                            ];
                            editor.jqxDropDownList({ source: s, autoDropDownHeight: true, displayMember: 'label', valueMember: 'value' });
                        }
                    },
                    { text : '등록일시', datafield : 'regDt', cellsalign: 'center', width : '10%', editable: false}
                ]
            }else{
                columns=[
                    { text : '기관코드', datafield : 'instCd', width : '10%', editable: false, cellsalign: 'center' },
                    { text : '차상위기관', datafield : 'pntSInstCd', displayfield: 'pntSInstCdNm', width : '10%', cellsalign: 'center', hidden:true },
                    { text : '기관명', datafield : 'instNm', width: 'auto', cellsalign: 'center' },
                    { text : '지역', datafield : 'localCd', displayfield: 'localCdNm', width : '8%', cellsalign: 'center', columntype: 'dropdownlist',
                        createeditor : function(row, value, editor) {
                            editor.jqxDropDownList({ source : localList, displayMember : 'localNm', valueMember : 'localCd', placeHolder: '선택해 주세요' });
                        },
                        validation : function(cell, value) {
                            if (value == 0 || value == null) {
                                return {
                                    result : false,
                                    message : '지역을 선택해주세요.' };
                            }
                            return true;
                        }},
                    { text : '유형분류 중', datafield : 'typeMid', displayfield: 'typeMidNm', width : '10%', cellsalign: 'center' },
                    { text : '유형분류 소', datafield : 'typeSml', displayfield: 'typeSmlNm', width : '10%', cellsalign: 'center' },
                    { text : '사용여부', datafield : 'useYn', displayfield: 'useYnNm', cellsalign: 'center', width: '8%', columntype: 'dropdownlist',
                        createeditor: function(row, value, editor) {
                            var s = [
                                { label: '미사용',	value: 'N' },
                                { label: '사용',	value: 'Y' }
                            ];
                            editor.jqxDropDownList({ source: s, autoDropDownHeight: true, displayMember: 'label', valueMember: 'value' });
                        }
                    },
                    { text : '등록일시', datafield : 'regDt', cellsalign: 'center', width : '10%', editable: false}
                ]
			}
			
			HmGrid.create($instGrid, {
				source: new $.jqx.dataAdapter(
						{
							datatype: 'json',
							updaterow: function(rowid, rowdata, commit) {
								if(editInstIds.indexOf(rowid) == -1)
									editInstIds.push(rowid);
									commit(true);
				            },
							datafields: [
					             { name: 'instCd', type: 'number' },
					             { name: 'instNm', type: 'string' },
					             { name: 'pntSInstCd', type: 'number' },
					             { name: 'pntSInstCdNm', type: 'string' },
					             { name: 'localCd', type: 'string' },
					             { name: 'localCdNm', type: 'string' },
					             { name: 'useYn', type: 'string' },
					             { name: 'useYnNm', type: 'string' },
					             { name: 'typeMid', type: 'string' },
					             { name: 'typeMidNm', type: 'string' },
					             { name: 'typeSml', type: 'string' },
					             { name: 'typeSmlNm', type: 'string' },
					             { name: 'regDt', type: 'string' }
				            ]
						}, {
							formatData : function(data) {
								try{
									var treeItem = HmTreeGrid.getSelectedItem($dGrpTreeGrid);
									var _tabValue = treeItem.grpNo;
									$.extend(data, {
										sInstNm : $("#sInstNm").val(),
										pntInstCd: _tabValue
									});
								}catch(err){}
								return data;
							}
						}
				),
                selectionmode: 'multiplerowsextended',
                pageable : true,
                pagermode: 'default',
                columns:columns
			});
			

			Server.post('/api/common/code/getLocalCode', {
				success: function(result) {
					localList = result;
				}
			});
			
			Server.post('/api/common/code/getCommonCode', {
	        	data: {comCode1: '2009', codeLvl: '2'}, 
				success: function(result) {
					typeMidList = result;
				}
			});
		},
		
		/** init data */
		initData: function() {
//			Main.search();
		},

		search : function() {
			HmGrid.updateBoundData($instGrid, ctxPath + '/api/main/env/instMgmt/getInstMgmtList');
		},

		add: function(){
			var grpInfo = $('#dGrpTreeGrid').jqxTreeGrid('getSelection')[0];
			var params = {};
			if(grpInfo!=null){
				$.extend(params, {
					grpNo : grpInfo.grpNo
				});
			}else{
				$.extend(params, { grpNo : null });
			}
			$.get(ctxPath + '/main/popup/env/pInstAdd.do', function(result) {
                HmWindow.open($('#pwindow'), '기관 추가', result, 320, 305, 'pwindow_init', params);
                $('.jqx-window-modal').css("z-index", "799");
                $('#pwindow').css("z-index", "800");
            });
		},
		
		edit: function(){
			var rowIdxes = HmGrid.getRowIdxes($instGrid);
			if(rowIdxes === false) {
				alert('선택된 기관이 없습니다.');
				return;
			}
			if(rowIdxes.length!=1){
				alert("한개의 기관만 선택해 주세요.");
				return;
			}else{

	            var instInfo = $instGrid.jqxGrid('getrowdata', rowIdxes[0]);
				$.get(ctxPath + '/main/popup/env/pInstEdit.do', function(result) {
	                HmWindow.open($('#pwindow'), '기관 수정', result, 320, 305, 'pwindow_init', instInfo);
                    $('.jqx-window-modal').css("z-index", "799");
                    $('#pwindow').css("z-index", "800");
	            });	
			}
			
		},
		
		del: function(){
			var rowIdxes = HmGrid.getRowIdxes($instGrid);
			if(rowIdxes === false) {
				alert('선택된 기관이 없습니다.');
				return;
			}
			
			if(!confirm('[' + rowIdxes.length + ']건의 기관을 삭제하시겠습니까?')) return;
			
			var _instCds = [], _uids = [];
			$.each(rowIdxes, function(idx, value) {
				var tmp = $instGrid.jqxGrid('getrowdata', value);
				_instCds.push({instCd:tmp.instCd});
				_uids.push(tmp.uid);
			});
			
			Server.post('/api/main/env/instMgmt/delInstMgmt', {
				data: { instCds: _instCds },
				success: function(result) {
					$instGrid.jqxGrid('deleterow', _uids);
					alert('삭제되었습니다.');
				}
			});
			
		},
		
		/** export Excel */
		exportExcel: function() {
			var params = {};
			
			var treeItem = HmTreeGrid.getSelectedItem($dGrpTreeGrid);
			var _tabValue = treeItem.grpNo;
			$.extend(params, {
				sInstNm : $("#sInstNm").val(),
				pntInstCd: _tabValue
			});
			
			HmUtil.exportExcel(ctxPath + '/api/main/env/instMgmt/export', params);
		}
};


$(function() {
	Main.initVariable();
	Main.observe();
	Main.initDesign();
	Main.initData();
});