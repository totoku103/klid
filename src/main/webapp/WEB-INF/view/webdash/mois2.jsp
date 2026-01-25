<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
    /**
     * @파일설명 : 홈페이지 위변조 및 모니터링 현황
     * @작성자 : jjung
     * @작성일 : 2018. 10. 30
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
            requirejs(['/js/webdash/mois2.js']);
        });
    </script>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/dashMois.css">
</head>
<body>
<div id="dashMain">
    <div class="allSection">
        <div class="top">
            <div class="header">
                <div class="AllTitle">
                    홈페이지 위변조 및 모니터링 현황
                </div>
            </div>
        </div>
        <div id="wrap">
            <div id="leftbn" class="bigBox">
                <div class="bnTit">중앙행정기관</div>
                <div id="mois2_center" class="bnSection">
                </div>
                <div style="text-align: center; font-size:16px; color:#fff; font-weight:bold;"> &lt;국가정보자원관리원 입주기관&gt; </div>
            </div>
            <div id="rightbn" class="bigBox">
                <div class="bnTit">지방자치단체</div>
                <div id="mois2_region" class="bnSection">
                </div>
                <div class="rightIndex"></div>
            </div>
        </div>
    </div>
</div>
</body>
</html>