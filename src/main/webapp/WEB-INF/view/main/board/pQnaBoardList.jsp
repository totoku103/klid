<%@page import="com.klid.webapp.common.SessionManager"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<meta charset="UTF-8">
<title>사이버 침해대응시스템</title>
<%@include file="/inc/inc.jsp" %>
<%@include file="/inc/header.jsp"%>
<style>
	.jqx-grid-table .jqx-grid-cell{ border-color:#aaa; border-top-color : #aaa; } 
	.jqx-cell { padding: 2px 2px; }
	.jqx-fill-state-hover-ui-hamon, .jqx-widget-ui-hamon .jqx-grid-cell-hover-ui-hamon { border-color: #3b8dbb; }
</style>
<script type="text/javascript" src="${pageContext.request.contextPath }/js/main/board/pQnaBoardList.js"></script>
<form name="form">
	<div class="p_top_title_bg">
		<div class="p_top_title">
			<h1>문의/의견 게시판</h1>
			<div class="p_close" onclick="self.close()"></div>
		</div>
	</div>		
	<div class="p_contentsP10">
		<div id='jqxWidget' style="font-size: 13px; font-family: Verdana; " class='default' >
      			<div id="treeGrid"></div>
		</div>
	</div>
	<div class="p_btnPos" >
		<button id="btnWrite" type="button" class="p_btnWirte" ></button>
		<button id="btnBoardList" type="button" class="p_btnRef"></button>
	</div>
	
</form>
</html>