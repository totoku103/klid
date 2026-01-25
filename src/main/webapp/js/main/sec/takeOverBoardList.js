var $boardGrid;
var itemget;
var levelNo ;
var $cbPeriod,$date1,$date2;
$(function() {
	Main.initVariable();
	Main.observe();
	Main.initDesign();
	Main.initData();
});

var Main = {
		/** variable */
		initVariable: function() {
			$boardGrid = $('#boardGrid');
			$cbPeriod = $('#cbPeriod'),$date1 = $('#date1'), $date2 = $('#date2');
		},
		
		/** add event */
		observe: function() {
			$('button').bind('click', function(event) { Main.eventControl(event); });
		},
		
		/** event handler */
		eventControl: function(event) {
			var curTarget = event.currentTarget;
			switch(curTarget.id) {
			//case 'btnAppr': this.editAppr(); break;
			case 'btnWrite': this.checkWrite(); break;
			case 'btnSearch': this.search(); break;
			}
		},
		
		/** init design */
		initDesign: function() {
            var imagerenderer = function (row, datafield, value) {
                var code = value;
                if(value == ''){
                    code = 0;
                }
                var cell = "<div style='margin-top: 2px' class='jqx-center-align'>";
                cell += '<img height="18" width="52" src="../../img/codeImg/confirmBtn_' + code + '.png"/>';
                cell += "</div>";
                return cell;
            };

            var imagerenderer2 = function (row, datafield, value) {
                var code = value;
                if(value == ''){
                    code = 0;
                }
                var cell = "<div style='margin-top: 2px' class='jqx-center-align'>";
                cell += '<img height="18" width="52" src="../../img/codeImg/endBtn_' + code + '.png"/>';
                cell += "</div>";
                return cell;
            };

			HmWindow.create($('#pwindow'), 100, 100, 300);
			
			Master.createPeriodCondition($cbPeriod,$date1,$date2);
            $date1.jqxDateTimeInput({formatString: 'yyyy-MM-dd'});
            $date2.jqxDateTimeInput({formatString: 'yyyy-MM-dd'});
			
			$cbPeriod.jqxDropDownList({selectedIndex:1})
			
            var mainCol = [
				{ text : '등록일', datafield : 'regDate', cellsalign : 'center', width : '8%', cellclassname: Main.cellclass},
				{ text : '확인', datafield : 'readFlag', cellsalign : 'center', width : '5%', cellclassname: Main.cellclass
					,   cellsrenderer: imagerenderer
                },
				{ text : '종결', datafield : 'isClose', cellsalign : 'center', width : '5%', cellclassname: Main.cellclass
                	, cellsrenderer: imagerenderer2
				},
				{ text : '기안자', datafield : 'regUserName', cellsalign : 'center', width : '8%', cellclassname: Main.cellclass },
				{ text : '제목', datafield : 'bultnTakeTitle', align : 'center', width : '8%', cellclassname: Main.cellclass},
				{ text : '내용', datafield : 'bultnTakeCont', width : '66%', cellclassname: Main.cellclass }
			];

            
            HmGrid.create($boardGrid, {
            	source : new $.jqx.dataAdapter(
    				{ datatype : 'json', url : $('#ctxPath').val() + '/api/main/sec/takeOverBoard/getBoardList' },
                    {
                        formatData: function (data) {
                        	$.extend(data, {
                				period: $cbPeriod.val(),
                				date1: HmDate.getDateStr($('#date1')),
                				time1: HmDate.getTimeStr($('#date1')),
                				date2: HmDate.getDateStr($('#date2')),
                				time2: HmDate.getTimeStr($('#date2')),
                				title: $("#title").val(),
                				bultnCont: $("#bultnCont").val(),
                				readFlag: $("input[name=rdReadFlag]:checked").val(),
        						isClose: $("input[name=rdIsCloseFlag]:checked").val(),
                                sInstCd  :  $("#sInstCd").val(),
                            	sAuthMain : $("#sAuthMain").val(),
                                sPntInstCd: $("#sPntInstCd").val()
                			});
            				
                            return data;
                        }
                    }

    			),
                pageable : true,
                pagermode: 'default',
    			columns : mainCol,
    			rowdetails: true,
                initrowdetails: Main.initrowdetails,
                rowdetailstemplate: { rowdetails: "<div id='subGrid' style='margin: 10px;'></div>", rowdetailsheight: 220, rowdetailshidden: true }
            });
            
            // 셀값 받아오기
    		$boardGrid.on('rowdoubleclick', function(event) {
//    			console.log(event.args);
    			var selectedRowIndex = event.args.rowindex;
//    			var itemget = $boardGrid.jqxGrid('getcellvalue', selectedRowIndex, 'bultnTakeSeq');
    			// 수정팝업 띄우기
    			Main.edit(selectedRowIndex);
    		});
    		
		},
		initrowdetails: function(index, parentElement, gridElement, record){
			var id = record.uid.toString();
            var grid = $($(parentElement).children()[0]);
			/*
            var subCol = [
            	{ text : '내용', datafield : 'bultnTakeReplyCont', minwidth : 120 },
				{ text : '답글작성자', datafield : 'regUserName', cellsalign : 'center', width : 120 },
				{ text : '답글일자', datafield : 'regDate', cellsalign : 'center', width : 160}
			];
            
            var subGridAdapter = new $.jqx.dataAdapter(
            		{
            			datatype: 'json',
            			url: ctxPath + '/api/main/sec/takeOverBoard/getAnsBoardList'
            		},
            		{
            			formatData: function(data) {
            				data.boardNo = record.bultnTakeSeq;
            				return data;
            			}
            		}
            );
            if (grid != null) {
            	HmGrid.create(grid, {
           		 source: subGridAdapter,
           		 width: '98%',
           		 height: 200,
           		 columns: subCol
           	});
            	$(parentElement).css('z-index',250);
            }
			*/
			grid.append('<pre style="width: 95%; height: 200px; border: 1px solid #ccc; overflow-y: auto;" >'+record.bultnTakeCont+'</pre>')
			$(parentElement).css('z-index',250);
		},
		/** init data */
		initData: function() {
			//Main.search();
		},
		
		/** 그리드 셀색상 지정 */
		cellclass: function(row, columnfield, value) {
			var cellval = $boardGrid.jqxGrid('getcellvalue', row, 'readFlag');
			var cellval2 = $boardGrid.jqxGrid('getcellvalue', row, 'isClose');
			
			var cellColorStr = cellval+""+cellval2;
			
			var classnm = '';
			
			switch(cellColorStr) {
			case '00': classnm = 'toLevel1'; break; 
			case '01': classnm = 'toLevel2'; break; 
			case '10': classnm = 'toLevel3'; break; 
			case '11': classnm = 'toLevel4'; break;
			}
			return classnm;
		},
		
		/** 글쓰기 */
		checkWrite: function() {
			var result =  $('#sUserId').val();
			var size=result.length;
			if(result != null && size !=0){
				$.get(ctxPath + '/main/popup/sec/pTakeOverBoardListAdd.do', function(result) {
	                HmWindow.open($('#pwindow'), '인수인계 추가', result, 800, 400, 'pwindow_init');

                    $('.jqx-window-modal').css("z-index", "799");
                    $('#pwindow').css("z-index", "800");
	            });
			}else{
				alert("로그인을 하셔야 글쓰기를 할 수 있습니다");
				return;
			}
		},
		
		/** 수정 */
		edit: function(rowIdx){
			var result =  $('#sUserId').val();
			var size=result.length;
			if(result != null && size !=0){
				var rowdata = $boardGrid.jqxGrid('getrowdata', rowIdx); // 선택한 row 번호를 파라미터로 받아서 해당 정보 조회(확장grid 안에서는 메인그리드 번호를 알 수가 없어서)
//				var rowdata = HmGrid.getRowData($boardGrid);
				if(rowdata == null) {
					alert('선택된 인수인계가 없습니다.');
					return;
				}
				
				$.get(ctxPath + '/main/popup/sec/pTakeOverBoardListEdit.do', function(result) {
	                HmWindow.open($('#pwindow'), '인수인계 수정', result, 800, 630, 'pwindow_init', rowdata);
                    $('.jqx-window-modal').css("z-index", "799");
                    $('#pwindow').css("z-index", "800");
	            });	
			}else{
				alert("로그인을 하셔야 수정을 할 수 있습니다");
				return;
			}
			
		},
		
		/** 조회 */
		search: function() {
            if($('#date1').val()>$('#date2').val()){
                var tempDate = $('#date1').val();
                $('#date1').val($('#date2').val());
                $('#date2').val(tempDate);
            }
			HmGrid.updateBoundData($boardGrid);
		}
		
};