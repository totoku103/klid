var $boardGrid;
var itemget;
var totalCnt = 0;
$(function() {
	Main.initVariable();
	Main.observe();
	Main.initDesign();
	Main.initData();
});

var Main = {
	/** variable */
	initVariable : function() {
		$boardGrid = $('#boardGrid');
	},

	/** add event */
	observe : function() {
		$('button').bind('click', function(event) {
			Main.eventControl(event);
		});
		$('img').bind('click', function(event) {
			Main.eventControl(event);
		});
	},

	/** event handler */
	eventControl : function(event) {
		var curTarget = event.currentTarget;
		switch (curTarget.id) {
		case 'btnWrite':
			this.checkWrite();
			break;
		case 'btnSearch':
			this.searchNBoard();
			break;
		}
	},

	/** init design */
	initDesign : function() {
		if($("#authNot01").val() == 'N'){
            $("#btnWrite").css("display", "none");
		};
		// 사이트에 따라 예외처리. 18.04.17
		var printTime_txt = "작성시간";
		var printTime_val = "printTime";
		var printTime_width = 100;
		if($('#gSiteName').val() != 'Samsung'){
			printTime_txt = "작성일시";
			printTime_val = "printDate";
			printTime_width = 130;
		}





		HmGrid.create($boardGrid, {
			source : new $.jqx.dataAdapter(
				{
					datatype : 'json',
					beforeprocessing: function(data) {
						if(data != null){
							totalCnt = data.resultData.length;
						}
					}
				},
                {
                    formatData: function (data) {
                        data.title = $("#title").val();
                        data.bultnCont = $("#bultnCont").val();
                        data.sInstCd  =  $("#sInstCd").val();
                        data.sPntInstCd  =  $("#sPntInstCd").val();
                        data.sAuthMain = $("#sAuthMain").val();
                        return data;
                    }
                }

			),
            pageable : true,
            pagermode: 'default',
			columns : [
					{ text : 'NO', datafield : 'bultnNo', cellsalign : 'center', width : '5%' ,
                        cellsrenderer: function(row, column, value, rowData) {
                            return "<div style='margin-top: 4px; margin-right: 5px' class='jqx-center-align'>" + (totalCnt - row)*1 +"</div>";
                        }
					},
					{ text : '제목', datafield : 'bultnTitle', align : 'center', width : 'auto'},
					{ text : '소속', datafield : 'instNm', cellsalign : 'center', width : '10%' },
					{ text : '게시자', datafield : 'userName', cellsalign : 'center', width : '10%' },
					{ text : '등록일', datafield : 'regDate', cellsalign : 'center', width : '10%',
						cellsrenderer: function(row, column, value, rowData){
                            var parseDate = "";
                            parseDate = HmUtil.parseDate(value);
                            return '<div class="jqx-grid-cell-middle-align" style="margin-top: 2.5px;">'+parseDate+'</div>';
                        }
					},
					{ text : '첨부', datafield : '', cellsalign : 'center', width : '3%' ,
						 cellsrenderer : function(row, column, value, rowData) {
								var marginImg = $boardGrid.jqxGrid('getcellvalue', row, 'fileCount');
								if (marginImg != 0) {
									marginImg = '<img src="../../img/popup/file_icon2.png" alt="file_icon">';
								} else {
									marginImg = ''
								}
								return '<div class="jqx-grid-cell-middle-align" style="margin-top: 2.5px; margin-left: -10px;">' + value + '<span style="margin-top: 4px; margin-left: 10px;">' + marginImg + '</span></div>';
							}
					},
					{ text : '조회수', datafield : 'readCnt', cellsalign : 'center', width : '5%', cellsrenderer: HmGrid.commaRendererCenter }
			] });

		// 셀값 받아오기
		$boardGrid.on('rowdoubleclick', function(event) {
			var selectedRowIndex = event.args.rowindex;
			itemget = $boardGrid.jqxGrid('getcellvalue', selectedRowIndex, 'bultnNo');
			Main.popContents(itemget);
		});
	},

	/** init data */
	initData : function() {
		Main.searchNBoard();
	},

	checkWrite : function() {
		var result = $('#sUserId').val();
		var size = result.length;
		if (result != null && size != 0) {
			HmUtil.createPopup('/main/board/pMoisBoardWrite.do', $('#hForm'), 'pMoisBoardWrite', 1000, 750);
		} else {
			alert('로그인을 하셔야 글쓰기를 할 수 있습니다');
			return;
		}
	},

	searchNBoard : function() {
		HmGrid.updateBoundData($boardGrid, $('#ctxPath').val() + '/api/main/sec/resourceBoard/getMoisBoardList');
	},

	popContents : function(_boardNo) {
		var params = { boardNo : _boardNo };
		HmUtil.createPopup('/main/board/pMoisBoardContents.do', $('#hForm'), 'pMoisBoardContents', 1000, 750, params);
	},

    reload : function() {
        HmGrid.updateBoundData($boardGrid, $('#ctxPath').val() + '/api/main/sec/resourceBoard/getMoisBoardList');

    },

};