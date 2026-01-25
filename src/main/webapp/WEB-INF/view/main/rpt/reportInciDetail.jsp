<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<meta charset="UTF-8">
<title>사이버 침해대응시스템</title>
<%@include file="/inc/inc.jsp" %>
<script src="${pageContext.request.contextPath}/js/main/rpt/reportInciDetail.js"></script>
<body>
<div id="header">
    <%@include file="/inc/header.jsp" %>
</div>
<div id="nav">
    <%@include file="/inc/nav.jsp" %>
</div>
<div id="section">
    <div id="loc">
        <%@include file="/inc/loc.jsp" %>
    </div>
    <div class="content">
        <div class="contentsP10" style="top: 0">
            <div class="searchBox">
                <div>
                    <label style="float: left">접수일자 : </label>
                    <div id="cbPeriod" style="margin-left:0; margin-right:10px; float: left; " class="pop_combo1" ></div>
                    <div id="date1" style="float: left" class="pop_combo1" ></div>
                    <label style="float: left; padding-left:5px; padding-right:5px; padding-top:2px;">~</label>
                    <div id="date2" style="float: left" class="pop_combo1" ></div>
                </div>
                <div class="searchBtn">
                    <button id="btnSearch" type="button" class="p_btn"></button>
                    <%--<button id="btnExport" type="button" class="p_btnHwpDownload"></button>--%>
                </div>
            </div>
            <div class="searchBox searchBox2">
                <div>
                    <label style="float: left">접수번호 : </label>
                    <input type="text" id="sInciNo"/>
                </div>
                <div>
                    <label style="float: left">탐지명 : </label>
                    <input type="text" id="sInciTtl"/>
                </div>
                <div>
                    <label style="float: left">사고유형 : </label>
                    <div id="srchAccdTypCd" class="pop_combo1" ></div>
                </div>
                <div>
                    <label style="float: left">피해기관명 : </label>
                    <input type="text" id="srchDmgInstNm"/>
                </div>
                <div>
                    <label style="float: left">처리상태 : </label>
                    <div id="srchInciPrcsStatCd" class="pop_combo1" ></div>
                </div>
                <div>
                    <label style="float: left">공격국가 : </label>
                    <div id="srchAttNation" class="pop_combo1" ></div>
                </div>
                <div>
                    <label style="float: left">우선순위 : </label>
                    <div id="srchInciPrtyCd" class="pop_combo1" ></div>
                </div>
            </div>
                <div class="scontent" style="top: 70px";>
                    <div id="detailGrid"></div>
                </div>
            </div>
        </div>
    </div>
    <div id="pwindow" style="position: absolute;">
        <div></div>
        <div></div>
    </div>
</div>
</body>
</html>