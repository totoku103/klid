<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div class="tableBorder">
	<table>
		<tr class="pop_grid ">
			<td class="pop_gridSub">기관</td>
			<td>
				<div id="instCdArea">
					<div id="instCd" style="border: none;"></div>
					<input type="hidden" id="srchInstCd"/>
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
	<button id="pbtnSave" type="button" class="p_btnSave"></button>
	<button id="pbtnClose" type="button" class="p_btnClose"></button>
</div>

<script>
	var seqNo ;
    function pwindow_init(data) {
        initData(data);

        var instParams = {
            instCd : data.instCd,
            instNm : data.instNm
        };
        HmDropDownBtn.createDeptTreeGrid($('#instCdArea'), $('#instCd'), 'area', '95%', 22, '98%', 350, null, instParams);

        $('#useYn').jqxDropDownList({ width: 153, height: 21, theme: jqxTheme, autoDropDownHeight: true,
            displayMember: 'label', valueMember: 'value', selectedIndex: 0,
            source: [
                { label: '예', value: 1 },
                { label: '아니오', value: 0 }
            ]
        });

        $('#moisYn').jqxDropDownList({ width: 153, height: 21, theme: jqxTheme, autoDropDownHeight: true,
            displayMember: 'label', valueMember: 'value', selectedIndex: 0,
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

        $('#pbtnClose').click(function() {
            $('#pwindow').jqxWindow('close');
        });
        $('#pbtnSave').click(function() {
            if($.isBlank($("#instCenterNm").val())) {
                alert('기관명을 입력해주세요.');
                return;
            }
            if($.isBlank($("#url").val())) {
                alert('URL을 입력해주세요.');
                return;
            }

            //var s_instCd = $('#instCd').jqxTreeGrid('getSelection')[0];
            //var instCd = s_instCd.instCd;
            
            var params = {
                seqNo   : seqNo,
                instCd  : $("#srchInstCd").val(),
                instCenterNm  : $("#instCenterNm").val(),
				url 	: $("#url").val(),
                moisYn  : $("#moisYn").val(),
                useYn   : $("#useYn").val(),
                checkYn : $("#checkYn").val(),
                sAuthMain : $("#sAuthMain").val() //개발,시도 권한에 따라 감시여부(개발) checkYn. 감시여부(시도)checkSidoYn 분기 처리
            };

            Server.post('/api/main/home/healthCheckUrl/editHealthCheckUrl', {
                data : params,
                success : function(result) {
                    alert("수정되었습니다.");
                    $('#pwindow').jqxWindow('close');
                    $("#p_srchInstCd").val(null);
                    HmGrid.updateBoundData($grid, ctxPath + '/main/home/healthCheckUrl/getHealthCheckUrl.do');

                }
            });


        });
    }

    function initData(params){
        seqNo = params.seqNo;
        
        $.ajax({
            type: "post",
            url: $('#ctxPath').val() + '/main/home/healthCheckUrl/getDetailHealthCheckUrl.do',
            data: { seqNo : seqNo },
            dataType: "json",
            success: function (jsonData) {
                var contents = jsonData.resultData.contents;

                $("#instCenterNm").val(contents.instCenterNm);
                $("#url").val(contents.url);
				$("#lastRes").val(contents.lastRes);
				$("#moisYn").val(contents.moisYn);
				$("#useYn").val(contents.userYn);

                if($("#sAuthMain").val() == 'AUTH_MAIN_2' || $("#sAuthMain").val()  == 'AUTH_MAIN_1'){
                    $("#checkYn").val(contents.checkYn); //개발원 집중감시여부
				}else{
                    $("#checkYn").val(contents.checkSidoYn); //시도 집중감시여부
				}


            }
        });
    }


	
</script>