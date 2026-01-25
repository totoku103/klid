<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<style>
.jqx-file-upload-file-cancel, .jqx-file-upload-file-upload {display: none}
.jqx-file-upload-buttons-container { visibility: collapse;}
</style>
<form id="pForm" method="post" onsubmit="return false;">
<input type="hidden" id="p_fileNm" name="fileNm" />
<input type="hidden" id="p_orgFileNm" name="orgFileNm" />
<input type="hidden" id="p_digest" name="digest" />
<input type="hidden" id="p_isSelect" name="isSelect" value="N" />
<input type="hidden" id="p_isUpload" value="N" />
	<div class="tableBorder">
		<table class="Data_table">
			<colgroup>
				<col width="20%">
				<col width="30%">
				<col width="20%">
				<col width="30%">
			</colgroup>
			<tr class="pop_grid">
				<td class="pop_gridSub">파일</td>
				<td colspan="3" style="height: 100px">
					<div id="p_file"></div>
				</td>
			</tr>
			<tr class="pop_grid">
				<td class="pop_gridSub">파일버전</td>
				<td>
					<input type="text" id="p_fileVer" name="fileVer" class="pop_inputWrite" />
				</td>
				<td colspan="2"></td>
			</tr>
			<tr class="pop_grid">
				<td class="pop_gridSub" width="100%">OS 종류</td>
				<td>
					<div id="p_agentOsKindCd" class="pop_combo1"></div>
				</td>
				<td class="pop_gridSub">OS Bit</td>
				<td>
					<div id="p_agentOsBitCd" class="pop_combo1"></div>
				</td>
			</tr>
			<tr class="pop_grid pop_borderline">
				<td class="pop_gridSub">확장정보</td>
				<td colspan="3">
					<input type="text" id="p_extInfo" name="extInfo" class="pop_inputWrite" />
				</td>
			</tr>
		</table>
	</div>
	
	<div style="text-align: center; margin-top: 10px;">
		<button id="pbtnAdd" type="button" class="p_btnPlus"></button>
		<button id="pbtnClose" type="button" class="p_btnClose"></button>
	</div>
</form>
<script>

	/**
		파일 업로드 경로: 공통 업로드 경로/SMS/
	*/
	function pwindow_init() {
		HmDropDownList.create($('#p_agentOsBitCd'), {
			source: HmDropDownList.getSourceByUrl('/code/getCodeListByCodeKind.do', {codeKind: 'AGENT_OS_BIT_CD'}),
			displayMember: 'codeValue1', valueMember: 'codeId'
		});
		HmDropDownList.create($('#p_agentOsKindCd'), {
			source: HmDropDownList.getSourceByUrl('/code/getCodeListByCodeKind.do', {codeKind: 'AGENT_OS_KIND_CD'}),
			displayMember: 'codeValue1', valueMember: 'codeId'
		});
		
		var ableFileType = ['ZIP'];
		$('#p_file').jqxFileUpload({ width: '100%', fileInputName: 'fileInput', uploadUrl: ctxPath + '/file/agentUpload.do', accept: ['.zip'] })
			.on('select', function(event) {
				var fileCnt = event.args.owner._fileRows.length;
				var limitCnt = 1;
				if(fileCnt > limitCnt) {
					$('#p_file').jqxFileUpload('cancelFile', fileCnt-1);
					alert('최대 업로드 가능한 파일개수는 ' + limitCnt + '개 입니다.');
					return;
				}
				var size = event.args.size;
				if(size > $('#gUploadSize').val()) {
					$('#p_file').jqxFileUpload('cancelFile', fileCnt-1);
					alert('파일 용량이 최대업로드 용량을 초과하였습니다. (최대 ' + ($('#gUploadSize').val() / 1024) + 'kb)');
					return;
				}
				
				var fileName = event.args.file;
	 			var temp = fileName.split(".");
	 			var accept = temp[temp.length-1].toUpperCase();
	 			
	 			if(ableFileType.indexOf(accept) == -1){
	 				$('#p_file').jqxFileUpload('cancelFile', fileCnt-1);
	 				alert(".zip 형식의 파일만 첨부할 수 있습니다.");
	 				return;
	 			}
			})
			.on('uploadEnd', function(event) {
				var resp = event.args.response;
				// chrome 브라우저는 <pre> dom tag 가 앞뒤로 싸여있어 응답값에서 html tag를 제거한다.
				resp = resp.replace(/(<([^>]+)>)/gi, '');
				
				if(resp != null) {
					var result = resp.split('|');
					$('#p_fileNm').val(result[0]);
					$('#p_digest').val(result[1]);
					$('#p_orgFileNm').val(event.args.file);	
				}
				else {
					alert('response is null');
				}
				$('#p_isUpload').val('Y');
				pwindow_add();
			});
		
		$('#pbtnAdd').click(pwindow_add);
		$('#pbtnClose').click(HmWindow.destroy);
	}
	
	function pwindow_add() {
		var formdata = $('#pForm').serializeObject();
		if($('.jqx-file-upload-file-row').length == 0) {
			alert('파일을 선택해주세요.');
			return;
		}
		if(formdata.fileVer.isBlank()) {
			alert('파일버전을 입력해주세요.');
			$('#p_fileVer').focus();
			return;
		}
		var obj = $('#p_agentOsKindCd');
		if(obj.val() == null) {
			alert('OS 종류를 선택해주세요.');
			return;
		}
		formdata.agentOsKindCd = obj.val();
		obj = $('#p_agentOsBitCd');
		if(obj.val() == null) {
			alert('OS Bit를 선택해주세요.');
			return;
		}
		formdata.agentOsBitCd = obj.val();
				
		if($('#p_isUpload').val() == 'N') { //파일업로드 전이면 파일부터 업로드
			$('#p_file').jqxFileUpload('uploadFile', 0);
		} 
		else { //파일 업로드 완료 후 DB Insert
			Server.post('/api/engineer/agentVrsConf/addAgentVer', {
				data: formdata,
				success: function(result) {
					Main.search();
					alert(result);
					$('#pbtnClose').click();
				}
			});
		}
	}
	

</script>