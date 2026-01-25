<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%
    /**
     * @파일설명 : 사이버침해대응지원센터 (17개 시도)
     * @작성자 : jjung
     * @작성일 : 2018. 11. 06
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
            requirejs(['/js/webdash/local.js']);
        });
    </script>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/dashMain.css">
</head>
<body>
<div id="dashMain">
    <input type="hidden"  id="dashLocal" value="${dashLocal}"  />
    <div class="allSection">
        <div class="top">
            <div class="header">
                <div id="CityAdminLogo"><img id="local_cityLogo" src="" alt="시도별 로고"></div>
                <div class="AllTitle">
                    사이버침해대응지원센터
                </div>
                <div id="AdminFunction">
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
        <div id="wrap">
            <div id="l_section">
                <div id="CyberBn">
                    <div class="bnTit">사이버 위기경보</div>
                    <div id="CyberAlert" style="width: 100%; height: 375px; text-align: center;">
                        <div id="local_cyberAlert" style="width: 395px; height: 375px; margin: 0 auto;">
                        </div>
                     </div>
                    <div id="CyberHis" style="width:100%; height:46px; text-align: center;">
                        <div id="local_cyberUpdInfo"  style="width:616px; height:46px; margin: auto;">
                        </div>
                    </div>
                </div>
                <div id="BoardBn">
                    <div class="bnTit">정보공유현황</div>
                    <div class="boardList">
                        <div class="bNotice">
                            <div class="bs_tit">공지사항</div>
                            <div>
                                <ul class="bs_List" id="local_noticeBoard">
                                </ul>
                            </div>
                        </div>
                        <div class="bSecurity">
                            <div class="bs_tit">보안자료실</div>
                            <div>
                                <ul class="bs_List" id="local_securityBoard">
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="m_section">
                <div id="CityMap"></div>
                <div class="m_index"></div>
            </div>

            <div id="r_section">
                <div id="AccBn">
                    <div class="bnTit">침해사고현황</div>
                    <div id="local_manualDeny"  style="width: 100%; height: 402px; margin: 0 auto;">
                    </div>
                </div>
                <div id="DateStatusBn">
                    <div class="bnTit">기관별 상세현황</div>
                    <div class="DtStatusGrid">
                        <table id="local_instState">
                            <colgroup>
                                <col width="16%">
                                <col width="13%">
                                <col width="13%">
                                <col width="13%">
                                <col width="45%">
                            </colgroup>
                            <thead>
                                <th style="width:90px;">구분</th>
                                <th style="width:82px;">계</th>
                                <th style="width:82px;">처리중</th>
                                <th style="width:82px;">완료</th>
                                <th style="width:275px;">처리 진행율</th>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>