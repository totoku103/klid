<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="com.klid.webapp.common.SessionManager"%>
<%
//String auth = SessionManager.getUser().getAuth().toUpperCase();
String auth = "1";
%>
<!DOCTYPE html>
<html lang="ko">
<meta charset="UTF-8">
<title>사이버 침해대응시스템</title>
<%@include file="/inc/inc.jsp" %>
<script src="${pageContext.request.contextPath}/js/main/home/healthCheckUrl.js"></script>
<body>
<div id="header">
	<%@include file="/inc/header.jsp" %>
</div>
<div id="nav">
	<%@include file="/inc/nav.jsp" %>
</div>
<%if(auth.equals("SYSTEM") || auth.equals("ADMIN")) {%>
		<input type="hidden" id="auth" name="auth"  value="SYSTEM"/>
<%} %>
<div id="section">
	<div id="loc">
		<%@include file="/inc/loc.jsp" %>
	</div>
	<div class="newBox">
		<div class="searchBox">
			<div id="srchInstCdArea" class="pop_inputWrite4" style="margin-left: 5px;">
				<div id="srchInstTree" style="border: none;"></div>
<!-- 				<input type="hidden" id="pSrchInstCd" /> -->
				<input type="hidden" id="mainPageInstCd" value="${instCd}"/>
			</div>
			<div>
				<label>홈페이지명:</label>
				<input type="text" id="srchInstNm" style="width:120px" title="srchInstNm">
			</div>
			<div>
				<label>URL:</label>
				<input type="text" id="srchDomain" style="width:120px" title="srchDomain">
			</div>
			<div>
				<label style="float: left">장애여부 : </label>
				<div id="srchLastRes" class="pop_combo1"></div>
			</div>
			<div>
				<label style="float: left">구분 : </label>
				<div id="srchMoisYn" class="pop_combo1"></div>
			</div>
			<div>
				<label style="float: left">사용여부 : </label>
				<div id="srchUseYn" class="pop_combo1"></div>
			</div>
			<div>
				<label style="float: left">집중감시여부 : </label>
				<div id="srchCheckYn" class="pop_combo1"></div>
			</div>
			<div class="searchBtn">
				<button id="btnSearch" type="button" class="p_btn" ></button>
				<button id="btnExcel" type="button" class="p_btnExcel" ></button>
				<button id="btnExcelUpload" type="button" class="p_btnExcelUpload" ></button>
				<button id="btnAdd" type="button" class="p_btnPlus" style="display:none;"></button>
				<button id="btnDel" type="button" class="p_btnDel" style="display:none;"></button>
				<button id="btnWatchOn" type="button" class="p_btnWatchOn"></button>
				<button id="btnWatchOff" type="button" class="p_btnWatchOff"></button>
			</div>
		</div>
		<div class="scontent">
			<div class="contentsP10">
				<div id="grid"></div>
			</div>
		</div>
	</div>
	<div id="pwindow" style="position: absolute;">
		<div></div>
		<div></div>
	</div>
</div>
</body>
</html>