<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<% 
	/**
	 * @파일설명 : 에이전트 버전관리
	 * @작성자 : jjung
	 * @작성일 : 2017. 12. 5
	 ************************************************************
	 * 소스는 사전승인 없이 임의로 복제, 복사, 배포될 수 없음 
	 ************************************************************
	 * @업데이트로그
	 */
%>
<script src="${pageContext.request.contextPath}/js/engineer/agentVrsConf.js"></script>
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
		<div id="agentGrid"></div>
	</div>
</div>