<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<style>
#pForm textarea{margin: 3px 0 3px 3px; resize: none;}
</style>
<form id="pForm" method="post">
	<input type="hidden" id="p_boardNo" value="" />
	<input type="hidden" id="p_alarmUnit_ori" value="" />
	
    <div class="tableBorder">
       <table>
       		<colgroup>
                <col width="30%">
                <col width="70%">
            </colgroup>
            <tr class="pop_grid">
                <td class="pop_gridSub">제목</td>
                <td>
                	<input type="text" id="p_title" class="pop_input"/>
                </td>
            </tr>
            <tr class="pop_grid">
                <td class="pop_gridSub">내용</td>
                <td>
                	<textarea id="p_content" rows="16" class="pop_input"></textarea>
                </td>
            </tr>
            <tr class="pop_grid pop_borderline">
                <td class="pop_gridSub">주기</td>
                <td>
                	<label><input type="radio" style="vertical-align:middle; margin-top: -3px;" name="pAlarmUnit" class="checkbox" value="0" checked /> <span>없음</span></label>&nbsp;&nbsp;
					<label><input type="radio" style="vertical-align:middle; margin-top: -3px;" name="pAlarmUnit" class="checkbox" value="1" /> <span>주단위</span></label>&nbsp;&nbsp;
					<label><input type="radio" style="vertical-align:middle; margin-top: -3px;" name="pAlarmUnit" class="checkbox" value="2" /> <span>월단위</span></label>
                </td>
            </tr>
		</table>
		<div style="text-align: center; margin-top: 10px;">
			<button id="pbtnConfirm" type="button" class="p_btnCheck"></button>
			<button id="pbtnFinish" type="button" class="p_btnFinish"></button>
	        <button id="pbtnSave" type="button" class="p_btnSave"></button>
        </div>
    </div>
    
	<div>
		<div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid; ">
			<div class="tableBorder">
				<table>
		       		<colgroup>
		                <col width="30%">
		                <col width="70%">
		            </colgroup>
		            <tr class="pop_grid pop_borderline">
		                <td class="pop_gridSub">답글</td>
		                <td>
		                	<textarea id="p_ansContent" rows="3" class="pop_input"></textarea>
		                </td>
		            </tr>
				</table>
			</div>
			<div style="text-align: center; margin-top: 10px;">
		        <button id="pbtnAdd_ans" type="button" class="p_btnPlus"></button>
	        </div>
		</div>
		<div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid; ">
			<div id="pAnsGrid"></div>
		</div>
	</div>
	
	<div style="text-align: center; margin-top: 10px;">
       	<button id="pbtnClose" type="button" class="p_btnClose"></button>
	</div>
</form>
<script>
    function pwindow_init(params) {
        
        // Button 이벤트 처리
        $('#pbtnClose').click(function () {
            $('#pwindow').jqxWindow('close');
        });
        $('#pbtnSave').click(function () {
			pTakeOverEdit.saveInfo();
		});
        
        $('#pbtnConfirm').click(function () {
			pTakeOverEdit.saveConfirm();
		});
        $('#pbtnFinish').click(function () {
			pTakeOverEdit.saveClsoe();
		});
        $('#pbtnAdd_ans').click(function () {
			pTakeOverEdit.saveAnsInfo();
		});
        
     	// data setting
     	var boardNo = params.bultnTakeSeq;
     	var readFlag = params.readFlag;
     	if(readFlag==1){
     		$("#pbtnConfirm").css("display", "none");
     	}
     	var isClose = params.isClose;
     	if(isClose==1){
     		$("#pbtnFinish").css("display", "none");
     	}
     	$("#p_boardNo").val(boardNo);
        $("#p_title").val(params.bultnTakeTitle);
    	$("#p_content").val(params.bultnTakeCont);
    	// 주기
    	var alarmUnit = params.alarmUnit; 
    	$("input[name=pAlarmUnit][value="+alarmUnit+"]").click();
     	$("#p_alarmUnit_ori").val(alarmUnit);
     	
    	pTakeOverEdit.setAnsGrid(boardNo);
    	
    }
    
    var pTakeOverEdit = {
    		setAnsGrid: function(boardNo){ // 답글 리스트 조회
    			if(boardNo==null) boardNo = -1;
    			
    			var url = $('#ctxPath').val() + '/main/sec/takeOverBoard/getAnsBoardList.do'
    			var col = [
    				{ text : '내용', datafield : 'bultnTakeReplyCont', minwidth : 120 },
    				{ text : '답글작성자', datafield : 'regUserName', cellsalign : 'center', width : 120 },
    				{ text : '답글일자', datafield : 'regDate', cellsalign : 'center', width : 160}
    			];
    			
    			HmGrid.create($("#pAnsGrid"), {
    				source: new $.jqx.dataAdapter(
    						{
    							datatype: 'json',
    				            url: url
    						}, {
    							formatData : function(data) {
    								try{
    									$.extend(data, {
    										boardNo : boardNo
    									});
    								}catch(err){}
    								return data;
    							}
    						}
    				),
    				columns: col,
    				height: 200
    			});
    		},
    		saveConfirm: function(){ // 확인처리
    			var saveData = {
               			boardNo : $("#p_boardNo").val(),
               			alarmUnit: $("#p_alarmUnit_ori").val()
    				};
        			
        			if(!confirm("확인처리 하시겠습니까?")) return;
        			
        			Server.post('/api/main/sec/takeOverBoard/addBoardConfirm', {
                        data: saveData, 
                        success: function (result) {
//                         	console.log(result);
                            try{ Main.search(); }catch(err){}
                            if(result == 'SUCCESS'){
                                alert('확인처리하였습니다.');
                                $("#pbtnConfirm").css("display", "none");
                            } else {
                                alert(result);
                            }
                        },
                        error: function(err){
                        	alert(err);
                        }
                    });
    		},
    		saveClsoe: function(){ // 종결처리
    			var saveData = {
           			boardNo : $("#p_boardNo").val()
				};
    			
    			if(!confirm("종결처리 하시겠습니까?")) return;
    			
    			Server.post('/api/main/sec/takeOverBoard/editBoard_finish', {
                    data: saveData, 
                    success: function (result) {
//                     	console.log(result);
                        try{ Main.search(); }catch(err){}
                        if(result == 'SUCCESS'){
                            alert('종결처리하였습니다.');
                            $("#pbtnFinish").css("display", "none");
                        } else {
                            alert(result);
                        }
                    },
                    error: function(err){
                    	alert(err);
                    }
                });
    		},
    		saveInfo: function(){ // 저장
    			var obj = $('#p_title');
                if ($.isBlank(obj.val())) {
                    alert('제목을 입력해 주세요.');
                    obj.focus();
                    return;
                }

                obj = $('#p_content');
                if ($.isBlank(obj.val())) {
                    alert('내용을 입력해 주세요.');
                    obj.focus();
                    return;
                }
                // ---------- validation check end --------------
                
                var saveData = {
       				boardNo : $("#p_boardNo").val(),
               		boardTitle: $('#p_title').val(),
               		boardContent: $('#p_content').val(),
               		alarmUnit: $("input[name=pAlarmUnit]:checked").val(),
                    instCd : $('#sInstCd').val()
                };
                
//                 console.log(saveData);

                if(!confirm("저장하시겠습니까?")) return;
                
                Server.post('/api/main/sec/takeOverBoard/editBoard', {
                    data: saveData, 
                    success: function (result) {
//                     	console.log(result);
                        try{ Main.search(); }catch(err){}
                        if(result == 'SUCCESS'){
                            alert('인수인계가 저장되었습니다.');
							$('#pwindow').jqxWindow('close');
                        } else {
                            alert(result);
                        }
                    },
                    error: function(err){
                    	alert(err);
                    }
                });
    		},
    		saveAnsInfo: function(){ // 답글 추가
    			var obj = $('#p_ansContent');
                if ($.isBlank(obj.val())) {
                    alert('답글을 입력해 주세요.');
                    obj.focus();
                    return;
                }
                
    			var saveData = {
   					boardNo : $("#p_boardNo").val(),
   					boardContent: $('#p_ansContent').val()
    			};
    			
    			if(!confirm("답글을 추가하시겠습니까?")) return;
    			
    			Server.post('/api/main/sec/takeOverBoard/addAnsBoard', {
                    data: saveData, 
                    success: function (result) {
//                     	console.log(result);
                    	pTakeOverEdit.searchAns(); // 답글 그리드 재조회
                        if(result == 'SUCCESS'){
                            alert('답글이 추가되었습니다.');
                            $("#p_ansContent").val(''); // 초기화
                        } else {
                            alert(result);
                        }
                    },
                    error: function(err){
                    	alert(err);
                    }
                });
    		},
    		searchAns: function(){ // 답글 리스트 조회
    			HmGrid.updateBoundData($("#pAnsGrid"));
    		}
    };
</script>