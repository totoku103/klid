<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<meta charset="UTF-8">
<title>사이버 침해대응시스템</title>
<%@include file="/inc/inc.jsp" %>
<script src="${pageContext.request.contextPath}/js/main/rpt/reportSecurityResult.js"></script>
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
                    <label style="float: left">검색일자 </label>
                    <div id="date1" style="float: left" class="pop_combo1" ></div>
                    <label style="float: left;">~</label>
                    <div id="date2" style="float: left" class="pop_combo1" ></div>
                </div>
                <%--<div>--%>
                    <%--<label style="float: left">조회기간 : </label>--%>
                    <%--<div id="date1" style="float: left" class="pop_combo1" ></div>--%>
                    <%--<label style="float: left; padding-left:5px; padding-right:5px; padding-top:2px;">~</label>--%>
                    <%--<div id="date2" style="float: left" class="pop_combo1" ></div>--%>
                <%--</div>--%>
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
                    <div id="bSplitter">
                        <div>
                            <div id="totalGrid" style="border: none;"></div>
                        </div>
                        <div>
                            <div id="listGrid" style="border: none;"></div>
                        </div>
                    </div>
                    <div id="exceptlistGrid"></div>
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