<%@page import="com.klid.webapp.common.SessionManager"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<meta charset="UTF-8">
<title>사이버 침해대응시스템</title>
<%@include file="/inc/inc.jsp" %>
<script type="text/javascript" src="${pageContext.request.contextPath }/js/main/sec/takeOverBoardList.js"></script>
<style>
/*!** 인수인계 색상  (현재 임의로 색상 넣음)*!
.toLevel1{background:#F64431}
.toLevel2{background:#FEEE24}
.toLevel3{background:#FF9A00}
.toLevel4{background:#5cc153}*/
</style>
<body>
<input type="hidden"  id="parentPage" value="<%= request.getRequestURL().toString() %>">
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
				        <label style="float: left;">기간 : </label>
		    			<div id="cbPeriod" style="float: left; margin-left:0; margin-right: 5px;"></div>
				        <div id="date1" style="float: left"></div>
				        <label style="float: left;">~</label>
				        <div id="date2" style="float: left"></div>
				    </div>
					<div>
						<label>제목:</label>
						<input type="text" id="title" style="width:200px" title="title">
					</div>
					<div>
						<label>내용:</label>
						<input type="text" id="bultnCont" style="width:200px" title="bultnCont">
					</div>
					<div class="searchBtn">
						<button id="btnSearch" type="button" class="p_btn" style="border:none;"></button>
						<button id="btnWrite" type="button" class="p_btnWirte" style="border:none;"></button>
					</div>
				</div>
				<div class="searchBox searchBox2">
					<div>
	                    <label style="float: left">확인 : </label>
	                    <label><input type="radio" style="vertical-align:middle; margin-top: -3px;" name="rdReadFlag" class="checkbox" value="-1" checked /> <span>전체</span></label>&nbsp;&nbsp;
						<label><input type="radio" style="vertical-align:middle; margin-top: -3px;" name="rdReadFlag" class="checkbox" value="1" /> <span>확인</span></label>&nbsp;&nbsp;
						<label><input type="radio" style="vertical-align:middle; margin-top: -3px;" name="rdReadFlag" class="checkbox" value="0" /> <span>미확인</span></label>
	                </div>
	                <div>
	                    <label style="float: left">종결 : </label>
	                    <label><input type="radio" style="vertical-align:middle; margin-top: -3px;" name="rdIsCloseFlag" class="checkbox" value="-1" checked /> <span>전체</span></label>&nbsp;&nbsp;
						<label><input type="radio" style="vertical-align:middle; margin-top: -3px;" name="rdIsCloseFlag" class="checkbox" value="1" /> <span>종결</span></label>&nbsp;&nbsp;
						<label><input type="radio" style="vertical-align:middle; margin-top: -3px;" name="rdIsCloseFlag" class="checkbox" value="0" /> <span>미종결</span></label>
	                </div>
				</div>
				<div class="scontent2">
					<div class="contentsP10">
						<div id="boardGrid"></div>
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