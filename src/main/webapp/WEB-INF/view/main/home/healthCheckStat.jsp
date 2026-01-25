<%--
  Created by IntelliJ IDEA.
  User: leeyouje
  Date: 2018-12-31
  Time: 오후 4:02
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@page import="com.klid.webapp.common.SessionManager" %>
<%
    //String auth = SessionManager.getUser().getAuth().toUpperCase();
    String auth = "1";
%>
<!DOCTYPE html>
<html lang="ko">
<meta charset="UTF-8">
<title>사이버 침해대응시스템</title>
<%@include file="/inc/inc.jsp" %>
<script src="${pageContext.request.contextPath}/js/main/home/healthCheckStat.js"></script>
<body>
<div id="header">
    <%@include file="/inc/header.jsp" %>
</div>
<div id="nav">
    <%@include file="/inc/nav.jsp" %>
</div>
<form id="mainForm" name="mainForm">
    <%if (auth.equals("SYSTEM") || auth.equals("ADMIN")) {%>
    <input type="hidden" id="auth" name="auth" value="SYSTEM"/>
    <%} %>
    <div id="section">
        <div id="loc">
            <%@include file="/inc/loc.jsp" %>
        </div>
        <div class="newBox">
            <div class="searchBox">
                <div class="searchBtn">
                    <button id="btnSearch" type="button" class="p_btn"></button>
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