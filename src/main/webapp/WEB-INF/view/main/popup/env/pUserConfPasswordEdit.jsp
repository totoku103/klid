<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>


<form id="popupEditForm" name="popupEditForm" >
<div class="tableBorder">
	<table>
			<tr class="pop_grid">
				<td class="pop_gridSub">이전 비밀번호</td>
				<td><input type="password" id="prePassword" name="prePassword" class="pop_input" /></td>
			</tr>
			<tr class="pop_grid">
				<td class="pop_gridSub">새 비밀번호</td>
				<td><input type="password" id="password" name="password" class="pop_input" autocomplete="off" /></td>
			</tr>
			<tr class="pop_grid pop_borderline">
				<td class="pop_gridSub">비밀번호 확인</td>
				<td><input type="password" id="rePassword" name="rePassword" class="pop_input" autocomplete="off" /></td>
			</tr>
	</table>
</div>
	<div style="text-align:center; margin-top:10px;">
			<button id="pbtnSave" type="button" class="p_btnSave"></button>
			<button id="pbtnClose" type="button" class="p_btnClose"></button>
	</div>
</form>

<script>
$('#pbtnClose').click(function() {
	$('#pwindow').jqxWindow('close');
});

$('#pbtnSave').click(function() {
    if($("#prePassword").val() == ''){
		alert("이전 비밀번호를 입력해주세요.")
		return false;
	};

	var password=$("#password").val();
	
	var obj = $("#password");
	if($.isBlank(obj.val())) {
		alert("비밀번호를 입력해주세요.");
		obj.focus();
		return false;
	}
	obj = $("#rePassword");
	if($.isBlank(obj.val())) {
		alert("비밀번호 확인을 입력해주세요.");
		obj.focus();
		return false;
	}
	
	var pass = $("#password").val();
    var pattern1 = /[0-9]/;	// 숫자
    var pattern2 = /[a-zA-Z]/;	// 문자
    var pattern3 = /[~!@#$%^&*()_+|<>?:{}]/;	// 특수문자

    /*if(!pattern1.test(pass) || !pattern2.test(pass) || !pattern3.test(pass) || pass.length < 8) {
        alert("비밀번호는 영문자(대+소문자)/숫자/특수문자 포함 9자 이상입니다.")
        return false;
    }*/
    
	if($("#password").val() != $("#rePassword").val()) {
		alert("비밀번호가 일치하지 않습니다.");
		$("#rePassword").focus();
		return false;
		
	}
	if(!confirm("비밀번호를 변경하시겠습니까?")) return;

    Server.post('/api/main/env/userConf/expire/passwordCheck', {
		data: { 'userId'	:	userId,
				'password'	:	$("#prePassword").val()
		},
		success: function (data) {
			if (data > 0) {
			    //기존로직 패스워드 변경
			    Server.post('/api/main/env/userConf/editUserPassword', {
					data: { 'userId'	:	userId,
							'password'	:	password
							},
					success: function(data) {
						alert(data);
						$('#pwindow').jqxWindow('close');
					}
				});
            }else{
			    alert("이전 비밀번호가 일치하지 않습니다.");
			}
		}
	});

});
</script>