<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%
    /**
     * @파일설명 : 운영자용 (관제실)
     * @작성자 : jjung
     * @작성일 : 2018. 11. 03
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
            requirejs(['/js/webdash/adminControl.js']);
        });
    </script>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/dashMois.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/dashMain.css">
</head>
<body>
<div id="dashMain">
    <div class="allSection" id="KMgrAllSection">
        <div class="top">
            <div class="header">
                <div id="noticeBar" class="marquee">
                 <input type="text" readonly id="noticeInput" value="공지사항 테스트 입니다." >
                </div>
                <div class="AllTitle">
                    사이버침해대응지원센터
                </div>
                <div id="AdminFunction" style="top:50px;">
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
        <div id="wrap" style="padding:9px 12px 12px 12px;">
            <div id="l_section" class="adminSection">
                <div id="AccBn" class="gridBox" style="height:310px; margin-bottom: 26px;">
                    <div class="gridTit">침해대응현황</div>
                    <div id="admctrl_manualDeny" style="width: 100%; height: 245px; margin: 0 auto;">
                    </div>
                </div>

                <div id="ThrBn">
                    <div id="admctrl_evtCnt"></div>
                </div>

                <div id="FacilityBn" class="gridBox">
                    <div class="gridTit">17개 기관별 탐지현황</div>
                    <div class="F_Chart">
                        <div id="admctrl_localEvtChart" style="width:100%; height:150px; margin: auto;"></div>
                    </div>
                </div>
            </div>

            <div id="m_section"  class="adminSection">
                <div id="KMgrMap">
                    <div id="KMgrMapOn" class="ChungnamPnl"></div>
                    <div id="admctrl_map" style="position:relative;"></div>
                </div>
                <div class="m_index"></div>
            </div>

            <div id="r_section" class="adminSection">
                <div id="AgntBn" class="gridBox">
                    <div class="gridTit">주요 홈페이지 위변조 현황</div>
                    <div id="admctrl_forgery" class="AgntGrid">
                        <div id="HomeAgn" class="AgntBox"></div>
                        <div id="NorAgn" class="AgntBox"></div>
                        <div id="VariAgn" class="AgntBox"></div>
                        <div id="BlockAgn" class="AgntBox"></div>
                    </div>
                </div>
                <div id="SysBn" class="gridBox">
                    <div class="gridTit">시스템 장애현황</div>
                    <div id="SysGrid">
                    </div>
                </div>
        </div>
    </div>
    </div>
</div>
</body>
</html>