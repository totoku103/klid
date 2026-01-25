<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<style>
	.p_btnOtpReset{width: 123px; height:23px; background: url(/img/Btn/btnOtpReset.png) no-repeat 0px 0px;}
	.p_btnOtpReset:hover,.p_btnOtpReset:active{width: 123px; height:23px; background: url(/img/Btn/btnOtpReset.png) no-repeat 0px -23px;}
</style>
<form id="userEditForm" name="userEditForm" action="">
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
				<input type="text"  name="userId" id="userId"  readonly="readonly" style="border: none;">
			</td>
			<td class="pop_gridSub">이름(*)</td>
			<td><input type="text" name="userName" id="userName"  class="pop_inputWrite4" style="width: 70%;"></td>
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
			<td><div name="useYn" id="useYn" class="pop_inputWrite4 userYn" ></div></td>
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
				<input type="text"  name="moblPhnNo2" id="moblPhnNo2"  class="pop_inputWrite4" style="width: 60px;" maxlength="4" onkeyup="this.value=this.value.replace(/[^0-9]/g,'')">
				-
				<input type="text"  name="moblPhnNo3" id="moblPhnNo3"  class="pop_inputWrite4" style="width: 60px;" maxlength="4" onkeyup="this.value=this.value.replace(/[^0-9]/g,'')">
			</td>
			<td class="pop_gridSub">사무실 전화번호</td>
			<td  style="text-align:initial;">
				<div id="offcTelNo1" class="pop_inputWrite4 area" style="float: left; margin-right: 4px;"></div>
				-
				<input type="text"  id="offcTelNo2"  class="pop_inputWrite4" style="width: 60px;" maxlength="4" onkeyup="this.value=this.value.replace(/[^0-9]/g,'')">
				-
				<input type="text"  id="offcTelNo3"  class="pop_inputWrite4" style="width: 60px;" maxlength="4" onkeyup="this.value=this.value.replace(/[^0-9]/g,'')">
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
				<input type="text"  id="moblPhnNo2"  class="pop_inputWrite4" style="width: 40px;">
				-
				<input type="text"  id="moblPhnNo3"  class="pop_inputWrite4" style="width: 40px;">
			</td>
			<td class="pop_gridSub">자택 전화번호</td>
			<td  style="text-align:initial;">
				<div id="homeTelNo1" class="pop_inputWrite4 area" style="float: left; margin-right: 4px;"></div>
				-
				<input type="text"  id="homeTelNo2"  class="pop_inputWrite4" style="width: 40px;">
				-
				<input type="text"  id="homeTelNo3"  class="pop_inputWrite4" style="width: 40px;">
			</td>
		</tr>
		<tr class="pop_grid">
			<td class="pop_gridSub">이메일 수신여부</td>
			<td><div id="emaiYn" class="pop_inputWrite4 userYn" ></div></td>
			<td class="pop_gridSub">SMS 수신여부</td>
			<td><div id="smsYn" class="pop_inputWrite4 userYn" ></div></td>
		</tr>--%>
		<tr class="pop_grid">
			<td class="pop_gridSub ">이메일 주소(*)</td>
			<td colspan="3">
				<div style="float: left; width: 300px;">
					<input type="text" name="emailAddr1" id="emailAddr1"  class="pop_inputWrite4" style="width: 40%;">
					@
					<input type="text" name="emailAddr2" id="emailAddr2"  class="pop_inputWrite4" style="width: 40%;">
				</div>
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
		<button id="pbtnUserEdit" type="button" class="p_btnSave"></button>
		<button id="pbtnUserClose" type="button" class="p_btnClose"></button>
		<button id="pbtnPassReset" type="button" class="p_btnReset"></button>
		<button id="pbtnOtpReset" type="button" class="p_btnOtpReset"></button>
		<button id="pbtnLockReset" type="button" class="p_btnUnlock" style="display: none"></button>
	</div>

</form>
<script>
    function pwindow_init(params) {
        initDesign(params);
        initData(params);

        $('#pbtnUserEdit').click(function () {
            userEdit();
        });
        $('#pbtnPassReset').click(function () {
			userPassReset();
        });
        $('#pbtnLockReset').click(function () {
            pbtnLockReset();
        });
        $('#pbtnUserClose').click(function () {
            $('#pwindow').jqxWindow('close');
        });
        $('#pbtnOtpReset').click(function () {
            otpReset();
        });

    }

    function initData(params){
        Server.post('/api/main/env/userConf/getUserInfo', {
            data: {userId : params.userId},
            success: function(jsonData) {
                console.log(jsonData)
                var contents = jsonData.contents;
                $("#userId").val(contents.userId);
                $("#userName").val(contents.userName);
                $("#dmgInstCd").val(contents.instCd);
                $("#instCd").val(contents.instCd);
                $("#grade").val(contents.grade);
                $('#useYn').val(contents.useYn);
                $('#smsYn').val(contents.smsYn);
                $('#ipAddr').val(contents.ipAddr);

                if(contents.lockYn == 'Y'){ //해당 사용자의 계정이 잠겨 있을때 해제 버튼 활성화
                    $("#pbtnLockReset").css("display", "inline");
                }
                if(contents.offcTelNo != null){
                    var offcTelNo = contents.offcTelNo.split("-");
                    $("#offcTelNo1").val(offcTelNo[0])
                    $("#offcTelNo2").val(offcTelNo[1])
                    $("#offcTelNo3").val(offcTelNo[2])
                }

                if(contents.offcFaxNo != null){
                    var offcFaxNo = contents.offcFaxNo.split("-");
                    $("#offcFaxNo1").val(offcFaxNo[0])
                    $("#offcFaxNo2").val(offcFaxNo[1])
                    $("#offcFaxNo3").val(offcFaxNo[2])
                }

                if(contents.homeTelNo != null){
                    var homeTelNo = contents.homeTelNo.split("-");
                    $("#homeTelNo1").val(homeTelNo[0])
                    $("#homeTelNo2").val(homeTelNo[1])
                    $("#homeTelNo3").val(homeTelNo[2])
                }

                if(contents.moblPhnNo != null){
                    var moblPhnNo = contents.moblPhnNo.split("-");
                    $("#moblPhnNo1").val(moblPhnNo[0])
                    $("#moblPhnNo2").val(moblPhnNo[1])
                    $("#moblPhnNo3").val(moblPhnNo[2])
                }

                if(contents.emailAddr != null){
                    var emailAddr = contents.emailAddr.split("@");
                    $("#emailAddr1").val(emailAddr[0])
                    $("#emailAddr2").val(emailAddr[1])
                }
                if(contents.authMain == 'AUTH_MAIN_1'){
                    $("#authMain").val(1);
                }else if(contents.authMain == 'AUTH_MAIN_2'){
                    $("#authMain").val(2);
                }else if(contents.authMain == 'AUTH_MAIN_3'){
                    $("#authMain").val(3);
                }else if(contents.authMain == 'AUTH_MAIN_4'){
                    $("#authMain").val(4);
                }
                else{
                    $("#authMain").val(2);
                }
                if(contents.authSub == 'AUTH_SUB_1'){
                    $("#authSub").val(1);
                    $('#authSub').jqxDropDownList('disableAt',1)
                    $('#authSub').jqxDropDownList('disableAt',2)
                }else if(contents.authSub == 'AUTH_SUB_2'){
                    $("#authSub").val(2);
                    $('#authSub').jqxDropDownList('disableAt',0)
                }else{
                    $("#authSub").val(3);
                    $('#authSub').jqxDropDownList('disableAt',0)
                }
            }
        });

        /*$.ajax({
            type: "post",
            url: $('#ctxPath').val() + '/main/env/userConf/getDetailUser.do',
            data: { userId : params.userId },
            dataType: "json",
            success: function (jsonData) {
                var contents = jsonData.resultData.contents;
                $("#userId").val(contents.userId);
                $("#userName").val(contents.userName);
                $("#dmgInstCd").val(contents.instCd);
                $("#instCd").val(contents.instCd);
                $("#grade").val(contents.grade);
                $('#useYn').val(contents.useYn);
                $('#smsYn').val(contents.smsYn);
                $('#ipAddr').val(contents.ipAddr);

                if(contents.lockYn == 'Y'){ //해당 사용자의 계정이 잠겨 있을때 해제 버튼 활성화
                    $("#pbtnLockReset").css("display", "inline");
				}
                if(contents.offcTelNo != null){
                    var offcTelNo = contents.offcTelNo.split("-");
                    $("#offcTelNo1").val(offcTelNo[0])
					$("#offcTelNo2").val(offcTelNo[1])
					$("#offcTelNo3").val(offcTelNo[2])
				}

                if(contents.offcFaxNo != null){
                    var offcFaxNo = contents.offcFaxNo.split("-");
                    $("#offcFaxNo1").val(offcFaxNo[0])
                    $("#offcFaxNo2").val(offcFaxNo[1])
                    $("#offcFaxNo3").val(offcFaxNo[2])
                }

                if(contents.homeTelNo != null){
                    var homeTelNo = contents.homeTelNo.split("-");
                    $("#homeTelNo1").val(homeTelNo[0])
                    $("#homeTelNo2").val(homeTelNo[1])
                    $("#homeTelNo3").val(homeTelNo[2])
                }

                if(contents.moblPhnNo != null){
                    var moblPhnNo = contents.moblPhnNo.split("-");
                    $("#moblPhnNo1").val(moblPhnNo[0])
                    $("#moblPhnNo2").val(moblPhnNo[1])
                    $("#moblPhnNo3").val(moblPhnNo[2])
                }

                if(contents.emailAddr != null){
                    var emailAddr = contents.emailAddr.split("@");
                    $("#emailAddr1").val(emailAddr[0])
                    $("#emailAddr2").val(emailAddr[1])
                }
                if(contents.authMain == 'AUTH_MAIN_1'){
                    $("#authMain").val(1);
				}else if(contents.authMain == 'AUTH_MAIN_2'){
                    $("#authMain").val(2);
                }else if(contents.authMain == 'AUTH_MAIN_3'){
                    $("#authMain").val(3);
                }else if(contents.authMain == 'AUTH_MAIN_4'){
                    $("#authMain").val(4);
                }
                else{
                    $("#authMain").val(2);
				}
                if(contents.authSub == 'AUTH_SUB_1'){
                    $("#authSub").val(1);
                    $('#authSub').jqxDropDownList('disableAt',1)
                    $('#authSub').jqxDropDownList('disableAt',2)
                }else if(contents.authSub == 'AUTH_SUB_2'){
                    $("#authSub").val(2);
                    $('#authSub').jqxDropDownList('disableAt',0)
                }else{
                    $("#authSub").val(3);
                    $('#authSub').jqxDropDownList('disableAt',0)
                }
            }
        });*/
	}

    function initDesign(params){
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

                //$('#authSub').jqxDropDownList('source',authSub2)
                //$('#authSub').jqxDropDownList({ source: authSub2, displayMember: 'codeName', valueMember: 'comCode2', width: '98%', height: 20, selectedIndex: 1,autoDropDownHeight: true });
            });

        //서브권한
        var authSub = new $.jqx.dataAdapter(
            { datatype: 'json', url: ctxPath + '/main/env/userConf/getAuthList.do' },
            { formatData : function(data) {$.extend(data, { 'authType': 'sub' , authMainType: 1 });  return data;		}}
        );
        $('#authSub').jqxDropDownList({ source: authSub, displayMember: 'codeName', valueMember: 'comCode2', width: '98%', height: 20, autoDropDownHeight: true });

        var instParams = {
            instCd : params.instCd,
			instNm : params.instNm
		}
        HmDropDownBtn.createDeptTreeGrid($('#instCdArea'), $('#instCd'), 'area', '70%', 22, '98%', 350, null, instParams)

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

        ],displayMember: 'label', valueMember: 'value', width: 150, height: 19, theme: jqxTheme, selectedIndex: 0, autoDropDownHeight: false })
		.on('change', function(event) {
            var value = event.args.item.value;
            if(value == 'self'){
                $("#emailAddr2").val(null);
			}else{
                $("#emailAddr2").val(value);
			}
        });*/

	}

	function userEdit() {
        if(!validateForm()) return;

        var _data = $("#userEditForm").serializeObject();
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

        _data.authMain = 'AUTH_MAIN_' + $("#authMain").val();	//메인권한
        _data.authSub  = 'AUTH_SUB_' + $("#authSub").val();		//서브권한

        console.log(_data)
        Server.post('/api/main/env/userConf/editUser', {
            data: _data,
            success: function(data) {
                alert("수정되었습니다.");
                $("#srchInstCd").val(null);
                Main.search();
                $('#pwindow').jqxWindow('close');
            }
        });

    }

    //비밀번호 초기화
    function userPassReset(){
        var _data = $("#userEditForm").serializeObject();
		var userId = _data.userId;

        if( confirm("비밀번호를 초기화 하시겠습니까?") ){
            Server.post('/api/main/env/userConf/userPassReset', {
                data: { userId: userId },
                success: function(data) {
					alert("초기화 되었습니다.")
                }
            });
        }
    };

    //계정잠김 해제 , 실패카운트 초기화
    function pbtnLockReset(){
        var _data = $("#userEditForm").serializeObject();
        var userId = _data.userId;

        if( confirm("계정 잠김 해제를 하시겠습니까?") ){
            Server.post('/api/main/env/userConf/userLockReset', {
                data: { userId: userId , resetType: 'LOCK'},
                success: function(data) {
                    alert("수정 되었습니다.")
                }
            });
        }
    };

    function validateForm(){
        var _data = $("#userEditForm").serializeObject();

		if(_data.userName == '') {
            alert("이름을 입력해주세요.");
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

        if($("#moblPhnNo2").val() == null || $("#moblPhnNo3").val() == ''){
            alert("휴대폰 번호를 입력해주세요.");
            return false;
        }

        if(_data.emailAddr1 =='' || _data.emailAddr2 =='') {
            alert("이메일을 입력해주세요.");
            return false;
        }

        if($("#authSub").val() == null || $("#authSub").val() == ''){
            alert("권한을 선택해주세요.");
            return false;
        }


        return true;
    }

    function otpReset() {
        var _data = $("#userEditForm").serializeObject();
        var userId = _data.userId;
		if( confirm("해당 사용자의 OTP 설정 KEY를 초기화 하시겠습니까?") ){
            Server.post('/api/main/env/userConf/userLockReset', {
                data: { userId: userId , resetType: 'OTP'},
                success: function(data) {
                    alert("수정 되었습니다.")
                }
            });
        }
    }
</script>