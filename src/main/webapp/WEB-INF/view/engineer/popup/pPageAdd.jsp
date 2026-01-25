<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<form id="pForm" method="post">
	<table width="100%" border="0" cellpadding="0" cellspacing="0" class="Data_table">
		<tr class="pop_grid">
			<td class="pop_gridSub">대메뉴명</td>
			<td>
				<input type="text" id="pageName"  class="pop_inputWrite" />
			</td>
		</tr>
		<tr class="pop_grid pop_borderline">
			<td class="pop_gridSub">아이콘</td>
			<td>
				<div id="p_webIconClass" class="pop_combo1"></div>
			</td>
		</tr>
	</table>
	
	<div style="text-align: center; margin-top: 10px;">
		<button id="pbtnSave" type="button" class="p_btnPlus"></button>
		<button id="pbtnClose" type="button" class="p_btnClose"></button>
	</div>
</form>
<script>

	$('#p_webIconClass').jqxDropDownList({ width: '95%', height: 21, theme: jqxTheme,
		source: [ 'dc-mega-icon-nms', 'dc-mega-icon-tms', 'dc-mega-icon-rpt', 'dc-mega-icon-sms', 
		          'dc-mega-icon-fms', 'dc-mega-icon-env', 'dc-mega-icon-asset', 'dc-mega-icon-alarm', 
		          'dc-mega-icon-lms', 'dc-mega-icon-ipt', 'dc-mega-icon-dsbd', 'dc-mega-icon-lock',
				  'dc-mega-icon-mgnt']
	});
	
	// Button 이벤트 처리
	$('#pbtnClose').click(function() {
		$('#pwindow').jqxWindow('close');
	});

	$('#pbtnSave').click(function() {
		// SNMP_Ver3일때 필수값 체크
		var obj = $('#pageName');
		if($.isBlank(obj.val())) {
			alert('대메뉴명을 입력해 주세요.');
			obj.focus();
			return;
		}
		
		
		Server.post('/api/engineer/popup/addPage', {
			data: { pageName: $('#pageName').val(), webIconClass: $('#p_webIconClass').val() },
			success : function(result) {
				alert('추가되었습니다.');
				addDevResult();
				$('#pwindow').jqxWindow('close');
			}
		});
	});	
	
</script>