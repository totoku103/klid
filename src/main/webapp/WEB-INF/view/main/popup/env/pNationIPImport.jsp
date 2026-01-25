<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<form id="pForm" method="post" enctype="multipart/form-data">
    <div class="tableBorder">
        <table>
            <colgroup>
                <col width="20%">
                <col width="80%">
            </colgroup>
            <tr class="pop_grid">
                <td class="pop_gridSub">파일선택</td>
                <td>
                	<input type="file" id="uploadFile" name="uploadFile" accept=".csv"/>
                </td>
            </tr>
            <tr class="pop_grid pop_borderline">
            	<td colspan="2">
            		* 국가별 IP 대역 파일은
		              <span style="color:blue;"> http://www.maxmind.com/download/geoip/database/</span>
		                            에서 다운로드할 수 있습니다. (GeolPCountryWhois.csv)
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
        // Button 이벤트 처리
        $('#pbtnClose').click(function () {
            $('#pwindow2').jqxWindow('close');
        });
        $('#pbtnSave').click(function () {
			pNationImport.saveInfo();
		});

    }
    
    var pNationImport = {
			checkFileData: function($fileId){ // 파일 존재 여부, 확장자 검사.
				if( $fileId.val() != "" ){
					var ext = $fileId.val().split('.').pop().toLowerCase();
					if($.inArray(ext, ['csv']) == -1) {
						alert('파일의 형식이 csv가 아닙니다.');
						return false;
					}
				}else{
					alert("파일을 선택해주세요.");
					return false;
				}
				
				return true;
			},
    		saveInfo: function(){
    			if(!pNationImport.checkFileData($("#uploadFile"))) return;
    			
    			if(!confirm('국가IP를 일괄 추가하시겠습니까?')) return;
                
    			var form = document.getElementById("pForm");
    			var formData = new FormData(form);

    			var xhr = new XMLHttpRequest();
    			
    		    // 서버 응답 처리
    		    xhr.onreadystatechange = function() {  
    		    	
    		    	// 전송이 끝났고 응답 상태가 OK이면 성공
    		        if (xhr.readyState == 4 && xhr.status == 200){
    		        	var str = xhr.responseText;
    		        	
    		        	var jt = JSON.parse(str);
    		        	console.log(jt);
    		        	if(jt.hasError){ // true : 오류
    		        		alert(jt.errorInfo.message);
    		        	}else{
    		        		alert(jt.resultData);
    						Main.search();
    						$('#pbtnClose').click();
    		        	}
    		        	
    		        }else if(xhr.readyState == 4){
    		        }
    		    };
    		    
    		    xhr.open("POST" , ctxPath + "/main/env/nationIPMgmt/addNationIPMgmt.do" , true);
    		    xhr.send(formData);
    		}
    };
</script>