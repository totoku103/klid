<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html style="min-width: 0px">
<meta charset="UTF-8">
<title>사이버 침해대응시스템</title>
<%@include file="/inc/inc.jsp"%>
<%@include file="/inc/header.jsp"%>
<!-- <style>
	/* 게시판 editor에서 사용할 팝업 */
	.jqx-window-header { padding-left: 25px !important; }
	.jqx-window-close-button{  width: 40px !important; height: 40px !important; }
</style> -->
<style>
	html body { min-width: 0px !important; }
</style>
<input type="hidden" id="uploadFileLength" value="<%=AppGlobal.uploadSize%>"/>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/main/board/pResourceBoardWrite.js"></script>
	<form method="post" name="writeForm" id="writeForm">
		<div class="p_top_title_bg">
			<div class="p_top_title">
				<h1>보안자료실 글쓰기</h1>
				<div class="p_close" onclick="self.close()"></div>
			</div>
		</div>			
		<div class="p_contentsP10 ">
			<table style="border: 1px solid #989898;">
				<tr class="pop_grid">
					<td class="pop_gridSub">분류</td>
					<td>
						<div id="groupType" name="groupType" class="pop_combo1"></div>
					</td>
					<td class="pop_gridSub">제목</td>
					<td colspan="3"><input name="boardTitle" id="boardTitle" class="pop_input1"></td>
				</tr>
				<tr class="pop_grid">
					<td class="pop_gridSub">게시자</td>
					<td><input id="userName" class=" p_non_border" readonly="readonly"></td>
					<td class="pop_gridSub">기관명</td>
					<td><input id="instNm" class=" p_non_border" readonly="readonly"></td>
					<td class="pop_gridSub">등록일</td>
					<td>
						<input id="regDate" class=" p_non_border" readonly="readonly">
					</td>
				</tr>
			</table>
		</div>
	</form>
	<div id="filePos">
		<div id="fileUpload"></div>
	</div>
	
	<form method="post" name="writeForm2" id="writeForm2">
		<div class="p_contentsP10">
			<textarea id="editor" name="boardContent" class="boardContent"></textarea>
		</div>
		<div class=p_btnPos>
			<button id="btnSave" type="button" class="p_btnSave"></button>			
			<button id="btnBoardList" type="button" class="p_btnList2" style="display: none;"></button>
			<button id="btnClose" type="button" class="p_btnClose"></button>
		</div>
	</form>
		
		<!-- <div id="boardBlcok">
			<div id="listInside">
				<div class="listTable">
					<div class="listTitle">제목</div>
					<div class="listText">
						<input name="boardTitle" id="boardTitle">
					</div>
				</div>
			</div>
		</div>
	</form>
	<div id="filePos">
		<p class="fileColor">*첨부파일은 5개까지 첨부가능합니다</p>
		<div id="fileUpload"></div>
	</div>
	<form method="post" name="writeForm2" id="writeForm2">
		<div id="listContent2">
			<textarea id="editor" name="boardContent" class="boardContent"></textarea>
		</div>
		<div class="list_btn">
			<button id="btnSave" type="button" class="btn-white">
				<img alt="작성완료" src="../../img/popup/save_icon.png"> 작성완료
			</button>
			<button id="btnCancel" type="button" class="btn-white">
				<img alt="취소하기" src="../../img/popup/cancel_icon.png"> 취소하기
			</button>
			<button id="btnBoardList" type="button" class="btn-white" style="display: none;">
				<img alt="목록보기" src="../../img/popup/list_icon.png"> 목록보기
			</button>
		</div> -->
</html>