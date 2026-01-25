<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="ko">
<meta charset="UTF-8">

<%@include file="/inc/inc.jsp" %>
<script src="${pageContext.request.contextPath}/js/main/sys/weekMgmt.js"></script>
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
            <div class="searchBtn">
                <button id="btnAdd" type="button" class="p_btnPlus"></button>
                <button id="btnDel" type="button" class="p_btnDel"></button>
            </div>
        </div>
        <div class="scontent">
            <div class="contentsP10" >
                <div id="weekCalendar"/>
            </div>
        </div>
        <div id="pwindow" style="position: absolute;">
            <div></div>
            <div></div>
        </div>
    </div>
</div>
</body>
</html>