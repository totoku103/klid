<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<meta charset="UTF-8">
<%@include file="/inc/inc.jsp" %>
<script type="text/javascript">
    var Main = {
        /** Initialize */
        initVariable: function () {
        },

        /** Event Object */
        observe: function () {
            $('button').bind('click', function (event) {
                Main.eventControl(event);
            });
        },

        /** Event Control Function */
        eventControl: function (event) {
            var objElement = event.currentTarget;
            if (objElement === window) {
                this.resizeWindow();
                return;
            }

            switch (objElement.id) {
                case "btnSave":
                    this.saveUser();
                    break;
                case "btnClose":
                    this.cancelUser();
                    break;
            }
        },

        /** Init Data */
        initData: function () {

        },
        saveUser: function () {
            var userId = $("#userId", opener.document).val();
            var password=$("#password").val();

            if($("#prePassword").val() == ''){
                alert("이전 비밀번호를 입력해주세요.")
                return false;
			}

            if($("#rePassword").val() == '' || $("#Password").val()){
                alert("비밀번호를 입력해주세요.")
                return false;
            }

            if($("#password").val() != $("#rePassword").val()) {
                alert("비밀번호가 일치하지 않습니다.");
                $("#rePassword").focus();
                return false;

            }

            var pass = $("#password").val();
            var pattern1 = /[0-9]/;	// 숫자
            var pattern2 = /[a-zA-Z]/;	// 문자
            var pattern3 = /[~!@#$%^&*()_+|<>?:{}]/;	// 특수문자

			if(!pattern1.test(pass) || !pattern2.test(pass) || !pattern3.test(pass) || pass.length < 8) {
			 	alert("비밀번호는 영/숫자/특문 포함 8자 이상입니다.")
			 	return false;
			}

            Server.post('/api/main/env/userConf/expire/passwordCheck', {
                data: { 'userId'	:	userId,
                    	'prePassword'	:	$("#prePassword").val(),
						'password'	:	$("#rePassword").val()
                },
                success: function (data) {
                    alert(data);
                    self.close();
                }
            });
        },

        // 취소
        cancelUser: function () {
            self.close();
        }
    };
    $(function () {
        Main.initVariable();
        Main.observe();
        Main.initData();
    });
</script>
</head>
<body style="overflow: hidden;">
<input type="hidden" id="ctxPath" value="${pageContext.request.contextPath}"/>
<form id="userAddForm" name="userAddForm">
	<div class="tableBorder3">
		<table>
			<tr class="pop_grid">
				<td class="pop_gridSub">이전 비밀번호</td>
				<td><input type="password" id="prePassword" name="prePassword" class="pop_input" /></td>
			</tr>
			<tr class="pop_grid">
				<td class="pop_gridSub">새 비밀번호</td>
				<td><input type="password" id="password" name="password" class="pop_input" /></td>
			</tr>
			<tr class="pop_grid pop_borderline">
				<td class="pop_gridSub">비밀번호 확인</td>
				<td><input type="password" id="rePassword" name="rePassword" class="pop_input" /></td>
			</tr>
		</table>
	</div>

	<div style="text-align:center; margin-top:10px;">
		<button id="btnSave" type="button" class="p_btnSave"></button>
		<button id="btnClose" type="button" class="p_btnClose"></button>
	</div>
</form>
</body>
</html>

