<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html style="min-width: 0px">
<meta charset="UTF-8">
<title>사이버 침해대응시스템</title>
<%@include file="/inc/inc.jsp"%>
<%@include file="/inc/header.jsp"%>
<style>
</style>
<input type="hidden" id="uploadFileLength" value="<%=AppGlobal.uploadSize%>"/>
<script type="text/javascript" src="${pageContext.request.contextPath }/js/main/board/pMoisBoardEdit.js"></script>
<form method="post" name="writeForm" id="writeForm">
	<input type="hidden" name="boardNo" id="boardNo" value="${boardNo}" />
	<div class="p_top_title_bg">
		<div class="p_top_title">
			<h1>행안부자료실 수정</h1>
			<div class="p_close" onclick="self.close()"></div>
		</div>
	</div>
	<div class="p_contentsP10 ">
		<table style="border: 1px solid #989898;">
			<tr class="pop_grid">
				<td class="pop_gridSub">제목</td>
				<td colspan="3"><input name="boardTitle" id="boardTitle" class="pop_input1" style="width: 99.5%"></td>
			</tr>
			<tr class="pop_grid">
				<td class="pop_gridSub">게시자</td>
				<td><input id="userName" class=" p_non_border" readonly="readonly"></td>
				<td colspan=""><input id="" class=" p_non_border" readonly="readonly"></td>
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
	<div class="p_contentsP10 ">
		<textarea id="editor" name="boardContent" class="boardContent" style="width: 98%; height: 500px;" ></textarea>
	</div>
	<div class="p_btnPos">
		<button id="btnUpgrade" type="button" class="p_btnSave"></button>
		<button id="btnBoardList" type="button" class="p_btnList2" style="display: none;"></button>
		<button id="btnClose" type="button" class="p_btnClose"></button>
	</div>
</form>
</html>