<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<script src="${pageContext.request.contextPath}/js/engineer/versionMgmt.js"></script>
<div class="contentsP10">
    <div class="searchBox">
        <label style="font-weight: bold; color: #ff0000;"></label>
        <div class="searchBtn">
            <button id="btnSearch" type="button" class="p_btn"></button>
            <button id="btnAdd" type="button" class="p_btnPlus"></button>
            <!-- 			<button id="btnDel" type="button" class="p_btnDel"></button> -->
        </div>
    </div>
    <div class="content" style="top: 40px">
        <div class="contentsP10">
            <div id="treeGrid"></div>
        </div>
    </div>
    <div id="pwindow" style="position: absolute;">
        <div></div>
        <div></div>
    </div>
</div>