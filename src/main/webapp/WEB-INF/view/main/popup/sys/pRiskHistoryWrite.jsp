<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div class="pop_gridTitle">
	<img alt="bullet" src="${pageContext.request.contextPath}/img/MainImg/customer_bullet.png">변경내용
</div>
<table style="border-top:1px solid #989898; border-left:1px solid #989898; border-right:1px solid #989898; border-bottom:1px solid #989898;">
	<tr class="pop_grid">
		<td colspan="5">
			<textarea id="historyContents" style="width: 96%; height: 100px; margin:5px;  border: 1px solid #cccccc; resize:none;"></textarea>
		</td>
	</tr>
</table>


<div style="text-align:center; margin-top:10px;">
	<button id="pbtnHistoryAdd" type="button" class="p_btnPlus"></button>
	<button id="pbtnHistoryClose" type="button" class="p_btnClose"></button>
</div>

<script>
    function pHistoryWindow_init(data) {

    }

	$('#pbtnHistoryClose').click(function() {
		$('#pHistoryWindow').jqxWindow('close');
	});
	$('#pbtnHistoryAdd').click(function() {
		var params = {
			step : currentStep,
            contents : $("#historyContents").val(),
            usrName : $("#sUserName").val(),
            usrId 	: $("#sUserId").val()
		};

        console.log(params);

        Server.post('/api/main/sys/addRiskHistory', {
            data : params,
            success : function(result) {
                alert("등록되었습니다.");
                $('#pHistoryWindow').jqxWindow('close');
                Main.doHistory(currentStep);
            }
        });


	});

</script>