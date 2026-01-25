<%@page import="com.klid.webapp.common.SessionManager"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<meta charset="UTF-8">
<title>사이버 침해대응시스템</title>
<%@include file="/inc/inc.jsp" %>
<%@include file="/inc/header.jsp"%>
<style>
	/* 게시판 editor style */
	.jqx-widget-header { border: none !important;  background: #fff !important;  }
	.jqx-widget-content { border: none !important; }
</style>
<script type="text/javascript" src="${pageContext.request.contextPath }/js/main/board/pQnaBoardContents.js"></script>
<form name="form">
	<input type="hidden" id="boardNo" value="${boardNo}" />
	<input type="hidden" id="levelNo" value="${param.levelNo}" />

	<div class="p_top_title_bg">
			<div class="p_top_title">
				<h1>문의/의견 게시판</h1>
				<div class="p_close" onclick="self.close()"></div>
			</div>
		</div>	
		<div class="p_contentsP10 ">
			<table style="border: 1px solid #989898;">
				<tr class="pop_grid">
					<td class="pop_gridSub">제목</td>
					<td colspan="3"><input name="boardTitle" id="boardTitle" class="p_non_border"  style="width: 98.5%"></td>
				</tr>
				<tr class="pop_grid">
					<td class="pop_gridSub">작성자</td>
					<td ><input  id="userName"class=" p_non_border " ></td>
					<td class="pop_gridSub">등록일</td>
					<td ><input  id="regDate" class=" p_non_border"></td>
				</tr>
				<tr class="pop_grid">
					<td class="pop_gridSub">첨부파일</td>
					<td colspan="3">
						<ul id="attachFileList"></ul>
					</td>
				</tr>
			</table>		
			<div class="p_contentsM10 borderLine">
				<textarea id="editor" name="boardContent" class="boardContent2" style="border: none;"></textarea>
			</div>	
		</div>
		<div class="p_btnPos ">
			<button id="btnComment" type="button" class="p_btnReply" style="display: none;"></button>
			<button id="btnBoardList" type="button" class="p_btnList2" style="display: none;"></button>
		</div>

	
</form>
</html>