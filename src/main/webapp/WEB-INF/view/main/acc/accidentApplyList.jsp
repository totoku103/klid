<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<meta charset="UTF-8">
<title>사이버 침해대응시스템</title>
<%@include file="/inc/inc.jsp" %>
<script src="${pageContext.request.contextPath}/js/main/acc/accidentApplyList.js"></script>
<script src='${pageContext.request.contextPath}/lib/jqwidgets/jqxdata.export.js'></script>
<script src='${pageContext.request.contextPath}/lib/jqwidgets/jqxgrid.export.js'></script>

<body style="minwidth:1280px; width: 100%">
<div id="header">
    <%@include file="/inc/header.jsp" %>
</div>
<div id="nav">
    <%@include file="/inc/nav.jsp" %>
</div>

<input type="hidden" id="procStatus" name="procStatus" value="${param.procStatus}" title="hidden"/>


<div id="section">
    <div id="layoutMain">
        <div id="loc">
            <%@include file="/inc/loc.jsp" %>
        </div>
        <div class="newBox">
            <div class="searchBox">
                <div>
                    <div id="srchDateType" class="pop_combo1"></div>
                </div>
                <div style="margin-left: 5px;">
                    <div id="cbPeriod" style="margin-left:0; margin-right:10px; float: left; " class="pop_combo1"></div>
                    <div id="date1" style="float: left" class="pop_combo1"></div>
                    <label style="float: left; padding-left:5px; padding-right:5px; padding-top:2px;">~</label>
                    <div id="date2" style="float: left" class="pop_combo1"></div>
                </div>
                <div>
                    <label style="float: left">기준시간 </label>
                    <div id="time" style="margin-left:0; margin-right:10px; float: left; " class="pop_combo1"></div>
                </div>
                <div>
                    <label style="float: left">통합 : </label>
                    <input type="text" id="totalTitle" title="totalTitle"/>
                </div>
                <div>
                    <label style="float: left">상세검색 : </label>
                </div>
                <div id="checkAll"></div>

                <div class="searchBtn">
                    <button id="btnSearch" type="button" class="p_btn"></button>
                    <button id="btnAdd" type="button" class="p_btnAcc1"></button>
                    <button id="btnEdit" type="button" class="p_btnAcc2"></button>
                    <%--<button id="btnReEdit" type="button" class="p_btnAppr2"></button>
                    <button id="btnCompleted" type="button" class="p_btnAcc3" ></button>--%>
                    <button id="btnDel" type="button" class="p_btnDel"></button>
                    <button id="btnColumnSet" type="button" class="p_btnChange"></button>
                    <button id="btnExportExcel" type="button" class="p_btnExcel"></button>
                    <button id="btnAccCopy" type="button" class="p_btnAccCopy"></button>
                </div>
            </div>
            <div class="searchBox searchBox2">
                <div>
                    <label style="float: left">제목 : </label>
                    <input type="text" id="srchInciTtl" title="srchInciTtl"/>
                </div>
                <div>
                    <label style="float: left">접수번호 : </label>
                    <input type="text" id="srchInciNo" title="srchInciNo"/>
                </div>
                <div>
                    <label style="float: left">신고기관명 : </label>
                    <input type="text" id="srchDclInstName" title="srchDclInstName"/>
                </div>
                <div>
                    <label style="float: left">피해기관명 : </label>
                    <input type="text" id="srchDmgInstName" title="srchDmgInstName"/>
                </div>
                <%--<div>
                    <label style="float: left">공격기관명 : </label>
                    <input type="text" id="srchAttInstNm"/>
                </div>--%>
                <%--<div>--%>
                <%--<label style="float: left">인지기관명 : </label>--%>
                <%--<div id="srchRecoInciCd" class="pop_combo1" ></div>--%>
                <%--</div>--%>
                <%--<div>
                    <label style="float: left">접수기관명 : </label>
                    <input type="text" id="srchDmgInstName"/>
                </div>--%>
                <%--<div>
                    <label style="float: left">담당자명 : </label>
                    <input type="text"/>
                </div>--%>
            </div>
            <div class="searchBox searchBox2">
                <div>
                    <label style="float: left">사고유형 : </label>
                    <div id="srchAccdTypCd" class="pop_combo1"></div>
                </div>
                <div>
                    <label style="float: left">우선순위 : </label>
                    <div id="srchInciPrtyCd" class="pop_combo1"></div>
                </div>
                <div>
                    <label style="float: left">망구분 : </label>
                    <div id="sNetDiv" class="pop_combo1"></div>
                </div>
                <div>
                    <label style="float: left">공격IP : </label>
                    <input type="text" id="srchAttIp" title="srchAttIp"/>
                </div>
                <%--<div>
                    <label style="float: left">공격국가 : </label>
                    <div id="srchAttNation" class="pop_combo1" ></div>
                </div>--%>
                <div>
                    <label style="float: left">사고IP : </label>
                    <input type="text" id="srchDmgIp" title="srchDmgIp"/>
                </div>
                <div>
                    <label style="float: left">예외처리 : </label>
                    <div id="srchException" class="pop_combo1"></div>
                </div>
				<div>
					<label style="float: left">접수방법 : </label>
					<div id="srchAcpnMthd" class="pop_combo1"></div>
				</div>
            </div>
            <div class="searchBox searchBox2">
                <div>
                    <label style="float: left">지원센터처리상태 : </label>
                    <div id="srchInciPrcsStatCd" class="pop_combo1"></div>
                </div>
                <div>
                    <label style="float: left">시도처리상태 : </label>
                    <div id="transInciPrcsStatCd" class="pop_combo1"></div>
                </div>
                <div>
                    <label style="float: left">시군구처리상태 : </label>
                    <div id="tansSidoPrcsStatCd" class="pop_combo1"></div>
                </div>
            </div>
            <%--<div class="searchBox searchBox2">--%>
            <%--<div>--%>
            <%--<label style="float: left">공격유형 : </label>--%>
            <%--<div id="srchAttTypCd" class="pop_combo1" ></div>--%>
            <%--</div>--%>
            <%--<div>
                <label style="float: left">피해국가 : </label>
                <div id="" class="pop_combo1" ></div>
            </div>--%>
            <%--<div>--%>
            <%--<label style="float: left">공격루트 : </label>--%>
            <%--<div id="srchAttVia" class="pop_combo1" ></div>--%>
            <%--</div>--%>
            <%--<div>
                <label style="float: left">호스트용도 : </label>
                <div id="" class="pop_combo1" ></div>
            </div>
            <div>
                <label style="float: left">운영체제 : </label>
                <div id="" class="pop_combo1" ></div>
            </div>--%>
            <%--<div>--%>
            <%--<label style="float: left">ESM 버전 : </label>--%>
            <%--<div id="srchEsmVer" class="pop_combo1" ></div>--%>
            <%--</div>--%>

            <%--</div>--%>
            <div class="searchBox searchBox2">
                <div>
                    <label style="float: left">사고내용 : </label>
                    <input type="text" id="srchInciDclCont" title="srchInciDclCont"/>
                </div>
                <div>
                    <label style="float: left">조사내용 : </label>
                    <input type="text" id="srchInciInvsCont" title="srchInciInvsCont"/>
                </div>
                <div>
                    <label style="float: left">시도의견 : </label>
                    <input type="text" id="srchInciBelowCont" title="srchInciBelowCont"/>
                </div>
                <%--<div>
                    <label style="float: left">주중주말 : </label>
                    <div id="srchWeekYn" class="pop_combo1" ></div>
                </div>--%>
            </div>

            <div class="scontent" style="top: 203px;">
                <div class="contentsP10" style="width: 99.1%">
                    <div id="accidentGrid"></div>
                    <div id="pwindow" style="position: absolute;">
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</div>
</body>
</html>