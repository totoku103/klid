<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
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
    <div id="loc">
        <%@include file="/inc/loc.jsp" %>
    </div>
    <div class="content">
        <div class="contentsP10" style="top: 0">
            <div class="searchBox">
                <div>
                    <label style="float: left">누계일자 </label>
                    <div id="date1" style="float: left" class="pop_combo1" ></div>
                </div>
                <div>
                    <label style="float: left">검색일자 </label>
                    <div id="date2" style="float: left" class="pop_combo1" ></div>
                </div>
                <div>
                    <label style="float: left">일치 </label>
                    <div id="dateRange" style="margin-left:0; margin-right:10px; float: left; " class="pop_combo1"></div>
                </div>
                <div>
                    <label style="float: left">시간 </label>
                    <div id="time" style="margin-left:0; margin-right:10px; float: left; " class="pop_combo1"></div>
                </div>
                <div class="searchBtn">
                    <button id="btnSearch" type="button" class="p_btn"></button>
                    <%--<button id="btnExport" type="button" class="p_btnHwp"></button>--%>
                </div>
            </div>
            <div class="scontent" style="top: 35px";>
                <%--<div class="contentsP10">--%>
                    <div>
                        <div style="position: absolute; left: 0px; top: 0px; right: 0px; bottom: 0px">
                            <br/>
                            <%--<div class="searchBox searchBox2">--%>
                                <%--<div>--%>
                                    <%--<label style="float: left">교대 근무자 </label>--%>
                                <%--</div>--%>
                            <%--</div>--%>
                            <%--<div id="rotationGrid"></div>--%>
                            <%--<br/>--%>
                            <div class="searchBox searchBox2">
                                <div>
                                    <label style="float: left">업무처리 현황 </label>
                                </div>
                            </div>
                            <div id="bSplitter">
                                <div>
                                    <div id="dailyGrid" style="border-left: none; border-top: none; border-right: none;"></div>
                                </div>
                                <div>
                                    <div id="dailyTotGrid" style="border: none"></div>
                                </div>
                            </div>
                            <div id="typeAccidentGrid"></div>
                            <%--<div id="DetectionGrid"></div>--%>
                        </div>
                    </div>
                <%--</div>--%>
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