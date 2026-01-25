<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div class="tableBorder">
	<table style="border-top:1px solid #989898; border-left:1px solid #989898; border-right:1px solid #989898; border-bottom:1px solid #989898;">
		<colgroup>
			<col width="100">
			<col width="165">
			<col width="100">
			<col width="125">
			<col width="100">
			<col width="200">
		</colgroup>
		<tr class="pop_grid pop_first">
			<th class="pop_gridSub" style="width: 15%;">정상</th>
			<td style="text-align: left">
				<input type="number" onKeyPress="if(this.value.length==3) return false;" class="pop_inputWrite" id="basis1_input" style="width: 120px;"> 이하
			</td>
		</tr>
		<tr class="pop_grid pop_first">
			<th class="pop_gridSub" style="width: 15%;">관심</th>
			<td style="text-align: left">
				<input type="number" onKeyPress="if(this.value.length==3) return false;" class="pop_inputWrite" id="basis2_input" style="width: 120px;"> 이하
			</td>
		</tr>
		<tr class="pop_grid pop_first">
			<th class="pop_gridSub" style="width: 15%;">주의</th>
			<td style="text-align: left">
				<input type="number" onKeyPress="if(this.value.length==3) return false;" class="pop_inputWrite" id="basis3_input" style="width: 120px;"> 이하
			</td>
		</tr>
		<tr class="pop_grid pop_first">
			<th class="pop_gridSub" style="width: 15%;">경계</th>
			<td style="text-align: left">
				<input type="number" onKeyPress="if(this.value.length==3) return false;" class="pop_inputWrite" id="basis4_input" style="width: 120px;"> 이하
			</td>
		</tr>
		<tr class="pop_grid pop_first">
			<th class="pop_gridSub" style="width: 15%;">심각</th>
			<td style="text-align: left">
				<input type="number" onKeyPress="if(this.value.length==3) return false;" class="pop_inputWrite" id="basis5_input" style="width: 120px;"> 이하
			</td>
		</tr>
	</table>
</div>
<div style="text-align:center; margin-top:10px;">
	<button id="pbtnRiskEdit" type="button" class="p_btnPlus"></button>
	<button id="pbtnRiskClose" type="button" class="p_btnClose"></button>
</div>

<script>
    var params = [];
    function pwindow_init(data) {
        $.ajax({
            type : "post",
            url :$('#ctxPath').val() + '/main/sys/getRiskMgmt.do',
            data : {},
            dataType : "json",
            success : function(jsonData) {
				$("#basis1_input").val(jsonData.resultData.basis1 );
                $("#basis2_input").val(jsonData.resultData.basis2 );
                $("#basis3_input").val(jsonData.resultData.basis3 );
                $("#basis4_input").val(jsonData.resultData.basis4 );
                $("#basis5_input").val(jsonData.resultData.basis5 );

            }
        });
    }
	$('#pbtnRiskClose').click(function() {
		$('#pwindow').jqxWindow('close');
	});
	$('#pbtnRiskEdit').click(function() {
        var nullYn = 'N';
        var overYn = 'N';
	    $('.pop_inputWrite').each(function(i) {
	        if(i != 4){
                var intputId = "basis"+ (i+1) + "_input";
                var intputAfterId = "basis"+ (i+2) + "_input";

                //이전단계값이 다음단계 값보다 클경우 정지
                if(($("#"+intputId).val()) * 1 >= ($("#"+intputAfterId).val()) * 1){
                    overYn = 'Y'
				}
			}
           	if(this.value == ''){ //한칸이라도 null이면 정지
                nullYn = 'Y';
			}
        });

        if(nullYn == 'Y'){
            alert("수치를 입력해주세요");
            return false;
        }

		if(overYn == 'Y'){
		    alert("수치를 확인해주세요");
		    return false;
		}

	    var params = {};
        var datas = [];

        datas.push($("#basis1_input").val());
        datas.push($("#basis2_input").val());
        datas.push($("#basis3_input").val());
        datas.push($("#basis4_input").val());
        datas.push($("#basis5_input").val());

        params.inputValue = datas;

        Server.post('/api/main/sys/editRiskMgmt', {
            data : params,
            success : function(result) {
                alert("변경되었습니다.");
                $('#pwindow').jqxWindow('close');
                Main.initData();
            }
        });


	});

</script>