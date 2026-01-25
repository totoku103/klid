<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%
    /**
     * @파일설명 : 브리핑 운영자용 (관제실)
     * @작성자 : jjung
     * @작성일 : 2018. 11. 12
     ************************************************************
     * 소스는 사전승인 없이 임의로 복제, 복사, 배포될 수 없음
     ************************************************************
     */
%>
<!DOCTYPE html>
<html>
<head>
    <title>Hamon Topology</title>
    <%@include file="/inc/inc.jsp" %>
    <meta charset="utf-8"/>
    <!-- d3 -->
    <script>
        requirejs(['/js/hm/hm.require.conf.js'], function () {
            requirejs(['/js/webdash/brfMgrControl.js']);
        });
    </script>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/dashMois.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/dashMain.css">
</head>
<body>
<div id="dashMain">
    <div class="allSection" id="BrfMgrSection">
        <div class="top">
            <div class="header">
                <div id="noticeBar" class="marquee">
                    <input type="text" readonly id="noticeInput" value="공지사항 테스트 입니다." >
                </div>
                <div class="AllTitle">
                    사이버침해대응지원센터
                </div>
                <div id="AdminFunction" style="top:45px;">
                    <div class="dateFunction"></div>
                    <div class="btnFunction">
                        <div id="refreshBtn" ><img src="<c:url value="/img/webdash/refreshIcon.svg"/>" alt="새로고침" style="margin-bottom: 3px; cursor:pointer;">새로고침</div>
                        <div class="refBar"><div class="ref_Fillbar" style="width:0%;"></div></div>
                        <div class="f_Btn">
                            <div class="max"></div>
                            <%--  <div class="volume"></div>
                              <div class="setting"></div>--%>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            <div id="wrap" style="height:988px; padding:52px 20px 40px 20px;"><%--패딩값 강제로 뺌--%>
                <div id="brfMgrMap">
                    <%--<div class="brfMapPanel"> 백그라운드 이미지 --%>
                        <div id="brf_map"></div>
                        <div id="brfMgrOn">
                            <div id="localPnl" class="SeoulPnl"></div>
                        </div>
                   <%-- <div id="brfMgrOn">
                        <div class="SeoulPnl"></div>
                        <div class="BusanPnl"></div>
                        <div class="DaeguPnl"></div>
                        <div class="IncheonPnl"></div>
                        <div class="GwangjuPnl"></div>
                        <div class="DaejeonPnl"></div>
                        <div class="UlsanPnl"></div>
                        <div class="GyeonggiPnl"></div>
                        <div class="GangwonPnl"></div>
                        <div class="ChungbukPnl"></div>
                        <div class="ChungnamPnl"></div>
                        <div class="JeonbukPnl"></div>
                        <div class="JeonnamPnl"></div>
                        <div class="GyeongbukPnl"></div>
                        <div class="GyeongnamPnl"></div>
                        <div class="JejuPnl"></div>
                        <div class="SejongPnl"></div>
                    </div>--%>
                    <div class="GuideLine"></div>
                    <div class="m_index"></div>
                </div>
                <div id="AlertStatus">
                    <div class="AllAlert" id="Alert">
                        <div class="gridTit">전체 경보 현황</div>
                        <div id="allAlertGrid"></div>
                    </div>
                    <div class="gridTop"></div>

                    <div class="LocalAlert" id="Alert">
                        <div class="gridTit">
                            <span id="LocalTit"></span> 경보 현황
                        </div>
                        <div id="localAlertGrid"></div>
                    </div>
                </div>
            </div>
        </div>
</div>
</body>
</html>