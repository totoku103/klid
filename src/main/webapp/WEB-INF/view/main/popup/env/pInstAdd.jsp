<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<form id="pForm" method="post">
    <div class="tableBorder">
        <table>
            <colgroup>
                <col width="30%">
                <col width="70%">
            </colgroup>
            <tr class="pop_grid">
                <td class="pop_gridSub">기관코드</td>
                <td>
                	<input type="text" id="p_instCd" class="pop_input" maxlength="7" style="width:100px !important;vertical-align: top;margin-top: 3px;" />
                	<input type="hidden" id="instCd_check" value="0" />
                	<button id="pbtnDupl" type="button" class="p_btnDoubleCheck"></button>
                </td>
            </tr>
            <tr class="pop_grid">
                <td class="pop_gridSub">기관명</td>
                <td><input type="text" id="p_instNm" class="pop_input"/></td>
            </tr>
            <tr class="pop_grid">
                <td class="pop_gridSub">유형분류 중</td>
                <td>
                    <div id="p_cbTypeMid" class="pop_input"></div>
                </td>
            </tr>
            <tr class="pop_grid">
                <td class="pop_gridSub">유형분류 소</td>
                <td>
                	<div id="p_cbTypeSml" class="pop_input"></div>
                </td>
            </tr>
            <tr class="pop_grid">
                <td class="pop_gridSub">지역</td>
                <td>
                    <div id="p_cbLocalCd" class="pop_input"></div>
                </td>
            </tr>
            <tr class="pop_grid">
                <td class="pop_gridSub">상위기관</td>
                <td>
					<div id="ddbPntSInstCd" style="margin-left: 3px;"><div id="pntSInstGrid" style="border: none; display: none"></div></div>
                </td>
            </tr>
            <tr class="pop_grid pop_borderline">
            	<td class="pop_gridSub">사용여부</td>
                <td>
                    <div id="p_cbUseYn" class="pop_input"></div>
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
    function pwindow_init(params) {
		// 유형분류 중
        var source_typeMid = new $.jqx.dataAdapter({
        	datatype: 'json', 
        	data: {comCode1: '2009', codeLvl: '2'}, 
        	url: ctxPath + '/code/getCommonCode.do'
        });
        $('#p_cbTypeMid').jqxDropDownList({
                source: source_typeMid,
                displayMember: 'codeName',
                valueMember: 'comCode2',
                width: '95%',
                height: 22,
                theme: jqxTheme,
                placeHolder: '선택해 주세요'
        }).on('change', function (event) {
        	// 중분류 변경시 소분류 조회
        	var val = event.args.item.value;
        	pInstAdd.searchTypeSml();
        });
		// 유형분류 소
        var source_typeSml = new $.jqx.dataAdapter({
	        	datatype: 'json', 
	        	data: {comCode1: '2009', codeLvl: '3'}, 
	        	url: ctxPath + '/code/getCommonCode.do'
	        },
	        {
	            formatData: function(data) {
	                var typeMid = $('#p_cbTypeMid').val();
	                $.extend(data, {
	                    comCode2: typeMid
	                });
	                return data;
	            }
        });
        
        $('#p_cbTypeSml').jqxDropDownList({
//                 source: source_typeSml,
                displayMember: 'codeName',
                valueMember: 'comCode3',
                width: '95%',
                height: 22,
                theme: jqxTheme,
                placeHolder: '선택해 주세요'
            });
		// 지역
        $('#p_cbLocalCd').jqxDropDownList(
            {
                source: new $.jqx.dataAdapter({datatype: 'json', url: ctxPath + '/code/getLocalCode.do'}),
                displayMember: 'localNm',
                valueMember: 'localCd',
                width: '95%',
                height: 22,
                theme: jqxTheme,
                placeHolder: '선택해 주세요'
            });
        // 사용여부
        $('#p_cbUseYn').jqxDropDownList({
            source: [
                {label: '사용', value: 'Y'}, {label: '미사용', value: 'N'}
            ],
            displayMember: 'label',
            valueMember: 'value',
            width: '95%',
            height: 22,
            theme: jqxTheme,
            selectedIndex: 0,
            placeHolder: '선택해 주세요',
            autoDropDownHeight: true
        });
        
		// 상위그룹 -- drop/grid 형식에서 width를 % 줘버리면 grid가 이상하게 그려짐
        $('#ddbPntSInstCd').jqxDropDownButton({ width: 200, height: 22 })
        .on('open', function(event) {
            $('#pntSInstGrid').css('display', 'block');
        });
        var initContent = '<div style="position: relative; margin-left: 3px; margin-top: 2px">선택해 주세요</div>';
        $('#ddbPntSInstCd').jqxDropDownButton('setContent', initContent);
        
        HmGrid.create($('#pntSInstGrid'), {
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
            columns:
            	[
					{ text : '기관코드', datafield : 'instCd', width : 150, hidden: true },
                    { text: '기관명', datafield: 'instNm', minwidth: 150 },
                    { text: '지역', datafield : 'localCd', displayfield: 'localCdNm', width: 100, cellsalign: 'center' },
                ],
            width: 300, height: 200
        });
        $('#pntSInstGrid').on('rowselect', function(event) {
            var rowdata = $(this).jqxGrid('getrowdata', event.args.rowindex);
            if(rowdata!=null){
	            var content = '<div style="position: relative; margin-left: 3px; margin-top: 2px">' + rowdata.instNm + '</div>';
	            $('#ddbPntSInstCd').jqxDropDownButton('setContent', content);
            }
        }).on('bindingcomplete', function(event) {
        	if(event!=null){
//         		console.log(params);
	        	if(grpNo!=null){
	        		var records = event.args.owner.source.records;
		        	for(var i=0; i<records.length; i++){
		        		var record = records[i];
		        		var instCd = record.instCd;
		        		if(parseInt(params.grpNo)==instCd){
		                  $(this).jqxGrid('selectrow', record.uid);	        
		                  break;
		        		}
		        	}
		        	
	        	}
        	}
//             $(this).jqxGrid('selectrow', 0);
        }).on('rowclick', function(event){
            $('#ddbPntSInstCd').jqxDropDownButton('close');
        });
        
        // Button 이벤트 처리
        $('#pbtnClose').click(function () {
            $('#pwindow').jqxWindow('close');
        });
        $('#pbtnSave').click(function () {
			pInstAdd.saveInfo();
		});

        $('#pbtnDupl').click(function () {
			pInstAdd.duplicateChk();
		});
        

		$('#p_instCd').bind('keyup', function(event) {
			$("#instCd_check").val(0);
// 			if(event.keyCode == 13) {
// 				Main.searchDev();
// 			}
		});

    }
    
    var pInstAdd = {
    		duplicateChk: function(){ // 기관코드 중복체크
    			var obj = $('#p_instCd');
                if ($.isBlank(obj.val())) {
                    alert('기관코드를 입력해 주세요.');
                    obj.focus();
                    return;
                }
                if (!$.isNumeric(obj.val())) {
                    alert('기관코드는 숫자만 입력해 주세요.');
                    obj.focus();
                    return;
                }
                var instCd = obj.val();
                
                Server.post('/api/main/env/instMgmt/getInstCdChk', {
                    data: {instCd: instCd}, 
                    success: function (result) {
                        console.log(result);
                        if(result == 'SUCCESS'){
							alert("사용 가능한 기관코드 입니다.");
							$("#instCd_check").val(1);
                        } else {
                            alert("사용중인 기관코드 입니다.");
							$("#instCd_check").val(0);
                        }
                    }
                });
                
    		},
    		searchTypeSml: function(){
    			var source_typeSml = new $.jqx.dataAdapter({
	    	        	datatype: 'json', 
	    	        	data: {comCode1: '2009', codeLvl: '3'}, 
	    	        	url: ctxPath + '/code/getCommonCode.do'
	    	        },
	    	        {
	    	            formatData: function(data) {
	    	                var typeMid = $('#p_cbTypeMid').val();
	    	                $.extend(data, {
	    	                    comCode2: typeMid
	    	                });
	    	                return data;
	    	            }
	            });
    			$('#p_cbTypeSml').jqxDropDownList({
                    source: source_typeSml
    			});
    		},
    		saveInfo: function(){
    			// validation 체크
    			var instCd_check = $("#instCd_check").val();
    			if(instCd_check==0){
    				alert('기관코드 중복확인 해주세요.');
                    return;
    			}
    			
    			var obj = $('#p_instCd');
                if ($.isBlank(obj.val())) {
                    alert('기관코드를 입력해 주세요.');
                    obj.focus();
                    return;
                }
                if (!$.isNumeric(obj.val())) {
                    alert('기관코드는 숫자만 입력해 주세요.');
                    obj.focus();
                    return;
                }

                obj = $('#p_instNm');
                if ($.isBlank(obj.val())) {
                    alert('기관명을 입력해 주세요.');
                    obj.focus();
                    return;
                }

                obj = $('#p_cbTypeMid');
                if ($.isBlank(obj.val())) {
                    alert('유형분류 중을 선택해 주세요.');
                    return;
                }
                obj = $('#p_cbTypeSml');
                if ($.isBlank(obj.val())) {
                    alert('유형분류 소를 선택해 주세요.');
                    return;
                }
                obj = $('#p_cbLocalCd');
                if ($.isBlank(obj.val())) {
                    alert('지역을 선택해 주세요.');
                    return;
                }
                
                var pntSInstSelection = $('#pntSInstGrid').jqxGrid('getselectedrowindex');
                if (pntSInstSelection==-1) {
                    alert('상위기관을 선택해 주세요.');
                    return;
                }
                // ---------- validation check end --------------
                
                var pntSInstInfo = $('#pntSInstGrid').jqxGrid('getrowdata', pntSInstSelection);
                
                var addData = {
               		instCd: $('#p_instCd').val(),
               		instNm: $('#p_instNm').val(),
               		typeMid: $('#p_cbTypeMid').val(),
               		typeSml: $('#p_cbTypeSml').val(),
               		localCd:$("#p_cbLocalCd").val(),
               		pntSInstCd:pntSInstInfo.instCd,
               		useYn:$("#p_cbUseYn").val()
                };
                
//                 console.log(addData);

                if(!confirm("추가하시겠습니까?")) return;
                
                Server.post('/api/main/env/instMgmt/addInstMgmt', {
                    data: addData, 
                    success: function (result) {
                        try{ Main.search(); }catch(err){}
                        if(result == 'SUCCESS'){
                            if (confirm('기관이 추가되었습니다.\n 계속 추가 하시겠습니까?')) {
                            	pInstAdd.resetInfo();
                            } else {
                                $('#pwindow').jqxWindow('close');
                            }
                        } else {
                            alert(result);
                        }
                    }
                });
    		},
    		resetInfo: function(){ // 리셋
    			// 기관코드, 기관명만 리셋
    			$("#pForm input:text").val('');
    			$("#instCd_check").val(0);
    		}
    };
</script>