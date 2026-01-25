<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%
    /**
     * @파일설명 : 대외용(관제실)
     * @작성자 : jjung
     * @작성일 : 2018. 11. 07
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
    <script>
        requirejs(['/js/hm/hm.require.conf.js'], function () {
            requirejs(['/js/webdash/externalControl.js']);
        });
    </script>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/dashMain.css">
</head>
<body>
<input type="hidden" id="sInstCd" value="${sessionScope.User.instCd}" />
<input type="hidden" id="sPntInstCd" value="${sessionScope.User.pntInstCd}" />
<input type="hidden" id="sAuthMain" value="${sessionScope.User.authMain}" />
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
        <div id="wrap" style="height:988px; padding:0 12px 12px 12px;"><%--padding값 강제로 뺐음--%>
            <div id="l_section" style="height:976px;"><%--높이값 조절--%>
                <div id="CyberBn" style="height:533px;">
                    <div class="bnTit">사이버 위기경보</div>
                    <div id="CyberAlert" style="width: 100%; height: 417px; text-align: center;">
                        <div id="local_cyberAlert" style="width: 444px; height: 417px; margin: 10px auto 0;">
                        </div>
                    </div>
                    <div id="CyberHis" style="width:100%; height:60px; text-align: center;">
                        <div id="local_cyberUpdInfo"  style="width:616px; height:60px; margin: 5px auto 0;">
                        </div>
                    </div>
             </div>
             <div id="BoardBn" style="height:414px; padding-top:29px;">
                    <div class="bnTit">정보공유현황</div>
                    <div class="OutsidebrdList">
                        <div class="bNotice" style="margin-bottom: 16px;">
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

            <div id="wrldSection">
                 <div class="AttackTop5" id="attTop5"></div>
                 <div id="WorldMap" ><div id="extctrl_country"></div></div>
             </div>

            <div id="EvtAccSection">
                <div id="TypeBn">
                    <div id="extctrl_evtCnt"></div>
                </div>
                <div id="AccBn">
                    <div class="bnTit">침해대응현황</div>
                    <div id="admctrl_manualDeny" style="width: 100%; height: 425px; margin: 12px auto 0;">
                    </div>
                </div>
                </div>
            </div>
        </div>
</div>
</body>
</html>