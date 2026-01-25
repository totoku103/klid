<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<script type="text/javascript" src="${pageContext.request.contextPath }/js/main/popup/acc/pAccidentHistory.js"></script>
<form id="p_form2">
	<div class="pop_gridTitle">		
		<img alt="bullet" src="${pageContext.request.contextPath}/img/MainImg/customer_bullet.png">
		<span id="title">히스토리</span>
	</div>
	<div iclass="hisoryDiv">
		<table style="border-top:1px solid #989898; border-left:1px solid #989898; border-right:1px solid #989898; border-bottom:1px solid #989898;">
			<colgroup>
				<col width="20%">
				<col width="80%">
			</colgroup>
			<tr class="pop_grid pop_first">
				<td class="pop_gridSub" style="width:20%;">제목</td>
				<td>
					<input type="text" class="pop_inputWrite" id="historyTitle" readonly="readonly" style="border: none;">
				</td>
			</tr>
			<tr class="pop_grid">
				<td class="pop_gridSub" style="width:20%;">내용</td>
				<td>
					<textarea id="historyCont" readonly="readonly" style="width: 97%; margin:5px; height: 100px;  resize:none; border: 1px solid #cccccc"></textarea>
				</td>
			</tr>
		</table>
	</div>

</form>


<div style="text-align: center; margin-top: 10px; margin-bottom: 10px">
    <button id="pHistory_close" type="button" class="p_btnClose"></button>
</div>