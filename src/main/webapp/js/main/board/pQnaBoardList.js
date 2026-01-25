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
		},
		
		/** event handler */
		eventControl: function(event) {
			var curTarget = event.currentTarget;
			switch(curTarget.id) {
			case 'btnWrite': this.checkWrite(); break;
			case 'btnBoardList': this.boardList(); break;
			case 'btnClose': this.boardClose(); break;
			}
		},
		
		/** init design */
		initDesign: function() {
			var source =
            {
                dataType: "json",
                hierarchy:
                {
                	keyDataField: { name: 'boardNo' },
					parentDataField: { name: 'boardParentNo' }
                },
                id: 'boardNo',
	            url: $('#ctxPath').val() + '/api/main/sec/qnaBoard/getBoardList'
            };
            var dataAdapter = new $.jqx.dataAdapter(source);
            // create Tree Grid
            $treeGrid.jqxTreeGrid(
            {
            	width: '100%',
            	height: 510,
                source: dataAdapter,
                theme : jqxTheme,
                pageable: true,
                pageSize : 100,
                pageSizeOptions : [ "100", "500", "1000" ],
                pagerHeight : 22,
                columnsResize: true,
                columnsHeight: 26,
                sortable : true,
                selectionMode : "singlerow",
                altRows: false,
                columns: [
                          { text: '번호',		datafield: 'boardNo', align: 'center', width: 100 },
                          { text: '제목',		datafield: 'boardTitle', align: 'center', 
                        	  cellsrenderer: function(row, column, value, rowData) {
                        		  var marginLeft = 0;
                        		  var marginImg ="";
                        		  if(rowData.level > 0) {
                        			  marginLeft = 10 * rowData.level;
                        			  marginImg="<img src='../../img/popup/answer_icon.png' >";
                        		  }
                        		  return "<div style='margin-top: 0px; margin-left: " + marginLeft + "px;'>" +marginImg+ value + "</div>";
                        	  }
                          },
                          { text: '작성자',		datafield: 'userName',	align: 'center', width: 100 , columntype: 'custom',
        					  cellsrenderer: function(row, column, value, rowData) {
        						 var _grpName = rowData.grpName;
        						 if(_grpName != '' &&_grpName != null){
        							 _grpName='(' +_grpName+')';
        						 }else{
        							 _grpName='';
        						 }
                        		  return "<div style='margin-top: 0px; margin-left: 5px;'>"+ value + "<span>" +_grpName+"</span></div>";
                        	  }
                          },
                          { text: '작성일자',	datafield: 'printTime',		align: 'center',	cellsalign: 'center',	width: 100 },
                          { text: '조회수',		datafield: 'boardHits',	align: 'center',	cellsalign: 'center', width: 100  },
                          { text: '처리현황',		datafield: 'checkFlagStr',	align: 'center',	cellsalign: 'center', width: 100, cellsrenderer: HmGrid.boardStatusrenderer }
                          ]
            })
            .on('bindingComplete', function(event) {
            	$treeGrid.jqxTreeGrid('expandAll');
            });
            
            //셀값 받아오기
            $treeGrid.on('rowDoubleClick', function (event) {
            	var itemget = event.args.row.boardNo;
            	window.location.href=$('#ctxPath').val() +'/main/board/pQnaBoardContents.do?boardNo='+itemget;
            });
		},
		
		/** init data */
		initData: function() {
			
		},
		checkWrite: function() {
			var result =  $('#sUserId').val();
			var size=result.length;
			if(result != null && size !=0){
				location.href=$('#ctxPath').val() +'/main/board/pQnaBoardWrite.do';
			}else{
				alert("로그인을 하셔야 글쓰기를 할 수 있습니다");
				return;
			}
		},
		
		boardList: function() {	
			$treeGrid.jqxTreeGrid('updateBoundData');
		},
		
		boardClose: function() {
			self.close();
		}
		
};