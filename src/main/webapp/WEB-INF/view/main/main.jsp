<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="com.klid.webapp.common.SessionManager"%>
<!DOCTYPE html>
<html style="overflow: hidden">
<meta charset="UTF-8">
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/main.css" />
<%@include file="/inc/inc.jsp" %>
<script src="${pageContext.request.contextPath}/js/main/main.js"></script>
<body style="overflow: hidden">
<div id="header">
	<%@include file="/inc/header.jsp" %>
</div>
<div id="nav">
	<%@include file="/inc/nav.jsp" %>
</div>
<form id="mainForm" name="mainForm" >
<input type="hidden" id="userId" name="userId" />
<%--공지사항/문의의견 상세 호출시 필요.--%>
<input type="hidden"  id="parentPage" value="<%= request.getRequestURL().toString() %>">
<div class="main_temp">
	<div id="main_wrap">
		<div id="section01" class="firstColumn">
			<div id="alarmStep" class="mainBox">
				<div class="alarmTit mTit">
					예.경보 발령단계
					<div class="edit" id="alarmEdit" style="display: none;"></div>
				</div>

				<div class="alarmGraph">
					<div class="List" style="height: 130px;">
						<li>
							<span style="background: #488bb7;"></span>
							<p>관심</p>
						</li>
						<li>
							<span style="background: #f3c529;"></span>
							<p>주의</p>
						</li>
						<li>
							<span style="background: #f86a0b;"></span>
							<p>경계</p>
						</li>
						<li>
							<span style="background: #e11313;"></span>
							<p>심각</p>
						</li>
					</div>
					<div id="alarmCircle" class="Circle1"></div>
				</div>
			</div>
			<div id="accStatus" class="mainBox">
				<div class="accStatusTit mTit">
					침해사고 / 기간별 미처리현황
					<div class="edit" id="statusEdit"></div>
				</div>
				<div class="accStatusBar">
					<div class="infAccident">
						<div class="strapLine">침해사고현황</div>
						<div class="infAccidentBar">
							<li>사고접수<span id="accApply"></span></li>
							<li>처리중<span id="accIng"></span></li>
							<li>처리완료<span id="accEnd"></span></li>
							<li><span id="yearSpan"></span><br><span id="yearEnd"></span></li>
						</div>
					</div><!--accident-->
					<div class="termYetStatus">
						<div class="strapLine">기간별 미처리현황</div>
						<table>
							<thead>
							<tr>
								<th class="termth">기간별</th>
								<th class="termth" id="period1"></th>
								<th class="termth" id="period2"></th>
								<th class="termth" id="period3"></th>
							</tr>
							</thead>
							<tfoot>
							<tr>
								<td class="termtd">미처리 현황</td>
								<td class="termtd" id="period1Cnt" style="font-size:15px;"></td>
								<td class="termtd" id="period2Cnt" style="font-size:15px;"></td>
								<td class="termtd" id="period3Cnt" style="font-size:15px;"></td>
							</tr>
							</tfoot>
						</table>
					</div>
				</div>
			</div>
		</div>

		<div id="section02" class="secColumn">
			<div id="d_facility" class="mainBox">
				<div class="sTit" style="background: #3a9ebb; ">
					피해기관 Top 5
				</div>
				<div class="d_List">
					<ul id="instTypeList">
					</ul>
				</div>
			</div>
			<div id="d_type" class="mainBox">
				<div class="sTit" style="background: #2f8aa4;">
					피해유형 Top 5
				</div>
				<div class="d_List">
					<ul id="accdTypeList">
					</ul>
				</div>
			</div>

			<div id="Notice" class="mainBox">
				<div class="sTit">
					<div>공지사항</div>
					<div class="more" id="moreNotice" ></div>
				</div>
				<ul id="noticeUl">
				</ul>
			</div>
			<div id="Inquiry" class="mainBox">
				<div class="sTit">
					<div>문의/의견</div>
					<div class="more" id="moreQna"></div>
				</div>
				<ul id="qnaUl">
				</ul>
			</div>

			<div id="h_Monitor" class="mainBox">
			<div class="sTit">
				<div>홈페이지 모니터링</div>
				<div class="more" id="moreMonitoring"  ></div>
			</div>
				<div class="step">
					<ul>
                        <li style="width:80px;">
                            <span style="float:left;width:27px;margin-top:3px;background: url('../../../img/MainImg/IconHeathChk.svg') no-repeat;"></span>
                            <sapn style="width:50px;">헬스체크</sapn>
                        </li>
						<li>
							<span style="background: #34c9c1;">총 개수</span>
                            <div class="num" id="healthTotal"></div>
						</li>
						<li>
							<span style="background: #c41414; color:#fff;">장애 개수</span>
							<div class="num" id="healthErr"></div>
						</li>
                        <li style="width:70px;">
                            <span style="float:left;width:27px;margin-top:3px;background: url('../../../img/MainImg/IconFake.svg') no-repeat;"></span>
                            <sapn style="width:50px;">위변조</sapn>
                        </li>
                        <li>
                            <span style="background: #34c9c1;">총 개수</span>
							<div class="num" id="urlTotal"></div>
						</li>
						<li>
							<span style="background: #c41414; color:#fff;">장애 개수</span>
							<div class="num" id="urlErr">0</div>
						</li>
					</ul>
				</div>
			<div class="Alltable">
				<div class="htable l_table">
					<table>
						<thead>
						<tr>
							<th>자치단체명</th>
							<th>전체시스템</th>
							<th>장애시스템</th>
							<th>위·변조시스템</th>
						</tr>
						</thead>
						<tbody id="monitorTbody1">
						</tbody>
					</table>
				</div>
				<div class="htable r_table">
					<table>
						<thead>
						<tr>
							<th>자치단체명</th>
							<th>전체시스템</th>
							<th>장애시스템</th>
							<th>위·변조시스템</th>
						</tr>
						</thead>
						<tbody id="monitorTbody2">
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
	</div>
</div>
</form>
</body>
</html>