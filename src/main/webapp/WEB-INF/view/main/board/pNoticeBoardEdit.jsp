<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html style="min-width: 0px">
<meta charset="UTF-8">
<title>사이버 침해대응시스템</title>
<%@include file="/inc/inc.jsp"%>
<%@include file="/inc/header.jsp"%>
<style>
/* 게시판 editor에서 사용할 팝업 */
.jqx-window-header {
	padding-left: 25px !important;
}

.jqx-window-close-button {
	width: 40px !important;
	height: 40px !important;
}
html body { min-width: 0px !important; }
</style>
<input type="hidden" id="uploadFileLength" value="<%=AppGlobal.uploadSize%>"/>
<script type="text/javascript" src="${pageContext.request.contextPath }/js/main/board/pNoticeBoardEdit.js"></script>
<form method="post" name="writeForm" id="writeForm">
	<input type="hidden" name="boardNo" id="boardNo" value="${boardNo}" />
	<div class="p_top_title_bg">
		<div class="p_top_title">
			<h1>공지사항 수정</h1>
			<div class="p_close" onclick="self.close()"></div>
		</div>
	</div>
	<div class="p_contentsP10 ">
		<table style="border: 1px solid #989898;">
			<colgroup>
				<col width="15%">
				<col width="35%">
				<col width="15%">
				<col width="35%">
			</colgroup>
			<tr class="pop_grid">
				<td class="pop_gridSub">공지기관</td>
				<td>
					<div id="noticeScopeDiv"  class="pop_combo1"></div>
					<input type="hidden" id="noticeScope">
				</td>
				<td class="pop_gridSub">제목</td>
				<td><input name="boardTitle" id="boardTitle" class="pop_inputWrite3" style="width: 96%; margin-left: 5px;"></td>
			</tr>
			<tr class="pop_grid">
				<td class="pop_gridSub">분류</td>
				<td>
					<div id="noticeType" name="noticeType" class="pop_combo1"></div>
				</td>
				<td class="pop_gridSub">그룹</td>
				<td>
					<div id="groupType" name="groupType" class="pop_combo1"></div>
				</td>
			</tr>
			<tr class="pop_grid">
				<td class="pop_gridSub">제공기관</td>
				<td colspan="3">
					<div id="control" name="groupType" class="pop_combo1"></div>
				</td>
			</tr>
			<tr class="pop_grid">
				<td class="pop_gridSub">게시자</td>
				<td><input id="userName" class=" p_non_border" readonly="readonly"></td>
				<td class="pop_gridSub">기관명</td>
				<td colspan="3"><input id="instNm" class=" p_non_border" readonly="readonly"></td>
			</tr>
		</table>
	</div>
</form>
<div id="filePos">
	<div id="fileUpload"></div>
</div>
<form method="post" name="writeForm2" id="writeForm2">
	<div class="p_contentsP10 ">
		<textarea id="editor" name="boardContent" class="boardContent" style="border: none;"></textarea>
	</div>
	<div class="p_btnPos">
		<button id="btnUpgrade" type="button" class="p_btnSave"></button>
		<button id="btnBoardList" type="button" class="p_btnList2" style="display: none;"></button>
		<button id="btnClose" type="button" class="p_btnClose"></button>
	</div>
</form>
</html>