<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<meta charset="UTF-8">
<title>사이버 침해대응시스템</title>
<%@include file="/inc/inc.jsp" %>
<%@include file="/inc/header.jsp"%>
<!-- <style>
	/* 게시판 editor에서 사용할 팝업 */
	.jqx-window-header { padding-left: 25px !important; }
	.jqx-window-close-button{  width: 40px !important; height: 40px !important; }
</style> -->
<script type="text/javascript" src="${pageContext.request.contextPath }/js/main/board/pQnaBoardWrite.js"></script>
<form method="post" name="writeForm" id="writeForm">
	<div class="p_top_title_bg">
			<div class="p_top_title">
				<h1>문의/의견 글쓰기</h1>
				<div class="p_close" onclick="self.close()"></div>
			</div>
		</div>
		<div class="p_contentsP10 ">
			<table style="border: 1px solid #989898;">
				<tr class="pop_grid">
					<td class="pop_gridSub">제목</td>
					<td><input name="boardTitle" id="boardTitle" class="pop_input1"></td>
					<td class="pop_gridSub">게시자</td>
					<td><input id="userName" class=" p_non_border" readonly="readonly"></td>
				</tr>
				<tr class="pop_grid">
					<td class="pop_gridSub">기관명</td>
					<td colspan=""><input id="instNm" class=" p_non_border" readonly="readonly"></td>
					<td class="pop_gridSub">등록일</td>
					<td>
						<input id="regDate" class=" p_non_border" readonly="readonly">
					</td>
					<%--<td class="pop_gridSub">비밀글</td>
					<td>
						<div style="float: left; margin-top: 5px; width: 30px;" id="isSecret" name="isSecret" class="pop_combo1"></div>
						<div style="float: left; margin-left: -30px;">
							<p class="fileColor" style="float: left">*관리자와 본인만 열람 가능합니다.</p>
						</div>
					</td>--%>
				</tr>
				<%--<tr class="pop_grid">
					<td class="pop_gridSub">비밀글</td>
					<td>
						<div style="float: left; margin-top: 5px; width: 30px;" id="isSecret" name="isSecret" class="pop_combo1"></div>
						<div style="float: left; margin-left: -25px;">
							<p class="fileColor" style="float: left">*관리자와 본인만 열람 가능합니다.</p>
						</div>
					</td>
					<td class="pop_gridSub">등록일</td>
					<td>
						<input id="regDate" class=" p_non_border" readonly="readonly">
					</td>
				</tr>--%>
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
		<button id="btnClose" type="button" class="p_btnClose"></button>
	</div>
</form>
</html>