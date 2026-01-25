<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@page import="com.klid.webapp.common.SessionManager"%>
<html>
<head>
    <title>Title</title>
    <%@include file="/inc/inc.jsp" %>
</head>
<body>
<div id="header">
    <%@include file="/inc/header.jsp" %>
</div>
<div id="nav">
    <%@include file="/inc/nav.jsp" %>
</div>
<form id="mainForm" name="mainForm">
    <div id="section">
        <div id="loc">
            <%@include file="/inc/loc.jsp" %>
        </div>
        <div class="newBox">
            <div class="searchBox">
                <div id="srchInstCdArea" class="pop_inputWrite4" style="margin-left: 5px;">
                    <div id="srchInstTree" style="border: none;"></div>
                    <input type="hidden" id="srchInstCd"/>
                </div>
                <div>
                    <label>이름:</label>
                    <input type="text" id="srchUserName" style="width:100px">
                </div>
                <div>
                    <label>아이디:</label>
                    <input type="text" id="srchUserId" style="width:100px">
                </div>
                <div>
                    <label>사용여부:</label>
                    <div id="srchUseYn" style="margin-left:5px;"></div>
                </div>

                <div style="display: flex;justify-content: center;align-items: center;">
                    <label for="checkbox-inactive-user-option">장기 미접속자</label>
                    <div id="checkbox-inactive-user-option" style="margin: 3px 5px 10px"></div>
                </div>

                <div class="searchBtn">
                    <button id="btnSearch" type="button" class="p_btn"></button>
                    <% if (SessionManager.getUser() != null
                            && (SessionManager.getUser().getAuthMain().equalsIgnoreCase("AUTH_MAIN_2")
                            && SessionManager.getUser().getAuthSub().equalsIgnoreCase("AUTH_SUB_3"))) { %>
                    <button id="btnAdd" type="button" class="p_btnPlus"></button>
                    <button id="btnDel" type="button" class="p_btnDel"></button>
                    <%} %>
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
<script type="text/javascript" src="${pageContext.request.contextPath}/js/main/env/user-management.js"></script>
</body>
</html>
