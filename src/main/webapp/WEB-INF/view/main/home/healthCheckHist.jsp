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
<script src="${pageContext.request.contextPath}/js/main/home/healthCheckHist.js"></script>
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
			<div>
				<label style="float: left">장애일시 : </label>
				<div id="cbPeriod" style="margin-left:0; margin-right:10px; float: left; " class="pop_combo1" ></div>
				<div id="date1" style="float: left" class="pop_combo1" ></div>
				<label style="float: left;">~</label>
				<div id="date2" style="float: left" class="pop_combo1" ></div>
			</div>
			<div id="srchInstCdArea" class="pop_inputWrite4" style="margin-left: 5px;">
				<div id="srchInstTree" style="border: none;"></div>
				<input type="hidden" id="srchInstCd" />
			</div>
			<div>
				<label>URL:</label>
				<input type="text" id="srchUrl" style="width:200px" title="srchUrl">
			</div>
			<div class="searchBtn">
				<button id="btnSearch" type="button" class="p_btn" ></button>
			</div>
			<div>
				<label>응답코드:</label>
				<%--<input type="text" id="srchResCd" style="width:100px" title="srchResCd">--%>
				<div id="srchResCd" class="pop_combo1"></div>
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
</form>
</body>
</html>