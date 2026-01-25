<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="com.klid.common.AppGlobal"%>

<form id="commForm">
	<input type="hidden" id="ctxPath" value="${pageContext.request.contextPath}" />
	<input type="hidden" id="sUserId" value="${sessionScope.User.userId}" />
	<input type="hidden" id="sRoleCtrs" value="${sessionScope.User.roleCtrs}" />
	<input type="hidden" id="gSiteName" value="<%=AppGlobal.webSiteName%>">
	<input type="hidden" id="uploadFileLength" value="<%=AppGlobal.uploadSize%>">
	<input type="hidden" id="gUploadSize" value="<%=AppGlobal.uploadSize%>">
	<input type="hidden" id="sNcscUrl" value="<%=AppGlobal.ncscUrl%>">
	<input type="hidden" id="sUserName" value="${sessionScope.User.userName}" />
	<input type="hidden" id="sInstCd" value="${sessionScope.User.instCd}" />
	<input type="hidden" id="sLocalCd" value="${sessionScope.User.localCd}" />

	<input type="hidden" id="sInstLevel" value="${sessionScope.User.instLevel}" />
	<input type="hidden" id="sPntInstCd" value="${sessionScope.User.pntInstCd}" />

	<input type="hidden" id="sInstName" value="${sessionScope.User.instNm}" />

	<input type="hidden" id="sAuthMain" value="${sessionScope.User.authMain}" />
	<input type="hidden" id="sAuthSub" value="${sessionScope.User.authSub}" />

	<%--<input type="hidden" id="authNot" value="${sessionScope.authNot}" />
	<input type="hidden" id="authRes" value="${sessionScope.authRes}" />--%>
	<input type="hidden" id="authTbz01" value="${sessionScope.authTbz.roleTbz01}" />
	<input type="hidden" id="authTbz02" value="${sessionScope.authTbz.roleTbz02}" />
	<input type="hidden" id="authTbz03" value="${sessionScope.authTbz.roleTbz03}" />
	<input type="hidden" id="authTbz04" value="${sessionScope.authTbz.roleTbz04}" />
	<input type="hidden" id="authTbz05" value="${sessionScope.authTbz.roleTbz05}" />
	<input type="hidden" id="authTbz06" value="${sessionScope.authTbz.roleTbz06}" />

	<input type="hidden" id="authNot01" value="${sessionScope.authNot.roleNot01}" />
	<input type="hidden" id="authNot02" value="${sessionScope.authNot.roleNot02}" />
	<input type="hidden" id="authNot03" value="${sessionScope.authNot.roleNot03}" />
	<input type="hidden" id="authNot04" value="${sessionScope.authNot.roleNot04}" />

	<input type="hidden" id="authRes01" value="${sessionScope.authRes.roleRes01}" />
	<input type="hidden" id="authRes02" value="${sessionScope.authRes.roleRes02}" />
	<input type="hidden" id="authRes03" value="${sessionScope.authRes.roleRes03}" />
	<input type="hidden" id="authRes04" value="${sessionScope.authRes.roleRes04}" />

	<input type="hidden" id="authSha01" value="${sessionScope.authSha.roleSha01}" />
	<input type="hidden" id="authSha02" value="${sessionScope.authSha.roleSha02}" />
	<input type="hidden" id="authSha03" value="${sessionScope.authSha.roleSha03}" />
	<input type="hidden" id="authSha04" value="${sessionScope.authSha.roleSha04}" />

	<input type="hidden" id="authQna01" value="${sessionScope.authQna.roleQna01}" />
	<input type="hidden" id="authQna02" value="${sessionScope.authQna.roleQna02}" />
	<input type="hidden" id="authQna03" value="${sessionScope.authQna.roleQna03}" />
	<input type="hidden" id="authQna04" value="${sessionScope.authQna.roleQna04}" />

	<input type="hidden" id="cupidPort" value="28900" />
</form>
<form id="hForm"></form>
<iframe name="hFrame" title="hFrame" width="0" height="0" seamless="seamless" style="display: none"></iframe>

<div id="jqxNotification" style="z-index: 1000; display: none	">
	<div id="pushMsg">Push Message Notification!!!</div>
</div>

<script>
	// notification
	$("#jqxNotification").jqxNotification({
		width: 'auto', height: 100 , opacity: 0.9, autoOpen: false, template: 'info',
		closeOnClick: true, autoClose: false, blink: false, position: 'bottom-right'
	});

	//SMS
    var ip = location.hostname;
    var protocol = location.protocol;
    var serverURL = protocol + "//" + ip +  ":"+$("#cupidPort").val()+"/eventbus/";
	var crrUrl = window.location.href;
	console.log("WAS1");

	var options = {
        vertxbus_reconnect_attempts_max: Infinity, // Max reconnect attempts
        vertxbus_reconnect_delay_min: 1000, // Initial delay (in ms) before first reconnect attempt
        vertxbus_reconnect_delay_max: 5000, // Max delay (in ms) between reconnect attempts
        vertxbus_reconnect_exponent: 2, // Exponential backoff factor
        vertxbus_randomization_factor: 0.5, // Randomization factor between 0 and 1
        transports: [
		    "websocket", "xhr-streaming", "xdr-streaming", "xhr-polling", "xdr-polling", "iframe-htmlfile", "iframe-eventsource",
			"iframe-xhr-polling"
		]
    };
    var eb = new EventBus(serverURL, options);
    eb.enableReconnect(false);
	eb.onopen = function () {
        //console.log("connect");
		console.log("connect");
        eb.registerHandler("js."+$('#sUserId').val(), { id : $('#sUserId').val(), guid : 'sessionId', auth : $('#sAuthMain').val()}, function (err, msg) {
            //console.log("received :: " + JSON.stringify(msg.body));
			var message = "";
			$.each(msg.body,function(key,value) {
                message = value.receipt;
            });
            $.each(message,function(key,value) {
				if(key == "msg"){ //메시지내용

			        $("#pushMsg").text(value);
					if(crrUrl.indexOf("/webdash") == -1){ //대시보드가 아닐 경우에만 알림 팝업ON
                        $("#jqxNotification").jqxNotification('open');
                    }
				}
            });

        });
    };
    eb.onreconnect  = function () {
        console.log("reconnect");
    };
    eb.onclose = function() {
        console.log("closed");
    };
</script>