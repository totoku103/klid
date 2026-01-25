<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<form id="p_form2">
	<div class="pop_gridTitle">		
		<img alt="bullet" src="${pageContext.request.contextPath}/img/MainImg/customer_bullet.png">
		<span id="title"></span>
	</div>
	<%-- 메모 --%>
	<div id="memoDiv" style="display: none" class="proessDiv">
		<table style="border-top:1px solid #989898; border-left:1px solid #989898; border-right:1px solid #989898; border-bottom:1px solid #989898;">
			<colgroup>
				<col width="30%">
				<col width="70%">
			</colgroup>
			<tr class="pop_grid pop_first">
				<td class="pop_gridSub" style="width:10%;">제목</td>
				<td>
					<input type="text" class="pop_inputWrite" id="memoTtl">
				</td>
			</tr>
			<tr class="pop_grid">
				<td class="pop_gridSub" style="width:20%;">내용</td>
				<td>
					<textarea id="memoCont" style="width: 97%; margin:5px; height: 100px;  resize:none; border: 1px solid #cccccc"></textarea>
				</td>
			</tr>
		</table>
	</div>
	<%--담당자 할당 화면--%>
	<div id="assignDiv" style="display: none" class="proessDiv">
		<table style="border-top:1px solid #989898; border-left:1px solid #989898; border-right:1px solid #989898; border-bottom:1px solid #989898;">
			<colgroup>
				<col width="30%">
				<col width="70%">
			</colgroup>
			<tr class="pop_grid pop_first">
				<td class="pop_gridSub" style="width:20%;">담당자</td>
				<td>
					<div id="assignMember" class="pop_combo1" ></div>
				</td>
			</tr>
			<tr class="pop_grid">
				<td class="pop_gridSub" style="width:20%;">할당사유</td>
				<td>
					<textarea id="assignCont" style="width: 97%; margin:5px; height: 100px;  resize:none; border: 1px solid #cccccc"></textarea>
				</td>
			</tr>
		</table>
	</div>

	<%--이관요청 화면--%>
	<div id="moveReqDiv" style="display: none" class="proessDiv">
		<table style="border-top:1px solid #989898; border-left:1px solid #989898; border-right:1px solid #989898; border-bottom:1px solid #989898;">
			<colgroup>
				<col width="30%">
				<col width="70%">
			</colgroup>
			<tr class="pop_grid pop_first">
				<td class="pop_gridSub" style="width:20%;">이관</td>
				<td>
					<div id="areaCode" class="pop_combo1" style="display: none"></div>
					<input type="text" class="pop_inputWrite" id="areaName" readonly="readonly" style="border: none;">
				</td>
			</tr>
			<tr class="pop_grid">
				<td class="pop_gridSub" style="width:20%;">이관사유</td>
				<td>
					<textarea id="moveReqCont" style="width: 97%; margin:5px; height: 100px;  resize:none; border: 1px solid #cccccc"></textarea>
				</td>
			</tr>
		</table>
	</div>

	<%-- 폐기 --%>
	<div id="disuseDiv" style="display: none" class="proessDiv">
		<table style="border-top:1px solid #989898; border-left:1px solid #989898; border-right:1px solid #989898; border-bottom:1px solid #989898;">
			<colgroup>
				<col width="30%">
				<col width="70%">
			</colgroup>
			<tr class="pop_grid pop_first">
				<td class="pop_gridSub" style="width:20%;">처리방법</td>
				<td>
					<input type="text" class="pop_inputWrite" id="" readonly="readonly" style="border: none;" value="폐기">
				</td>
			</tr>
			<tr class="pop_grid">
				<td class="pop_gridSub" style="width:20%;">폐기사유</td>
				<td>
					<textarea id="disuseCont" style="width: 97%; margin:5px; height: 100px;  resize:none; border: 1px solid #cccccc"></textarea>
				</td>
			</tr>
		</table>
	</div>

	<%-- 종결 --%>
	<div id="conclusionDiv" style="display: none" class="proessDiv">
		<table style="border-top:1px solid #989898; border-left:1px solid #989898; border-right:1px solid #989898; border-bottom:1px solid #989898;">
			<colgroup>
				<col width="30%">
				<col width="70%">
			</colgroup>
			<tr class="pop_grid pop_first">
				<td class="pop_gridSub" style="width:20%;">처리방법</td>
				<td>
					<div id="conclusionType" class="pop_combo1" ></div>
				</td>
			</tr>
			<tr class="pop_grid">
				<td class="pop_gridSub" style="width:20%;">종결사유</td>
				<td>
					<textarea id="conclusioCont" style="width: 97%; margin:5px; height: 100px;  resize:none; border: 1px solid #cccccc"></textarea>
				</td>
			</tr>
		</table>
	</div>

	<%-- 반려 --%>
	<div id="rejectDiv" style="display: none" class="proessDiv">
		<table style="border-top:1px solid #989898; border-left:1px solid #989898; border-right:1px solid #989898; border-bottom:1px solid #989898;">
			<colgroup>
				<col width="30%">
				<col width="70%">
			</colgroup>
			<tr class="pop_grid">
				<td class="pop_gridSub" style="width:20%;">반려사유</td>
				<td>
					<textarea id="rejectCont" style="width: 97%; margin:5px; height: 100px;  resize:none; border: 1px solid #cccccc"></textarea>
				</td>
			</tr>
		</table>
	</div>

	<%-- 오탐 --%>
	<div id="missDiv" style="display: none" class="proessDiv">
		<table style="border-top:1px solid #989898; border-left:1px solid #989898; border-right:1px solid #989898; border-bottom:1px solid #989898;">
			<colgroup>
				<col width="30%">
				<col width="70%">
			</colgroup>
			<tr class="pop_grid">
				<td class="pop_gridSub" style="width:20%;">오탐사유</td>
				<td>
					<textarea id="missCont" style="width: 97%; margin:5px; height: 100px;  resize:none; border: 1px solid #cccccc"></textarea>
				</td>
			</tr>
		</table>
	</div>

	<%-- 주의관제 --%>
	<div id="cautionDiv" style="display: none" class="proessDiv">
		<table style="border-top:1px solid #989898; border-left:1px solid #989898; border-right:1px solid #989898; border-bottom:1px solid #989898;">
			<colgroup>
				<col width="30%">
				<col width="70%">
			</colgroup>
			<tr class="pop_grid">
				<td class="pop_gridSub" style="width:20%;">주의관제사유</td>
				<td>
					<textarea id="cautionCont" style="width: 97%; margin:5px; height: 100px;  resize:none; border: 1px solid #cccccc"></textarea>
				</td>
			</tr>
		</table>
	</div>
	<%-- 시도의견 --%>
	<div id="sidoContDiv"  class="proessDiv">
		<table style="border-top:1px solid #989898; border-left:1px solid #989898; border-right:1px solid #989898; border-bottom:1px solid #989898;">
			<colgroup>
				<col width="30%">
				<col width="70%">
			</colgroup>
			<tr class="pop_grid">
				<td class="pop_gridSub" style="width:20%;">내용</td>
				<td>
					<textarea id="sidoCont" style="width: 97%; margin:5px; height: 300px;  resize:none; border: 1px solid #cccccc"></textarea>
				</td>
			</tr>
		</table>
	</div>
</form>


<div style="text-align: center; margin-top: 10px; margin-bottom: 10px">
	<button id="pbtn_save" type="button" class="p_btnSave"></button>
    <button id="pbtn_close" type="button" class="p_btnClose"></button>
</div>

<script type="text/javascript" src="${pageContext.request.contextPath }/js/main/popup/acc/pAccidentProcess.js"></script>