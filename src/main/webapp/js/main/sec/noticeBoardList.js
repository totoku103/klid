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

        //그룹 분류
        var sourceGroup = new Array();
        $.ajax({
            type: 'GET',
            url: ctxPath + '/api/main/sec/noticeBoard/getBoardTypeList',
            data: {groupType : 'group'},
            async: false,
            success: function (data) {
                sourceGroup.push({label: '그룹분류', value: ''});
                $.each(data.resultData, function (index, data) {
                    sourceGroup.push({label: data.cateName, value: data.cateNo})
                });
            }
        });
        $('#groupType').jqxDropDownList({source: sourceGroup, width: 80, height:20 ,dropDownHeight: 130, selectedIndex : 0 })

        var sourceNotice = new Array();
        $.ajax({
            type: 'GET',
            url: ctxPath + '/api/main/sec/noticeBoard/getBoardTypeList',
            data: {groupType : 'notice'},
            async: false,
            success: function (data) {
                sourceNotice.push({label: '공지분류', value: ''})
                $.each(data.resultData, function (index, data) {
                    sourceNotice.push({label: data.cateName, value: data.cateNo})
                });
            }
        });
        $('#noticeType').jqxDropDownList({source: sourceNotice, width: 100, height:20, dropDownHeight: 105, selectedIndex : 0 });


        var noticeSrcType = [];
        $.ajax({
            type: 'GET',
            url: ctxPath + '/api/code/getNoticeSrcType',
            data: {},
            async: false,
            success: function (data) {
                noticeSrcType.push({label: '모두', value: ''});
                $.each(data.resultData, function (index, data) {
                    noticeSrcType.push({label: data.codeName, value: data.comCode2})
                });
            }
        });
        $('#sControl').jqxDropDownList({source: noticeSrcType, width: 100, autoDropDownHeight: false, selectedIndex : 0 });

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
                        data.groupType 	= $("#groupType").val();
                        data.noticeType = $("#noticeType").val();
                        data.title = $("#title").val();
                        data.bultnCont = $("#bultnCont").val();
                        data.instNm = $("#instNm").val(); //20190412 기관명 추가
                        data.sInstCd  =  $("#sInstCd").val();
                        data.sPntInstCd  =  $("#sPntInstCd").val();
                        data.sAuthMain = $("#sAuthMain").val();
                        data.sControl = $('#sControl').val();
                        data.startDate = $('#startDate').val().replace(/-/gi, "") + '000000';
                        data.endDate = $('#endDate').val().replace(/-/gi, "") + '235959';
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
					{ text : '그룹', datafield : 'groupType', cellsalign : 'center', width : '5%'},
					{ text : '분류', datafield : 'noticeType', cellsalign : 'center', width : '5%',
						cellsrenderer: function (row, col, value) {
							var bgColor = '#b4b4b4';
							switch (value) {
								case '긴급공지':
									bgColor = '#AF1118';
									break;
								case '일반공지':
									bgColor = '#39BAAB';
									break;
								case '중요공지':
									bgColor = '#f4990c';
									break;
							}
							value = value.replace('공지', '');
							return '<div class="jqx-grid-cell-middle-align" style="height:17px;color: #FFFFFF;border-radius: 12px;line-height: 17px; margin:2px 20px 2px 20px;background-color:' + bgColor +'">' +value+ '</div>'
                        }
					},
					{ text : '제목', datafield : 'bultnTitle', align : 'center', width : '50%'},
                	{ text : '제공기관', datafield : 'controlStr', cellsalign : 'center', width : '5%'},
					{ text : '기관명', datafield : 'instNm', cellsalign : 'center', width : '7%' },
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

		// 기간조건
		Main.setDateFormat();
	},

	/** init data */
	initData : function() {
		Main.searchNBoard();
	},

	checkWrite : function() {
		var result = $('#sUserId').val();
		var size = result.length;
		if (result != null && size != 0) {
			HmUtil.createPopup('/main/board/pNoticeBoardWrite.do', $('#hForm'), 'pNoticeBoardWrite', 1000, 750);
		} else {
			alert('로그인을 하셔야 글쓰기를 할 수 있습니다');
			return;
		}
	},

	searchNBoard : function() {
		HmGrid.updateBoundData($boardGrid, $('#ctxPath').val() + '/api/main/sec/noticeBoard/getBoardList');
	},

	popContents : function(_boardNo) {
		var params = { boardNo : _boardNo };
		HmUtil.createPopup('/main/board/pNoticeBoardContents.do', $('#hForm'), 'pNoticeBoardContents', 1000, 750, params);
	},

    reload : function() {
        HmGrid.updateBoundData($boardGrid, $('#ctxPath').val() + '/api/main/sec/noticeBoard/getBoardList');

    },

	setDateFormat: function () {
		$('#startDate, #endDate').jqxDateTimeInput({ width: 120, height: 18,  formatString: 'yyyy-MM-dd', culture: 'ko-KR' });

		var currDate = new Date();
        var currYear = currDate.getFullYear().toString();
        var currMonth = currDate.getMonth() + 1;
        var currDay = currDate.getDate();

        $('#startDate').jqxDateTimeInput('setDate', new Date(currYear, currMonth-1,currDay-7));
        $('#endDate').jqxDateTimeInput('setDate', new Date(currYear, currMonth-1, currDay, 23, 59, 59));
    }

};