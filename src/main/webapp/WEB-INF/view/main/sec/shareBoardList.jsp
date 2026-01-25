<%@page import="com.klid.webapp.common.SessionManager"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<meta charset="UTF-8">
<title>사이버 침해대응시스템</title>
<%@include file="/inc/inc.jsp" %>
<script type="text/javascript" src="${pageContext.request.contextPath }/js/main/sec/shareBoardList.js"></script>
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
				<div class="tableBorder" id="surveyGrid" style="margin: 0px 0px 0px 0px;">
					<img alt="bullet" src="${pageContext.request.contextPath}/img/MainImg/customer_bullet.png">
					<strong>현황</strong><span class="fileColor" id="txtStartDay"></span>
					<table >
						<tr class="pop_grid">
							<td class="pop_gridSub"><span id="instNm0"></span></td>
							<td class="pop_gridSub"><span id="instNm1"></span></td>
							<td class="pop_gridSub"><span id="instNm2"></span></td>
							<td class="pop_gridSub"><span id="instNm3"></span></td>
							<td class="pop_gridSub"><span id="instNm4"></span></td>
							<td class="pop_gridSub"><span id="instNm5"></span></td>
							<td class="pop_gridSub"><span id="instNm6"></span></td>
							<td class="pop_gridSub"><span id="instNm7"></span></td>
							<td class="pop_gridSub"><span id="instNm8"></span></td>
							<td class="pop_gridSub"><span id="instNm9"></span></td>
							<td class="pop_gridSub"><span id="instNm10"></span></td>
							<td class="pop_gridSub"><span id="instNm11"></span></td>
							<td class="pop_gridSub"><span id="instNm12"></span></td>
							<td class="pop_gridSub"><span id="instNm13"></span></td>
							<td class="pop_gridSub"><span id="instNm14"></span></td>
							<td class="pop_gridSub"><span id="instNm15"></span></td>
							<td class="pop_gridSub"><span id="instNm16"></span></td>
						</tr>
						<tr >
							<td style="text-align: center"><span id="sidoCnt0"></span></td>
							<td style="text-align: center"><span id="sidoCnt1"></span></td>
							<td style="text-align: center"><span id="sidoCnt2"></span></td>
							<td style="text-align: center"><span id="sidoCnt3"></span></td>
							<td style="text-align: center"><span id="sidoCnt4"></span></td>
							<td style="text-align: center"><span id="sidoCnt5"></span></td>
							<td style="text-align: center"><span id="sidoCnt6"></span></td>
							<td style="text-align: center"><span id="sidoCnt7"></span></td>
							<td style="text-align: center"><span id="sidoCnt8"></span></td>
							<td style="text-align: center"><span id="sidoCnt9"></span></td>
							<td style="text-align: center"><span id="sidoCnt10"></span></td>
							<td style="text-align: center"><span id="sidoCnt11"></span></td>
							<td style="text-align: center"><span id="sidoCnt12"></span></td>
							<td style="text-align: center"><span id="sidoCnt13"></span></td>
							<td style="text-align: center"><span id="sidoCnt14"></span></td>
							<td style="text-align: center"><span id="sidoCnt15"></span></td>
							<td style="text-align: center"><span id="sidoCnt16"></span></td>
						</tr>
					</table>
				</div>

				<div class="searchBox" style="margin-top: 10px;">
					<div>
						<label style="float: left">현황일자 </label>
						<div id="date1" style="float: left" class="pop_combo1" ></div>
						<label style="float: left;">~</label>
						<div id="date2" style="float: left" class="pop_combo1" ></div>
					</div>
					<div id="srchInstCdArea" class="pop_inputWrite4" style="margin-left: 5px;">
						<div id="srchInstTree" style="border: none;"></div>
						<%--<input type="hidden" id="srchInstCd" />--%>
					</div>
					<div>
						<label>제목:</label>
						<input type="text" id="srchBultnTitle" style="width:200px">
					</div>
					<div>
						<label>내용:</label>
						<input type="text" id="srchBultnCont" style="width:200px">
					</div>
					<div class="searchBtn">
						<button id="btnSearch" type="button" class="p_btn" style="border:none;"></button>
						<button id="btnWrite" type="button" class="p_btnWirte" style="border:none;"></button>
					</div>
				</div>

				<div class="scontent" style="margin-top: 85px;">
					<div class="contentsP10">
						<div id="boardGrid"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>