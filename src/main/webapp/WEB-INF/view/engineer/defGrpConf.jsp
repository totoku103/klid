<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<% 
	/**
	 * @파일설명 : 기본그룹관리
	 * @작성자 : jjung
	 * @작성일 : 2016. 08. 20
	 ************************************************************
	 * 소스는 사전승인 없이 임의로 복제, 복사, 배포될 수 없음 
	 ************************************************************
	 * @업데이트로그
	 */
%>
<script src="${pageContext.request.contextPath}/js/engineer/defGrpConf.js"></script>
<div class="contentsP10">
	<div class="searchBox">
		<label style="font-weight: bold; color: #ff0000;">※ 다중등록시 그룹명 중복체크를 하지 않습니다. ※</label>
		<div class="searchBtn">
			<button id="btnSave" type="button" class="Save"></button>
		</div>
	</div>
	<div style="position: absolute; left: 0; top: 30px; right: 0; bottom: 0">
		<div id="splitter">
			<div>
				<div id="grpTree" style="border: none"></div>
			</div>
			<div>
				<div id="addGrid" style="border: none"></div>		
			</div>
		</div>
	</div>
</div>