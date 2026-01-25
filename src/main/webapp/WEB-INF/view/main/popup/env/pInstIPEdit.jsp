<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<form id="pForm" method="post">
	<input type="hidden" id="p_seq">
	<input type="hidden" id="p_instCd">
    <div class="tableBorder">
        <table>
            <colgroup>
                <col width="30%">
                <col width="70%">
            </colgroup>
            <tr class="pop_grid">
                <td class="pop_gridSub">기관</td>
                <td>
                	<input type="text" id="p_instNm" class="pop_input" maxlength="7" readonly="readonly" style="background-color: #dcdcdc;" />
                </td>
            </tr>
            <tr class="pop_grid">
                <td class="pop_gridSub">망구분</td>
                <td>
					<label><input type="radio" style="vertical-align:middle; margin-top: -3px;" name="pIpCd" class="checkbox" value="1" checked /> <span>내부</span></label>&nbsp;&nbsp;
					<label><input type="radio" style="vertical-align:middle; margin-top: -3px;" name="pIpCd" class="checkbox" value="0" /> <span>외부</span></label>
                </td>
            </tr>
            <tr class="pop_grid pop_borderline">
                <td class="pop_gridSub">IP</td>
                <td>
                    <input type="text" id="p_sIp" class="pop_input" style="width: 90px;" maxlength="15" onkeyup="this.value=this.value.replace(/[^0-9.]/g,'')"/>
                    ~
                    <input type="text" id="p_eIp" class="pop_input" style="width: 90px;" maxlength="15" onkeyup="this.value=this.value.replace(/[^0-9.]/g,'')"/>
                    <div style="float: right; margin-right: 3px;">
                        <button id="checkDuplicateIp" type="button" class="p_btnDoubleCheck"></button>
                    </div>
                </td>
            </tr>
            <tr class="pop_grid">
                <td class="pop_gridSub">설명</td>
                <td>
                    <textarea id="ipCont" style="width: 95%; height: 40px; margin:5px;  border: 1px solid #cccccc; resize:none;"></textarea>
                </td>
            </tr>
        </table>
    </div>

    <div style="text-align: center; margin-top: 10px;">
        <button id="pbtnSave" type="button" class="p_btnSave"></button>
        <button id="pbtnClose" type="button" class="p_btnClose"></button>
    </div>
</form>
<script>
    var checkIp = 0;
    var checkYn = 'N';
    var minstIpSeq = 0;
    function pwindow_init(params) {
        minstIpSeq = params.seq;
        // Button 이벤트 처리
        $('#pbtnClose').click(function () {
            $('#pwindow').jqxWindow('close');
        });
        $('#pbtnSave').click(function () {
			pInstIPEdit.saveInfo();
		});
        $('#checkDuplicateIp').click(function () {
            checkDuplicate();
        });

        // data setting
     	$("#p_seq").val(params.seq);
     	$("#p_instCd").val(params.instCd);
     	$("#p_instNm").val(params.instNm);
    	$("#p_sIp").val(params.sipStr);
    	$("#p_eIp").val(params.eipStr);
    	if(params.ipCont != null){
            $("#ipCont").val(params.ipCont.htmlCharacterUnescapes());
        }
    	if(params.ipCd=="내부")
    		$("input[name=pIpCd][value=1]").click();
    	else
    		$("input[name=pIpCd][value=0]").click();
		
    }
    function checkDuplicate(){
        checkYn = 'Y';
        $.ajax({
            type: "post",
            url: $('#ctxPath').val() + '/main/acc/accidentApply/getInstByIP.do',
            data: { checkIp : $('#p_sIp').val(), minstIpSeq : minstIpSeq  },
            dataType: "json",
            success: function (jsonData) {
                if(jsonData.resultData.contents != null){
                    checkIp = 1;
                    alert("존재하는 IP 대역입니다.")
                }else{
                    $.ajax({
                        type: "post",
                        url: $('#ctxPath').val() + '/main/acc/accidentApply/getInstByIP.do',
                        data: { checkIp : $('#p_eIp').val(), minstIpSeq : minstIpSeq },
                        dataType: "json",
                        success: function (jsonData) {
                            if(jsonData.resultData.contents != null){
                                checkIp = 2;
                                alert("존재하는 IP 대역입니다.")
                            }else{
                                checkIp = 0;
                                alert("사용가능한 IP입니다.")
                            }
                        }
                    });
                }
            }
        });


    };
    var pInstIPEdit = {
    		saveInfo: function(){
    			// validation 체크
                var obj = $('#p_sIp');
                if ($.isBlank(obj.val())) {
                    alert('시작 IP를 입력해 주세요.');
                    obj.focus();
                    return;
                }

                if (!$.validateIp(obj.val())) {
                    alert("IP형식이 유효하지 않습니다.");
                    return false;
                };

                obj = $('#p_eIp');
                if ($.isBlank(obj.val())) {
                    alert('종료 IP를 입력해 주세요.');
                    obj.focus();
                    return;
                }

                if (!$.validateIp(obj.val())) {
                    alert("IP형식이 유효하지 않습니다.");
                    return false;
                };

                var ipCont = $('#ipCont').val().length;
                if(ipCont > 50){
                    alert('50자 미만으로 입력 해 주세요.');
                    return;
                }

                if(checkYn == 'N'){
                    alert("IP 중복 체크를 해주세요");
                    return;
                }else{
                    if(checkIp != 0){
                        alert("존재하는 IP 대역입니다.")
                        return;
                    }
                }
                
                // ---------- validation check end --------------
                
                var saveData = {
               		ipCd: $("input[name=pIpCd]:checked").val(),
               		sip: $("#p_sIp").val(),
               		eip: $("#p_eIp").val(),
               		seq: $("#p_seq").val(),// 기존의 seq 정보
               		instCd: $("#p_instCd").val(), // 기존의 instCd 정보
                    ipCont: $("#ipCont").val() //설명
                };
                
                if(!confirm("저장하시겠습니까?")) return;

                Server.post('/api/main/env/instIPMgmt/saveInstIPMgmt', {
                    data: saveData,
                    success: function (result) {
                        try{ Main.search(); }catch(err){}
                        if(result == 'SUCCESS'){
                        	alert('기관IP대역이 저장되었습니다');
							$('#pwindow').jqxWindow('close');
						} else {
                            alert(result);
                        }
                    }
                });
    		}
    };
</script>