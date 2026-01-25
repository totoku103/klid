<%@page import="com.klid.common.SiteEnum" %>
<%@page import="com.klid.common.AppGlobal" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!-- 로고 -->
<div class="p_logo">
    <a href="javascript: Master.gotoMainPage()">
        <c:if test="${sessionScope.User.localCd ne '1' && sessionScope.User.localCd ne '-1' }">
            <c:if test="${sessionScope.User.authMain eq 'AUTH_MAIN_3'}"> <%-- 시도 담당자(AUTH_MAIN_3 일때만 이미지 노출 --%>
                <img src="${pageContext.request.contextPath}/img/cityLogo/${sessionScope.User.localCd}_cityLogo.png"
                     title="로고" alt="사이버 침해대응시스템"/>
            </c:if>
        </c:if>
        <span>사이버 침해대응시스템</span>
    </a>
</div>

<!--상단정보-->
<div id="topInfo" style="position:absolute; top:0; right:0; height:60px;">
    <div>
        <ul class="infoTag">
            <li id="btnLogout"><a href="javascript:void(0);">Logout</a></li>
            <li><a href="javascript: Master.showUserConfEdit()"><c:out value="${sessionScope.User.userName}"/></a></li>
        </ul>
    </div>
</div>

<div style="position:absolute; height:55px; min-width:1500px; width:100%; background: #133b52 url('${pageContext.request.contextPath}/img/subTopBg_gray.png') repeat-x;">
    <div style="min-width: 1280px;">
        <div id="jqxmenu" class="netismenu" style="position: absolute; left: 0;">
            <ul id="mega-menu" class="mega-menu"
                style=" /* width:1280px; */ min-width: 1280px;  display: block;">${sessionScope.menu}</ul>
        </div>

        <style>
            #third-part-link-container > span {
                font-size: 20px;
                color: white;
            }
        </style>
        <div id="third-part-link-container"
             style="position: absolute; right: 20px; top: 10px; display: flex; justify-items: center; align-items: center;">
            <div style="display: flex; justify-items: center; align-items: center;">
                <span id="link-third-party-vms" style="cursor: pointer; font-size: 14px; color: white; text-align: center">취약점진단<br>통합관리시스템</span>
                <span id="link-third-party-vms" style="cursor: pointer; color: white; margin-left: 5px; font-size: 20px;">접속</span>
            </div>
            <div>
                <span style="padding-left: 10px; padding-right: 10px;">|</span>
            </div>
            <div style="display: flex; justify-items: center; align-items: center;">
                <span id="link-third-party-ctss" style="cursor: pointer; font-size: 14px; color: white; text-align: center">주요정보통신기반시설<br>업무지원시스템</span>
                <span id="link-third-party-ctss" style="cursor:pointer; color: white; margin-left: 5px; font-size: 20px;">접속</span>
            </div>
        </div>

        <%if (AppGlobal.appNetisPopup == false) {%>
        <div id="btnLogout" class="userLogout" style="z-index: 99999"></div>
        <div class="userId"><c:out value="${sessionScope.User.userName}"/></div>
        <%} %>
    </div>
</div>