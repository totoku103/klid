<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="ko">
<meta charset="UTF-8">

<%@include file="/inc/inc.jsp" %>
<script src="${pageContext.request.contextPath}/js/main/sys/custUserMgmt.js"></script>
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
			<div class="leftTitle"> 그룹정보 </div>
			<div style="position: absolute; left: 50px; top: 39px; right: 0px; bottom: 0px">
				<button id="btnAdd_grp" type="button" class="p_btnPlus"></button>
				<button id="btnEdit_grp" type="button" class="p_btnAdj"></button>
			</div>
			<div style="position: absolute; left: 0px; top: 65px; right: 0px; bottom: 0px">
				<div id="dGrpTreeGrid" style="border: none"></div>
			</div>
		</div>
		<div>
			<div class="rightCont">
				<div id="loc">
					<%@include file="/inc/loc.jsp" %>
				</div>
				<div class="searchBox">
					<div class="searchBtn">
						<button id="btnSend" type="button" class="p_btnSms"></button>
						<button id="btnAdd" type="button" class="p_btnPlus"></button>
						<button id="btnEdit" type="button" class="p_btnAdj"></button>
						<button id="btnDel" type="button" class="p_btnDel"></button>
					</div>
				</div>
				<div class="scontent">
					<div class="contentsP10">
						<div id="custUsergGrid"></div>
					</div>
				</div>
				<div id="pwindow" style="position: absolute;">
					<div></div>
					<div></div>
				</div>
			</div>
		</div>
	</div>


	<%--<div class="newBox">
		<div class="searchBox">
			<div class="searchBtn">
				<button id="btnSend" type="button" class="p_btnSms"></button>
                <button id="btnAdd" type="button" class="p_btnPlus"></button>
                <button id="btnEdit" type="button" class="p_btnAdj"></button>
                <button id="btnDel" type="button" class="p_btnDel"></button>
            </div>
		</div>
		<div class="scontent">
			<div class="contentsP10">
				<div id="custUsergGrid"></div>
			</div>
		</div>
	</div>
	<div id="pwindow" style="position: absolute;">
		<div></div>
		<div></div>
	</div>--%>
</div>
</body>
</html>