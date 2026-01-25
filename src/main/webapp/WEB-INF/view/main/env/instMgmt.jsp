<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="com.klid.webapp.common.SessionManager"%>
<!DOCTYPE html>
<html lang="ko">
<meta charset="UTF-8">
<title>사이버 침해대응시스템</title>
<%@include file="/inc/inc.jsp" %>
<script src="${pageContext.request.contextPath}/js/main/env/instMgmt.js"></script>
<body>
<div id="header">
	<%@include file="/inc/header.jsp" %>
</div>
<div id="nav">
	<%@include file="/inc/nav.jsp" %>
</div>
<div id="section">
	<div id="mainSplitter">
		<div>
			<div class="leftTitle"> 기관정보 </div>
			<div style="position: absolute; left: 0px; top: 37px; right: 0px; bottom: 0px">
				<div id="dGrpTreeGrid" style="border: none"></div>
			</div>
		</div>
		<div>
			<div class="rightCont">
				<div id="loc">
					<%@include file="/inc/loc.jsp" %>
				</div>
				<div class="searchBox">
					<div>
						<label style="float: left">기관명 : </label>
						<input type="text" id="sInstNm" title="sInstNm">
					</div>
					<div class="searchBtn">
						<button id="btnSearch" type="button" class="p_btn" ></button>
		<!-- 				<button id="btnSave" type="button" class="p_btnSave"></button> -->
						<button id="btnAdd" type="button" class="p_btnPlus"></button>
						<button id="btnAdj" type="button" class="p_btnAdj"></button>
						<button id="btnDel" type="button" class="p_btnDel"></button>
						<button id="btnExcel" type="button" class="p_btnExcel"></button>
					</div>
				</div>
				<div class="scontent">
					<div class="contentsP10">
						<div id="instGrid"></div>
					</div>
				</div>
				<div id="pwindow" style="position: absolute;">
					<div></div>
					<div></div>
				</div>
			</div>
		</div>
	</div>
</div>
</body>
</html>