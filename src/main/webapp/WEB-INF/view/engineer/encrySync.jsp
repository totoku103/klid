<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<script src="${pageContext.request.contextPath}/js/engineer/encrySync.js"></script>
<div class="contentsP10">
    <div class="searchBox">
        <label style="font-weight: bold; color: #ff0000;"></label>
        <div>
            <label>암호화 확인값 : </label>
            <input type="text" id="checkText"/>
        </div>
        <div class="searchBtn">
            <button id="btnSearch" type="button" class="p_btn"></button>
            <button id="btnSync" type="button" class="p_btnSync"></button>
            <button id="btnApply" type="button" class="p_btnApply"></button>
        </div>
    </div>
    <div class="content" style="top: 40px">
        <div id="grid"></div>
    </div>
    <div id="pwindow" style="position: absolute;">
        <div></div>
        <div></div>
    </div>
</div>