<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html style="min-width: 0px;">
<meta charset="UTF-8">
<title>사이버 침해대응시스템</title>
<%@include file="/inc/inc.jsp" %>
<%@include file="/inc/header.jsp" %>
<style>
    /* 게시판 editor style */
    #editor {
        border: none !important;
        background: #fff !important;
    }

    #editor {
        border: none !important;
    }

    html body{
        min-width: 0px !important;
    }
</style>
<script type="text/javascript" src="${pageContext.request.contextPath }/js/main/board/pNoticeBoardContents.js"></script>
<form name="form">
    <input type="hidden" id="boardNo" value="${boardNo}"/>

    <div class="p_top_title_bg">
        <div class="p_top_title">
            <h1>공지사항</h1>
            <div class="p_close" onclick="self.close()"></div>
        </div>
    </div>
    <div class="p_contentsP10 ">
        <table style="border: 1px solid #989898;">
            <tr class="pop_grid">
                <td class="pop_gridSub">공지기관</td>
                <td><input id="openScopeName" class=" p_non_border" readonly="readonly"></td>
                <td class="pop_gridSub">제목</td>
                <td><input name="boardTitle" id="boardTitle" class="p_non_border" style="width: 97.5%"
                           readonly="readonly"></td>
                <td class="pop_gridSub">분류</td>
                <td style="width: 120px;">
                    <input id="noticeType" class=" p_non_border" readonly="readonly">
                </td>
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
                <td class="pop_gridSub">제공기관</td>
                <td><input id="control" class=" p_non_border" readonly="readonly"></td>
                <td class="pop_gridSub">그룹</td>
                <td><input id="groupType" class=" p_non_border" readonly="readonly"></td>
                <td class="pop_gridSub">등록일</td>
                <td colspan="3"><input id="regDate" class=" p_non_border" readonly="readonly"></td>
            </tr>
            <tr class="pop_grid">
                <td class="pop_gridSub">내용</td>
                <td colspan="6">
                    <textarea id="editor" name="boardContent" class="boardContent2" style="border: none;"></textarea>
                </td>
            </tr>
            <tr class="pop_grid">
                <td class="pop_gridSub">첨부파일</td>
                <td colspan="6">
                    <ul id="attachFileList"></ul>
                </td>
            </tr>
        </table>
        <%--<div >
            <textarea id="editor" name="boardContent" class="boardContent2" style="border: none;"></textarea>
        </div>--%>
        <div class="" id="noticeConfirm" style="display: none; margin-top: 15px;">
            <table style="border: 1px solid #989898;">
                <tr class="pop_grid ">
                    <td class="pop_gridSub">공지 확인내용</td>
                    <td>
                        <div id="noticeConfirmDiv" style="float: left;">
                            <input type="text" name="confirmInput" id="confirmInput" style="margin-top: 3px; width: 680px; margin-left: 3px">
                        </div>
                        <div style="float: right; margin-top: 2px; margin-right: 3px">
                            <button id="btnConfirmSave" type="button" class="p_btnSave"></button>
                        </div>
                    </td>
                </tr>
            </table>
        </div>

        <div class="" id="surveyIng" style="display: none; margin-top: 15px;">
            <table style="border: 1px solid #989898;">
                <tr class="pop_grid ">
                    <td class="pop_gridSub">설문응답</td>
                    <td>
                        <div id="surveyChooseDiv" style="float: left; display: none">
                            <div id="surveyExamDiv" name="surveyExamDiv" class="pop_combo1"></div>
                        </div>
                        <div id="surveyTextDiv" style="float: left; display: none">
                            <input name="surveyExamInput" id="surveyExamInput" style="margin-top: 3px; width: 400px;">
                        </div>
                        <div style="float: right; margin-top: 3px;">
                            <button id="btnSurveySend" type="button" class="p_btnSave"></button>
                        </div>
                    </td>
                </tr>
            </table>
        </div>

        <div class="tableBorder" id="surveyState" style="display: none;">
            <div id='chartArea' style="width: 100%; height: 100%;"></div>
        </div>
        <div class="tableBorder" id="surveyGrid" style="display: none; margin-top: 20px;">
            <img alt="bullet" src="${pageContext.request.contextPath}/img/MainImg/customer_bullet.png">
            <strong class="fileColor">설문응답 결과</strong>
            <div id="gridArea"></div>
        </div>

        <%-- 공지확인사항 영역  --%>
        <div class="tableBorder" id="confirmDiv" style="display: none; margin-top: 20px;">
            <img alt="bullet" src="${pageContext.request.contextPath}/img/MainImg/customer_bullet.png">
            <strong class="fileColor">공지확인</strong>
            <div id="confirmGrid" style="margin-top: 5px"></div>
        </div>
    </div>
    <div class="p_btnPos ">
        <%--<button id="btnUpgrade" type="button" class="p_btnAdj" style="display: none"></button>
        <button id="btnDelete" type="button" class="p_btnDel" style="display: none"></button>
        <button id="btnBoardList" type="button" class="p_btnList2" style="display: none;"></button>--%>
        <button id="btnClose" type="button" class="p_btnClose"></button>
    </div>
</form>

</html>