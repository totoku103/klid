var $treeGrid;
var itemget;
var levelNo ;

$(function() {
	Main.initVariable();
	Main.observe();
	Main.initDesign();
	Main.initData();
});

var Main = {
		/** variable */
		initVariable: function() {
			$treeGrid = $('#treeGrid');
		},
		
		/** add event */
		observe: function() {
			$('button').bind('click', function(event) { Main.eventControl(event); });
			$('img').bind('click', function(event) { Main.eventControl(event); });
			$('.searchBox input:text').bind('keyup', function(event) { Main.keyupEventControl(event); });
		},
		
		/** event handler */
		eventControl: function(event) {
			var curTarget = event.currentTarget;
			switch(curTarget.id) {
			//case 'btnAppr': this.editAppr(); break;
			case 'btnWrite': this.checkWrite(); break;
			case 'btnSearch': this.searchBoard(); break;
			}
		},
		/** keyup event handler */
		keyupEventControl: function(event) {
			if(event.keyCode == 13) {
				Main.searchBoard();
			}
		},
		/** init design */
		initDesign: function() {
            if($("#authQna01").val() == 'N'){
                $("#btnWrite").css("display", "none");
            };
			var source =
            {
                dataType: "json",
                hierarchy:
                {
                	keyDataField: { name: 'bultnNo' },
					parentDataField: { name: 'groupNo' }
                },
                id: 'boardNo',
                url: $('#ctxPath').val() + '/api/main/sec/qnaBoard/getBoardList'
            }
            ;
            //var dataAdapter = new $.jqx.dataAdapter(source);
            var dataAdapter = new $.jqx.dataAdapter(
                source,
                {
                	async : true,
                    formatData: function(data) {
                    	$.extend(data, {
                    		title : $("#title").val(),
                    		bultnCont : $("#bultnCont").val(),
                    		sInstCd  :  $("#sInstCd").val(),
                            sAuthMain : $("#sAuthMain").val()
                    	});
                        return data;
                    }
                }
            );

            // create Tree Grid
            // HmGrid.create($treeGrid,
            $treeGrid.jqxTreeGrid(
            {
            	width: '100%',
            	height: '100%',
                source: dataAdapter,
                theme : jqxTheme,
                // pageable : true,
                // pagermode: 'default',
                showtoolbar: false,
                pageSize : 100,
                pageSizeOptions : [ "100", "500", "1000" ],
                pagerHeight : 22,
                columnsResize: true,
                columnsHeight: 26,
                sortable : true,
                selectionMode : "singlerow",
				altRows: true,
                columns: [
                          { text: 'NO',		datafield: 'rum', align: 'center', cellsalign:'center', width: '5%' ,},
                    	 { text: '번호',		datafield: 'bultnNo', align: 'center', cellsalign:'center', width: '5%', hidden: true},
                          { text: '제목',		datafield: 'bultnTitle', align: 'center', cellsalign:'left', minwidth:'200px;',
                        	  cellsrenderer: function(row, column, value, rowData) {
                          		  var marginLeft = 0;
                        		  var marginImg ="";

                        		  levelNo = rowData.level;
                        		  if(rowData.level > 0) {
                        			  marginLeft = 10 * rowData.level;
                        			  marginImg="<img src='../../img/popup/answer_icon.png' >";
                        		  }
                        		  //return "<div style='margin-top: 2px; margin-bottom: 2px; margin-left: " + marginLeft + "px;'>" +marginImg+ value + "</div>";
                                  return '<div id="line'+ row + '" style="text-align: left; margin-top: 5px;" onmouseover="Main.openTooltip(\'' + row + '\')">'+ marginImg + value + '</div>';
                        	  }
                          },
                    	{ text: '시도',		datafield: 'sidoNm',	align: 'center', cellsalign:'center',  width: '7%' },
                    	{ text: '시군구',		datafield: 'instNm',	align: 'center', cellsalign:'center',  width: '7%'},
                         { text: '게시자',	datafield: 'userName',	align: 'center', cellsalign:'center',  width: '15%' },
						 { text: '등록일',	datafield: 'regDate',	align: 'center', cellsalign: 'center',	width: '10%',
                             cellsrenderer: function(row, column, value, rowData){
                                 var parseDate = "";
                                 parseDate = HmUtil.parseDate(value);
                                 return '<div class="jqx-grid-cell-middle-align" style="margin-top: 2.5px;">'+parseDate+'</div>';
                             }
						 },
                         { text: '조회수', datafield: 'readCnt',	align: 'center',	cellsalign: 'center', width: '3%', cellsrenderer:HmGrid.commaRendererCenter}
						]
            });
           /* .on('bindingComplete', function(event) {
            	$treeGrid.jqxTreeGrid('expandAll');
            });*/
            
            //셀값 받아오기
            $treeGrid.on('rowDoubleClick', function (event) {
				var createId = event.args.row.userId; //게시글 등록자 id
                var sessionId = $('#sUserId').val();  //로그인 id
				var authMain = $("#sAuthMain").val();

				//비밀글 여부 확인, 본인&관리자 권한만 열람
                // if(event.args.row.isSecret == 'Y'){
				// 	if(authMain != 'AUTH_MAIN_1'){
                 //        if(createId != sessionId){
                 //            alert('열람 권한이 없습니다.');
                 //            return false;
                 //        }
				// 	}
				// }

                itemget = event.args.row.bultnNo;
                // if(authMain == 'AUTH_MAIN_2'){
                 //    Main.popContents(itemget);
				// }else if(authMain == 'AUTH_MAIN_3'){
                 //    if(createId != sessionId){
                 //        if(event.args.row.parentUserId==sessionId){
                            Main.popContents(itemget);
					// 	}else{
                //         	alert('열람 권한이 없습니다.');
                //         }
                //     }else{
                //         Main.popContents(itemget);
					// }
                // }else{
                // 	alert('열람 권한이 없습니다.');
                // }
            });
		},
		
		/** init data */
		initData: function() {
			//Main.searchBoard();
		},
		checkWrite: function() {
			var result =  $('#sUserId').val();
			var size=result.length;
			if(result != null && size !=0){
				HmUtil.createPopup('/main/board/pQnaBoardWrite.do', $('#hForm'), 'pQnaBoardWrite', 1000, 690);
			}else{
				alert("로그인을 하셔야 글쓰기를 할 수 있습니다");
				return;
			}
		},
		
		searchBoard: function() {
			$treeGrid.jqxTreeGrid('clear');
			$treeGrid.jqxTreeGrid('updateBoundData');
		},

		reload : function() {
            //Main.initDesign()
            $treeGrid.jqxTreeGrid('updateBoundData');

		},
		
		popContents: function(_boardNo) {
			var params={boardNo: _boardNo , levelNo: levelNo};
			HmUtil.createPopup('/main/board/pQnaBoardContents.do', $('#hForm'), 'pQnaBoardContents', 1000, 650, params);
		},
		
		/** 게시판 번호로 게시판 글 승인  */
		// TODO: 레거시 코드 - /scn/oms/errorBoard/editAppr.do 컨트롤러가 존재하지 않음
		editAppr: function() {
			if(HmTreeGrid.getSelectedItem($treeGrid)) {
				var rowdata =HmTreeGrid.getSelectedItem($treeGrid);
				if(!confirm('처리 현황을 확인으로 변경합니다')) return;
				// Server.post('/scn/oms/errorBoard/editAppr.do', {
				// 	data: { boardNo: rowdata.boardNo },
				// 	success: function(result) {
				// 		$treeGrid.jqxTreeGrid('updateBoundData');
				// 		alert('처리 완료되었습니다.');
				// 	}
				// });
				alert('해당 기능은 현재 지원되지 않습니다.');
			}else{
				alert("게시물을 선택해주세요");
				return false;
			}
		},
		openTooltip: function(row) {
            var rowData  = $treeGrid.jqxTreeGrid('getRow', row);
            var cont = rowData.bultnCont.htmlCharacterUnescapes();

			$("#line" + row  ).jqxTooltip({
				content: cont , position : 'top'
			});
			$("#line" + row  ).jqxTooltip('open');

		}
		
};