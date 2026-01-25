<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div class="tableBorder">
	<table>
		<%--<tr class="pop_grid ">
			<td class="pop_gridSub">코드그룹</td>
			<td><input id="codeTitle" type="text" readonly="readonly" class="pop_input" style="border: none;" maxlength="50"/></td>
		</tr>
		<tr class="pop_grid ">
			<td class="pop_gridSub">코드값</td>
			<td><input id="comCode2" name="comCode2" readonly="readonly" type="text" style="border: none;" class="pop_input" maxlength="50"/></td>
		</tr>
		<tr class="pop_grid ">
			<td class="pop_gridSub">코드값2</td>
			<td><input id="comCode3" name="comCode3" readonly="readonly" type="text" style="border: none;" class="pop_input" maxlength="50"/></td>
		</tr>--%>
		<tr class="pop_grid ">
			<td class="pop_gridSub">분류명</td>
			<td><input id="codeName" name="codeName" type="text" class="pop_input" maxlength="50"/></td>
		</tr>
		<tr class="pop_grid ">
			<td class="pop_gridSub">설명</td>
			<td><input id="codeCont" name="codeCont" type="text" class="pop_input" maxlength="50"/></td>
		</tr>
		<tr class="pop_grid ">
			<td class="pop_gridSub">사용여부</td>
			<td>
				<div id="useYn" name="useYn" class="pop_combo1"></div>
			</td>
		</tr>
	</table>
</div>
<div style="text-align:center; margin-top:10px;">
	<button id="pbtnEdit" type="button" class="p_btnSave"></button>
	<button id="pbtnClose" type="button" class="p_btnClose"></button>
</div>

<script>
    function pwindow_init() {
        //$('#codeTitle').val(editCodeLv2Params.codeTitle);
        $('#codeName').val(editCodeLv2Params.codeName);
        //$('#comCode2').val(editCodeLv2Params.comCode2);
        //$('#comCode3').val(editCodeLv2Params.comCode3);
        $('#codeCont').val(editCodeLv2Params.codeCont);

        if(editCodeLv2Params.codeName.useYn == 'Y'){
            $('#useYn').jqxDropDownList({selectedIndex: 1})
        }else{
            $('#useYn').jqxDropDownList({selectedIndex: 0})
        }
        /*Server.get('/code/getCommonCode.do', {
            data: {
                comCode1: comCode1,
                codeLvl: 1
			},
            success: function (data) {
				console.log(data[0].useYn)
				$("#codeName").val(data[0].codeName);

				if(data[0].useYn == 'Y'){
                    $('#useYn').jqxDropDownList({selectedIndex: 0})
				}else{
                    $('#useYn').jqxDropDownList({selectedIndex: 1})
				}
            }
        });*/

        $('#useYn').jqxDropDownList({ width: 153, height: 21, theme: jqxTheme, autoDropDownHeight: true,
            displayMember: 'label', valueMember: 'value',
            source: [
                { label: '예', value: 'Y' },
                { label: '아니오', value: 'N' }
            ]
        });

    }
	$('#pbtnClose').click(function() {
		$('#pwindow').jqxWindow('close');
	});
	$('#pbtnEdit').click(function() {
		var obj = $('#codeName');
		if($.isBlank(obj.val())) {
			alert('코드명을 입력해주세요.');
			obj.focus();
			return;
		}

        //기존 이름과 새로 입력한 이름이 다를 경우 중복검사 실시 (변경되었을 경우)
        if(editCodeLv2Params.codeName != $('#codeName').val()){
            Server.get('/api/main/sys/getCodeDuplCnt', {
                data: {
                    comCode1 : comCode1,
                    codeName: $('#codeName').val(),
                    codeLvl: 2
                },
                success: function (data) {
                    if(data > 0){ //중복
                        alert("코드그룹명이 존재합니다.");
                        return false;
                    }else{
                        doUpdateCode();
                    }
                }
            });
        }else{
            doUpdateCode();
		}

		/*var addData = {
            codeName: $('#codeName').val(),
            codeLvl : 2,
            comCode1: comCode1,
			comCode2: editCodeLv2Params.comCode2,
            useYn   : $('#useYn').val(),
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

    function doUpdateCode() {
        var addData = {
            codeName: $('#codeName').val(),
            codeLvl : 3,
            comCode1: comCode1,
            comCode2: editCodeLv2Params.comCode2,
            useYn   : $('#useYn').val(),
            codeCont : $('#codeCont').val()
        };
        Server.post('/api/main/sys/editCode', {
            data: addData,
            success: function(result) {
                alert("수정되었습니다.");
                $('#pwindow').jqxWindow('close');
                Main.reload(3);
            }
        })
    }
	
</script>