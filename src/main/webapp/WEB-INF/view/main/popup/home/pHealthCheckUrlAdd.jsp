<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div class="tableBorder">
	<table>
		<tr class="pop_grid ">
			<td class="pop_gridSub">기관</td>
			<td>
				<div id="instCdArea" class="pop_inputWrite4">
					<div id="instCd" style="border: none;"></div>
				</div>
			</td>
		</tr>
	    <tr class="pop_grid ">
	        <td class="pop_gridSub">기관명(*)</td>
			<td><input id="instCenterNm" name="instCenterNm" type="text" class="pop_input"/></td>
	    </tr>
		<tr class="pop_grid ">
			<td class="pop_gridSub">URL(*)</td>
			<td><input id="url" name="url" type="text" class="pop_input" maxlength="300"/></td>
		</tr>
		<tr class="pop_grid ">
			<td class="pop_gridSub">구분</td>
			<td>
				<div id="moisYn" name="moisYn" class="pop_combo1"></div>
			</td>
		</tr>
		<tr class="pop_grid ">
			<td class="pop_gridSub">사용여부</td>
			<td>
				<div id="useYn" name="useYn" class="pop_combo1"></div>
			</td>
		</tr>
		<tr class="pop_grid ">
			<td class="pop_gridSub">집중감시여부</td>
			<td>
				<div id="checkYn" name="checkYn" class="pop_combo1"></div>
			</td>
		</tr>
	</table>
</div>
<div style="text-align:center; margin-top:10px;">
	<button id="pbtnSave" type="button" class="p_btnPlus"></button>
	<button id="pbtnClose" type="button" class="p_btnClose"></button>
</div>

<script>
    function pwindow_init(data) {
        HmDropDownBtn.createDeptTreeGrid($('#instCdArea'), $('#instCd'), 'area', '95%', 22, '98%', 350, null);

        $('#useYn').jqxDropDownList({ width: 153, height: 21, theme: jqxTheme, autoDropDownHeight: true,
            displayMember: 'label', valueMember: 'value', selectedIndex: 0,
            source: [
                { label: '예', value: 1 },
                { label: '아니오', value: 0 }
            ]
        });

        $('#moisYn').jqxDropDownList({ width: 153, height: 21, theme: jqxTheme, autoDropDownHeight: true,
            displayMember: 'label', valueMember: 'value', selectedIndex: 1,
            source: [
                { label: '중앙부처', value: 1 },
                { label: '지자체', value: 0 }
            ]
        });

        $('#checkYn').jqxDropDownList({ width: 153, height: 21, theme: jqxTheme, autoDropDownHeight: true,
            displayMember: 'label', valueMember: 'value', selectedIndex: 0,
            source: [
                { label: '아니오', value: 0 },
                { label: '예', value: 1 }
            ]
        });

        if($('#sAuthMain').val()=='AUTH_MAIN_3'||$('#sAuthMain').val()=='AUTH_MAIN_4'){
			$('#moisYn').jqxDropDownList({disabled:true});
		}

        $('#pbtnClose').click(function() {
            $('#pwindow').jqxWindow('close');
        });
        $('#pbtnSave').click(function() {

            if($.isBlank($("#instCenterNm").val())) {
                alert('기관명을 입력해주세요.');
                obj.focus();
                return;
            }
            if($.isBlank($("#url").val())) {
                alert('URL을 입력해주세요.');
                obj.focus();
                return;
            }
            
            var s_instCd = $('#instCd').jqxTreeGrid('getSelection')[0];
            var instCd = s_instCd.instCd;

            var params = {
                instCd  : instCd,
                instCenterNm  : $("#instCenterNm").val(),
				url 	: $("#url").val(),
                moisYn  : $("#moisYn").val(),
                useYn   : $("#useYn").val(),
                checkYn : $("#checkYn").val(),
				lastRes : 200
            };

            Server.post('/api/main/home/healthCheckUrl/addHealthCheckUrl', {
                data : params,
                success : function(result) {
                    alert("추가되었습니다.");
                    $('#pwindow').jqxWindow('close');
                    $("#srchInstCd").val(null);
                    HmGrid.updateBoundData($grid, ctxPath + '/main/home/healthCheckUrl/getHealthCheckUrl.do');

                }
            });


        });
    }


	
</script>