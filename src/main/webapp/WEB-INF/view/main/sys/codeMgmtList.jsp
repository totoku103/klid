<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="ko">
<meta charset="UTF-8">

<%@include file="/inc/inc.jsp" %>
<script src="${pageContext.request.contextPath}/js/main/sys/codeMgmtList.js"></script>
<body>
<div id="header">
    <%@include file="/inc/header.jsp" %>
</div>
<div id="nav">
    <%@include file="/inc/nav.jsp" %>
</div>
<div id="section">
	<div id="mainSplitter">
		<div>
			<div>
                <div class="searchBtn">
                    <button id="btnDel_left" type="button" class="p_btnDel" style="display: none"></button>
                    <button id="btnAdd_left" type="button" class="p_btnPlus"></button>
                    <button id="btnEdit_left" type="button" class="p_btnAdj"></button>
                </div>
                <div style="position: absolute; top: 30px; right: 5px; bottom: 5px; left: 5px">
                    <div id="leftGrid"></div>
                </div>
            </div>
		</div>
		<div>
			<div class="rightCont">
				<div id="loc">
					<%@include file="/inc/loc.jsp" %>
				</div>
				<div class="scontent" style="top: 24px;">
					<div class="contentsP10">
						<div id="subSplitter">
		                    <div>
		                         <div class="searchBtn">
		                             <button id="btnDel_right" type="button" class="p_btnDel" style="display: none"></button>
		                             <button id="btnAdd_right" type="button" class="p_btnPlus"></button>
		                             <button id="btnEdit_right" type="button" class="p_btnAdj"></button>
		                         </div>
		                         <div style="position: absolute; top: 30px; right: 5px; bottom: 5px; left: 5px">
		                             <div id='btnCal_right' style="display: none;"></div>
		                             <div id="rightGrid"></div>
		                         </div>
		                     </div>
		                     <div>
		                         <div class="searchBtn">
		                             <button id="btnAdd_bottom" type="button" class="p_btnPlus"></button>
		                             <button id="btnEdit_bottom" type="button" class="p_btnAdj"></button>
		                         </div>
		                         <div class="content">
		                             <div id="bottomGrid" ></div>
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