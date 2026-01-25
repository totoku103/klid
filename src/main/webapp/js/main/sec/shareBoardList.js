var $boardGrid, $date1, $date2;
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
		$date1 = $('#date1');
        $date2 = $('#date2');
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
        //var toDate = new Date();

        HmDate.create($date1, $date2, HmDate.MONTH, 1);

        //타임인풋생성
        $date1.jqxDateTimeInput({ width: '100px', height: '21px', formatString: "yyyy-MM-dd", theme: jqxTheme, culture: 'ko-KR' });
        $date2.jqxDateTimeInput({ width: '100px', height: '21px', formatString: "yyyy-MM-dd", theme: jqxTheme, culture: 'ko-KR' });

        // 올해 1월1일
        //toDate.setFullYear(toDate.getFullYear(),0,1);

        //날짜 셋팅
        //$date1.jqxDateTimeInput('setDate', toDate);
        //$date2.jqxDateTimeInput('setDate', toDate);

        $("#txtStartDay").text('('+$date1.val()+' ~' + $date2.val()  + ')');

        if($("#authSha01").val() == 'N'){
            $("#btnWrite").css("display", "none");
        };



        var instParams =
        {InstLevel:$('#sInstLevel').val(), instCd:$('#sInstCd').val(), instNm:$('#sInstName').val()}


        HmDropDownBtn.createDeptTreeGrid($('#srchInstCdArea'), $('#srchInstTree'), 'share', '13%', 22, '98%', 350, null, instParams);

		HmGrid.create($boardGrid, {
			source : new $.jqx.dataAdapter({ datatype : 'json', url : $('#ctxPath').val() + '/api/main/sec/shareBoard/getBoardList' ,
                    beforeprocessing: function(data) {
                        if(data != null){
                            totalCnt = data.resultData.length;
                        }
                    }
				},
                {
                    formatData: function (data) {
                        /*if($("#srchInstCd").val() == ''){
                            data.srchInstCd = '1100000';
                        }else{
                            data.srchInstCd = $("#srchInstCd").val();
                        }*/
                        if($("#srchInstTree").val() == ""){
                            data.srchInstCd = $("#sInstCd").val();
                        }else{
                            data.srchInstCd = $("#srchInstTree").val();
                        }
                        data.srchBultnTitle = $("#srchBultnTitle").val();
                        data.srchBultnCont = $("#srchBultnCont").val();





                        // console.log($date1.val());
                        // console.log($date2.val());

                        data.date1 = $date1.val();
                        data.date2 = $date2.val();
                        return data;
                    }
                }

			),
            pageable : true,
            pagermode: 'default',
			columns : [
					{ text : 'NO', 	datafield : 'bultnNo', cellsalign : 'center', width : '5%' ,
                        cellsrenderer: function(row, column, value, rowData) {
                            return "<div style='margin-top: 4px; margin-right: 5px' class='jqx-center-align'>" + (totalCnt - row)*1 +"</div>";
                        }
					},
					{ text : '제목', datafield : 'bultnTitle', align : 'center', width : '57%'},
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
        this.sidoCnt();
	},
	checkWrite : function() {
		var result = $('#sUserId').val();
		var size = result.length;
		if (result != null && size != 0) {
			HmUtil.createPopup('/main/board/pShareBoardWrite.do', $('#hForm'), 'pShareBoardWrite', 1000, 680);
		} else {
			alert('로그인을 하셔야 글쓰기를 할 수 있습니다');
			return;
		}
	},

	searchNBoard : function(type) {
        $("#txtStartDay").text('('+$date1.val()+' ~' + $date2.val()  + ')');

		if(type == 'reload'){
            $("#srchInstCd").val(null);
		}
		Main.sidoCnt();
		HmGrid.updateBoundData($boardGrid, $('#ctxPath').val() + '/api/main/sec/shareBoard/getBoardList');
	},

	sidoCnt : function () {
        Server.get('/api/main/sec/shareBoard/getShareBoardSidoCnt', {
            data: {date1:$date1.val(), date2:$date2.val()},
            success: function (result) {
                for (var i in result) {
                    var instNmId  = 'instNm' + i;
                    var sidoCntId = 'sidoCnt' + i;

                    //카운트 순위로 17시도 현황 생성
                    $("#"+instNmId).text(result[i].instNm) 	//지역명
                    $("#"+sidoCntId).text(result[i].rcmdCnt)//지역별 카운트
                }
            }
        });
    },

	popContents : function(_boardNo) {
		var params = { boardNo : _boardNo };
		HmUtil.createPopup('/main/board/pShareBoardContents.do', $('#hForm'), 'pShareBoardContents', 1000, 750, params);
	}

};