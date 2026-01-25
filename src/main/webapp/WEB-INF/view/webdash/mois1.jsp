<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
    /**
     * @파일설명 : 사이버 위기경보
     * @작성자 : jjung
     * @작성일 : 2018. 10. 31
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
    <script>
        requirejs(['/js/hm/hm.require.conf.js'], function () {
            requirejs(['/js/webdash/mois1.js']);
        });
    </script>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/dashMois.css">
</head>
<body>
<input type="hidden" id="sInstCd" value="${sessionScope.User.instCd}" />
<div id="dashMain">
    <div class="allSection">
        <div class="top">
            <div class="header">
                <div class="AllTitle">
                    사이버 위기경보
                </div>
            </div>
        </div>
        <div id="wrap">
            <div id="CyberAlert">
                <div id="alertGraph">
                </div>
                <div id="alertHistory" class="graphHistory" >
                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>