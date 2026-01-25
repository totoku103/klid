<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<form id="userAddForm" name="userAddForm" action="">
	<div class="pop_gridTitle">
		<img alt="bullet" src="${pageContext.request.contextPath}/img/MainImg/customer_bullet.png"> 기본정보
	</div>
	<table style="border: 1px solid #989898;">
		<colgroup>
			<col width="15%">
			<col width="35%">
			<col width="15%">
			<col width="35%">
		</colgroup>
		<tr class="pop_grid">
			<td class="pop_gridSub">사용자 아이디(*)</td>
			<td>
				<input type="text"  name="userId" id="userId"    style="width: 70%; margin-top: 2px;" onkeyup="this.value=this.value.replace(/ /gi,'')">
				<div style="float: right; margin-right: 3px;">
					<button id="checkDuplicate" type="button" class="p_btnDoubleCheck"></button>
				</div>
			</td>
			<td class="pop_gridSub">이름(*)</td>
			<td><input type="text" name="userName" id="userName"  class="pop_inputWrite4" style="width: 70%;"></td>
		</tr>
		<tr class="pop_grid">
			<td class="pop_gridSub ">비밀번호(*)</td>
			<td><input type="password" name="password" id="password"  class="pop_inputWrite4" style="width: 70%;"></td>

			<td class="pop_gridSub">비밀번호 확인(*)</td>
			<td><input type="password" id="rePassword"  class="pop_inputWrite4" style="width: 70%;"></td>
		</tr>
		<tr class="pop_grid">
			<td class="pop_gridSub">소속기관(*)</td>
			<td>
				<div id="instCdArea" class="pop_inputWrite4">
					<div id="instCd" style="border: none;"></div>
					<input type="hidden" id="dmgInstCd"/>
				</div>
			</td>
			<td class="pop_gridSub">사용여부(*)</td>
			<td><div name="useYn" id="useYn" class="pop_inputWrite4 userYn"></div></td>
			<%--<td class="pop_gridSub">직급</td>
			<td><input type="text" name="grade" id="grade"  class="pop_inputWrite4" style="width: 70%;"></td>--%>
		</tr>
		<tr class="pop_grid">
			<td class="pop_gridSub">SMS 수신여부(*)</td>
			<td><div name="smsYn" id="smsYn" class="pop_inputWrite4 userYn"></div></td>
			<td class="pop_gridSub">로그인 IP(*)</td>
			<td colspan="3">
				<input type="text" name="ipAddr" id="ipAddr"  class="pop_inputWrite4" style="width: 215px;" onkeyup="this.value=this.value.replace(/[^0-9.]/g,'')">
			</td>
		</tr>
	</table>

	<div class="pop_gridTitle" >
		<img alt="bullet" src="${pageContext.request.contextPath}/img/MainImg/customer_bullet.png"> 연락처 정보
	</div>
	<table style="border : 1px solid #989898;">
		<colgroup>
			<col width="15%">
			<col width="35%">
			<col width="15%">
			<col width="35%">
		</colgroup>
		<tr class="pop_grid">
			<td class="pop_gridSub">휴대폰 번호(*)</td>
			<td  style="text-align:initial;">
				<div id="moblPhnNo1" class="pop_inputWrite4 mobile" style="float: left; margin-right: 4px;"></div>
				-
				<input type="text"  name="moblPhnNo2" id="moblPhnNo2"  class="pop_inputWrite4" style="width: 40px;" maxlength="4" onkeyup="this.value=this.value.replace(/[^0-9]/g,'')">
				-
				<input type="text"  name="moblPhnNo3" id="moblPhnNo3"  class="pop_inputWrite4" style="width: 40px;" maxlength="4" onkeyup="this.value=this.value.replace(/[^0-9]/g,'')">
			</td>
			<td class="pop_gridSub">사무실 전화번호</td>
			<td  style="text-align:initial;">
				<div id="offcTelNo1" class="pop_inputWrite4 area" style="float: left; margin-right: 4px;"></div>
				-
				<input type="text"  id="offcTelNo2"  class="pop_inputWrite4" style="width: 40px;" maxlength="4" onkeyup="this.value=this.value.replace(/[^0-9]/g,'')">
				-
				<input type="text"  id="offcTelNo3"  class="pop_inputWrite4" style="width: 40px;" maxlength="4" onkeyup="this.value=this.value.replace(/[^0-9]/g,'')">
			</td>
			<%--<td class="pop_gridSub">사무실 팩스번호</td>
			<td  style="text-align:initial;">
				<div id="offcFaxNo1" class="pop_inputWrite4 area" style="float: left; margin-right: 4px;"></div>
				-
				<input type="text"  id="offcFaxNo2"  class="pop_inputWrite4" style="width: 40px;">
				-
				<input type="text"  id="offcFaxNo3"  class="pop_inputWrite4" style="width: 40px;">
			</td>--%>
		</tr>
		<%--<tr class="pop_grid">
			<td class="pop_gridSub">휴대폰 번호</td>
			<td  style="text-align:initial;">
				<div id="moblPhnNo1" class="pop_inputWrite4 mobile" style="float: left; margin-right: 4px;"></div>
				-
				<input type="text"  name="moblPhnNo2" id="moblPhnNo2"  class="pop_inputWrite4" style="width: 40px;">
				-
				<input type="text"  name="moblPhnNo3" id="moblPhnNo3"  class="pop_inputWrite4" style="width: 40px;">
			</td>
			<td class="pop_gridSub">자택 전화번호</td>
			<td  style="text-align:initial;">
				<div id="homeTelNo1" class="pop_inputWrite4 area" style="float: left; margin-right: 4px;"></div>
				-
				<input type="text"  name="homeTelNo2" id="homeTelNo2"  class="pop_inputWrite4" style="width: 40px;">
				-
				<input type="text"  name="homeTelNo3" id="homeTelNo3"  class="pop_inputWrite4" style="width: 40px;">
			</td>
		</tr>
		<tr class="pop_grid">
			<td class="pop_gridSub">이메일 수신여부</td>
			<td><div name="emaiYn" id="emaiYn" class="pop_inputWrite4 userYn" ></div></td>
			<td class="pop_gridSub">SMS 수신여부</td>
			<td><div name="smsYn" id="smsYn" class="pop_inputWrite4 userYn" ></div></td>
		</tr>--%>
		<tr class="pop_grid">
			<td class="pop_gridSub ">이메일 주소(*)</td>
			<td colspan="3">
				<div style="float: left; width: 300px;">
					<input type="text" name="emailAddr1" id="emailAddr1"  class="pop_inputWrite4" style="width: 40%;">
					@
					<input type="text" name="emailAddr2" id="emailAddr2"  class="pop_inputWrite4" style="width: 40%;">
				</div>
				<%--<div style="float: left; margin-left: 10px;" >
					<div id="autoEmail" class="pop_inputWrite4" ></div>
				</div>--%>
			</td>
		</tr>
	</table>

	<div class="pop_gridTitle" >
		<img alt="bullet" src="${pageContext.request.contextPath}/img/MainImg/customer_bullet.png"> 권한설정
	</div>
	<table style="border : 1px solid #989898;">
		<colgroup>
			<col width="15%">
			<col width="30%">
			<col width="15%">
			<col width="30%">
		</colgroup>
		<tr class="pop_grid">
			<td class="pop_gridSub">메인권한(*)</td>
			<td><div id="authMain" class="pop_inputWrite4" ></div></td>
			<td class="pop_gridSub">서브권한(*)</td>
			<td><div id="authSub" class="pop_inputWrite4" ></div></td>
		</tr>
	</table>



	<div style="text-align: center; margin-top: 10px; margin-bottom: 10px">
		<button id="pbtnUserAdd" type="button" class="p_btnPlus"></button>
		<button id="pbtnUserClose" type="button" class="p_btnClose"></button>
	</div>

</form>
<script>
	var duplicateYn = 'Y';
    function pwindow_init(params) {
        initDesign();

        $('#pbtnUserAdd').click(function () {
            userAdd();
        });

        $('#pbtnUserClose').click(function () {
            $('#pwindow').jqxWindow('close');
        });

        $('#checkDuplicate').click(function () {
            checkDuplicate();
        });


    }

    function initDesign(){
        //메인권한
        var authMain = new $.jqx.dataAdapter(
            { datatype: 'json', url: ctxPath + '/main/env/userConf/getAuthList.do' },
            { formatData : function(data) {$.extend(data, { 'authType': 'main' });  return data;		}}
        );
        $('#authMain').jqxDropDownList({ source: authMain, displayMember: 'codeName', valueMember: 'comCode2', width: '98%', height: 20, theme: jqxTheme, selectedIndex: 0, autoDropDownHeight: true })
		.on('change', function(event) {
            var authMainType = event.args.item.originalItem.comCode2;

            var authSub2 = new $.jqx.dataAdapter(
                { datatype: 'json', url: ctxPath + '/main/env/userConf/getAuthList.do' },
                { formatData : function(data) {$.extend(data, { 'authType': 'sub' , authMainType: authMainType });  return data;		}}
            );
            if(authMainType == 1){
                $('#authSub').jqxDropDownList('enableAt',0);
                $('#authSub').jqxDropDownList('disableAt',1);
                $('#authSub').jqxDropDownList('disableAt',2);

                $('#authSub').jqxDropDownList('selectedIndex',0);
            }else{
                $('#authSub').jqxDropDownList('disableAt',0);
                $('#authSub').jqxDropDownList('enableAt',1);
                $('#authSub').jqxDropDownList('enableAt',2);

                $('#authSub').jqxDropDownList('selectedIndex',1);
            }
            //$('#authSub').jqxDropDownList({ source: authSub2, displayMember: 'codeName', valueMember: 'comCode2', width: '98%', height: 20, theme: jqxTheme, selectedIndex: 0, autoDropDownHeight: true });
		});
        //서브권한
        var authSub = new $.jqx.dataAdapter(
            { datatype: 'json', url: ctxPath + '/main/env/userConf/getAuthList.do' },
            { formatData : function(data) {$.extend(data, { 'authType': 'sub' , authMainType: 1 });  return data;		}}
        );
        $('#authSub').jqxDropDownList({ source: authSub, displayMember: 'codeName', valueMember: 'comCode2', width: '98%', height: 20, theme: jqxTheme, selectedIndex: 0, autoDropDownHeight: true });

        $("#authSub").on('bindingComplete', function (event) {
            $('#authSub').jqxDropDownList('disableAt',1);
            $('#authSub').jqxDropDownList('disableAt',2);

            $('#authSub').jqxDropDownList('selectedIndex',0);
        });

        //소속기관
        HmDropDownBtn.createDeptTreeGrid($('#instCdArea'), $('#instCd'), 'area', '70%', 22, '98%', 350, null);

        $('.userYn').jqxDropDownList({ source: [
            {label: '예', value: 'Y'},
            {label: '아니오', value: 'N'},

        ],displayMember: 'label', valueMember: 'value', width: 100, height: 19, theme: jqxTheme, selectedIndex: 0, autoDropDownHeight: true })

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

        /*$('#autoEmail').jqxDropDownList({ source: [
            {label: '직접입력', value: 'self'},
            {label: '네이버', value: 'naver.com'},
            {label: '다음', value: 'daum.net'},
            {label: '구글', value: 'goole.com'}

        ],displayMember: 'label', valueMember: 'value', width: 150, height: 19, theme: jqxTheme, selectedIndex: 0, autoDropDownHeight: true })
		.on('change', function(event) {
            var value = event.args.item.value;
            if(value == 'self'){
                $("#emailAddr2").val(null);
			}else{
                $("#emailAddr2").val(value);
			}
        });*/

	}

	function checkDuplicate(){
        var _data = $("#userAddForm").serializeObject();

        if(_data.userId.isBlank()) {
            alert("아이디를 입력해주세요.");
            return false;
        }

		$.ajax({
			type: 'POST',
			url: ctxPath + '/main/env/userConf/getUserIdDuplicateCnt.do',
			data: { userId : _data.userId },
			success: function (data) {
				if(data.resultData > 0){
                    duplicateYn = 'Y'
                    alert("이미 사용중인 아이디입니다.")
					return false;
				}else{
                    duplicateYn = 'N';
                    alert("사용가능한 아이디입니다.")
                    return false;
				}
			}
		});
	}

	function userAdd() {
        if(!validateForm()) return;

        var _data = $("#userAddForm").serializeObject();
        _data.instCd = $("#dmgInstCd").val();

        if($("#dmgInstCd").val() == 1200000){ //지역정보개발원 선택시 user의 instCd는 110000(중앙센터로 세팅)
            _data.instCd = 1100000;
		}
        //사무실 전화번호
        if($("#offcTelNo2").val() != '' && $("#offcTelNo3").val() != ''){
            _data.offcTelNo = $("#offcTelNo1").val() + '-' + $("#offcTelNo2").val() + '-' + $("#offcTelNo3").val();
        }

        _data.moblPhnNo = $("#moblPhnNo1").val() + '-' + $("#moblPhnNo2").val() + '-' + $("#moblPhnNo3").val();

        _data.emailAddr = $("#emailAddr1").val() + '@' + $("#emailAddr2").val();

        //_data.roleSd = 10; //로그인 접근 권한 임시 하드코딩
		_data.authMain = 'AUTH_MAIN_' + $("#authMain").val(); 	//메인권한
		_data.authSub  = 'AUTH_SUB_' + $("#authSub").val();	//서브권한

        Server.post('/api/main/env/userConf/addUser', {
            data: _data,
            success: function(data) {
                alert("추가되었습니다.");
                $("#srchInstCd").val(null);
            	HmGrid.updateBoundData($userGrid, ctxPath + '/main/env/userConf/getUserConfList.do');
                $('#pwindow').jqxWindow('close');

            }
        });

    }

    function validateForm(){
        var _data = $("#userAddForm").serializeObject();
        var obj = _data.userId
        if(obj.isBlank()) {
            alert("아이디를 입력해주세요.");
            return false;
        }

        if(duplicateYn == 'Y'){
            alert("아이디 중복 체크를 해주세요");
            return false;
        }

        if($("#userName").val() == '') {
            alert("이름을 입력해주세요.");
            return false;
        }
        if($("#password").val() == '') {
            alert("비밀번호를 입력해주세요.");
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

        if($("#password").val() != $("#rePassword").val()) {
            alert("비밀번호가 일치하지 않습니다.");
            return false;
        }

        if($("#ipAddr").val() == '') {
            alert("IP를 입력해주세요.");
            return false;
        }

        if (!$.validateIp($("#ipAddr").val())) {
            alert("IP형식이 유효하지 않습니다.");
            obj.focus();
            return false;
        }

        if($("#moblPhnNo2").val() == '' || $("#moblPhnNo3").val() == '') {
            alert("휴대폰 번호를 입력해주세요.");
            return false;
        }

        if($("#emailAddr1").val() == '' || $("#emailAddr2").val() == '') {
            alert("이메일을 입력해주세요.");
            return false;
        }

        if($("#authSub").val() == null || $("#authSub").val() == ''){
            alert("권한을 선택해주세요.");
            return false;
		}
        return true;
    }
</script>