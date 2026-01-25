var $nationIPGrid, isAdmin = false;
var editInstIds = [], editSendFlag = [];
var userId;
var localList = [], typeMidList = [], typeSmlList = [];
var Main = {
		/** variable */
		initVariable: function() {
			$nationIPGrid = $('#nationIPGrid');
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
			case 'btnSearch': this.search(); break;
			case 'btnExcel': this.exportExcel(); break;
			case 'btnGet': this.get(); break;
            case 'btnModify': this.editNation(); break;
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
			HmWindow.create($('#pwindow2'), 100, 100);
			
			var imagerenderer = function (row, datafield, value) {
				
				var cell = "<div style='margin-top: 2px' class='jqx-center-align'>";
				cell += '<img height="13" width="20" src="../../img/symbol/' + value + '.gif" alt="symbol"/>';
				cell += "</div>";
				return cell;
			}
			
			HmGrid.create($nationIPGrid, {
				source: new $.jqx.dataAdapter(
						{
							datatype: 'json',
							datafields: [
					             { name: 'nationCd', type: 'number' },
					             { name: 'nationNm', type: 'string' },
					             { name: 'nationNmCnt', type: 'string' },
					             { name: 'domain', type: 'string' },
					             { name: 'continental', type: 'string' },
					             { name: 'nationCnt', type: 'number' },
					             { name: 'regDt', type: 'string' },
                                 { name: 'krNm', type: 'string' }
				            ]
						}, {
							formatData : function(data) {
								try{
									$.extend(data, {
										sNationNm : $("#sNationNm").val()
									});
								}catch(err){}
								return data;
							}
						}
				),
				columns: 
				[
					{ text : '번호', datafield : 'nationCd', width : 120,  cellsalign: 'center' },
					{ text : ' ', datafield : 'domain', width: 40,  cellsalign: 'center', cellsrenderer: imagerenderer },
					{ text : '국가명', datafield : 'nationNmCnt', minwidth: 150 },
					{ text : '대륙명', datafield : 'continental', width : 150},
                    { text : '한글명', datafield : 'krNm', width : 150},
					{ text : '갱신일자', datafield : 'regDt', width : 150, cellsalign: 'center'}
			    ]
			});

			$nationIPGrid.on('rowdoubleclick', function(event) {
				var data = event.args.row.bounddata;
				Main.openIpList(data);
			});
			
		},
		/** init data */
		initData: function() {
			Main.search();
		},

		search : function() {
			HmGrid.updateBoundData($nationIPGrid, ctxPath + '/api/main/env/nationIPMgmt/getNationMgmtList');
		},

		/** IP 리스트 조회*/
		openIpList: function(params){
			$.get(ctxPath + '/main/popup/env/pNationIPList.do', function(result) {
                HmWindow.open($('#pwindow2'), '국가별IP대역', result, 500, 500, 'pwindow_init', params);
            });
		},
		
		/** 가져오기 */
		get: function(){
			alert("기능 구현중입니다");
		},
		
		/** csv 파일로 DB에 넣는 가져오기방식 */
		getCsv: function(){
			$.get(ctxPath + '/main/popup/env/pNationIPImport.do', function(result) {
                HmWindow.open($('#pwindow2'), '국가별IP대역 가져오기', result, 800, 150, 'pwindow_init');
            });
		},
		
		/** export Excel */
		exportExcel: function() {
			var params = {};
			
			$.extend(params, {
				sNationNm : $("#sNationNm").val()
			});
			
			HmUtil.exportExcel(ctxPath + '/api/main/env/nationIPMgmt/export', params);
		},
    	editNation: function(){
        var rowIdxes = HmGrid.getRowIdxes($nationIPGrid);
        if(rowIdxes === false) {
            alert('선택된 국가가 없습니다.');
            return;
        }
        if(rowIdxes.length!=1){
            alert("한개의 국가만 선택해 주세요.");
            return;
        }else{
        	var nationCd = $nationIPGrid.jqxGrid('getcellvalue', rowIdxes, 'nationCd');
            var params = {
                nationCd:nationCd
            };
            $.get(ctxPath + '/main/popup/env/pNationEdit.do', function(result) {
                HmWindow.open($('#pwindow'), '국가 수정', result, 320, 200, 'pwindow_init', params);
            });
        }

    },
};


$(function() {
	Main.initVariable();
	Main.observe();
	Main.initDesign();
	Main.initData();
});