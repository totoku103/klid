<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<script type="text/javascript" src="${pageContext.request.contextPath }/js/main/popup/acc/pAccidentEdit.js"></script>
<form id="p_form">
	<div class="pop_gridTitle">
		<img alt="bullet" src="${pageContext.request.contextPath}/img/MainImg/customer_bullet.png"> 기본정보
	</div>
	<table style="border-top:1px solid #989898; border-left:1px solid #989898; border-right:1px solid #989898; border-bottom:1px solid #989898;">
		<colgroup>
			<col width="100">
			<col width="165">
			<col width="100">
			<col width="125">
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
				<input type="text" class="pop_inputWrite" id="inciTtl" placeholder="사고제목을 입력해주세요">
			</td>
			<td class="pop_gridSub" style="width: 15%;">탐지명</td>
			<td>
				<input type="text" class="pop_inputWrite" id="inciDttNm" placeholder="탐지명을 입력해주세요">
			</td>
			<%--<td class="pop_gridSub">망구분</td>
			<td>
				<input type="text" class="pop_inputWrite" id="netDiv" readonly="readonly" style="border: none;">
			</td>--%>
		</tr>
		<tr class="pop_grid">
			<td class="pop_gridSub">접수방법</td>
			<td>
				<input type="text" class="pop_inputWrite" id="acpnMthdName" readonly="readonly" style="border: none;">
			</td>
			<td class="pop_gridSub">침해등급</td>
			<td>
				<input type="text" class="pop_inputWrite" id="riskLevelName" readonly="readonly" style="border: none;">
			</td>
		</tr>
		<tr class="pop_grid">
			<td class="pop_gridSub ">우선순위</td>
			<td colspan="3">
				<input type="text" class="pop_inputWrite" id="inciPrtyName" readonly="readonly" style="border: none; float: left;">
			</td>
		</tr>
	</table>

	<div class="pop_gridTitle" >
		<img alt="bullet" src="${pageContext.request.contextPath}/img/MainImg/customer_bullet.png"> 신고기관 정보
	</div>
	<table style="border-top:1px solid #989898; border-left:1px solid #989898; border-right:1px solid #989898; border-bottom:1px solid #989898;">
		<colgroup>
			<col width="100">
			<col width="165">
			<col width="100">
			<col width="125">
		</colgroup>
		<tr class="pop_grid pop_first">
			<td class="pop_gridSub" style="width: 15%;">신고기관</td>
			<td style="width:30%;">
				<div id="dclInstArea" class="pop_inputWrite4">
					<input type="text" class="pop_inputWrite" id="dclInstName" readonly="readonly" style="border: none;">
				</div>
			</td>
			<td class="pop_gridSub">비고</td>
			<td colspan="5">
				<input type="text" class="pop_inputWrite" id="remarks" readonly="readonly" style="border: none;">
				<input type="hidden" id="remarksCd">
			</td>
			<%--<td class="pop_gridSub" style="width: 15%;">인지기관</td>
			<td>
				<input type="text" class="pop_inputWrite" id="recoInciName" readonly="readonly" style="border: none;">
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
				<input type="text" class="pop_inputWrite" id="dclEmail" readonly="readonly" style="border: none; float: left">
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
					<input type="text"  id="inciTarget"   class="pop_inputWrite4"  style="width: 98%;" placeholder="사고대상을 입력해주세요">
				</td>
				<td class="pop_gridSub">공격유형</td>
				<td>
					<div id="hackAttTypeCd" class="pop_inputWrite4" style="float: left"></div>
					<input type="text"  id="hackAttTypeSelf" class="pop_inputWrite4"  style="width: 145px; float: left; margin-left: 5px;"></td>
				</td>
			</tr>
			<tr class="pop_grid">
				<td class="pop_gridSub">망구분</td>
				<td>
				<div id="hackNetDiv" class="pop_inputWrite4" style="float: left"></div>
				</td>
				<td class="pop_gridSub">도메인</td>
				<td  style="text-align:initial;">
					<input type="text"  id="hackDomainNm"   class="pop_inputWrite4"  style="width: 98%;" placeholder="홈페이지 인 경우 접속 주소를 입력해 주세요" >
				</td>
			</tr>
			<tr class="pop_grid">
				<td class="pop_gridSub">운영현황</td>
				<td  style="text-align:initial;" colspan="5">
					<textarea id="hackCont" style="width: 98%; margin:5px 0; height: 100px;  resize:none; border: 1px solid #cccccc" placeholder="시스템 구축 시기. 피해 확인경로(신고.관제 등), 시스템 위치(본청, IDC), 보안장비 구축 현황, 웹 호스팅 여부 등 관련 로그, 피해 증상 등 운영현황을 입력해 주세요"></textarea>
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
					<div id="attackTypeCd" class="pop_inputWrite4"></div>
				</td>
			</tr>
			<tr class="pop_grid">
				<td class="pop_gridSub">조치사항</td>
				<td  style="text-align:initial;" colspan="5">
					<textarea id="homepvCont" style="width: 98%; margin:5px 0; height: 100px;  resize:none; border: 1px solid #cccccc" placeholder="조치사항을 입력해주세요"></textarea>
				</td>
			</tr>
		</table>
	</div>

	<div class="pop_gridTitle">
		<img alt="bullet" src="${pageContext.request.contextPath}/img/MainImg/customer_bullet.png"> 사고(피해)시스템 정보
	</div>
	<table style="border-top:1px solid #989898; border-left:1px solid #989898; border-right:1px solid #989898; border-bottom:1px solid #989898;">
		<colgroup>
			<col width="11%">
			<col width="25%">
			<col width="11%">
			<col width="22%">
			<col width="11%">
			<col width="23%">
		</colgroup>
		<tr class="pop_grid pop_first">
			<td class="pop_gridSub" style="min-width:90px;">피해기관</td>
			<td>
				<input type="text" class="pop_inputWrite" id="dmgInstName" readonly="readonly" style="border: none;">
				<div id="dmgInstCdArea" class="pop_inputWrite4">
					<div id="dmgInstCd" style="border: none;"></div>
				</div>
			</td>
			<td class="pop_gridSub" >사고유형</td>
			<td>
				<div id="accdTypCd" class="pop_inputWrite4"></div>
			</td>
			<td class="pop_gridSub" >피해국가</td>
			<td>
				<input type="hidden"  id="dmgNatnCd">
				<div id="dmgNatnCdDiv" style="float: left; font-size: 12px; margin-top: 5px;"></div>
				<%--
				<div style="float: right">
					<button id="pDmgNation" type="button" class="p_btn nation"></button>
				</div>--%>
			</td>
		</tr>

		<tr class="pop_grid" id="accdTypCdSubDiv" style="display: ;">
			<td colspan="2"class="pop_gridSub">사고유형(웹취약점공격)</td>
			<td colspan="2"><div id="accdTypCdSub" class="pop_inputWrite4" ></div></td>
		</tr>

		<tr class="pop_grid">
			<td class="pop_gridSub">담당자</td>
			<td>
				<input type="text"  id="dmgCrgr"   class="pop_inputWrite3" style="width: 96%;" placeholder="담당자를 입력해주세요">
			</td>
			<td class="pop_gridSub" >부서명</td>
			<td>
				<input type="text"  id="dmgDept"  class="pop_inputWrite3" style="width: 96%;" placeholder="부서명을 입력해주세요">
			</td>
			<td class="pop_gridSub">호스트용도</td>
			<td>
				<input type="text"  id="dmgSvrUsrNm"  class="pop_inputWrite3" style="width: 96%;" placeholder="호스트용도를 입력해주세요">
			</td>
		</tr>
		<tr class="pop_grid">
			<td class="pop_gridSub">전화번호</td>
			<td  style="text-align:initial;">
				<div id="dmgTelNo_before" class="pop_inputWrite4 home" style="float: left;"></div>
				-
				<input type="text"  id="dmgTelNo1"  class="pop_inputWrite4" style="width: 40px;" maxlength="4" onkeyup="this.value=this.value.replace(/[^0-9]/g,'')" placeholder="0000">
				-
				<input type="text"  id="dmgTelNo2"  class="pop_inputWrite4" style="width: 40px;" maxlength="4" onkeyup="this.value=this.value.replace(/[^0-9]/g,'')" placeholder="0000">
			</td>
			<td class="pop_gridSub">전자우편</td>
			<td>
				<input type="text"  id="dmgEmail"  class="pop_inputWrite3" style="width: 96%;" placeholder="이메일주소를 입력해주세요">
			</td>
			<td class="pop_gridSub" >운영체제명</td>
			<td>
				<input type="text"  id="osNm"  class="pop_inputWrite3" style="width: 96%;" placeholder="OS 종류를 입력해 주세요">
			</td>
		</tr>
		<tr class="pop_grid">
			<%--<td class="pop_gridSub">이동전화번호</td>
			<td>
				<div id="dmgHpNo_before" class="pop_inputWrite4 mobile" style="float: left; margin-right: 5px;"></div>
				-
				<input type="text"  id="dmgHpNo1"  class="pop_inputWrite4" style="width: 40px;">
				-
				<input type="text"  id="dmgHpNo2"  class="pop_inputWrite4" style="width: 40px;">
			</td>--%>
			<td class="pop_gridSub" style="min-width:97px">IP주소</td>
			<td id="ipTr" colspan="1">
				<div style="float: left;">
					<%--<input type="text" id="dmgIp" class="pop_inputWrite" style="width:125px; float: left;" onkeyup="this.value=this.value.replace(/[^0-9.]/g,'')" placeholder="000.000.000.000">
					<button type="button" id="ipAdd" class="p_btn" style="float: left"></button>--%>
					<span id="dmgIpName" class="dmgIpName" style="float: left;"></span>
				</div>
			</td>
			<td colspan="5">

			</td>
		</tr>
		<%--<tr class="pop_grid">
			<td class="pop_gridSub" style="min-width:90px">IP주소</td>
			<td colspan="5" id="ipTr">
				<div>
					<input type="text" id="dmgIp" class="pop_inputWrite ipClass ipInput" style="width:240px; float: left;">
					<button type="button" id="ipAdd" class="p_btnPlus3" style="margin-left: -460px;"></button>
				</div>
			</td>
		</tr>--%>
	</table>


	<div class="pop_gridTitle">
		<img alt="bullet" src="${pageContext.request.contextPath}/img/MainImg/customer_bullet.png"> 공격시스템정보
	</div>
	<table style="border-top:1px solid #989898; border-left:1px solid #989898; border-right:1px solid #989898; border-bottom:1px solid #989898;">
		<colgroup>
			<col width="10%">
			<col width="25%">
			<col width="10%">
			<col width="25%">
			<col width="10%">
			<col width="20%">
		</colgroup>
		<tr class="pop_grid pop_first">
			<td class="pop_gridSub">공격국가</td>
			<td>
				<input type="hidden"  id="attNatnCd">
				<div id="attNatnCdDiv" style="float: left; font-size: 12px; margin-top: 5px;"></div>
				<%--<div id="attNatnCdDiv" style="float: left; font-size: 12px; margin-top: 5px;"></div>
				<div style="float: right;">
					<button id="pAttNation" type="button" class="p_btn nation"></button>
				</div>--%>
			</td>
			<td class="pop_gridSub" style="min-width:90px">IP주소</td>
			<td id="attIpTr">
				<div style="float: left">
					<%--<input type="text" id="attIp" class="pop_inputWrite" style="width:150px; float: left;" onkeyup="this.value=this.value.replace(/[^0-9.]/g,'')" placeholder="000.000.000.000">
					<button type="button" id="attIpAdd" class="p_btn"></button>--%>
					<span id="ipName" class="ipName" style="float: left"></span>
				</div>
			</td>
			<td class="pop_gridSub">비고</td>
			<td>
				<input type="text"  id="attRemarks" class="pop_inputWrite3"  style="width: 96%;" placeholder="기타정보를 입력해주세요">
			</td>
		</tr>
		<%--<tr class="pop_grid pop_first">
			<td class="pop_gridSub" style="width: 25%;">호스트이름</td>
			<td>
				<input type="hidden"  id="">
				<input type="text"  id="attSvrNm" class="pop_inputWrite3" >
			</td>
			<td class="pop_gridSub" style="width: 25%;">IP주소</td>
			<td>
				<input type="text"  id="attIp" class="pop_inputWrite3" placeholder="예: 192.168.123.132" >
			</td>
			<td class="pop_gridSub" style="width: 25%;">공격기관</td>
			<td>
				<input type="text"  id="attInstNm" class="pop_inputWrite3">
			</td>
		</tr>
		<tr class="pop_grid pop_borderline">
			<td class="pop_gridSub">담당자</td>
			<td>
				<input type="text"  id="attCrgr"  class="pop_inputWrite3" >
			</td>
			<td class="pop_gridSub" >부서명</td>
			<td>
				<input type="text"  id="attDept"  class="pop_inputWrite3" >
			</td>
			<td class="pop_gridSub" >공격국가</td>
			<td>
				<div id="attNatnCdDiv" style="float: left; font-size: 12px; margin-top: 5px;"></div>
				<input type="hidden"  id="attNatnCd">
				<div style="float: right">
					<button id="pAttNation" type="button" class="p_btn nation"></button>
				</div>
			</td>
		</tr>
		<tr class="pop_grid pop_borderline">
			<td class="pop_gridSub" >공격유형</td>
			<td>
				<div id="attTypCd" class="pop_inputWrite4"></div>
			</td>
			<td class="pop_gridSub">공격루트</td>
			<td>
				<div id="attVia" class="pop_inputWrite4"></div>
			</td>
			<td class="pop_gridSub" >세부루트</td>
			<td>
				<div id="attDtlsVia" class="pop_inputWrite4"></div>
			</td>
		</tr>
		<tr class="pop_grid pop_borderline">
			<td class="pop_gridSub">전화번호</td>
			<td >
				<div id="attTelNo_before" class="pop_inputWrite4 home" style="float: left; margin-right: 5px;"></div>
				-
				<input type="text"  id="attTelNo1"  class="pop_inputWrite4" style="width: 40px;">
				-
				<input type="text"  id="attTelNo2"  class="pop_inputWrite4" style="width: 40px;">
			</td>
			<td class="pop_gridSub" >전자우편</td>
			<td>
				<input type="text"  id="attEmail"  class="pop_inputWrite3" >
			</td>
		</tr>--%>
	</table>

	<div class="pop_gridTitle">
		<img alt="bullet" src="${pageContext.request.contextPath}/img/MainImg/customer_bullet.png"> 사고/조사 내용
	</div>
	<table style="border-top:1px solid #989898; border-left:1px solid #989898; border-right:1px solid #989898; border-bottom:1px solid #989898;">
		<colgroup>
			<col width="15%">
			<col width="85%">
		</colgroup>
		<tr class="pop_grid">
			<td class="pop_gridSub">사고내용</td>
			<td>
				<textarea id="inciDclCont" style="width: 97.5%; height: 300px; margin:5px;  border: 1px solid #cccccc; resize:none;" placeholder="피해시간, 피해현황, 사고원인, 자료유출 여부, 개인정보 보유여부 등 시스템 피해현황을 입력해주세요"></textarea>
			</td>
		</tr>
		<tr class="pop_grid">
			<td class="pop_gridSub">조치내용</td>
			<td>
				<textarea id="inciInvsCont" style="width: 97.5%; margin:5px; height: 300px;  resize:none; border: 1px solid #cccccc" placeholder="방화벽차단 여부(시간), 네트워크 격리여부(시간), 시스템 분석 결과 등 조치사항을 입력해주세요"></textarea>
			</td>
		</tr>
		<tr class="pop_grid">
			<td class="pop_gridSub">시도의견</td>
			<td>
				<textarea id="inciBelowCont" style="width: 97.5%; margin:5px; height: 300px;  resize:none; border: 1px solid #cccccc" placeholder="시도의견을 입력해주세요" readonly></textarea>
			</td>
		</tr>
		<%--<tr class="pop_grid">
			<td class="pop_gridSub">첨부파일</td>
			<td colspan="6">
				<ul id="attachFileList"></ul>
			</td>
		</tr>--%>
	</table>
</form>

<div id="filePos">
	<%--<p class="fileColor">*첨부파일은 2개까지 첨부가능합니다</p>--%>
	<br>
	<div id="fileUpload"></div>
</div>

<div style="text-align: center; margin-top: 10px; margin-bottom: 10px">
    <button id="p_btnEdit" type="button" class="p_btnSave"></button>
    <button id="pbtnClose" type="button" class="p_btnClose"></button>
</div>