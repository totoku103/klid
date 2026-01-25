<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div class="tableBorder">
	<table>
		<%--<tr class="pop_grid ">
			<td class="pop_gridSub">코드그룹</td>
			<td><input id="codeTitle" type="text" readonly="readonly" class="pop_input" style="border: none;" maxlength="50"/></td>
		</tr>

		<tr class="pop_grid ">
			<td class="pop_gridSub">코드명(중)</td>
			<td><input id="codeName2" type="text" readonly="readonly" class="pop_input" style="border: none;" maxlength="50"/></td>
		</tr>

		<tr class="pop_grid ">
			<td class="pop_gridSub">코드값1</td>
			<td><input id="comCode2" name="comCode2" type="text" readonly="readonly" class="pop_input" style="border: none;" maxlength="50"/></td>
		</tr>--%>
		<tr class="pop_grid ">
	        <td class="pop_gridSub">분류명</td>
			<td><input  id="codeName3" name="codeName3" type="text" class="pop_input" maxlength="50"/></td>
	    </tr>
		<%--<tr class="pop_grid ">
			<td class="pop_gridSub">코드값2</td>
			<td><input id="comCode3" name="comCode3" type="text" class="pop_input" maxlength="50"/></td>
		</tr>--%>
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
	<button id="pbtnAdd" type="button" class="p_btnPlus"></button>
	<button id="pbtnClose" type="button" class="p_btnClose"></button>
</div>

<script>
    function pwindow_init(data) {
        $('#useYn').jqxDropDownList({ width: 153, height: 21, theme: jqxTheme, autoDropDownHeight: true,
            displayMember: 'label', valueMember: 'value', selectedIndex: 0,
            source: [
                { label: '예', value: 'Y' },
                { label: '아니오', value: 'N' }
            ]
        });

        $('#codeTitle').val(codeName);
        $('#comCode2').val(comCode2);  //중분류 코드값 세팅
        $('#codeName2').val(codeName2); //중분류 코드명 세팅


        $('#pbtnClose').click(function() {
            $('#pwindow').jqxWindow('close');
        });
        $('#pbtnAdd').click(function() {
            var obj = $('#codeName3');
            if($.isBlank(obj.val())) {
                alert('코드명을 입력해주세요.');
                obj.focus();
                return;
            }

            /*var comCode3 = $('#comCode3');
            if($.isBlank(comCode3.val())) {
                alert('코드값을 입력해주세요.');
                obj.focus();
                return;
            }*/

            Server.get('/api/main/sys/getCodeDuplCnt', {
                data: {
                    comCode1 : comCode1,
                    comCode2 : comCode2,
                    codeName: $('#codeName3').val(),
                    codeLvl: 3
                },
                success: function (data) {
                    if(data > 0){
                        alert("코드명이 존재합니다.")
                        return false;
                    }

                    var addData = {
                        codeName: $('#codeName3').val(),
                        codeLvl : 3,
                        comCode1 : comCode1,   //좌측 선택 부모값
                        comCode2 : comCode2,   //상단 선택 중분류 값
                        //comCode3 : $('#comCode3').val(),
                        useYn    : $('#useYn').val(),
                        codeCont : $('#codeCont').val()
                    };
                    save(addData,3);
                }
            });

        });
    }


	
</script>