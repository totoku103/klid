<%@page import="com.klid.webapp.common.SessionManager"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html style="min-width: 0px;">
<meta charset="UTF-8">
<title>사이버 침해대응시스템</title>
<%@include file="/inc/inc.jsp" %>
<%@include file="/inc/header.jsp"%>
<style>
	html body{
		min-width: 0px !important;
	}
</style>
<script type="text/javascript" src="${pageContext.request.contextPath }/js/main/board/pNoticeBoardList.js"></script>
<form name="form">
	<div class="p_top_title_bg">
		<div class="p_top_title">
			<h1>공지사항</h1>
			<div class="p_close" onclick="self.close()"></div>
		</div>
	</div>
	<div class="p_contentsP10">
		<div id='jqxWidget' style="font-size: 13px; font-family: Verdana;">
			<div id="boardGrid"></div>
		</div>			
	</div>
	<div class="p_btnPos" >

		<button id="btnBoardList" type="button" class="p_btnRef"></button>
	</div>
<%-- 
	<div id="listTitle">
			<div class="topBg">
				<div class="listMaintitle">공지사항</div>
				<div class="close">
					<a href="#"><img id="btnClose"  src="../../img/popup/list_close.png" alt="닫기"></a>
				</div>
			</div>
		</div>
		<div id="boardBlcok">
			<div id='jqxWidget' style="font-size: 13px; font-family: Verdana;">
				<div id="boardGrid"></div>
			</div>
			<div class="list_btn" >
				<%if(auth.equals("SYSTEM") || auth.equals("ADMIN")) {%>
					<button id="btnWrite" type="button" class="btn-white">
						<img src="../../img/popup/write_icon.png" alt="글쓰기"> 글쓰기
					</button>
				<%} %>
				<button id="btnBoardList" type="button" class="btn-white"
					style="font-weight: normal">새로고침</button>
			</div>
		</div> --%>
</form>	
</html>