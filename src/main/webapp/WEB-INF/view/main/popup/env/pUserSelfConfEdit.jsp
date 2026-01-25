<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<meta charset="UTF-8">
<%@include file="/inc/inc.jsp" %>
<script type="text/javascript">
    var userId;
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
          		case "btnPasswordEdit": this.showUserPasswordChange(); break;
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
            userId = '${sessionScope.User.userId}';
            $('.area').jqxDropDownList({ source: [
                {label: '02', value: '02'},
                {label: '031', value: '031'},
                {label: '032', value: '032'},
                {label: '033', value: '033'},
                {label: '041', value: '041'},
                {label: '042', value: '042'},
                {label: '043', value: '043'},
                {label: '044', value: '044'},
                {label: '051', value: '051'},
                {label: '052', value: '052'},
                {label: '053', value: '053'},
                {label: '054', value: '054'},
                {label: '055', value: '055'},
                {label: '061', value: '061'},
                {label: '062', value: '062'},
                {label: '063', value: '063'},
                {label: '064', value: '064'},
                {label: '070', value: '070'}
            ],displayMember: 'label', valueMember: 'value', width: 50, height: 19, theme: jqxTheme, selectedIndex: 0, autoDropDownHeight: false });

            $('.mobile').jqxDropDownList({ source: [{label: '010', value: '010'}, {label: '011', value: '011'}, {label: '016', value: '016'}, {label: '017', value: '017'}, {label: '018', value: '018'}, {label: '019', value: '019'}],
                displayMember: 'label', valueMember: 'value', width: 50, height: 19, theme: jqxTheme, selectedIndex: 0, autoDropDownHeight: true });

            $.ajax({
                type : "post",
                url : $('#ctxPath').val() + '/main/env/userConf/checkMyId.do',
                data: {userId: userId},
                dataType : "json",
                success : function(jsonData) {
                    if(jsonData.resultData.checkAuthYn == 'N'){
                        alert("잘못된 접근입니다.")
                        self.close();
                    }else{

                        var resultData = jsonData.resultData.contents;
                        $('#pUserId').val(resultData.userId);
                        $('#pUserName').val(resultData.userName);
                        $('#emailAddr').val(resultData.emailAddr);

                        if(resultData.offcTelNo != null){
                            var offcTelNo = resultData.offcTelNo.split("-");
                            $("#offcTelNo1").val(offcTelNo[0])
                            $("#offcTelNo2").val(offcTelNo[1])
                            $("#offcTelNo3").val(offcTelNo[2])
                        }

                        if(resultData.moblPhnNo != null){
                            var moblPhnNo = resultData.moblPhnNo.split("-");
                            $("#moblPhnNo1").val(moblPhnNo[0])
                            $("#moblPhnNo2").val(moblPhnNo[1])
                            $("#moblPhnNo3").val(moblPhnNo[2])
                        }

                    }

                }
            });

        },
        saveUser: function () {
            if (!this.validateForm()) return;

            var _data = $("#userAddForm").serializeObject();
            //사무실 전화번호
            if($("#offcTelNo2").val() != '' && $("#offcTelNo3").val() != ''){
                _data.offcTelNo = $("#offcTelNo1").val() + '-' + $("#offcTelNo2").val() + '-' + $("#offcTelNo3").val();
            }

            _data.moblPhnNo = $("#moblPhnNo1").val() + '-' + $("#moblPhnNo2").val() + '-' + $("#moblPhnNo3").val();

            //_data.emailAddr = $("#emailAddr").val();

            Server.post('/api/main/env/userConf/editSelfUser', {
                data: _data,
                success: function (data) {
                    alert("수정 되었습니다 ");
                    self.close();
                }
            });
        },

        validateForm: function () {
            if ($("#pUserName").val() =='') {
                alert("이름을 입력해주세요.");
                return false;
            }

            if($("#moblPhnNo2").val() == '' || $("#moblPhnNo3").val() == '') {
                alert("휴대폰 번호를 입력해주세요.");
                return false;
            }

            if($("#emailAddr").val() == '') {
                alert("이메일을 입력해주세요.");
                return false;
            }

//             if($('#password').val() == '') {
//                 alert("비밀번호를 입력해주세요.");
//                 return false;
//             }

//             var pass = $("#password").val();
//             var pattern1 = /[0-9]/;	// 숫자
//             var pattern2 = /[a-zA-Z]/;	// 문자
//             var pattern3 = /[~!@#$%^&*()_+|<>?:{}]/;	// 특수문자

//             if(!pattern1.test(pass) || !pattern2.test(pass) || !pattern3.test(pass) || pass.length < 8) {
//                 alert("비밀번호는 영문자(대+소문자)/숫자/특수문자 포함 9자 이상입니다.")
//                 return false;
//             }

//             if($("#password").val() != $("#rePassword").val()) {
//                 alert("비밀번호가 일치하지 않습니다.");
//                 return false;
//             }
            /*if ($('#pOfficeTel').val() != '') {
                if (/[^0-9\-]/.test($('#pOfficeTel'))) {
                    alert('전화번호는 숫자와 특수문자[-]만 입력가능합니다.');
                    return false;
                }
            }*/


            /*obj = $("#pUserPcIp");
            if (!obj.val().isBlank()) {
                if (!$.validateIp(obj.val())) {
                    alert("IP형식이 유효하지 않습니다.");
                    obj.focus();
                    return false;
                }
            }*/
            return true;
        },
        passwordEdit: function () {
        	$.post(ctxPath + '/main/popup/env/pUserConfPasswordEdit.do' ,function(result) {
				$('#pwindow').jqxWindow({ width: 300, height: 180, title: '<h1>비밀번호 변경</h1>', content: result, position: 'center', resizable: false });
				$('#pwindow').jqxWindow('open');
			});	
        },

        showUserPasswordChange: function (message) {
            let url = "/main/popup/env/expire/pUserPasswordChange.do";
            if (message !== null && message !== undefined && message !== '') {
                url += "?message=" + encodeURIComponent(message);
            }
            const popupOption = "width=480,height=550,top=100,left=100,resizable=no,scrollbars=no,menubar=no,toolbar=no,location=no,status=no";
            window.open(url, 'pUserPasswordChange', popupOption)
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
    <div class="p_top_title_bg">
        <div class="p_top_title">
            <h1>정보수정</h1>
            <div class="p_close" onclick="self.close()"></div>
        </div>
    </div>
    <div class="tableBorder">
        <table>
            <tr class="pop_grid">
                <td class="pop_gridSub">아이디</td>
                <td><input type="text" id="pUserId" name="userId" class="pop_inputWrite" readonly="readonly"
                           style="border: none;"/></td>
            </tr>
            <tr class="pop_grid">
                <td class="pop_gridSub">이름</td>
                <td><input type="text" id="pUserName" name="userName" class="pop_inputWrite"/></td>
            </tr>
<!--             <tr class="pop_grid"> -->
<!--                 <td class="pop_gridSub ">비밀번호</td> -->
<!--                 <td><input type="password" name="password" id="password"  class="pop_inputWrite"/></td> -->
<!--             </tr> -->
<!--             <tr class="pop_grid"> -->
<!--                 <td class="pop_gridSub">비밀번호 확인</td> -->
<!--                 <td><input type="password" id="rePassword"  class="pop_inputWrite"/></td> -->
<!--             </tr> -->
            <tr class="pop_grid">
                <td class="pop_gridSub">휴대폰 번호</td>
                <td>
                    <div id="moblPhnNo1" class="pop_inputWrite4 mobile" style="float: left; margin-right: 4px; margin-left: 5px;"></div>
                    -
                    <input type="text"  id="moblPhnNo2"  class="pop_inputWrite4" maxlength="4" style="width: 40px;" onkeyup="this.value=this.value.replace(/[^0-9]/g,'')">
                    -
                    <input type="text"  id="moblPhnNo3"  class="pop_inputWrite4" maxlength="4" style="width: 40px;" onkeyup="this.value=this.value.replace(/[^0-9]/g,'')">
                </td>
            </tr>
            <tr class="pop_grid">
                <td class="pop_gridSub">사무실 전화번호</td>
                <td>
                    <div id="offcTelNo1" class="pop_inputWrite4 area" style="float: left; margin-right: 4px; margin-left: 5px;"></div>
                    -
                    <input type="text"  id="offcTelNo2"  class="pop_inputWrite4" maxlength="4" style="width: 40px;" onkeyup="this.value=this.value.replace(/[^0-9]/g,'')">
                    -
                    <input type="text"  id="offcTelNo3"  class="pop_inputWrite4" maxlength="4" style="width: 40px;" onkeyup="this.value=this.value.replace(/[^0-9]/g,'')">
                </td>
            </tr>
            <tr class="pop_grid">
                <td class="pop_gridSub">E-Mail</td>
                <td><input type="text" id="emailAddr" name="emailAddr" class="pop_inputWrite"/></td>
            </tr>
            <%--<tr class="pop_grid">
                <td class="pop_gridSub">접속IP</td>
                <td><input type="text" id="pUserPcIp" name="userPcIp" class="pop_inputWrite"/></td>
            </tr>--%>
        </table>
    </div>

    <div style="text-align:center; margin-top:10px;">
		<button id="btnPasswordEdit" type="button" class="p_btnPw"></button>
        <button id="btnSave" type="button" class="p_btnSave"></button>
        <button id="btnClose" type="button" class="p_btnClose"></button>
    </div>
</form>
</body>
</html>

