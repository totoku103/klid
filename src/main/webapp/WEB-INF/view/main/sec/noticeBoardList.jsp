<%@page import="com.klid.webapp.common.SessionManager"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<meta charset="UTF-8">
<title>사이버 침해대응시스템</title>
<%@include file="/inc/inc.jsp" %>
<script type="text/javascript" src="${pageContext.request.contextPath }/js/main/sec/noticeBoardList.js"></script>
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
					<div id="groupType" style="float: left; margin-left: 5px;"></div>
					<div id="noticeType" style="float: left; margin-left: 5px;"></div>
					<div id="startDate" style="float: left; margin-left: 5px; margin-top: 1px"></div>
					<div style="float: left; margin-left: 5px;">~</div>
					<div id="endDate" style="float: left; margin-left: 5px;margin-top: 1px"></div>
					<div>
						<label>제목:</label>
						<input type="text" id="title" style="width:200px" title="title">
					</div>
					<div>
						<label>내용:</label>
						<input type="text" id="bultnCont" style="width:200px" title="bultnCont">
					</div>
					<div>
						<label>기관명:</label>
						<input type="text" id="instNm" style="width:200px" title="instNm">
					</div>
					<div>
						<label>제공기관:</label>
						<div id="sControl" class="pop_combo1"></div>
					</div>
					<div class="searchBtn">
						<button id="btnSearch" type="button" class="p_btn" style="border:none;"></button>
						<button id="btnWrite" type="button" class="p_btnWirte" style="border:none;"></button>
					</div>
				</div>
				<div class="scontent">
					<div class="contentsP10">
						<div id="boardGrid"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>