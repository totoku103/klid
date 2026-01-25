<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<meta charset="UTF-8">
<title>사이버 침해대응시스템</title>
<%@include file="/inc/inc.jsp" %>
<script src="${pageContext.request.contextPath}/js/main/rpt/reportDailyState.js"></script>
<body>
<div id="header">
    <%@include file="/inc/header.jsp" %>
</div>
<div id="nav">
    <%@include file="/inc/nav.jsp" %>
</div>
<div id="section">
    <div id="layoutMain" >
        <div id="loc">
            <%@include file="/inc/loc.jsp" %>
        </div>
        <div class="newBox">
            <div class="searchBox">
                <div>
                    <label style="float: left">검색일자 </label>
                    <div id="date2" style="float: left" class="pop_combo1" ></div>
                </div>
                <%--<div>--%>
                    <%--<label style="float: left">기간 </label>--%>
                    <%--<div id="dateRange" style="margin-left:0; margin-right:10px; float: left; " class="pop_combo1"></div>--%>
                <%--</div>--%>
                <div>
                    <label style="float: left">기준시간 </label>
                    <div id="time" style="margin-left:0; margin-right:10px; float: left; " class="pop_combo1"></div>
                </div>
                <div>
                    <label style="float: left">누계일자 </label>
                    <div id="date1" style="float: left" class="pop_combo1" ></div>
                </div>
                <div class="searchBtn">
                    <button id="btnSearch" type="button" class="p_btn"></button>
                    <button id="btnExport" type="button" class="p_btnHwp"></button>
                </div>
            </div>
            <div class="scontent" style="top: 75px;">
                <div class="contentsP10" style="width: 99.1%">
                    <div id="splitter">
                        <div>
                            <!-- 유형별 사고내역 -->
                            <div id="typeAccidentGrid" style="border: none;"></div>
                        </div>
                        <div>
                            <div id="splitterSub">
                                <div>
                                    <!-- 일일사고처리 -->
                                    <div id="dailyGrid" style=""></div>
                                </div>
                                <div>
                                    <!-- 사고처리누계 -->
                                    <div id="dailyTotGrid" style=""></div>
                                </div>
                            </div>
                        </div>
                    </div>
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