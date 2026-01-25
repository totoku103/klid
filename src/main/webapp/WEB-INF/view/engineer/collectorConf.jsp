<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<% 
	/**
	 * @파일설명 : 엔지니어 시스템설정 화면
	 * @작성자 : jjung
	 * @작성일 : 2016. 06. 30
	 ************************************************************
	 * 소스는 사전승인 없이 임의로 복제, 복사, 배포될 수 없음 
	 ************************************************************
	 * @업데이트로그
	 */
%>
<script src="${pageContext.request.contextPath}/js/engineer/collectorConf.js"></script>
<div class="content">
	<div class="contentsP10" style="top: 0px;">
		<div id="collectorForm" style="float: left;">
			<div>수집기 설정</div>
			<div>
				<table>
					<tr class="pop_grid">
						<td class="pop_gridSub">수집기번호</td>
						<td> <input type="text" class="pop_inputWrite codeId" /></td>
						<td class="pop_gridSub">수집기명</td>
						<td><input type="text" class="pop_inputWrite codeValue1" /></td>
						<td class="pop_gridSub">수집기 IP</td>
						<td><input type="text" class="pop_inputWrite codeValue2" /></td>
						<td class="pop_gridSub">수집기 PORT</td>
						<td><input type="text" class="pop_inputWrite codeValue3" /></td>
						<td class="pop_gridSub">사용여부</td>
						<td><div class="pop_combo1 useFlag"></div></td>
						<td class="buttonGroup">
							<button type="button" class="p_btnPlus3" style="margin-right:10px; float:right;"></button>
							<button type="button" class="p_btnMinus" style="margin-right:5px; float:right;"></button>
						</td>
				    </tr>
				</table>
			</div>
		</div>
		
		<div style="clear: both; padding-top: 10px; width: 100%; height: 30px; text-align: right;">
			<button id="btnRefresh" class="p_btnRef"></button>
			<button id="btnSave" class="p_btnSave"></button>
		</div>
	</div>
</div>