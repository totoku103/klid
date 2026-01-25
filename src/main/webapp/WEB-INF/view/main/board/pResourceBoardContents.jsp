<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html style="min-width: 0px;">
<meta charset="UTF-8">
<title>사이버 침해대응시스템</title>
<%@include file="/inc/inc.jsp" %>
<%@include file="/inc/header.jsp" %>
<style>
    /* 게시판 editor style */
    .jqx-widget-header {
        border: none !important;
        background: #fff !important;
    }

    .jqx-widget-content {
        border: none !important;
    }

    html body{
        min-width: 0px !important;
    }
</style>
<script type="text/javascript" src="${pageContext.request.contextPath }/js/main/board/pResourceBoardContents.js"></script>
<form name="form">
    <input type="hidden" id="boardNo" value="${boardNo}"/>

    <div class="p_top_title_bg">
        <div class="p_top_title">
            <h1>보안자료실</h1>
            <div class="p_close" onclick="self.close()"></div>
        </div>
    </div>
    <div class="p_contentsP10 ">
        <table style="border: 1px solid #989898;">
            <tr class="pop_grid">
                <td class="pop_gridSub">제목</td>
                <td colspan="6"><input name="boardTitle" id="boardTitle" class="p_non_border" style="width: 98.5%"
                                       readonly="readonly"></td>
            </tr>
            <tr class="pop_grid">
                <td class="pop_gridSub">게시자</td>
                <td><input id="userName" class=" p_non_border" readonly="readonly"></td>
                <td class="pop_gridSub">기관명</td>
                <td><input id="instNm" class=" p_non_border" readonly="readonly"></td>
                <td class="pop_gridSub">조회</td>
                <td><input id="boardHits" class=" p_non_border" readonly="readonly"></td>
            </tr>
            <tr class="pop_grid">
                <td class="pop_gridSub">작성일</td>
                <td><input id="regDate" class=" p_non_border" readonly="readonly"></td>
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
        <button id="btnClose" type="button" class="p_btnClose"></button>
    </div>
</form>
</html>