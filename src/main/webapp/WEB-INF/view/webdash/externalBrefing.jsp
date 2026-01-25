<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%
    /**
     * @파일설명 : 운영자 브리핑 대외용 (브리핑용)
     * @작성자 : jjung
     * @작성일 : 2018. 11. 08
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
    <%@include file="/inc/header.jsp" %>
    <meta charset="utf-8"/>
    <!-- d3 -->
    <script>
        requirejs(['/js/hm/hm.require.conf.js'], function () {
            requirejs(['/js/webdash/externalBrefing.js']);
        });
    </script>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/dashMain.css">
</head>
<body>
<div id="dashMain">
    <div class="allSection" id="KMgrKlid3Bg">
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
            <div id="wrap" style="padding:0 12px 12px 12px;"><%--padding값 강제로 뺐음--%>
                <div id="BrfExtWrlSection" style="width:100%; height:460px;">
                    <%--공격자TOP5 그리드--%>
                    <div class="BrfAttackTop5" style="width: 470px; height:272px;">
                        <div id="attTop5"></div>
                    </div>

                    <%--지도--%>
                    <div id="BrfWorldMap">
                        <div id="extbrf_country"></div>
                    </div>
                </div>
                <div id="ExtBottomSection" style="height: 400px;">
                <%--<div id="EvtAccSection">--%>
                    <div id="TypeBn">
                        <div id="extbrf_evtCnt"></div>
                    </div>
                    <div id="AccBn">
                        <div class="bnTit">침해사고현황</div>
                        <div id="extbrf_manualDeny" style="width: 830px; height:430px; margin:auto;"></div>
                    </div>
                </div>
            </div>
        </div>
</div>
</body>
</html>