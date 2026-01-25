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
<script src="${pageContext.request.contextPath}/js/main/home/forgeryUrlHist.js"></script>
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
                <div id="srchInstCdArea" class="pop_inputWrite4" style="margin-left: 5px;">
                    <div id="srchInstTree" style="border: none;"></div>
                    <input type="hidden" id="srchInstCd"/>
                    <input type="hidden" id="mainPageInstCd" value="${instCd}"/>
                </div>
                <div>
                    <label style="float: left"> 검색기간 : </label>
                    <div id="date1" style="float: left" class="pop_combo1"></div>
                    <label style="float: left; padding-left:5px; padding-right:5px; padding-top:2px;">~</label>
                    <div id="date2" style="float: left" class="pop_combo1"></div>
                </div>
                <div>
                    <label>WSIS_Ip:</label>
                    <input type="text" id="srchWsisIp" style="width:200px" title="srchWsisIp">
                </div>
                <div>
                    <label>도메인:</label>
                    <input type="text" id="srchDomain" style="width:200px" title="srchDomain">
                </div>
                <%--<div>--%>
                    <%--<label style="float: left">장애여부 : </label>--%>
                    <%--<div id="srchLastRes" class="pop_combo1"></div>--%>
                <%--</div>--%>
                <%--<div>--%>
                    <%--<label style="float: left">삭제여부 : </label>--%>
                    <%--<div id="srchDelYn" class="pop_combo1"></div>--%>
                <%--</div>--%>
                <div class="searchBtn">
                    <button id="btnSearch" type="button" class="p_btn"></button>
                    <%--<button id="btnSend" type="button" class="p_btnSms"></button>--%>
                </div>
                <div>
                    <label style="float: left">집중감시여부 : </label>
                    <div id="srchCheckYn" class="pop_combo1"></div>
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