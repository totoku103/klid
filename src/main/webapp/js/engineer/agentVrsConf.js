var $agentGrid;

var Main = {
		/** variable */
		initVariable: function() {
			$agentGrid = $('#agentGrid');
		},
		
		/** add event */
		observe: function() {
			$('button').bind('click', function(event) { Main.eventControl(event); });
		},
		
		/** event handler */
		eventControl: function(event) {
			var curTarget = event.currentTarget;
			switch(curTarget.id) {
			case 'btnAdd': this.add(); break;
			case 'btnSearch': this.search(); break;
			}
		},
		
		/** init design */
		initDesign: function() {
			HmGrid.create($agentGrid, {
				source: new $.jqx.dataAdapter(
						{
							datatype: 'json'
						}
				),
				columns:
				[
				 	{ text: '번호', datafield: 'verNo', width: '5%', cellsalign: 'right' },
				 	{ text: 'ORG 파일명', datafield: 'orgFileNm', width: '20%' },
				 	{ text: 'UPLOAD 파일명', datafield: 'fileNm', width: '20%' },
				 	{ text: '파일버전', datafield: 'fileVer', width: '10%', cellsalign: 'center' },
				 	{ text: '파일비트', datafield: 'agentOsBitCd', displayfield: 'disAgentOsBitCd', columntype: 'dropdownlist', width: '10%', cellsalign: 'center' },
				 	{ text: '종류', datafield: 'agentOsKindCd', displayfield: 'disAgentOsKindCd', columntype: 'dropdownlist', width: '10%', cellsalign: 'center' },
				 	{ text: '확장정보', datafield: 'extInfo', width: '15%' },
				 	{ text: '등록일시', datafield: 'regDate', width: '10%', cellsalign: 'center' }
				]
			});
		},
		
		/** init data */
		initData: function() {
			this.search();
		},
		
		search: function() {
			HmGrid.updateBoundData($agentGrid, ctxPath + '/api/engineer/agentVrsConf/getAgentVerList');
		},
		
		add: function() {
			$.get(ctxPath + '/engineer/popup/pAgentVerAdd.do', function(result) {
				HmWindow.open($('#pwindow'), '에이전트버전 추가', result, 450, 270);
			});
		},
		
		del: function() {
			var rowIdxes = HmGrid.getRowIdxes($agentGrid, '선택된  데이터가 없습니다.');
			if(rowIdxes === false) return;
			
			if(!confirm('선택된 데이터를 삭제하시겠습니까?')) return;
			
			var rowData = $agentGrid.jqxGrid('getrowdata', rowIdxes);
			Server.post('/api/svr/delAgent', {
				data: { 
					verNo: rowData.verNo
				},
				success: function(result) {
					$agentGrid.jqxGrid('updateBoundData');
					alert(result);
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