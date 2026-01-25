<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<div id="xlsFilePos">
	<div id="xlsFileUpload"/>
</div>
<div style="text-align:center; margin-top:10px;">
	<button id="pbtnXlsAdd" type="button" class="p_btnPlus"></button>
	<%--<button id="pbtnXlsDownload" type="button" class="p_btnDwn"></button>--%>
	<button id="pbtnXlsClose" type="button" class="p_btnClose"></button>
</div>

<script>
    var _file = null;
	var type = null;
    function pwindow_init(data) {
        $('#xlsFileUpload').jqxFileUpload({ width : '100%', fileInputName : 'xlsfileinput' ,accept:'.xls'});
		$('#xlsFileUploadBrowseButton').val("xls 첨부파일");
    }
    $('#pbtnXlsClose').click(function() {
        $('#pImportXlsWindow').jqxWindow('close');
    });
    //xls 넣기
    $('#pbtnXlsAdd').click(function() {

		$('#xlsFileUpload').jqxFileUpload({
			uploadUrl : ctxPath + '/file/homeURLUpload.do'
		});
        try{
            $('#xlsFileUpload').jqxFileUpload('uploadAll');
        }catch (e) {
            console.log(e);
        }
    });

   //양식 다운로드
//    $('#pbtnXlsDownload').click(function() {
//        HmUtil.downloadEmlCsv(ctxPath + '/file/homeXlsDownload.do',{type:type});
//    });

    $('#xlsFileUpload').on('select', function (event) {
        var fileName = event.args.file;
        _file = fileName;
        $('#xlsFileUploadUploadButton').css('display','none');
        $('#xlsFileUploadCancelButton').css('display','none');
        $('.jqx-file-upload-buttons-container').css('display', 'none');
    });

    $('#xlsFileUpload').on('remove', function (event) { _file=null; });

    $('#xlsFileUpload').on('uploadEnd', function (event) {
        Server.get('/api/main/home/healthCheckUrl/importXls', {
            data: {},
            success: function (data) {
				if(data=="OK"){
				    alert("중복데이터 제외하고 추가되었습니다.")
					Main.search();
                    $('#pImportXlsWindow').jqxWindow('close');
				}
            }
        });
    });

</script>