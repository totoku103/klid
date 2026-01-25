<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<script type="text/javascript" src="${pageContext.request.contextPath }/js/main/popup/acc/pAccidentAdd.js"></script>
<form id="p_form">
	<input type="hidden" id="esmSerNo">
	<input type="hidden" id="emlYN">
	<div class="pop_gridTitle">
		<img alt="bullet" src="${pageContext.request.contextPath}/img/MainImg/customer_bullet.png"> 기본정보
	</div>
	<table style="border: 1px solid #989898;">
		<colgroup>
			<col width="15%">
			<col width="35%">
			<col width="15%">
			<col width="35%">
		</colgroup>
		<tr class="pop_grid pop_first">
			<td class="pop_gridSub">사고일자(*)</td>
			<td>
				<div id="inciDt" class="pop_inputWrite4" style="float: left"></div>
				<div id="inciDt_HH" class="pop_combo1" style="float: left; margin-left: 4px;"></div>
				<div style="float: left">&nbsp;:&nbsp;</div>
				<div id="inciDt_MM" class="pop_combo1" style="float: left;"></div>
			</td>
			<td class="pop_gridSub">국정원 발송여부</td>
			<td><div id="gukYn" class="pop_inputWrite4" ></div></td>
		</tr>
		<tr class="pop_grid pop_first">
			<td class="pop_gridSub">사고제목(*)</td>
			<td><input type="text" id="inciTtl"  class="pop_inputWrite4" maxlength="100" style="width: 98%;" placeholder="사고제목을 입력해주세요"></td>
			<td class="pop_gridSub">탐지명(*)</td>
			<td><input type="text" id="inciDttNm"  class="pop_inputWrite4" maxlength="100" style="width: 98%;" placeholder="탐지명을 입력해주세요"></td>
		</tr>
		<tr class="pop_grid">
			<td class="pop_gridSub ">우선순위(*)</td>
			<td><div id="inciPrty" class="pop_inputWrite4"></div></td>

			<td class="pop_gridSub">망구분(*)</td>
			<td><div id="netDiv" class="pop_inputWrite4" ></div></td>
		</tr>
		<tr class="pop_grid">
			<td class="pop_gridSub">접수방법(*)</td>
			<td><div id="acpnMthd" class="pop_inputWrite4" ></div></td>
			<td class="pop_gridSub">침해등급(*)</td>
			<td><div id="riskLevel" class="pop_inputWrite4" ></div></td>
		</tr>
		<%--2021.01.05 요청 접수방법 지도/비지도 일때 심각도 추가--%>
		<tr class="pop_grid" id="acpnMthdSubDiv" style="display: none;">
			<td class="pop_gridSub">심각도</td>
			<td colspan="5"><div id="acpnMthdSub" class="pop_inputWrite4" ></div></td>
		</tr>
	</table>

	<div class="pop_gridTitle" >
	<img alt="bullet" src="${pageContext.request.contextPath}/img/MainImg/customer_bullet.png"> 신고기관 정보
</div>
	<table style="border : 1px solid #989898;">
		<colgroup>
			<col width="15%">
			<col width="35%">
			<col width="15%">
			<col width="35%">
		</colgroup>
		<tr class="pop_grid pop_first">
			<td class="pop_gridSub">신고기관</td>
			<td>
				<input type="text"  id="dclInstName"   class="pop_inputWrite4"  readonly="readonly" style="width: 98%; border: none;" >
			</td>
			<td class="pop_gridSub">비고</td>
			<td>
				<div id="remarks" class="pop_inputWrite4"></div>
			</td>
			<%--<td class="pop_gridSub" style="width: 15%;">인지기관</td>
			<td>
				<div id="recoInciCd" class="pop_inputWrite4 test" ></div>
			</td>--%>
		</tr>
		<tr class="pop_grid">
			<td class="pop_gridSub">담당자</td>
			<td>
				<input type="text"  id="dclCrgr"   class="pop_inputWrite4"  readonly="readonly" style="width: 98%; border: none;">
			</td>
			<td class="pop_gridSub">전화번호</td>
			<td  style="text-align:initial;">
				<%--<div id="dclTelNo_before" class="pop_inputWrite4 home" style="float: left;"></div>
				-
				<input type="text"  id="dclTelNo"  class="pop_inputWrite4" style="width: 80px;" maxlength="4" onkeyup="this.value=this.value.replace(/[^0-9]/g,'')">
				-
				<input type="text"  id="dclTelNo2"  class="pop_inputWrite4" style="width: 80px;" maxlength="4" onkeyup="this.value=this.value.replace(/[^0-9]/g,'')">--%>
				<input type="text"  id="dclTelNo"  class="pop_inputWrite4" style="width: 80px; border: none;" readonly="readonly">
			</td>
		</tr>
		<tr class="pop_grid">
			<td class="pop_gridSub">전자우편</td>
			<td colspan="3">
				<input type="text"  id="dclEmail" class="pop_inputWrite4"  style="width: 40.1%; float: left; border: none;" readonly="readonly"></td>
			</td>
			<%--<td class="pop_gridSub">이동전화번호</td>
			<td  style="text-align:initial;">
				<div id="dclHpNo_before" class="pop_inputWrite4 mobile" style="float: left; margin-right: 4px;"></div>
				-
				<input type="text"  id="dclHpNo1"  class="pop_inputWrite4" style="width: 40px;">
				-
				<input type="text"  id="dclHpNo2"  class="pop_inputWrite4" style="width: 40px;">
			</td>--%>
		</tr>
		<%--<tr class="pop_grid">
			<td class="pop_gridSub">비고</td>
			<td colspan="5"><input type="text" id="p_title"  class="pop_inputWrite4" style="width: 96%;" ></td>
		</tr>--%>
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
					<input type="text"  id="inciTarget"   class="pop_inputWrite4"  style="width: 98%;" placeholder="사고대상을 입력해주세요" >
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
	<table style="border :1px solid #989898;">
		<colgroup>
			<col width="11%">
			<col width="25%">
			<col width="11%">
			<col width="22%">
			<col width="11%">
			<col width="23%">
		</colgroup>
		<tr class="pop_grid pop_first">
			<%--<td class="pop_gridSub" style="min-width:90px">호스트이름</td>
			<td>
				<input type="text"  id="dmgSvrNm" class="pop_inputWrite3"  style="width: 96%;" >
			</td>
			<td class="pop_gridSub" style="min-width:90px">IP주소</td>
			<td>
				<input type="text"  id="dmgIp" class="pop_inputWrite3" placeholder="예: 192.168.123.132"  style="width: 60%;">
				<div style="float: right">
					<button type="button" id="ipAdd" class="p_btnPlus3"></button>
				</div>
			</td>--%>
			<td class="pop_gridSub" style="min-width:90px">피해기관(*)</td>
			<td>
				<div id="dmgInstCdArea" class="pop_inputWrite4">
					<div id="dmgInstCd" style="border: none;"></div>
				</div>
			</td>
			<td class="pop_gridSub" >사고유형(*)</td>
			<td>
				<div id="accdTypCd" class="pop_inputWrite4"></div>
			</td>
			<td class="pop_gridSub" >피해국가</td>
			<td>
				<input type="text"  id="dmgNatnName"   class="pop_inputWrite4"  readonly="readonly" style="width: 98%; border: none;" value="한국">
				<input type="hidden"  id="dmgNatnCd">
				<%--<div id="dmgNatnCdDiv" style="float: left; font-size: 12px; margin-top: 5px;"></div>
				<div style="float: right">
					<button id="pDmgNation" type="button" class="p_btn nation"></button>
				</div>--%>
			</td>
		</tr>

		<%-- 2021.06.11 사고유형-웹취약점 선택시 세부정보 입력추가	--%>
		<tr class="pop_grid" id="accdTypCdSubDiv" style="display: none;">
			<td colspan="3"class="pop_gridSub">웹취약점공격</td>
			<td colspan="2" style="text-align: left;"><div id="accdTypCdSub" ></div></td>
		</tr>

		<tr class="pop_grid"><!--pop_borderline-->
			<td class="pop_gridSub">담당자</td>
			<td>
				<input type="text"  id="dmgCrgr"   class="pop_inputWrite3"  style="width: 96%;" placeholder="담당자를 입력해주세요">
			</td>
			<td class="pop_gridSub" >부서명</td>
			<td>
				<input type="text"  id="dmgDept"  class="pop_inputWrite3"  style="width: 96%;" placeholder="부서명을 입력해주세요">
			</td>
			<td class="pop_gridSub">호스트용도</td>
			<td>
				<input type="text"  id="dmgSvrUsrNm"  class="pop_inputWrite3"  style="width: 96%;" placeholder="호스트용도를 입력해주세요">
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
				<input type="text"  id="dmgEmail"  class="pop_inputWrite3"  style="width: 96%;" placeholder="이메일주소를 입력해주세요">
			</td>
			<td class="pop_gridSub" >운영체제명</td>
			<td>
				<input type="text"  id="osNm"  class="pop_inputWrite3"  style="width: 96%;" placeholder="OS 종류를 입력해 주세요">
			</td>
		</tr>
		<tr class="pop_grid">
			<%--<td class="pop_gridSub">이동전화번호</td>
			<td style="text-align:initial;">
				<div id="dmgHpNo_before" class="pop_inputWrite4 mobile" style="float: left; margin-right: 4px;"></div>
				-
				<input type="text"  id="dmgHpNo1"  class="pop_inputWrite4" style="width: 40px;">
				-
				<input type="text"  id="dmgHpNo2"  class="pop_inputWrite4" style="width: 40px;">
			</td>--%>
			<%--<td class="pop_gridSub" style="min-width:90px">IP주소(*)</td>
			<td colspan="2">
				<div style="float: left">
					<input type="text" id="dmgIp" class="pop_inputWrite" style="width:125px; float: left;" onkeyup="this.value=this.value.replace(/[^0-9.]/g,'')" placeholder="000.000.000.000">
					<button type="button" id="ipAdd" class="p_btn" style="float: left"></button>
					<button id="checkDuplicate" type="button" class="p_btnDoubleCheck" style="float: left; display: none;"></button>
					&lt;%&ndash;<div id="srchType" class="pop_inputWrite4"style="float: left"></div>&ndash;%&gt;
					&lt;%&ndash;<button type="button" class="p_btn checkIp"></button>&ndash;%&gt;
					<span id="dmgIpName" class="dmgIpName" style="float: left"></span>
				</div>
			</td>
			<td colspan="3">

			</td>--%>
			<%-- IP중복 팝업 소스 --%>
			<td class="pop_gridSub" style="min-width:90px">IP주소(*)</td>
			<td>
				<div style="float: left">
					<input type="text" id="dmgIp" class="pop_inputWrite" style="width:125px; float: left;" onkeyup="this.value=this.value.replace(/[^0-9.]/g,'')" placeholder="000.000.000.000">
					<button type="button" id="ipAdd" class="p_btn" style="float: left"></button>
					<%--<button id="checkDuplicate" type="button" class="p_btnDoubleCheck" style="float: left; display: none;"></button>--%>
					<%--<div id="srchType" class="pop_inputWrite4"style="float: left"></div>--%>
					<%--<button type="button" class="p_btn checkIp"></button>--%>
					<span id="dmgIpName" class="dmgIpName" style="float: left"></span>
				</div>
			</td>
			<td>
				<button id="checkDuplicateByDcl" type="button" class="p_btnDoubleCheck" style="float: left;"></button>
			</td>
			<td>
				<div id="srchType" class="pop_inputWrite4 srchType" style="float: left"></div>
			</td>
		</tr>
	</table>


	<div class="pop_gridTitle">
		<img alt="bullet" src="${pageContext.request.contextPath}/img/MainImg/customer_bullet.png"> 공격시스템정보
	</div>
	<table style="border:1px solid #989898;">
		<colgroup>
			<col width="15%">
			<col width="25%">
			<col width="10%">
			<col width="30%">
		</colgroup>
		<tr class="pop_grid">
			<td class="pop_gridSub" style="min-width:90px">IP주소(*)</td>
			<td>
				<div style="float: left">
					<input type="text" id="attIp" class="pop_inputWrite" style="width:150px; float: left;" onkeyup="this.value=this.value.replace(/[^0-9.]/g,'')" placeholder="000.000.000.000">
					<button type="button" id="attIpAdd" class="p_btn"></button>
					<span id="ipName" class="ipName" style="float: left"></span>
				</div>
			</td>
			<td colspan="2">
				<div style="float: left">
				<button id="checkDuplicateByAtt" type="button" class="p_btnDoubleCheck" style="float: left;"></button>
				</div>
				<div style="float: left">
					<div id="srchTypeAtt" class="pop_inputWrite4 srchType" style="float: left"></div>
				</div>
			</td>
		</tr>
		<tr class="pop_grid">
			<td class="pop_gridSub" >공격국가</td>
			<td>
				<input type="hidden"  id="attNatnCd">
				<input type="text"  id="attNatnName"   class="pop_inputWrite4"  readonly="readonly" style="width: 98%; border: none;">
				<%--<div id="attNatnCdDiv" style="float: left; font-size: 12px; margin-top: 5px;"></div>
				<div style="float: right">
					<button id="pAttNation" type="button" class="p_btn nation"></button>
				</div>--%>
			</td>
			<td class="pop_gridSub">비고</td>
			<td>
				<input type="text"  id="attRemarks" class="pop_inputWrite3"  style="width: 96%;" placeholder="기타정보를 입력해주세요">
			</td>

		</tr>
		<%--<tr class="pop_grid">
			<td class="pop_gridSub" style="min-width:90px">IP주소(*)</td>
			<td colspan="4">
				<div>
					<input type="text" id="attIp" class="pop_inputWrite attIpClass" style="width:150px; float: left;">

					<button type="button" id="attIpAdd" class="p_btnPlus3" style="margin-left: -286px;"></button>
					<button type="button" class="p_btn checkIp"></button>
					<span id="ipName" class="ipName"></span>
				</div>
			</td>
		</tr>--%>
		<%--<tr class="pop_grid">
			<td class="pop_gridSub" style="min-width:90px">IP주소</td>
			<td colspan="5">
				<div>
					<input type="text" id="attIp" class="pop_inputWrite attIpClass" style="width:200px; float: left;">
					<button type="button" id="attIpAdd" class="p_btnPlus3" style="margin-left: -460px;"></button>
				</div>
			</td>
		</tr>--%>
		<%--<tr class="pop_grid pop_first">
			<td class="pop_gridSub" style="min-width:90px">호스트이름</td>
			<td>
				<input type="hidden"  id="">
				<input type="text"  id="attSvrNm" class="pop_inputWrite3"  style="width: 96%;">
			</td>
			<td class="pop_gridSub" style="min-width:90px">IP주소</td>
			<td>
				<input type="text"  id="attIp" class="pop_inputWrite3" placeholder="예: 192.168.123.132"  style="width: 96%;">
			</td>
			<td class="pop_gridSub" style="min-width:90px">공격기관</td>
			<td>
				<input type="text"  id="attInstNm" class="pop_inputWrite3"  style="width: 198px;">
			</td>
		</tr>
		<tr class="pop_grid">
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
		<tr class="pop_grid">
			<td class="pop_gridSub">전화번호</td>
			<td style="text-align:initial;">
				<div id="attTelNo_before" class="pop_inputWrite4 home" style="float: left; margin-right:4px;"></div>
				-
				<input type="text"  id="attTelNo1"  class="pop_inputWrite4" style="width: 40px;">
				-
				<input type="text"  id="attTelNo2"  class="pop_inputWrite4" style="width: 40px;">
			</td>
			<td class="pop_gridSub" >전자우편</td>
			<td>
				<input type="text"  id="attEmail"  class="pop_inputWrite3" style="width: 96%;" >
			</td>
			&lt;%&ndash;<td class="pop_gridSub">비고</td>&ndash;%&gt;

		</tr>--%>
	</table>

	<div class="pop_gridTitle">
		<img alt="bullet" src="${pageContext.request.contextPath}/img/MainImg/customer_bullet.png"> 사고/조사 내용
	</div>
	<table style="border : 1px solid #989898;">
		<colgroup>
			<col width="15%">
			<col width="85%">
		</colgroup>
		<tr class="pop_grid">
			<td class="pop_gridSub">사고내용(*)</td>
			<td>
				<textarea id="inciDclCont" style="width: 98%; height: 300px; margin:5px 0;  border: 1px solid #cccccc; resize:none;" placeholder="피해시간, 피해현황, 사고원인, 자료유출 여부, 개인정보 보유여부 등 시스템 피해현황을 입력해주세요"></textarea>
			</td>
		</tr>
		<tr class="pop_grid">
			<td class="pop_gridSub">조치내용</td>
			<td>
				<textarea id="inciInvsCont" style="width: 98%; margin:5px 0; height: 300px;  resize:none; border: 1px solid #cccccc" placeholder="방화벽차단 여부(시간), 네트워크 격리여부(시간), 시스템 분석 결과 등 조치사항을 입력해주세요"></textarea>
			</td>
		</tr>
		<tr class="pop_grid" style="display: none">
			<td class="pop_gridSub">시도의견</td>
			<td>
				<textarea id="inciBelowCont" style="width: 98%; margin:5px 0; height: 300px;  resize:none; border: 1px solid #cccccc" placeholder="시도의견을 입력해주세요"></textarea>
			</td>
		</tr>
	</table>
</form>

<div id="filePos">
	<%--<p class="fileColor">*첨부파일은 2개까지 첨부가능합니다</p>--%>
	<br>
	<div id="fileUpload"></div>
</div>

	<div style="text-align: center; margin-top: 10px; margin-bottom: 10px">
		<button id="btnImportEml" type="button" class="p_btnEml"/>
		<button id="btnImportExcel" type="button" class="p_btnExcelPut"/>
		<button id="pbtnAdd" type="button" class="p_btnSave"></button>
		<button id="pbtnClose" type="button" class="p_btnClose"></button>
	</div>

</form>