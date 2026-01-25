var $dGrpTreeGrid;
var $instIPGrid, isAdmin = false;
var editInstIds = [], editSendFlag = [];
var userId;
var localList = [], typeMidList = [], typeSmlList = [];
var totalCnt = 0;
var Main = {
		/** variable */
		initVariable: function() {
			$instIPGrid = $('#instIPGrid');
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
                columns = [
                    { text : '번호', datafield : 'no', width : '5%',  cellsalign: 'center',
                        cellsrenderer: function(row, column, value, rowData) {
                            return "<div style='margin-top: 4px; margin-right: 5px' class='jqx-center-align'>" + (totalCnt - row)*1 +"</div>";
                        }},
                    { text : '차상위기관', datafield : 'pntSInstCd', displayfield: 'pntSInstCdNm', width : '15%', cellsalign: 'center' },
                    { text : '기관명', datafield : 'instNm', width: '40%' , cellsalign: 'center'},
                    { text : '망구분', datafield : 'ipCd', width : '10%', cellsalign: 'center' },
                    { text : 'IP', datafield : 'sipEip', minwidth : '15%', cellsalign: 'center'},
                    { text : '설명', datafield : 'ipCont', minwidth : '15%', cellsalign: 'center',
                        cellsrenderer: function(row, column, value, rowData) {
                    		var cont = '';
                    		if(value != null){
                                cont = value.htmlCharacterUnescapes();
							}
                            return "<div style='margin-top: 4px; margin-right: 5px' class='jqx-center-align'>" + cont +"</div>";
                        }
					}
                ]
			}else{
                columns = [
                    { text : '번호', datafield : 'no', width : '5%',  cellsalign: 'center',
                        cellsrenderer: function(row, column, value, rowData) {
                            return "<div style='margin-top: 4px; margin-right: 5px' class='jqx-center-align'>" + (totalCnt - row)*1 +"</div>";
                        }},
                    { text : '차상위기관', datafield : 'pntSInstCd', displayfield: 'pntSInstCdNm', width : '15%', cellsalign: 'center', hidden:true },
                    { text : '기관명', datafield : 'instNm', width: '40%' , cellsalign: 'center'},
                    { text : '망구분', datafield : 'ipCd', width : '10%', cellsalign: 'center' },
                    { text : 'IP', datafield : 'sipEip', minwidth : '100', cellsalign: 'center'},
                    { text : '설명', datafield : 'ipCont', minwidth : '15%', cellsalign: 'center',
                        cellsrenderer: function(row, column, value, rowData) {
                            var cont = '';
                            if(value != null){
                                cont = value.htmlCharacterUnescapes();
                            }
                            return "<div style='margin-top: 4px; margin-right: 5px' class='jqx-center-align'>" + cont +"</div>";
                        }
					}
                ]
			}

			// console.log(columns);

			HmGrid.create($instIPGrid, {
				source: new $.jqx.dataAdapter(
						{
							datatype: 'json',
							updaterow: function(rowid, rowdata, commit) {
								if(editInstIds.indexOf(rowid) == -1)
									editInstIds.push(rowid);
									commit(true);
				            },
							datafields: [
					             { name: 'no', type: 'number' },
					             { name: 'seq', type: 'number' },
					             { name: 'instCd', type: 'number' },
					             { name: 'instNm', type: 'string' },
					             { name: 'pntSInstCd', type: 'number' },
					             { name: 'pntSInstCdNm', type: 'string' },
					             { name: 'ipCd', type: 'string' },
					             { name: 'sipStr', type: 'string' },
					             { name: 'eipStr', type: 'string' },
					             { name: 'sipEip', type: 'string' },
                                 { name: 'ipCont', type: 'string' }
				            ],
                            beforeprocessing: function(data) {
                                if(data != null){
                                    totalCnt = data.resultData.length;
                                }
                            }
						}, {
							formatData : function(data) {
								try{
									var treeItem = HmTreeGrid.getSelectedItem($dGrpTreeGrid);
									var _tabValue = treeItem.grpNo;
									$.extend(data, {
										sInstNm : $("#sInstNm").val(),
										sInstIp : $("#sInstIp").val(),
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
				columns: columns
			});

		},
		
		/** init data */
		initData: function() {
//			Main.search();
		},

		search : function() {
			HmGrid.updateBoundData($instIPGrid, ctxPath + '/api/main/env/instIPMgmt/getInstIPMgmtList');
		},

		add: function(){
			$.get(ctxPath + '/main/popup/env/pInstIPAdd.do', function(result) {
                HmWindow.open($('#pwindow'), '기관IP대역 추가', result, 460, 240, 'pwindow_init');
            });
		},
		
		edit: function(){
			var rowIdxes = HmGrid.getRowIdxes($instIPGrid);
			if(rowIdxes === false) {
				alert('선택된 기관IP대역이 없습니다.');
				return;
			}
			if(rowIdxes.length!=1){
				alert("한개의 기관IP대역만 선택해 주세요.");
				return;
			}else{
				var instInfo = $instIPGrid.jqxGrid('getrowdata', rowIdxes[0]);
				$.get(ctxPath + '/main/popup/env/pInstIPEdit.do', function(result) {
	                HmWindow.open($('#pwindow'), '기관IP대역 수정', result, 460, 240, 'pwindow_init', instInfo);
	            });
			}
            
		},
		
		del: function(){
			var rowIdxes = HmGrid.getRowIdxes($instIPGrid);
			if(rowIdxes === false) {
				alert('선택된 기관IP대역이 없습니다.');
				return;
			}
			
			if(!confirm('[' + rowIdxes.length + ']건의 기관IP대역을 삭제하시겠습니까?')) return;
			
			var _instCds = [], _uids = [];
			$.each(rowIdxes, function(idx, value) {
				var tmp = $instIPGrid.jqxGrid('getrowdata', value);
				_instCds.push({instCd:tmp.instCd, seq:tmp.seq});
				_uids.push(tmp.uid);
			});
			
			Server.post('/api/main/env/instIPMgmt/delInstIPMgmt', {
				data: { instCds: _instCds },
				success: function(result) {
					$instIPGrid.jqxGrid('deleterow', _uids);
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
			
			HmUtil.exportExcel(ctxPath + '/api/main/env/instIPMgmt/export', params);
		}
};


$(function() {
	Main.initVariable();
	Main.observe();
	Main.initDesign();
	Main.initData();
});