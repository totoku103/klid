<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
%>
<!DOCTYPE html>
<html>
<meta charset="UTF-8">
<title>사이버 침해대응시스템</title>
<%@include file="/inc/inc.jsp" %>
<script src="${pageContext.request.contextPath}/js/main/env/userAddrList.js"></script>
<body>
<div id="header">
	<%@include file="/inc/header.jsp" %>
</div>
<div id="nav">
	<%@include file="/inc/nav.jsp" %>
</div>
<form id="mainForm" name="mainForm" >
<input type="hidden" id="userId" name="userId" />
<div id="section">
	<div id="loc">
		<%@include file="/inc/loc.jsp" %>
	</div>
	<div class="newBox">
		<div class="searchBox">
			<div id="instCdArea" class="pop_inputWrite4" style="margin-left: 15px;">
				<div id="instCd" style="border: none;"></div>
				<input type="hidden" id="dmgInstCd" /> <%-- 선택된 instCd 값 저장 --%>
			</div>
			<div class="searchBtn">
				<button id="btnSearch" type="button" class="p_btn" ></button>
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