<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@page import="com.klid.webapp.common.SessionManager"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>사용자 관리 이력</title>
    <%@include file="/inc/inc.jsp" %>
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/button-new.css">
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/user-management-history.css">
    <%@include file="/icons/icons.html" %>
</head>
<body class="user-history-page">
<div id="header">
    <%@include file="/inc/header.jsp" %>
</div>
<div id="nav">
    <%@include file="/inc/nav.jsp" %>
</div>
<form id="user-history-form" name="user-history-form">
    <div id="section">
        <div id="loc">
            <%@include file="/inc/loc.jsp" %>
        </div>

        <!-- 검색 영역 -->
        <div class="user-history-search-container">
            <div class="user-history-search-row">
                <!-- 검색 조건 (좌측) -->
                <div id="user-search-fields" class="user-history-search-fields">
                    <div class="user-history-date-range">
                        <label for="search-date-from">요청 일자:</label>
                        <input type="text" id="search-date-from" placeholder="YYYY-MM-DD">
                        <span class="user-history-date-separator">~</span>
                        <input type="text" id="search-date-to" placeholder="YYYY-MM-DD">
                    </div>

                    <div class="user-history-dropdown-field">
                        <label for="search-process-state">처리 상태:</label>
                        <div id="search-process-state"></div>
                    </div>

                    <div class="user-history-dropdown-field">
                        <label for="search-request-type">요청 유형:</label>
                        <div id="search-request-type"></div>
                    </div>

                    <label>사용자 기관명:</label>
                    <div id="search-institution-container">
                        <div id="tree-grid-search-institution"></div>
                        <input type="hidden" id="search-institution-cd" value="1100000"/>
                    </div>

                    <div class="user-history-search-field">
                        <label for="search-user-name">사용자 이름:</label>
                        <input type="text" id="search-user-name" placeholder="사용자명 입력">
                    </div>
                </div>

                <!-- 버튼 영역 (우측) -->
                <div class="user-history-button-area">
                    <% if (SessionManager.getUser() != null
                            && (SessionManager.getUser().getAuthMain().equalsIgnoreCase("AUTH_MAIN_1"))) { %>
                    <button id="button-export-excel" type="button" class="btn-new" style="margin-right: 5px;">
                        <svg>
                            <use href="#icon-download"></use>
                        </svg>
                        다운로드
                    </button>
                    <%} %>
                    <button id="btn-search" type="button" class="btn-new">
                        <svg>
                            <use href="#icon-search"></use>
                        </svg>
                        조회
                    </button>
                </div>
            </div>
        </div>

        <!-- 그리드 영역 -->
        <div class="user-history-grid-container">
            <div id="user-history-grid"></div>
        </div>
    </div>
</form>
<script type="application/javascript" src="${pageContext.request.contextPath}/js/main/env/user-management-history.js"></script>
</body>
</html>
