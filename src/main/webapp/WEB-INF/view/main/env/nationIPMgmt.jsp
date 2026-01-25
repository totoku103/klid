<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="com.klid.webapp.common.SessionManager"%>
<!DOCTYPE html>
<html lang="ko">
<meta charset="UTF-8">
<title>사이버 침해대응시스템</title>
<%@include file="/inc/inc.jsp" %>
<script src="${pageContext.request.contextPath}/js/main/env/nationIPMgmt.js"></script>
<body>
<div id="header">
	<%@include file="/inc/header.jsp" %>
</div>
<div id="nav">
	<%@include file="/inc/nav.jsp" %>
</div>
<div id="section">
	<div id="loc">
		<%@include file="/inc/loc.jsp" %>
	</div>
	<div class="newBox">
		<div class="searchBox">
			<div>
				<label style="float: left">국가명 : </label>
				<input type="text" id="sNationNm" title="sNationNm">
			</div>
			<div style="margin-left: 15px; display: none;">
				* 국가별 IP 대역 파일은
	              <span style="color:blue;"> http://www.maxmind.com/download/geoip/database/</span>
	                            에서 다운로드할 수 있습니다. (GeolPCountryWhois.csv)
			</div>
			<div class="searchBtn">
				<button id="btnSearch" type="button" class="p_btn" ></button>
				<button id="btnModify" type="button" class="p_btnAdj"></button>
				<button id="btnGet" type="button" class="p_btnGet" style="display: none;"></button>
				<button id="btnExcel" type="button" class="p_btnExcel"></button>
			</div>
		</div>
		<div class="scontent">
			<div class="contentsP10">
				<div id="nationIPGrid"></div>
			</div>
		</div>
	</div>
	<div id="pwindow2" style="position: absolute;">
		<div></div>
		<div></div>
	</div>
</div>
</body>
</html>