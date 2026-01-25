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
        if($("#authRes01").val() == 'N'){
            $("#btnWrite").css("display", "none");
        };
		//검색 분류
        var sourceGroup = new Array();
        $.ajax({
            type: 'GET',
            url: ctxPath + '/api/main/sec/noticeBoard/getBoardTypeList',
            data: {groupType : 'secu_data'},
            async: false,
            success: function (data) {
                sourceGroup.push({label: '분류', value: ''});
                $.each(data.resultData, function (index, data) {
                    sourceGroup.push({label: data.cateName, value: data.cateNo})
                });
            }
        });
        $('#groupType').jqxDropDownList({source: sourceGroup, width: 80, height:20 ,dropDownHeight: 130, selectedIndex : 0 })
		
		HmGrid.create($boardGrid, {
			source : new $.jqx.dataAdapter({ datatype : 'json', url : $('#ctxPath').val() + '/api/main/sec/resourceBoard/getBoardList' ,
                    beforeprocessing: function(data) {
                        if(data != null){
                            totalCnt = data.resultData.length;
                        }
                    }
				},
                {
                    formatData: function (data) {
                        data.groupType 	= $("#groupType").val();
                        data.title = $("#title").val();
                        data.bultnCont = $("#bultnCont").val();
                        data.instNm = $("#instNm").val(); //20190412 기관명 추가
                        data.sInstCd   =  $("#sInstCd").val();
                        data.sAuthMain = $("#sAuthMain").val();
                        data.sPntInstCd = $("#sPntInstCd").val();
                        console.log(data.sPntInstCd)
                        return data;
                    }
                }

			),
            pageable : true,
            enabletooltips : false,
            pagermode: 'default',
            columns : [
					{ text : 'NO', 	datafield : 'bultnNo', cellsalign : 'center', width : '5%' ,
                        cellsrenderer: function(row, column, value, rowData) {
                            return "<div style='margin-top: 4px; margin-right: 5px' class='jqx-center-align'>" + (totalCnt - row)*1 +"</div>";
                        }
					},
					{ text : '분류', datafield : 'groupType', cellsalign : 'center', width : '5%' ,
						cellsrenderer: function (row, col, value) {
							var bgColor = '#b4b4b4';
							switch (value) {
								case '지침':
									bgColor = '#0054FF';
									break;
								case '세미나':
									bgColor = '#D941C5';
									break;
								case '보안패치':
									bgColor = '#39BAAB';
									break;
								case '보고서':
									bgColor = '#f4990c';
									break;
								case '룰정책':
									bgColor = '#AF1118';
									break;
							}
							return '<div class="jqx-grid-cell-middle-align" style="height:17px;color: #FFFFFF;border-radius: 12px;line-height: 17px; margin:2px 20px 2px 20px;background-color:' + bgColor +'">' +value+ '</div>'
                        }
					},
					{ text : '제목', datafield : 'bultnTitle', align : 'center', width : '52%'},
                        /*cellsrenderer: function(row, column, value, rowData) {
						    return '<div id="line'+ row + '" style="text-align: center; margin-top: 5px;" onmouseover="Main.openTooltip(\'' + row + '\')">'+value + '</div>';
                        }*/
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
					{ text : '조회수', datafield : 'readCnt', cellsalign : 'center', width : '5%', cellsrenderer:HmGrid.commaRendererCenter }
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

	}, checkWrite : function() {
		var result = $('#sUserId').val();
		var size = result.length;
		if (result != null && size != 0) {
			HmUtil.createPopup('/main/board/pResourceBoardWrite.do', $('#hForm'), 'pResourceBoardWrite', 1000, 750);
		} else {
			alert('로그인을 하셔야 글쓰기를 할 수 있습니다');
			return;
		}
	},

	searchNBoard : function() {
		HmGrid.updateBoundData($boardGrid, $('#ctxPath').val() + '/api/main/sec/resourceBoard/getBoardList');
	},

	popContents : function(_boardNo) {
		var params = { boardNo : _boardNo };
		HmUtil.createPopup('/main/board/pResourceBoardContents.do', $('#hForm'), 'pResourceBoardContents', 1000, 750, params);
	}

    /*openTooltip: function(row) {
		//var row = event.args.rowindex;
        var datarow = $boardGrid.jqxGrid('getrowdata', row);
        var cont = datarow.bultnCont.htmlCharacterUnescapes();
        $("#line" + row  ).jqxTooltip({
			content: cont , position : 'top'
		});
        $("#line" + row  ).jqxTooltip('open');
    }*/

};