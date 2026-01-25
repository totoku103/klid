<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<meta charset="UTF-8">
<title>사이버 침해대응시스템</title>
<%@include file="/inc/inc.jsp" %>
<%@include file="/inc/header.jsp"%>
<style>
	/* 게시판 editor에서 사용할 팝업 */
	.jqx-window-header { padding-left: 25px !important; }
	.jqx-window-close-button{  width: 40px !important; height: 40px !important; }
</style>
<script type="text/javascript" src="${pageContext.request.contextPath }/js/main/board/pQnaBoardEdit.js"></script>
<form method="post" name="writeForm" id="writeForm">
	<input type="hidden" name="boardNo" id="boardNo" value="${boardNo}" />
		<div class="p_top_title_bg">
			<div class="p_top_title">
				<h1>문의/의견 수정</h1>
				<div class="p_close" onclick="self.close()"></div>
			</div>
		</div>
		<div class="p_contentsP10 ">
			<table style="border: 1px solid #989898;">
				<tr class="pop_grid">
					<td class="pop_gridSub">제목</td>
					<td colspan="3"><input name="boardTitle" id="boardTitle" class="pop_input1"  style="width: 98.5%"></td>
				</tr>
				<tr class="pop_grid">
					<td class="pop_gridSub">작성자</td>
					<td><input id="userName" class=" p_non_border" readonly="readonly"></td>
					<td class="pop_gridSub">등록일</td>
					<td ><input  id="regDate" class=" p_non_border" readonly="readonly"></td>
				</tr>
				<%--<tr class="pop_grid">
					<td class="pop_gridSub">비밀글</td>
					<td colspan="3">
						<div style="float: left; margin-top: 5px; width: 30px;" id="isSecret" name="isSecret" class="pop_combo1"></div>
						<div style="float: left; margin-left: -25px;">
							<p class="fileColor" style="float: left">*관리자와 본인만 열람 가능합니다.</p>
						</div>

					</td>
				</tr>--%>
			</table>	
		</div>	
		<div class="p_contentsP10 ">
				<textarea id="editor" name="boardContent" class="boardContent" ></textarea>
			</div>
			<div class="p_btnPos">
				<button id="btnUpgrade" type="button" class="p_btnSave"></button>
				<button id="btnBoardList" type="button" class="p_btnList2" style="display: none;"></button>
			</div>
	
	
	<%-- <div id="listTitle">
			<div class="topBg">
				<div class="listMaintitle">기술지원 게시판 수정</div>
				<div class="close">
					<a href="#"><img id="btnClose"  src="../../img/popup/list_close.png" alt="닫기"></a>
				</div>
			</div>			
		</div>
		<div id="boardBlcok" >
			<div id="listInside">
				<div class="listTable">
					<div class="listTitle">제목</div>
					<div class="listText" ><input type="text" name="boardTitle" id="boardTitle"	value="${boardTitle}" ></div>
				</div>			
			</div>
			<div id="listContent3">
				<textarea id="editor"  name="boardContent" class="boardContent"></textarea>
			</div>	
			<div align="right"  style="margin-top: 3px; border:none;" class="list_btn">				
				<button id="btnUpgrade" type="button" class="btn-white"><img alt="작성완료" src="../../img/popup/save_icon.png">  작성완료</button>
				<button id="btnBoardList" type="button" class="btn-white" style="display: none;"><img alt="목록보기" src="../../img/popup/list_icon.png">  목록보기</button>		
			</div>		
		</div> --%>
	</form>	
</html>