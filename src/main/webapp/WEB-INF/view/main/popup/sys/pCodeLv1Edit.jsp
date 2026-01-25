<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div class="tableBorder">
	<table>
	    <tr class="pop_grid ">
	        <td class="pop_gridSub">코드명</td>
			<td><input id="codeName" name="codeName" type="text" class="pop_input" maxlength="50"/></td>
	    </tr>
		<%--<tr class="pop_grid ">
			<td class="pop_gridSub">사용여부</td>
			<td>
				<div id="useYn" name="useYn" class="pop_combo1"></div>
			</td>
		</tr>--%>
	</table>
</div>
<div style="text-align:center; margin-top:10px;">
	<button id="pbtnEdit" type="button" class="p_btnSave"></button>
	<button id="pbtnClose" type="button" class="p_btnClose"></button>
</div>

<script>
    function pwindow_init(data) {

        $('#codeName').val(editCodeLv1Params.codeName);

        /*Server.get('/code/getCommonCode.do', {
            data: {
                comCode1: comCode1,
                codeLvl: 1
			},
            success: function (data) {
				$("#codeName").val(data[0].codeName);
            }
        });*/


    }
	$('#pbtnClose').click(function() {
		$('#pwindow').jqxWindow('close');
	});
	$('#pbtnEdit').click(function() {
		var duplYn = 'N';
	    var obj = $('#codeName');
		if($.isBlank(obj.val())) {
			alert('코드명을 입력해주세요.');
			obj.focus();
			return;
		}

        //기존 이름과 새로 입력한 이름이 다를 경우 중복검사 실시 (변경되었을 경우)
		if(editCodeLv1Params.codeName != $('#codeName').val()){
            Server.get('/api/main/sys/getCodeDuplCnt', {
                data: {
                    codeName: $('#codeName').val(),
                    codeLvl: 1
                },
                success: function (data) {
                    if(data > 0){ //중복
                        alert("코드그룹명이 존재합니다.");
                        return false;
                    }else{
                        doUpdate();
					}
                }
            });
		}else{
            doUpdate();
		}


		/*var addData = {
            codeName: $('#codeName').val(),
            codeLvl : 1, //대분류 수정에서는 level을 1로 주지않는다, 하위 자식 모두 update를 위해
            comCode1: comCode1
		};
        Server.post('/api/main/sys/editCode', {
            data: addData,
            success: function(result) {
                alert("코드가 수정되었습니다.");
                $('#pwindow').jqxWindow('close');
                Main.reload();
            }
        });*/
	});

    function doUpdate() {
        var addData = {
            codeName: $('#codeName').val(),
            codeLvl : 1, //대분류 수정에서는 level을 1로 주지않는다, 하위 자식 모두 update를 위해
            comCode1: comCode1
        };
        Server.post('/api/main/sys/editCode', {
            data: addData,
            success: function(result) {
                alert("수정되었습니다.");
                $('#pwindow').jqxWindow('close');
                Main.reload();
            }
        });
    }
	
</script>