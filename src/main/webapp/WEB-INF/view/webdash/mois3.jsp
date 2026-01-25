<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
    /**
     * @파일설명 : 지방자치단체 사이버위협 대응 현황
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
    <script>
        requirejs(['/js/hm/hm.require.conf.js'], function () {
            requirejs(['/js/webdash/mois3.js']);
        });
    </script>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/dashMois.css">
</head>
<body>
<div id="dashMain">
    <div class="allSection" id="cyberSection">
        <div class="top">
            <div class="header">
                <div class="AllTitle">
                    지방자치단체 사이버위협 대응 현황
                </div>
            </div>
        </div>
        <div id="wrap" class="cyberWrap">
            <div class="map">
                <div class="leftIndex" style="position:absolute; top:110px; left:50px;"></div>
                <div id="mois3_region" class="panelBox2" style="position:absolute; top:110px; left:50px;">
                </div>
            </div>

                <div id="rightSection">
                    <div id="auto" class="gridBox">
                        <div id="mois3_autoDeny" style="position: absolute; width: 100%; top: 73px; height: 227px;">
                        </div>
                        <div class="gridTit">자동차단</div>
                        <div style="font-size:35px; color:#fff; font-weight:bold;">Total</div>
                    </div>
                    <div class="gridTop"></div>
                    <div id="manual" class="gridBox">
                        <div id="mois3_manualDeny" style="position: absolute; width: 100%; top:412px;">
                        </div>
                        <div class="gridTit">수동차단</div>
                        <div class="mGrid"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>