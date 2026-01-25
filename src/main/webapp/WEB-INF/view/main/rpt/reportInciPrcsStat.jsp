<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<meta charset="UTF-8">
<title>사이버 침해대응시스템</title>
<%@include file="/inc/inc.jsp" %>
<script src="${pageContext.request.contextPath}/js/main/rpt/reportInciPrcsStat.js"></script>
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
                    <label style="float: left">기간 : </label>
                    <div id="dateType" style="margin-left:0; margin-right: 5px; float: left; " class="pop_combo1" ></div>
                    <div id="date1" style="float: left" class="pop_combo1" ></div>
                    <label style="float: left;">~</label>
                    <div id="date2" style="float: left" class="pop_combo1" ></div>
                </div>
                <div>
                    <label style="float: left">기준시간 </label>
                    <div id="time" style="margin-left:0; margin-right:10px; float: left; " class="pop_combo1"></div>
                </div>
                <div class="searchBtn">
                    <button id="btnSearch" type="button" class="p_btn"></button>
                    <button id="btnExport" type="button" class="p_btnHwpDownload"></button>
                </div>
            </div>
            <div class="scontent" style="top: 35px";>
                <%--<div class="contentsP10">--%>
                <div>
                    <div style="position: absolute; left: 0px; top: 0px; right: 0px; bottom: 0px">
                        <div id="bSplitter">
                            <div >
                                <div id="container" style="width: 100%; height: 100%"></div>
                                <div id="container2" style="border-left: none; border-top: none; border-right: none; width: 400px; height: 300px; display:none;"></div>
                            </div>
                            <div>
                                <div id="prcsStatGrid" style="border: none"></div>
                            </div>
                        </div>
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