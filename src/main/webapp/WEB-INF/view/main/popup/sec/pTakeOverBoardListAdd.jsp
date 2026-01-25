<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<style>
#pForm textarea{margin: 3px 0 3px 3px; resize: none;}
</style>
<form id="pForm" method="post">
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
	        <button id="pbtnSave" type="button" class="p_btnPlus"></button>
        	<button id="pbtnClose" type="button" class="p_btnClose"></button>
        </div>
    </div>
</form>
<script>
    function pwindow_init(params) {
        
        // Button 이벤트 처리
        $('#pbtnClose').click(function () {
            $('#pwindow').jqxWindow('close');
        });
        $('#pbtnSave').click(function () {
			pTakeOverAdd.saveInfo();
		});

    }
    
    var pTakeOverAdd = {
    		saveInfo: function(){
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
               		boardTitle: $('#p_title').val(),
               		boardContent: $('#p_content').val(),
               		alarmUnit: $("input[name=pAlarmUnit]:checked").val(),
                    instCd : $('#sInstCd').val()
                };
                
//                 console.log(saveData);

                if(!confirm("추가하시겠습니까?")) return;
                
                Server.post('/api/main/sec/takeOverBoard/addBoard', {
                    data: saveData, 
                    success: function (result) {
                        if(result == 'SUCCESS'){
                            alert('인수인계가 추가되었습니다.');
							$('#pwindow').jqxWindow('close');
                            Main.initDesign();
                        } else {
                            alert(result);
                        }
                    },
                    error: function(err){
                    	alert(err);
                    }
                });
    		}
    };
</script>