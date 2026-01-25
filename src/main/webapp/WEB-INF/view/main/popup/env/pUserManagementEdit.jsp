<%@ page import="com.klid.webapp.common.SessionManager" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/button-new.css">
<%@include file="/icons/icons.html" %>

<form id="userEditForm" name="userEditForm" action="" style="margin-bottom: 0px;">
    <input type="hidden" name="commUserSeq" id="commUserSeq"/>
    <input type="hidden" name="lastpwdmodified" id="lastpwdmodified"/>
    <input type="hidden" name="otpKey" id="otpKey"/>
    <input type="hidden" name="gpkiSerialNo" id="gpkiSerialNo"/>
    <input type="hidden" name="inactiveYn" id="inactiveYn"/>
    <input type="hidden" name="passResetYn" id="passResetYn"/>
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
                <input type="text" name="userId" id="userId" readonly="readonly" style="border: none;">
            </td>
            <td class="pop_gridSub">이름(*)</td>
            <td><input type="text" name="userName" id="userName" class="pop_inputWrite4" style="width: 70%;"></td>
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
            <td>
                <div name="useYn" id="useYn" class="pop_inputWrite4 userYn"></div>
            </td>
        </tr>
        <tr class="pop_grid">
            <td class="pop_gridSub">SMS 수신여부(*)</td>
            <td>
                <div name="smsYn" id="smsYn" class="pop_inputWrite4 userYn"></div>
            </td>
            <td class="pop_gridSub">로그인 IP(*)</td>
            <td colspan="3">
                <input type="text" name="ipAddr" id="ipAddr" class="pop_inputWrite4" style="width: 215px;"
                       onkeyup="this.value=this.value.replace(/[^0-9.]/g,'')">
            </td>
        </tr>
    </table>

    <div class="pop_gridTitle">
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
            <td style="text-align:initial;">
                <div id="moblPhnNo1" class="pop_inputWrite4 mobile" style="float: left; margin-right: 4px;"></div>
                -
                <input type="text" name="moblPhnNo2" id="moblPhnNo2" class="pop_inputWrite4" style="width: 60px;"
                       maxlength="4" onkeyup="this.value=this.value.replace(/[^0-9]/g,'')">
                -
                <input type="text" name="moblPhnNo3" id="moblPhnNo3" class="pop_inputWrite4" style="width: 60px;"
                       maxlength="4" onkeyup="this.value=this.value.replace(/[^0-9]/g,'')">
            </td>
            <td class="pop_gridSub">사무실 전화번호</td>
            <td style="text-align:initial;">
                <div id="offcTelNo1" class="pop_inputWrite4 area" style="float: left; margin-right: 4px;"></div>
                -
                <input type="text" id="offcTelNo2" class="pop_inputWrite4" style="width: 60px;" maxlength="4"
                       onkeyup="this.value=this.value.replace(/[^0-9]/g,'')">
                -
                <input type="text" id="offcTelNo3" class="pop_inputWrite4" style="width: 60px;" maxlength="4"
                       onkeyup="this.value=this.value.replace(/[^0-9]/g,'')">
            </td>
        </tr>
        <tr class="pop_grid">
            <td class="pop_gridSub ">이메일 주소(*)</td>
            <td colspan="3">
                <div style="float: left; width: 300px;">
                    <input type="text" name="emailAddr1" id="emailAddr1" class="pop_inputWrite4" style="width: 40%;">
                    @
                    <input type="text" name="emailAddr2" id="emailAddr2" class="pop_inputWrite4" style="width: 40%;">
                </div>
            </td>
        </tr>
    </table>

    <div class="pop_gridTitle">
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
            <td>
                <div id="authMain" class="pop_inputWrite4"></div>
            </td>
            <td class="pop_gridSub">서브권한(*)</td>
            <td>
                <div id="authSub" class="pop_inputWrite4"></div>
            </td>
        </tr>
    </table>

    <div class="pop_gridTitle">
        <img alt="bullet" src="${pageContext.request.contextPath}/img/MainImg/customer_bullet.png"> 요청 사유
    </div>
    <table style="border : 1px solid #989898;">
        <colgroup>
            <col width="15%">
            <col>
        </colgroup>
        <tr class="pop_grid">
            <td class="pop_gridSub">사유(*)</td>
            <td>
                <textarea id="request-reason" style="width: 100%; height: 100px; resize: none;" maxlength="2000"></textarea>
            </td>
        </tr>
    </table>

    <div style="width: 100%; height: 60px; display: flex; flex-direction: column; justify-content: center; align-items: center; margin-top: 10px;">
        <% if (SessionManager.getUser() != null
                && (SessionManager.getUser().getAuthMain().equalsIgnoreCase("AUTH_MAIN_2")
                && SessionManager.getUser().getAuthSub().equalsIgnoreCase("AUTH_SUB_3"))) { %>
        <div style="display: flex; flex-direction: row; align-items: center; gap: 5px;">
            <button id="btn-reset-password" type="button" class="btn-new" style="width: 120px">
                <svg>
                    <use href="#icon-refresh"></use>
                </svg>
                비밀번호 초기화
            </button>

            <button id="btn-reset-otp" type="button" class="btn-new" style="width: 120px">
                <svg>
                    <use href="#icon-refresh"></use>
                </svg>
                OTP 초기화
            </button>

            <button id="btn-reset-gpki" type="button" class="btn-new" style="width: 120px;">
                <svg>
                    <use href="#icon-refresh"></use>
                </svg>
                인증서 초기화
            </button>

            <button id="btn-reset-lock" type="button" class="btn-new" style="width: 120px; display: none;">
                <svg>
                    <use href="#icon-refresh"></use>
                </svg>
                계정 잠김 초기화
            </button>

            <button id="btn-reset-inactive" type="button" class="btn-new" style="width: 140px; display: none;">
                <svg>
                    <use href="#icon-refresh"></use>
                </svg>
                장기 미접속 초기화
            </button>
        </div>
        <% }%>

        <div style="display: flex; flex-direction: row; align-items: center; margin-top: 5px; gap: 5px;">
            <% if (SessionManager.getUser() != null
                    && (SessionManager.getUser().getAuthMain().equalsIgnoreCase("AUTH_MAIN_2")
                    && SessionManager.getUser().getAuthSub().equalsIgnoreCase("AUTH_SUB_3"))) { %>
            <button id="btn-save" type="button" class="btn-new">
                <svg>
                    <use href="#icon-save"></use>
                </svg>
                저장
            </button>
            <% } %>

            <button id="btn-close" type="button" class="btn-new">
                <svg>
                    <use href="#icon-close"></use>
                </svg>
                닫기
            </button>
        </div>
    </div>

</form>
<script>
    function pwindow_init(params) {
        initDesign(params);
        initData(params);

        //  1
        $('#btn-reset-password').click(function () {
            requestPasswordReset()
        });

        $('#btn-reset-otp').click(function () {
            requestOtpReset()
        })

        $('#btn-reset-gpki').click(function () {
            requestGpkiReset();
        })

        $('#btn-reset-lock').click(function () {
            requestAccountLockReset();
        })

        $('#btn-reset-inactive').click(function () {
            requestInactiveReset();
        })

        // 2
        $('#btn-save').click(function () {
            requestUpdateUserInfo();
        })
        $('#btn-close').click(function () {
            $('#pwindow').jqxWindow('close');
        })
    }

    function toKSTISOString(datetimeStr) {
        const d = new Date(datetimeStr.replace(" ", "T"));

        const offsetMinutes = 9 * 60;
        const kst = new Date(d.getTime() + offsetMinutes * 60 * 1000);
        return kst.toISOString().replace("Z", "+09:00");
    }

    function initData(params) {
        Server.post('/api/main/env/userConf/getUserInfo', {
            data: {userId: params.userId},
            success: function (jsonData) {
                console.log(jsonData)
                var contents = jsonData.contents;
                $("#commUserSeq").val(contents.seq);
                $("#otpKey").val(contents.otpKey);
                $("#gpkiSerialNo").val(contents.gpkiSerialNo);
                $("#inactiveYn").val(contents.inactiveYn);
                $("#passResetYn").val(contents.passResetYn);

                const lastpwdmodified = toKSTISOString(contents.lastpwdmodified);
                $("#lastpwdmodified").val(lastpwdmodified);
                $("#userId").val(contents.userId);
                $("#userName").val(contents.userName);
                $("#dmgInstCd").val(contents.instCd);
                $("#instCd").val(contents.instCd);
                $("#grade").val(contents.grade);
                $('#useYn').val(contents.useYn);
                $('#smsYn').val(contents.smsYn);
                $('#ipAddr').val(contents.ipAddr);

                if (contents.lockYn === 'Y') { //해당 사용자의 계정이 잠겨 있을때 해제 버튼 활성화
                    $("#btn-reset-lock").css("display", "");
                }

                if (contents.inactiveYn === 'Y') {
                    $('#btn-reset-inactive').css("display", "");
                }
                if (contents.offcTelNo != null) {
                    var offcTelNo = contents.offcTelNo.split("-");
                    $("#offcTelNo1").val(offcTelNo[0])
                    $("#offcTelNo2").val(offcTelNo[1])
                    $("#offcTelNo3").val(offcTelNo[2])
                }

                if (contents.offcFaxNo != null) {
                    var offcFaxNo = contents.offcFaxNo.split("-");
                    $("#offcFaxNo1").val(offcFaxNo[0])
                    $("#offcFaxNo2").val(offcFaxNo[1])
                    $("#offcFaxNo3").val(offcFaxNo[2])
                }

                if (contents.homeTelNo != null) {
                    var homeTelNo = contents.homeTelNo.split("-");
                    $("#homeTelNo1").val(homeTelNo[0])
                    $("#homeTelNo2").val(homeTelNo[1])
                    $("#homeTelNo3").val(homeTelNo[2])
                }

                if (contents.moblPhnNo != null) {
                    var moblPhnNo = contents.moblPhnNo.split("-");
                    $("#moblPhnNo1").val(moblPhnNo[0])
                    $("#moblPhnNo2").val(moblPhnNo[1])
                    $("#moblPhnNo3").val(moblPhnNo[2])
                }

                if (contents.emailAddr != null) {
                    var emailAddr = contents.emailAddr.split("@");
                    $("#emailAddr1").val(emailAddr[0])
                    $("#emailAddr2").val(emailAddr[1])
                }
                if (contents.authMain == 'AUTH_MAIN_1') {
                    $("#authMain").val(1);
                } else if (contents.authMain == 'AUTH_MAIN_2') {
                    $("#authMain").val(2);
                } else if (contents.authMain == 'AUTH_MAIN_3') {
                    $("#authMain").val(3);
                } else if (contents.authMain == 'AUTH_MAIN_4') {
                    $("#authMain").val(4);
                } else {
                    $("#authMain").val(2);
                }
                if (contents.authSub == 'AUTH_SUB_1') {
                    $("#authSub").val(1);
                    $('#authSub').jqxDropDownList('disableAt', 1)
                    $('#authSub').jqxDropDownList('disableAt', 2)
                } else if (contents.authSub == 'AUTH_SUB_2') {
                    $("#authSub").val(2);
                    $('#authSub').jqxDropDownList('disableAt', 0)
                } else {
                    $("#authSub").val(3);
                    $('#authSub').jqxDropDownList('disableAt', 0)
                }
            }
        });
    }

    function initDesign(params) {
        var authMain = new $.jqx.dataAdapter(
            {datatype: 'json', url: ctxPath + '/main/env/userConf/getAuthList.do'},
            {
                formatData: function (data) {
                    $.extend(data, {'authType': 'main'});
                    return data;
                }
            }
        );
        $('#authMain').jqxDropDownList({
            source: authMain,
            displayMember: 'codeName',
            valueMember: 'comCode2',
            width: '98%',
            height: 20,
            theme: jqxTheme,
            selectedIndex: 0,
            autoDropDownHeight: true
        })
            .on('change', function (event) {
                var authMainType = event.args.item.originalItem.comCode2;
                var authSub2 = new $.jqx.dataAdapter(
                    {datatype: 'json', url: ctxPath + '/main/env/userConf/getAuthList.do'},
                    {
                        formatData: function (data) {
                            $.extend(data, {'authType': 'sub', authMainType: authMainType});
                            return data;
                        }
                    }
                );
                if (authMainType == 1) {
                    $('#authSub').jqxDropDownList('enableAt', 0);
                    $('#authSub').jqxDropDownList('disableAt', 1);
                    $('#authSub').jqxDropDownList('disableAt', 2);

                    $('#authSub').jqxDropDownList('selectedIndex', 0);
                } else {
                    $('#authSub').jqxDropDownList('disableAt', 0);
                    $('#authSub').jqxDropDownList('enableAt', 1);
                    $('#authSub').jqxDropDownList('enableAt', 2);

                    $('#authSub').jqxDropDownList('selectedIndex', 1);
                }

            });

        //서브권한
        var authSub = new $.jqx.dataAdapter(
            {datatype: 'json', url: ctxPath + '/main/env/userConf/getAuthList.do'},
            {
                formatData: function (data) {
                    $.extend(data, {'authType': 'sub', authMainType: 1});
                    return data;
                }
            }
        );
        $('#authSub').jqxDropDownList({
            source: authSub,
            displayMember: 'codeName',
            valueMember: 'comCode2',
            width: '98%',
            height: 20,
            autoDropDownHeight: true
        });

        var instParams = {
            instCd: params.instCd,
            instNm: params.instNm
        }
        HmDropDownBtn.createDeptTreeGrid($('#instCdArea'), $('#instCd'), 'area', '70%', 22, '98%', 350, null, instParams)

        $('.userYn').jqxDropDownList({
            source: [
                {label: '예', value: 'Y'},
                {label: '아니오', value: 'N'},

            ],
            displayMember: 'label',
            valueMember: 'value',
            width: 100,
            height: 19,
            theme: jqxTheme,
            selectedIndex: 0,
            autoDropDownHeight: true
        })

        $('.area').jqxDropDownList({
            source: [
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
            ],
            displayMember: 'label',
            valueMember: 'value',
            width: 50,
            height: 19,
            theme: jqxTheme,
            selectedIndex: 0,
            autoDropDownHeight: false
        });

        $('.mobile').jqxDropDownList({
            source: [{label: '010', value: '010'}, {label: '011', value: '011'}, {
                label: '016',
                value: '016'
            }, {label: '017', value: '017'}, {label: '018', value: '018'}, {label: '019', value: '019'}],
            displayMember: 'label',
            valueMember: 'value',
            width: 50,
            height: 19,
            theme: jqxTheme,
            selectedIndex: 0,
            autoDropDownHeight: true
        });
    }

    function getUserData() {
        const _data = $("#userEditForm").serializeObject();
        _data.instCd = $("#dmgInstCd").val();

        if (Number($("#dmgInstCd").val()) === 1200000) {
            //지역정보개발원 선택시 user의 instCd는 110000(중앙센터로 세팅)
            _data.instCd = 1100000;
        }

        //사무실 전화번호
        if ($("#offcTelNo2").val() != '' && $("#offcTelNo3").val() != '') {
            _data.offcTelNo = $("#offcTelNo1").val() + '-' + $("#offcTelNo2").val() + '-' + $("#offcTelNo3").val();
        }

        _data.moblPhnNo = $("#moblPhnNo1").val() + '-' + $("#moblPhnNo2").val() + '-' + $("#moblPhnNo3").val();

        _data.emailAddr = $("#emailAddr1").val() + '@' + $("#emailAddr2").val();

        _data.authMain = 'AUTH_MAIN_' + $("#authMain").val();	//메인권한
        _data.authSub = 'AUTH_SUB_' + $("#authSub").val();		//서브권한
        return _data;
    }

    function requestUpdateUserInfo() {
        if (!validateForm()) return;
        if (!validateReason()) return;

        const param = {
            userInfo: getUserData(),
            requestReason: $('#request-reason').val().trim()
        }

        const url = "/main/env/user-management/request/modify.do"
        fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(param),
        })
            .then(res => res.json())
            .then(data => {
                if (data?.hasError) {
                    if (data.errorInfo.code === '200') {
                        alert(data.errorInfo.message);
                        return false;
                    } else throw new Error(data.errorInfo.message);
                } else {
                    alert("요청이 완료되었습니다.");
                }
                return true;
            })
            .then(result => {
                if (result) {
                    $("#srchInstCd").val(null);
                    HmGrid.updateBoundData($userGrid, ctxPath + '/main/env/userConf/getUserConfList.do');
                    $('#pwindow').jqxWindow('close');
                }
            })
            .catch(err => alert(err.message));
    }

    function requestPasswordReset() {
        if (!validateReason()) return;
        if (!confirm("비밀번호를 초기화 하시겠습니까?")) return;
        const commUserSeq = document.getElementById("commUserSeq").value;
        const requestReason = document.getElementById("request-reason").value;

        const url = "/main/env/user-management/request/reset/password.do"
        fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                commUserSeq: commUserSeq,
                requestReason: requestReason
            }),
        })
            .then(res => res.json())
            .then(data => {
                if (data?.hasError) {
                    if (data.errorInfo.code === '200') {
                        alert(data.errorInfo.message);
                        return false;
                    } else throw new Error(data.errorInfo.message);
                } else {
                    alert("요청이 완료되었습니다.");
                }
                return true;
            })
            .then(result => {
                if (result) {
                    $("#srchInstCd").val(null);
                    HmGrid.updateBoundData($userGrid, ctxPath + '/main/env/userConf/getUserConfList.do');
                    $('#pwindow').jqxWindow('close');
                }
            })
            .catch(err => alert(err.message));
    }

    function requestOtpReset() {
        if (!validateReason()) return;
        if (!confirm("OTP를 초기화 하시겠습니까?")) return;
        const commUserSeq = document.getElementById("commUserSeq").value;
        const requestReason = document.getElementById("request-reason").value;

        const url = "/main/env/user-management/request/reset/otp.do"
        fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                commUserSeq: commUserSeq,
                requestReason: requestReason
            }),
        })
            .then(res => res.json())
            .then(data => {
                if (data?.hasError) {
                    if (data.errorInfo.code === '200') {
                        alert(data.errorInfo.message);
                        return false;
                    } else throw new Error(data.errorInfo.message);
                } else {
                    alert("요청이 완료되었습니다.");
                }
                return true;
            })
            .then(result => {
                if (result) {
                    $("#srchInstCd").val(null);
                    HmGrid.updateBoundData($userGrid, ctxPath + '/main/env/userConf/getUserConfList.do');
                    $('#pwindow').jqxWindow('close');
                }
            })
            .catch(err => alert(err.message));
    }

    function requestGpkiReset() {
        if (!validateReason()) return;
        if (!confirm("인증서를 초기화 하시겠습니까?")) return;
        const commUserSeq = document.getElementById("commUserSeq").value;
        const requestReason = document.getElementById("request-reason").value;

        const url = "/main/env/user-management/request/reset/gpki.do"
        fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                commUserSeq: commUserSeq,
                requestReason: requestReason
            }),
        })
            .then(res => res.json())
            .then(data => {
                if (data?.hasError) {
                    if (data.errorInfo.code === '200') {
                        alert(data.errorInfo.message);
                        return false;
                    } else throw new Error(data.errorInfo.message);
                } else {
                    alert("요청이 완료되었습니다.");
                }
                return true;
            })
            .then(result => {
                if (result) {
                    $("#srchInstCd").val(null);
                    HmGrid.updateBoundData($userGrid, ctxPath + '/main/env/userConf/getUserConfList.do');
                    $('#pwindow').jqxWindow('close');
                }
            })
            .catch(err => alert(err.message));
    }

    function requestAccountLockReset() {
        if (!validateReason()) return;
        if (!confirm("계정 잠김 해제를 하시겠습니까?")) return;
        const commUserSeq = document.getElementById("commUserSeq").value;
        const requestReason = document.getElementById("request-reason").value;

        const url = "/main/env/user-management/request/reset/account-lock.do"
        fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                commUserSeq: commUserSeq,
                requestReason: requestReason
            }),
        })
            .then(res => res.json())
            .then(data => {
                if (data?.hasError) {
                    if (data.errorInfo.code === '200') {
                        alert(data.errorInfo.message);
                        return false;
                    } else throw new Error(data.errorInfo.message);
                } else {
                    alert("요청이 완료되었습니다.");
                }
                return true;
            })
            .then(result => {
                if (result) {
                    $("#srchInstCd").val(null);
                    HmGrid.updateBoundData($userGrid, ctxPath + '/main/env/userConf/getUserConfList.do');
                    $('#pwindow').jqxWindow('close');
                }
            })
            .catch(err => alert(err.message));
    }

    function requestInactiveReset() {
        if (!validateReason()) return;
        if (!confirm("장기 미접속자 해제를 하시겠습니까?")) return;
        const commUserSeq = document.getElementById("commUserSeq").value;
        const requestReason = document.getElementById("request-reason").value;

        const url = "/main/env/user-management/request/reset/inactive.do"
        fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                commUserSeq: commUserSeq,
                requestReason: requestReason
            }),
        })
            .then(res => res.json())
            .then(data => {
                if (data?.hasError) {
                    if (data.errorInfo.code === '200') {
                        alert(data.errorInfo.message);
                        return false;
                    } else throw new Error(data.errorInfo.message);
                } else {
                    alert("요청이 완료되었습니다.");
                }
                return true;
            })
            .then(result => {
                if (result) {
                    $("#srchInstCd").val(null);
                    HmGrid.updateBoundData($userGrid, ctxPath + '/main/env/userConf/getUserConfList.do');
                    $('#pwindow').jqxWindow('close');
                }
            })
            .catch(err => alert(err.message));
    }

    function isBlank(str) {
        return str === null
            || str === undefined
            || str === '';
    }

    function validateForm() {
        const _data = $("#userEditForm").serializeObject();

        if (isBlank(_data.userName)) {
            alert("이름을 입력해주세요.");
            return false;
        }

        const ipAddr = $("#ipAddr").val()
        if (isBlank(ipAddr)) {
            alert("IP를 입력해주세요.");
            return false;
        }

        if (!$.validateIp(ipAddr)) {
            alert("IP형식이 유효하지 않습니다.");
            return false;
        }

        const mobilePhoneNo2 = $("#moblPhnNo2").val();
        const mobilePhoneNo3 = $("#moblPhnNo3").val();
        if (isBlank(mobilePhoneNo2) || isBlank(mobilePhoneNo3)) {
            alert("휴대폰 번호를 입력해주세요.");
            return false;
        }

        const emailAddr1 = _data.emailAddr1;
        const emailAddr2 = _data.emailAddr2;
        if (isBlank(emailAddr1) || isBlank(emailAddr2)) {
            alert("이메일을 입력해주세요.");
            return false;
        }

        const authMain = $("#authMain").val();
        const authSub = $("#authSub").val();
        if (isBlank(authMain) || isBlank(authSub)) {
            alert("권한을 선택해주세요.");
            return false;
        }

        return true;
    }

    function validateReason() {
        const reasonElement = document.getElementById('request-reason');
        if (String(reasonElement.value).trim().length === 0) {
            alert("사유를 입력하세요.")
            return false
        }
        return true
    }

</script>