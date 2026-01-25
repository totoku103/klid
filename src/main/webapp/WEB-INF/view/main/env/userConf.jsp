<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="com.klid.webapp.common.SessionManager"%>
<!DOCTYPE html>
<html>
<meta charset="UTF-8">
<title>사이버 침해대응시스템</title>
<%@include file="/inc/inc.jsp" %>
<script src="${pageContext.request.contextPath}/js/main/env/userConf.js"></script>
<body>
<div id="header">
	<%@include file="/inc/header.jsp" %>
</div>
<div id="nav">
	<%@include file="/inc/nav.jsp" %>
</div>
<form id="mainForm" name="mainForm" >
<div id="section">
	<div id="loc">
		<%@include file="/inc/loc.jsp" %>
	</div>
	<div class="newBox">
		<div class="searchBox">
			<div id="srchInstCdArea" class="pop_inputWrite4" style="margin-left: 5px;">
				<div id="srchInstTree" style="border: none;"></div>
				<input type="hidden" id="srchInstCd" />
			</div>
			<div>
				<label>이름:</label>
				<input type="text" id="srchUserName" style="width:100px">
			</div>
			<div>
				<label>아이디:</label>
				<input type="text" id="srchUserId" style="width:100px">
			</div>
			<div>
				<label>사용여부:</label>
				<div id="srchUseYn" style="margin-left:5px;"></div>
			</div>

			<div class="searchBtn">
				<button id="btnSearch" type="button" class="p_btn" ></button>
				<button id="btnAdd" type="button" class="p_btnPlus"></button>
				<button id="btnDel" type="button" class="p_btnDel"></button>
			</div>
		</div>
		<div class="scontent">
			<div class="contentsP10">
				<div id="userGrid"></div>
			</div>
		</div>
	</div>
	<div id="pwindow" style="position: absolute;">
		<div></div>
		<div></div>
	</div>
</div>
</form>
</body>
</html>