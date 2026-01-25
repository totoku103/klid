<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<style>
#pInstLoader{ top: 0px !important; left: 0px !important; }
</style>
<form id="pForm" method="post">
<div style="position: relative;">
    <div class="tableBorder">
        <table>
            <colgroup>
                <col width="30%">
                <col width="70%">
            </colgroup>
            <tr class="pop_grid">
                <td class="pop_gridSub">기관코드</td>
                <td>
                	<input type="text" id="p_instCd" class="pop_input" maxlength="7" readonly="readonly" style="background-color: #dcdcdc;" />
                	<input type="hidden" id="instCd_check" value="1" />
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
        <button id="pbtnSave" type="button" class="p_btnSave"></button>
        <button id="pbtnClose" type="button" class="p_btnClose"></button>
    </div>
    <div id="pInstLoader"></div>
</div>
</form>
<script>
    function pwindow_init(params) {
    	// loading setting
    	$("#pInstLoader").jqxLoader({ width: 100, height: 60, imagePosition: 'top', text: "로딩중" });
    	$('#pInstLoader').jqxLoader('open');
    	
//     	console.log(params);
    	
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
                placeHolder: '선택하십시오'
        }).on('bindingComplete', function (event) { 
       		$("#p_cbTypeMid").jqxDropDownList('selectItem',params.typeMid);
           	pInstEdit.searchTypeSml();
        }).on('change', function (event) {
        	// 중분류 변경시 소분류 조회
        	var val = event.args.item.value;
        	pInstEdit.searchTypeSml();
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
                placeHolder: '선택하십시오'
        }).on('bindingComplete', function (event) { 
       		$("#p_cbTypeSml").jqxDropDownList('selectItem',params.typeSml);
		});
        
		// 지역
        $('#p_cbLocalCd').jqxDropDownList({
                source: new $.jqx.dataAdapter({datatype: 'json', url: ctxPath + '/code/getLocalCode.do'}),
                displayMember: 'localNm',
                valueMember: 'localCd',
                width: '95%',
                height: 22,
                theme: jqxTheme,
                placeHolder: '선택하십시오'
		}).on('bindingComplete', function (event) { 
			$("#p_cbLocalCd").jqxDropDownList('selectItem',params.localCd);
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
            placeHolder: '선택하십시오',
            autoDropDownHeight: true
		}).on('bindingComplete', function (event) { // 소스가 박혀있어서 그런지 함수 안탐. 아래서 input 값 넣을때 같이 set함 
        });

		
		// 상위그룹
        $('#ddbPntSInstCd').jqxDropDownButton({ width: 200, height: 22 })
        .on('open', function(event) {
            $('#pntSInstGrid').css('display', 'block');
        });
        var initContent = '<div style="position: relative; margin-left: 3px; margin-top: 2px">선택하십시오</div>';
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
                            useYn: 'Y',
                            expInstCd: params.instCd
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
            var content = '<div style="position: relative; margin-left: 3px; margin-top: 2px">' + rowdata.instNm + '</div>';
            $('#ddbPntSInstCd').jqxDropDownButton('setContent', content);
        }).on('bindingcomplete', function(event) {
        	if(event!=null){
        		var _pntSInstCd = params.pntSInstCd;
	        	var records = event.args.owner.source.records;
	        	for(var i=0; i<records.length; i++){
	        		var record = records[i];
	        		var instCd = record.instCd;
	        		if(_pntSInstCd==instCd){
	                  $(this).jqxGrid('selectrow', record.uid);	        
	                  break;
	        		}
	        	}
        	}
        	// 차상위 선택이 제일 오래 걸려서 해당 부분 세팅 끝나면 로딩창 close
        	$('#pInstLoader').jqxLoader('close');

        }).on('rowclick', function(event){
            $('#ddbPntSInstCd').jqxDropDownButton('close');
        });
        
        // Button 이벤트 처리
        $('#pbtnClose').click(function () {
            $('#pwindow').jqxWindow('close');
        });
        $('#pbtnSave').click(function () {
			pInstEdit.saveInfo();
		});


		// data setting
    	$("#p_instCd").val(params.instCd);
    	$("#p_instNm").val(params.instNm);
		$("#p_cbUseYn").jqxDropDownList('selectItem',params.useYn);

    }
    
    var pInstEdit = {
    		searchTypeSml: function(){ //유형분류 소 리스트 조회
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
    		saveInfo: function(){ // 저장
    			// validation 체크
    			var obj = obj = $('#p_instNm');
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
                
                var editData = {
               		instCd: $('#p_instCd').val(),
               		instNm: $('#p_instNm').val(),
               		typeMid: $('#p_cbTypeMid').val(),
               		typeSml: $('#p_cbTypeSml').val(),
               		localCd:$("#p_cbLocalCd").val(),
               		pntSInstCd:pntSInstInfo.instCd,
               		useYn:$("#p_cbUseYn").val()
                };
                
//                 console.log(editData);

                if(!confirm("저장하시겠습니까?")) return;
                
                Server.post('/api/main/env/instMgmt/saveInstMgmt', {
                    data: editData, 
                    success: function (result) {
                        try{ Main.search(); }catch(err){}
                        if(result == 'SUCCESS'){
                        	alert('기관이 저장되었습니다');
							$('#pwindow').jqxWindow('close');
						} else {
                            alert(result);
                        }
                    }
                });
    		}
    };
</script>