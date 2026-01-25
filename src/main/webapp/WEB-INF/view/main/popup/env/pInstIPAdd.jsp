<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<form id="pForm" method="post">
    <div class="tableBorder">
        <table>
            <colgroup>
                <col width="30%">
                <col width="70%">
            </colgroup>
            <tr class="pop_grid">
                <td class="pop_gridSub">기관</td>
                <td>
                	<div id="ddbInstCd" style="margin-left: 3px;"><div id="pInstGrid" style="border: none; display: none"></div></div>
                </td>
            </tr>
            <tr class="pop_grid">
                <td class="pop_gridSub">망구분</td>
                <td>
					<label><input type="radio" style="vertical-align:middle; margin-top: -3px;" name="pIpCd" class="checkbox" value="1" checked /> <span>내부</span></label>&nbsp;&nbsp;
					<label><input type="radio" style="vertical-align:middle; margin-top: -3px;" name="pIpCd" class="checkbox" value="0" /> <span>외부</span></label>
                </td>
            </tr>
            <tr class="pop_grid pop_borderline" style="height: 30px;">
                <td class="pop_gridSub">IP</td>
                <td>
                    <input type="text" id="p_sIp" style="width: 90px; margin-left: 5px;" maxlength="15" onkeyup="this.value=this.value.replace(/[^0-9.]/g,'')"/>
                    ~
                    <input type="text" id="p_eIp" style="width: 90px;" maxlength="15" onkeyup="this.value=this.value.replace(/[^0-9.]/g,'')"/>
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
        <button id="pbtnSave" type="button" class="p_btnPlus"></button>
        <button id="pbtnClose" type="button" class="p_btnClose"></button>
    </div>
</form>
<script>
    var checkIp = 0;
    var checkYn = 'N';
    function pwindow_init(params) {
		// 기관
        $('#ddbInstCd').jqxDropDownButton({ width: 280, height: 22 })
        .on('open', function(event) {
            $('#pInstGrid').css('display', 'block');
        });
        var initContent = '<div style="position: relative; margin-left: 3px; margin-top: 2px">선택해 주세요</div>';
        $('#ddbInstCd').jqxDropDownButton('setContent', initContent);
        
        HmGrid.create($('#pInstGrid'), {
            source: new $.jqx.dataAdapter(
                {
                    datatype: 'json',
                    url: ctxPath + '/main/env/instMgmt/getInstMgmtList.do'
                },
                {
                    formatData: function(data) {
                        $.extend(data, {
                            useYn: 'Y'
                        });
                        return data;
                    }
                }
            ),
            filterable: true,
			showfilterrow: true,
            columns:
            	[
					{ text: '기관코드', datafield : 'instCd', width : 150, hidden: true },
                    { text: '기관명', datafield: 'instNm', minwidth: 150 },
                    { text: '지역', datafield : 'localCd', displayfield: 'localCdNm', width: 100, cellsalign: 'center' , filterable: false},
                ],
            width: 300, height: 200
        });
        $('#pInstGrid').on('rowselect', function(event) {
            var rowdata = $(this).jqxGrid('getrowdata', event.args.rowindex);
            var content = '<div style="position: relative; margin-left: 3px; margin-top: 2px">' + rowdata.instNm + '</div>';
            $('#ddbInstCd').jqxDropDownButton('setContent', content);
        }).on('bindingcomplete', function(event) {
//             $(this).jqxGrid('selectrow', 0);
        }).on('rowdoubleclick', function(event){
            $('#ddbInstCd').jqxDropDownButton('close');
        });
        
     	// 망구분
        
        // Button 이벤트 처리
        $('#pbtnClose').click(function () {
            $('#pwindow').jqxWindow('close');
        });
        $('#pbtnSave').click(function () {
			pInstIPAdd.saveInfo();
		});
        $('#checkDuplicateIp').click(function () {
            checkDuplicate();
        });

    }
    function checkDuplicate(){
        checkYn = 'Y';
        $.ajax({
            type: "post",
            url: $('#ctxPath').val() + '/main/acc/accidentApply/getInstByIP.do',
            data: { checkIp : $('#p_sIp').val() },
            dataType: "json",
            success: function (jsonData) {
                if(jsonData.resultData.contents != null){
                    checkIp = 1;
                    alert("존재하는 IP 대역입니다.")
                }else{
                    $.ajax({
                        type: "post",
                        url: $('#ctxPath').val() + '/main/acc/accidentApply/getInstByIP.do',
                        data: { checkIp : $('#p_eIp').val() },
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
    var pInstIPAdd = {
    		saveInfo: function(){
    			// validation 체크
                var instSelection = $('#pInstGrid').jqxGrid('getselectedrowindex');
                if (instSelection==-1) {
                    alert('기관을 선택해 주세요.');
                    return;
                }
                
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
                var instInfo = $('#pInstGrid').jqxGrid('getrowdata', instSelection);
                
                var addData = {
               		instCd: instInfo.instCd,
               		ipCd: $("input[name=pIpCd]:checked").val(),
               		sip: $("#p_sIp").val(),
               		eip: $("#p_eIp").val(),
                    ipCont: $("#ipCont").val()
                };

                if(!confirm("추가하시겠습니까?")) return;
                
                Server.post('/api/main/env/instIPMgmt/addInstIPMgmt', {
                    data: addData, 
                    success: function (result) {
                        try{ Main.search(); }catch(err){}
                        if(result == 'SUCCESS'){
                            if (confirm('기관IP대역이 추가되었습니다.\n 계속 추가 하시겠습니까?')) {
                            	$("#pForm input:text").val('');
                            } else {
                                $('#pwindow').jqxWindow('close');
                            }
                        } else {
                            alert(result);
                        }
                    }
                });
    		}
    };
</script>