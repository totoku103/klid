<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<form id="userDetailForm" name="userDetailForm" action="">
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
		<tr class="pop_grid">
			<td class="pop_gridSub">사용자 아이디</td>
			<td>
				<input type="text"  name="userId" id="userId"  readonly="readonly" style="border: none;">
			</td>
			<td class="pop_gridSub">이름</td>
			<td>
				<input type="text"  name="userName" id="userName"  readonly="readonly" style="border: none;">
			</td>
		</tr>
		<tr class="pop_grid">
			<td class="pop_gridSub">소속기관</td>
			<td>
				<input type="text"  name="instNm" id="instNm"  readonly="readonly" style="border: none;">
			</td>
			<td class="pop_gridSub">직급</td>
			<td>
				<input type="text"  name="grade" id="grade"  readonly="readonly" style="border: none;">
			</td>
		</tr>
		<tr class="pop_grid">
			<td class="pop_gridSub">사용여부</td>
			<td>
				<input type="text"  name="useYn" id="useYn"  readonly="readonly" style="border: none;">
			</td>
			<td class="pop_gridSub">지원센터사용자여부</td>
			<td>
				<input type="text"  name="centerUserYn" id="centerUserYn"  readonly="readonly" style="border: none;">
			</td>
		</tr>
	</table>

	<div class="pop_gridTitle" >
		<img alt="bullet" src="${pageContext.request.contextPath}/img/MainImg/customer_bullet.png"> 연락처 정보
	</div>
	<table style="border : 1px solid #989898;">
		<colgroup>
			<col width="15%">
			<col width="35%">
			<col width="15%">
			<col width="35%">
		</colgroup>
		<tr class="pop_grid">
			<td class="pop_gridSub">사무실 전화번호</td>
			<td  style="text-align:initial;">
				<input type="text"  id="offcTelNo"  readonly="readonly" style="border: none;">
			</td>
			<td class="pop_gridSub">사무실 팩스번호</td>
			<td  style="text-align:initial;">
				<input type="text"  id="offcFaxNo"  readonly="readonly" style="border: none;">
			</td>
		</tr>
		<tr class="pop_grid">
			<td class="pop_gridSub">휴대폰 번호</td>
			<td  style="text-align:initial;">
				<input type="text"  id="moblPhnNo"  readonly="readonly" style="border: none;">
			</td>
			<td class="pop_gridSub">자택 전화번호</td>
			<td  style="text-align:initial;">
				<input type="text"  id="homeTelNo"  readonly="readonly" style="border: none;">
			</td>
		</tr>
		<tr class="pop_grid">
			<td class="pop_gridSub">이메일 수신여부</td>
			<td>
				<input type="text"  id="emaiYn"  readonly="readonly" style="border: none;">
			</td>
			<td class="pop_gridSub">SMS 수신여부</td>
			<td>
				<input type="text"  id="smsYn"  readonly="readonly" style="border: none;">
			</td>
		</tr>
		<tr class="pop_grid">
			<td class="pop_gridSub ">이메일 주소</td>
			<td colspan="3">
				<div style="float: left;">
					<input type="text"  id="emailAddr"  readonly="readonly" style="border: none;">
				</div>
			</td>
		</tr>
	</table>

	<div class="pop_gridTitle" >
		<img alt="bullet" src="${pageContext.request.contextPath}/img/MainImg/customer_bullet.png"> 권한설정
	</div>
	<table style="border : 1px solid #989898;">
		<colgroup>
			<col width="15%">
			<col width="50%">
		</colgroup>
		<tr class="pop_grid">
			<td class="pop_gridSub">권한1</td>
			<td><div id="" class="pop_inputWrite4" ></div></td>
		</tr>
		<tr class="pop_grid">
			<td class="pop_gridSub">권한2</td>
			<td><div id="" class="pop_inputWrite4" ></div></td>
		</tr>
		<tr class="pop_grid">
			<td class="pop_gridSub">권한3</td>
			<td><div id="" class="pop_inputWrite4" ></div></td>
		</tr>
	</table>

	<div style="text-align: center; margin-top: 10px; margin-bottom: 10px">
		<button id="pbtnUserClose" type="button" class="p_btnClose"></button>
	</div>

</form>
<script>
    function pwindow_init(params) {
        initData(params);

        $('#pbtnUserClose').click(function () {
            $('#pwindow').jqxWindow('close');
        });


    }

    function initData(params){
        $.ajax({
            type: "post",
            url: $('#ctxPath').val() + '/main/env/userConf/getDetailUser.do',
            data: { userId : params.userId },
            dataType: "json",
            success: function (jsonData) {
                var contents = jsonData.resultData.contents;
                $("#userId").val(contents.userId);
                $("#userName").val(contents.userName);
                $("#instNm").val(contents.instNm);
                $("#grade").val(contents.grade);
				$("#offcTelNo").val(contents.offcTelNo);
				$("#offcFaxNo").val(contents.offcFaxNo);
				$("#homeTelNo").val(contents.homeTelNo);
				$("#moblPhnNo").val(contents.moblPhnNo);
				$("#emailAddr").val(contents.emailAddr);

				var useYn = '예';
				if(contents.useYn == 'N'){
                    useYn = '아니오';
				}
				$("#useYn").val(useYn);

                var centerUserYn = '예';
                if(contents.centerUserYn == 'N'){
                    centerUserYn = '아니오';
                }
                $("#centerUserYn").val(centerUserYn);

                var emaiYn = '예';
                if(contents.emaiYn == 'N'){
                    centerUserYn = '아니오';
                }
                $("#emaiYn").val(emaiYn);

                var smsYn = '예';
                if(contents.smsYn == 'N'){
                    smsYn = '아니오';
                }
                $("#smsYn").val(smsYn);

            }
        });
	}

    function initDesign(params){

	}

</script>