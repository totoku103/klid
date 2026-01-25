<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<form id="pForm" method="post">
	<table>
		<tr class="pop_grid pop_borderline">
			<td class="pop_gridSub">중메뉴명</td>
			<td>
				<input type="text" id="pageGroupName"  class="pop_inputWrite" />
			</td>
		</tr>
	</table>
	
	<div style="text-align: center; margin-top: 10px;">
		<button id="pbtnSave" type="button" class="p_btnPlus"></button>
		<button id="pbtnClose" type="button" class="p_btnClose"></button>
	</div>
</form>
<script>

		// Button 이벤트 처리
		$('#pbtnClose').click(function() {
			$('#pwindow').jqxWindow('close');
		});

		$('#pbtnSave').click(function() {
			// SNMP_Ver3일때 필수값 체크
			var obj = $('#pageGroupName');
			if($.isBlank(obj.val())) {
				alert('중메뉴명을 입력해 주세요.');
				obj.focus();
				return;
			}
			
			Server.post('/api/engineer/popup/addPageGroup', {
				data: {menuPageNo: curMenuPageNo,
					pageGroupName: $('#pageGroupName').val()
				},
				success : function(result) {
					alert('추가되었습니다.');
					refreshPageGroup();
					$('#pwindow').jqxWindow('close');
				}
			});
		});	
	
</script>