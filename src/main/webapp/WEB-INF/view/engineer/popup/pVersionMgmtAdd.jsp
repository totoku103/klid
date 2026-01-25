<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html style="min-width: 0px">
<meta charset="UTF-8">

<%@include file="/inc/inc.jsp" %>
<%@include file="/inc/header.jsp"%>
<!-- <style>
	/* 게시판 editor에서 사용할 팝업 */
	.jqx-window-header { padding-left: 25px !important; }
	.jqx-window-close-button{  width: 40px !important; height: 40px !important; }
</style> -->
<style>
    html body { min-width: 0px !important; }
</style>
<script type="text/javascript" src="${pageContext.request.contextPath }/js/engineer/popup/pVersionMgmtAdd.js"></script>
<form method="post" name="writeForm" id="writeForm">
    <div class="p_top_title_bg">
        <div class="p_top_title">
            <h1>버전관리 글쓰기</h1>
            <div class="p_close" onclick="self.close()"></div>
        </div>
    </div>
    <div class="p_contentsP10 ">
        <table style="border: 1px solid #989898;">
            <colgroup>
                <col width="10%">
                <col width="15%">
                <col width="10%">
                <col width="65%">
            </colgroup>
            <tr class="pop_grid">
                <td class="pop_gridSub">버전</td>
                <td><input name="pVersion" id="pVersion" class="pop_input1"></td>
                <td class="pop_gridSub">제목</td>
                <td><input name="boardTitle" id="boardTitle" class="pop_input1" style="width: 99%"></td>
            </tr>
        </table>
    </div>
    <div class="p_contentsP10">
        <textarea id="editor" name="boardContent" class="boardContent"></textarea>
    </div>
    <div class=p_btnPos>
        <button id="btnSave" type="button" class="p_btnSave"></button>
        <button id="btnClose" type="button" class="p_btnClose"></button>
    </div>
</form>
</html>