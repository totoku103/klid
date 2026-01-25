<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="com.klid.webapp.common.SessionManager"%>
<%
	String mainAuth = SessionManager.getUser().getAuthMain();
%>
<script type="text/javascript" src="${pageContext.request.contextPath }/js/main/popup/acc/pAccidentDetail.js"></script>
<form id="p_form">
	<div class="pop_gridTitle">
		<img alt="bullet" src="${pageContext.request.contextPath}/img/MainImg/customer_bullet.png"> 기본정보
	</div>
	<table style="border-top:1px solid #989898; border-left:1px solid #989898; border-right:1px solid #989898; border-bottom:1px solid #989898;">
		<colgroup>
			<col width="15%">
			<col width="35%">
			<col width="15%">
			<col width="35%">
		</colgroup>
		<tr class="pop_grid pop_first">
			<td class="pop_gridSub" style="width: 15%;">사고일자</td>
			<td style="width:30%;">
				<input type="text" class="pop_inputWrite" id="inciDt" readonly="readonly" style="border: none;">
			</td>
			<td class="pop_gridSub" style="width: 15%;">접수번호</td>
			<td>
				<input type="text" class="pop_inputWrite" id="inciNo" readonly="readonly" style="border: none;">
			</td>
		</tr>
		<tr class="pop_grid">
            <td class="pop_gridSub" style="width: 15%;">사고제목</td>
            <td>
                <input type="text" class="pop_inputWrite" id="inciTtl" readonly="readonly" style="border: none;">
            </td>
			<td class="pop_gridSub" style="width: 15%;">탐지명</td>
			<td>
				<input type="text" class="pop_inputWrite" id="inciDttNm" readonly="readonly" style="border: none;">
			</td>
			<%--<td class="pop_gridSub">망구분</td>
			<td>
				<input type="text" class="pop_inputWrite" id="netDiv" readonly="readonly" style="border: none;">
			</td>--%>
		</tr>
		<tr class="pop_grid">
			<td class="pop_gridSub">접수방법</td>
			<td>
				<input type="text" class="pop_inputWrite" id="acpnMthd" readonly="readonly" style="border: none;">
			</td>
			<td class="pop_gridSub">침해등급</td>
			<td>
				<input type="text" class="pop_inputWrite" id="riskLevel" readonly="readonly" style="border: none;">
			</td>
		</tr>
		<tr class="pop_grid">
			<td class="pop_gridSub ">우선순위</td>
			<td colspan="3">
				<input type="text" class="pop_inputWrite" id="inciPrty" readonly="readonly" style="border: none;">
			</td>
		</tr>
	</table>

	<div class="pop_gridTitle" >
		<img alt="bullet" src="${pageContext.request.contextPath}/img/MainImg/customer_bullet.png"> 신고기관 정보
	</div>
	<table style="border-top:1px solid #989898; border-left:1px solid #989898; border-right:1px solid #989898; border-bottom:1px solid #989898;">
		<colgroup>
			<col width="15%">
			<col width="35%">
			<col width="15%">
			<col width="35%">
		</colgroup>
		<tr class="pop_grid pop_first">
			<td class="pop_gridSub" style="width: 15%;">신고기관</td>
			<td style="width:30%;">
				<div id="dclInstArea" class="pop_inputWrite4">
					<input type="text" class="pop_inputWrite" id="dclInstCd" readonly="readonly" style="border: none;">
				</div>
			</td>
			<td class="pop_gridSub">비고</td>
			<td colspan="5">
				<input type="text" class="pop_inputWrite" id="remarks" readonly="readonly" style="border: none;">
			</td>
			<%--<td class="pop_gridSub" style="width: 15%;">인지기관</td>
			<td>
				<input type="text" class="pop_inputWrite" id="recoInciCd" readonly="readonly" style="border: none;">
			</td>--%>
		</tr>
		<tr class="pop_grid">
			<td class="pop_gridSub">담당자</td>
			<td>
				<input type="text" class="pop_inputWrite" id="dclCrgr" readonly="readonly" style="border: none;">
			</td>
			<td class="pop_gridSub">전화번호</td>
			<td >
				<input type="text" class="pop_inputWrite" id="dclTelNo" readonly="readonly" style="border: none;">
			</td>
		</tr>
		<tr class="pop_grid">
			<td class="pop_gridSub">전자우편</td>
			<td colspan="3">
				<input type="text" class="pop_inputWrite" id="dclEmail" readonly="readonly" style="border: none; margin-left: -15px;">
			</td>
			<%--<td class="pop_gridSub">이동전화번호</td>
			<td>
				<input type="text" class="pop_inputWrite" id="dclHpNo" readonly="readonly" style="border: none;">
			</td>--%>
		</tr>
	</table>

	<%-- 비고(해킹/취약점탐지)에 따른 세부정보 입력란 --%>
	<div class="pop_gridTitle" id="remarksTitle" style="display: none">
		<img alt="bullet" src="${pageContext.request.contextPath}/img/MainImg/customer_bullet.png"> 비고
	</div>
	<div id="remarksDiv1" style="display: none"> <%-- 비고: 해킹 일 경우 --%>
		<table style="border : 1px solid #989898;">
			<colgroup>
				<col width="15%">
				<col width="35%">
				<col width="15%">
				<col width="35%">
			</colgroup>
			<tr class="pop_grid pop_first">
				<td class="pop_gridSub">사고대상</td>
				<td>
					<input type="text"  id="inciTarget"   class="pop_inputWrite4"  style="width: 98%; border: none;" readonly="readonly">
				</td>
				<td class="pop_gridSub">공격유형</td>
				<td>
					<input type="text"  id="hackAttType"   class="pop_inputWrite4"  style="width: 98%; border: none;" readonly="readonly">
				</td>
			</tr>
			<tr class="pop_grid">
				<td class="pop_gridSub">망구분</td>
				<td>
					<input type="text"  id="hackNetDiv" class="pop_inputWrite4"  style="width: 99%; border: none;" readonly="readonly"></td>
				</td>
				<td class="pop_gridSub">도메인</td>
				<td  style="text-align:initial;">
					<input type="text"  id="hackDomainNm"   class="pop_inputWrite4"  style="width: 98%; border: none;" readonly="readonly">
				</td>
			</tr>
			<tr class="pop_grid">
				<td class="pop_gridSub">해킹내용</td>
				<td  style="text-align:initial;" colspan="5">
					<textarea id="hackCont" style="width: 98%; margin:5px 0; height: 100px;  resize:none; border: 1px solid #cccccc" readonly="readonly"></textarea>
				</td>
			</tr>
		</table>
	</div>

	<div id="remarksDiv2" style="display: none">	<%-- 비고: 취약점탐지 일 경우 --%>
		<table style="border : 1px solid #989898;">
			<colgroup>
				<col width="15%">
				<col width="85%">
			</colgroup>
			<tr class="pop_grid">
				<td class="pop_gridSub">공격유형</td>
				<td>
					<input type="text" class="pop_inputWrite" id="attackTypeName" readonly="readonly" style="border: none; float: left">
				</td>
			</tr>
			<tr class="pop_grid">
				<td class="pop_gridSub">조치사항</td>
				<td  style="text-align:initial;" colspan="5">
					<textarea id="homepvCont" style="width: 98%; margin:5px 0; height: 100px;  resize:none; border: 1px solid #cccccc" readonly="readonly"></textarea>
				</td>
			</tr>
		</table>
	</div>

	<div class="pop_gridTitle">
		<img alt="bullet" src="${pageContext.request.contextPath}/img/MainImg/customer_bullet.png"> 사고(피해)시스템 정보
	</div>
	<table style="border-top:1px solid #989898; border-left:1px solid #989898; border-right:1px solid #989898; border-bottom:1px solid #989898;">
		<colgroup>
			<col width="100">
			<col width="150">
			<col width="100">
			<col width="130">
			<col width="100">
			<col width="170">
		</colgroup>
		<tr class="pop_grid pop_first">
			<td class="pop_gridSub" style="min-width:90px;">피해기관</td>
			<td>
				<input type="text" class="pop_inputWrite" id="dmgInstCd" readonly="readonly" style="border: none;">
			</td>
			<td class="pop_gridSub" >사고유형</td>
			<td>
				<input type="text" class="pop_inputWrite" id="accdTypCd" readonly="readonly" style="border: none;">
			</td>
			<td class="pop_gridSub" >피해국가</td>
			<td>
				<input type="text" class="pop_inputWrite" id="dmgNatnNm" readonly="readonly" style="border: none;">
			</td>
		</tr>
		<tr class="pop_grid">
			<td class="pop_gridSub">담당자</td>
			<td>
				<input type="text" class="pop_inputWrite" id="dmgCrgr" readonly="readonly" style="border: none;">
			</td>
			<td class="pop_gridSub" >부서명</td>
			<td>
				<input type="text" class="pop_inputWrite" id="dmgDept" readonly="readonly" style="border: none;">
			</td>
			<td class="pop_gridSub">호스트용도</td>
			<td>
				<input type="text" class="pop_inputWrite" id="dmgSvrUsrNm" readonly="readonly" style="border: none;">
			</td>
		</tr>
		<tr class="pop_grid">
			<td class="pop_gridSub">전화번호</td>
			<td >
				<input type="text" class="pop_inputWrite" id="dmgTelNo" readonly="readonly" style="border: none;">
			</td>
			<td class="pop_gridSub">전자우편</td>
			<td>
				<input type="text" class="pop_inputWrite" id="dmgEmail" readonly="readonly" style="border: none;">
			</td>
			<td class="pop_gridSub" >운영체제명</td>
			<td>
				<input type="text" class="pop_inputWrite" id="osNm" readonly="readonly" style="border: none;">
			</td>
		</tr>
		<tr class="pop_grid">
			<td class="pop_gridSub">IP주소</td>
			<td colspan="5">
				<input type="text" class="pop_inputWrite" id="dmgIp" readonly="readonly" style="border: none; float: left">
			</td>
		</tr>
	</table>


	<div class="pop_gridTitle">
		<img alt="bullet" src="${pageContext.request.contextPath}/img/MainImg/customer_bullet.png"> 공격시스템정보
	</div>
	<table style="border-top:1px solid #989898; border-left:1px solid #989898; border-right:1px solid #989898; border-bottom:1px solid #989898;">
		<colgroup>
			<col width="100">
			<col width="150">
			<col width="100">
			<col width="130">
			<col width="100">
			<col width="170">
		</colgroup>
		<tr class="pop_grid pop_first">
			<td class="pop_gridSub" >공격국가</td>
			<td>
				<input type="text" class="pop_inputWrite" id="attNatnNm" readonly="readonly" style="border: none;">
			</td>
			<td class="pop_gridSub">IP주소</td>
			<td>
				<input type="text" class="pop_inputWrite" id="attIp" readonly="readonly" style="border: none;">
			</td>
			<td class="pop_gridSub" >비고</td>
			<td>
				<input type="text" class="pop_inputWrite" id="attRemarks" readonly="readonly" style="border: none;">
			</td>
		</tr>
		<%--<tr class="pop_grid pop_borderline">
			<td class="pop_gridSub">담당자</td>
			<td>
				<input type="text" class="pop_inputWrite" id="attCrgr" readonly="readonly" style="border: none;">
			</td>
			<td class="pop_gridSub" >부서명</td>
			<td>
				<input type="text" class="pop_inputWrite" id="attDept" readonly="readonly" style="border: none;">
			</td>
			<td class="pop_gridSub" >공격국가</td>
			<td>
				<div id="" class="pop_inputWrite4 test"></div>
				<input type="text" class="pop_inputWrite" id="attNatnNm" readonly="readonly" style="border: none;">
			</td>
		</tr>
		<tr class="pop_grid pop_borderline">
			<td class="pop_gridSub" >공격유형</td>
			<td>
				<input type="text" class="pop_inputWrite" id="attTypCd" readonly="readonly" style="border: none;">
			</td>
			<td class="pop_gridSub">공격루트</td>
			<td>
				<input type="text" class="pop_inputWrite" id="attVia" readonly="readonly" style="border: none;">
			</td>
			<td class="pop_gridSub" >세부루트</td>
			<td>
				<input type="text" class="pop_inputWrite" id="attDtlsVia" readonly="readonly" style="border: none;">
			</td>
		</tr>
		<tr class="pop_grid pop_borderline">
			<td class="pop_gridSub">전화번호</td>
			<td >
				<input type="text" class="pop_inputWrite" id="attTelNo" readonly="readonly" style="border: none;">
			</td>
			<td class="pop_gridSub" >전자우편</td>
			<td colspan="3">
				<input type="text" class="pop_inputWrite" id="attEmail" readonly="readonly" style="border: none;">
			</td>
			&lt;%&ndash;<td class="pop_gridSub">비고</td>
			<td>
				 <input type="text" class="pop_inputWrite" id="remarks" readonly="readonly" style="border: none;">
			</td>&ndash;%&gt;
		</tr>--%>
	</table>

	<div class="pop_gridTitle">
		<img alt="bullet" src="${pageContext.request.contextPath}/img/MainImg/customer_bullet.png"> 사고/조사 내용
	</div>
	<table style="border-top:1px solid #989898; border-left:1px solid #989898; border-right:1px solid #989898; border-bottom:1px solid #989898;">
		<colgroup>
			<col width="20%">
			<col width="80%">
		</colgroup>
		<tr class="pop_grid">
			<td class="pop_gridSub">사고내용</td>
			<td >
				<textarea id="inciDclCont" style="width: 97.5%; height: 300px; margin:5px;  border: 1px solid #cccccc; resize:none;" readonly="readonly"></textarea>
			</td>
		</tr>
		<tr class="pop_grid">
			<td class="pop_gridSub">조치내용</td>
			<td >
				<textarea id="inciInvsCont" style="width: 97.5%; margin:5px; height: 300px;  resize:none; border: 1px solid #cccccc" readonly="readonly"></textarea>
			</td>
		</tr>
		<tr class="pop_grid">
			<td class="pop_gridSub">시도의견</td>
			<td >
				<textarea id="inciBelowCont" style="width: 97.5%; margin:5px; height: 300px;  resize:none; border: 1px solid #cccccc" readonly="readonly"></textarea>
			</td>
		</tr>
		<%--<tr class="pop_grid">
			<td class="pop_gridSub">첨부파일</td>
			<td style="text-align: left">
				<ul id="attachFileList"></ul>
			</td>
		</tr>--%>
		<tr class="pop_grid" id="attachTr">
			<td class="pop_gridSub">처리방안 첨부파일</td>
			<td style="text-align: left">
				<ul id="attachFileList2"></ul>
			</td>
		</tr>
	</table>
</form>
	<div class="filePos">
		<div id="fileUpload"></div>
	</div>

	<div class="pop_gridTitle">
		<img alt="bullet" src="${pageContext.request.contextPath}/img/MainImg/customer_bullet.png"> 히스토리
	</div>
	<div id="historyGrid"></div>


	<%--<div style="text-align: left; margin-top: 10px; margin-bottom: 10px">--%>
	<div class="p_btnPos" style="margin-top: 10px;">
		<button id="hwpDownload" type="button" class="p_btnHwp"></button>							<%-- 한글다운로드 --%>

		<%--<button id="memo" type="button" class="p_btnMemo"></button>--%>									<%-- 메모 --%>

		<%if(mainAuth.equals("AUTH_MAIN_2")) {%>
			<button id="assign" 	type="button" class="p_btnAssign" style="display: none"></button> 			<%-- 할당 --%>
			<button id="moveReq" 	type="button" class="p_btnTrans" style="display: none"></button>				<%-- 이관승인요청 --%>
			<button id="moveApp" 	type="button" class="p_btnTAcc" style="display: none"></button>				<%-- 이관승인 --%>
			<button id="disuse" 	type="button" class="p_btnDiss" style="display: none"></button>				<%-- 폐기승인요청 --%>
			<button id="disuseApp" 	type="button" class="p_btnDAcc" style="display: none"></button>		<%-- 폐기종결 --%>
			<button id="conclusion" type="button" class="p_btnFinish" style="display: none"></button>				<%-- 종결 --%>
			<button id="conclusionApp" type="button" class="p_btnFAcc" style="display: none"></button>			<%-- 종결승인 --%>
			<button id="reject" 	type="button" class="p_btnReturn" style="display: none"></button>				<%-- 번려 --%>
			<button id="miss" 		type="button" class="p_BtnError" style="display: none"></button>				<%-- 오탐승인요청 --%>
			<button id="missApp" 	type="button" class="p_btnEAcc" style="display: none"></button>				<%-- 오탐종결 --%>
			<button id="caution" 	type="button" class="p_btnCaution" style="display: none"></button>			<%-- 주의관제승인요청 --%>
			<button id="cautionApp" type="button" class="p_btnCAcc" style="display: none"></button>				<%-- 주의관제종결 --%>

			<button id="reject_high" type="button" class="p_btnReturn" style="display: none"></button> 			<%--  시 상태에 대한 개발원 반려 --%>
		<%} %>

		<%if(mainAuth.equals("AUTH_MAIN_3")) {%>
			<button id="pSidoCont" type="button" class="p_btnCont"></button>							<%-- 시도의견 --%>
			<button id="moveReqToSiGu" 	type="button" class="p_btnTrans" style="display: none"></button> 			<%-- 이관(시군구) --%>
			<button id="moveAppToSiGu" 	type="button" class="p_btnTAcc" style="display: none"></button>		 	<%-- 이관승인(시군구) --%>

			<%--시도 관련 버튼--%>
			<button id="assign_si" 		type="button" class="p_btnAssign" style="display: none"></button>
			<button id="disuse_si" 		type="button" class="p_btnDiss" style="display: none"></button>
			<button id="disuseApp_si" 	type="button" class="p_btnDAcc" style="display: none"></button>
			<button id="conclusion_si" 	type="button" class="p_btnFinish" style="display: none"></button>
			<button id="conclusionApp_si" type="button" class="p_btnFAcc" style="display: none"></button>
			<button id="reject_si" 		type="button" class="p_btnReturn" style="display: none"></button>
			<button id="miss_si" 		type="button" class="p_BtnError" style="display: none"></button>
			<button id="missApp_si" 	type="button" class="p_btnEAcc" style="display: none"></button>
			<button id="caution_si" 	type="button" class="p_btnCaution" style="display: none"></button>
			<button id="cautionApp_si" 	type="button" class="p_btnCAcc" style="display: none"></button>

			<button id="reject_high_si" type="button" class="p_btnReturn" style="display: none"></button> <%-- 시군구 상태에 대한 시 반려 --%>
		<%} %>

		<%if(mainAuth.equals("AUTH_MAIN_4")) {%>
			<%-- 시군구 관련 버튼 --%>
			<button id="assign_sido" 		type="button" class="p_btnAssign" style="display: none"></button>
			<button id="disuse_sido" 		type="button" class="p_btnDiss" style="display: none"></button>
			<button id="disuseApp_sido" 	type="button" class="p_btnDAcc" style="display: none"></button>
			<button id="conclusion_sido" 	type="button" class="p_btnFinish" style="display: none"></button>
			<button id="conclusionApp_sido" type="button" class="p_btnFAcc" style="display: none"></button>
			<button id="reject_sido" 		type="button" class="p_btnReturn" style="display: none"></button>
			<button id="miss_sido" 			type="button" class="p_BtnError" style="display: none"></button>
			<button id="missApp_sido" 		type="button" class="p_btnEAcc" style="display: none"></button>
			<button id="caution_sido" 		type="button" class="p_btnCaution" style="display: none"></button>
			<button id="cautionApp_sido" 	type="button" class="p_btnCAcc" style="display: none"></button>
		<%} %>
		<button id="pbtnClose" type="button" class="p_btnClose" style="float: right"></button>
		<button id="pbtnAdd" type="button" class="p_btnSave" style="float: right"></button>
	</div>
