<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<meta charset="UTF-8">
<title>사이버 침해대응시스템</title>
<%@include file="/inc/inc.jsp" %>
<script src="${pageContext.request.contextPath}/js/main/hist/userInoutHistMgmt.js"></script>
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
		        <label style="float: left;">기간 : </label>
    			<div id="cbPeriod" style="float: left; margin-left:0; margin-right: 5px;"></div>
		        <div id="date1" style="float: left"></div>
		        <label style="float: left;">~</label>
		        <div id="date2" style="float: left"></div>
		    </div>
		    <div style="margin-left: 5px;">
		        <label style="float: left;">구분 : </label>
		        <div id="sLogCd" style="float: left"></div>
	        </div>
	        <div style="margin-left: 5px;">
		        <label style="float: left;">사용자ID : </label>
		        <div id="sUsrId" style="float: left"></div>
	        </div>
		    <div class="searchBtn">
		        <button id="btnSearch" type="button" class="p_btn"></button>
<!-- 		        <button id="btnExcel" type="button" class="p_btnExcel"></button> -->
		    </div>
		</div>
    </div>
    <div class="scontent">
		<div class="contentsP10">
			<div id="userHistGrid"></div>
		</div>
	</div>
</div>
<div id="pwindow" style="position: absolute;">
    <div></div>
    <div></div>
</div>
</body>
</html>