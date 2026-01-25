<%@page import="com.klid.webapp.common.SessionManager"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<% 
	/**
	 * @파일설명 : 엔지니어 메뉴관리 화면
	 * @작성자 : 송영욱
	 * @작성일 : 2016. 04. 08
	 ************************************************************
	 * 소스는 사전승인 없이 임의로 복제, 복사, 배포될 수 없음 
	 ************************************************************
	 * @업데이트로그
	 */
%>
<script src="${pageContext.request.contextPath}/js/engineer/menuMgmt.js"></script>
<div class="contentsP10">
	<div id="splitter1">
		<div>
			<div class="searchBox">
				<div class="searchBtn">
					<button id="btnAdd_page" type="button"  class="p_btnPlus"></button>
					<button id="btnDel_page" type="button" class="p_btnDel"></button>
					<button id="btnSave_page" type="button" class="p_btnSave"></button>
				</div>
			</div>
			<div class="scontent">
				<div id="pageGrid" style="border: none"></div>
			</div>
		</div>
		<div>
			<div id="splitter2">
				<div>
					<div class="searchBox">
						<div class="searchBtn">
							<button id="btnAdd_pageGrp" type="button" class="p_btnPlus"></button>
							<button id="btnDel_pageGrp" type="button" class="p_btnDel"></button>
							<button id="btnSave_pageGrp" type="button" class="p_btnSave"></button>
						</div>
					</div>
					<div class="scontent">
						<div id="pageGrpGrid" style="border: none"></div>
					</div>
				</div>
				<div>
					<div class="searchBox">
						<div class="searchBtn">
							<button id="btnAdd_menu" type="button" class="p_btnPlus"></button>
							<button id="btnDel_menu" type="button" class="p_btnDel"></button>
							<button id="btnSave_menu" type="button" class="p_btnSave" ></button>
							<!-- <button id="btnLayout_mgr" type="button" style="width: 92px; height: 23px; cursor: pointer">Layout관리</button> -->
						</div>
					</div>
					<div class="scontent">
						<div id="menuGrid" style="border: none"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>