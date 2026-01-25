<%@page import="com.klid.webapp.common.SessionManager"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<meta charset="UTF-8">
<title>사이버 침해대응시스템</title>
<%@include file="/inc/inc.jsp" %>
<style>
	.jqx-grid-table .jqx-grid-cell{ border-color:#aaa; border-top-color : #aaa; } 
	.jqx-cell { padding: 0px 2px; }
	.jqx-fill-state-hover-ui-hamon, .jqx-widget-ui-hamon .jqx-grid-cell-hover-ui-hamon { border-color: #3b8dbb; }
</style>
<script type="text/javascript" src="${pageContext.request.contextPath }/js/main/sec/qnaBoardList.js"></script>
<body>
	<input type="hidden"  id="parentPage" value="<%= request.getRequestURL().toString() %>">
	<div id="header">
		<%@include file="/inc/header.jsp" %>
	</div>
	<div id="nav">
		<%@include file="/inc/nav.jsp" %>
	</div>
	<div id="section">
		<div id="layoutMain" >
			<div id="loc">
				<%@include file="/inc/loc.jsp" %>
			</div>
			<div class="newBox">
				<div class="searchBox">
					<div>
						<label>제목:</label>
						<input type="text" id="title" style="width:200px">
					</div>
					<div>
						<label>내용:</label>
						<input type="text" id="bultnCont" style="width:200px">
					</div>
					<div class="searchBtn">
						<button id="btnSearch" type="button" class="p_btn" style="border:none;"></button>
						<button id="btnWrite" type="button" class="p_btnWirte" style="border:none;"></button>
					</div>
				</div>
				<div class="scontent">
					<div class="contentsP10">
						<div id="treeGrid"></div>
					</div>
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