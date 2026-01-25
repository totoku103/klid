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
<script type="text/javascript" src="${pageContext.request.contextPath }/js/main/board/pQnaBoardComment.js"></script>
<form method="post" name="writeForm" id="writeForm">
	<input type="hidden" name="boardNo" id="boardNo" value="${boardNo}" />
	<input type="hidden" name="boardParentNo" id="boardParentNo" value="${boardNo}" />

	<input type="hidden" name="groupItemNo" id="groupItemNo" />
	<input type="hidden" name="cateNo" id="cateNo"/>

	<%--미사용컬럼이지만 답글 depth를 계산해서 넣어준다. 답글일 경우 +1씩--%>
	<input type="hidden" name="levelNo" id="levelNo" value="${param.levelNo}" />
		<div class="p_top_title_bg">
			<div class="p_top_title">
				<h1>문의/의견 답글 쓰기</h1>
				<div class="p_close" onclick="self.close()"></div>
			</div>
		</div>	
		<div class="p_contentsP10 ">
			<table style="border: 1px solid #989898;">
				<tr class="pop_grid">
					<td class="pop_gridSub">제목</td>
					<td colspan="3"><input name="boardTitle" id="boardTitle" class="pop_input1"  style="width: 98.5%"></td>
				</tr>			
			</table>	
		</div>	
		<div class="p_contentsP10  borderLine" >
			<textarea id="editor" name="boardContent" class="boardContent"  style="border: none; width: 99%;" ></textarea>
		</div>
		<div class="p_btnPos">
			<button id="btnComment" type="button" class="p_btnSave"></button>
			<%--<button id="btnBoardList" type="button" class="p_btnList2" ></button>--%>
		</div>

</form>
</html>