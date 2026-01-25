<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div class="tableBorder">
	<table>
	    <tr class="pop_grid ">
	        <td class="pop_gridSub">코드그룹 명(*)</td>
			<td><input id="codeName" name="codeName" type="text" class="pop_input" maxlength="50"/></td>
	    </tr>
		<tr class="pop_grid ">
			<td class="pop_gridSub">설문코드여부</td>
			<td>
				<div id="surveyYn"></div>
			</td>
		</tr>
		<tr id="surveyExamDiv" class="pop_grid" style="display: none;">
			<td class="pop_gridSub">문항유형</td>
			<td>
				<div id="surveyExamType"></div>
			</td>
		</tr>
	</table>
</div>
<div style="text-align:center; margin-top:10px;">
	<button id="pbtnAdd" type="button" class="p_btnPlus"></button>
	<button id="pbtnClose" type="button" class="p_btnClose"></button>
</div>

<script>
    function pwindow_init(data) {
        $('#surveyYn').jqxDropDownList({ width: 153, height: 21, theme: jqxTheme, autoDropDownHeight: true,
            displayMember: 'label', valueMember: 'value', selectedIndex: 0,
            source: [
                { label: '아니오', value: 'N' },
                { label: '예', value: 'Y' }
            ]
        }).on('change', function(event) {
            if($("#surveyYn").val() == 'Y'){
                $("#surveyExamDiv").show();

                $('#surveyExamType').jqxDropDownList({ width: 153, height: 21, theme: jqxTheme, autoDropDownHeight: true,
                    displayMember: 'label', valueMember: 'value', selectedIndex: 0,
                    source: [
                        { label: '선택형', value: 'choose' },
                        { label: '입력형', value: 'text' }
                    ]
                })
            }else{
                $("#surveyExamDiv").hide();
			}
        });
    }
	$('#pbtnClose').click(function() {
		$('#pwindow').jqxWindow('close');
	});
	$('#pbtnAdd').click(function() {
		var obj = $('#codeName');
		if($.isBlank(obj.val())) {
			alert('코드그룹 명을 입력해주세요.');
			obj.focus();
			return;
		}

        Server.get('/api/main/sys/getCodeDuplCnt', {
            data: {
                codeName: $('#codeName').val(),
                codeLvl: 1
            },
            success: function (data) {
                if(data > 0){
					alert("코드그룹명이 존재합니다.")
                    return false;
                }

                var addData = {
                    codeName: $('#codeName').val(),
                    codeLvl : 1
                };
				if($("#surveyYn").val() == 'Y'){
                    addData.flag1 = 'survey';
                    addData.flag2 = $("#surveyExamType").val();

				}
                addCodeLv1Result(addData);
            }
        });

	});

</script>