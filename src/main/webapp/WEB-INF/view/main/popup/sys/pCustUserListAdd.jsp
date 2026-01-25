<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

<div id="addUserFilePos">
    <div id="addUserFileUpload"/>
</div>
<div style="text-align:center; margin-top:10px;">
    <button id="pbtnUserListAdd" type="button" class="p_btnPlus"></button>
    <button id="pbtnUserListDownload" type="button" class="p_btnDwn" style="display: none;"></button>
    <button id="pbtnUserListClose" type="button" class="p_btnClose"></button>
</div>

<script>
    var _file = null;
    function pwindow_init(data) {
        $('#addUserFileUpload').jqxFileUpload({width: '100%', fileInputName: 'userlistfileinput', accept: '.eml'});
        $('#addUserFileUploadBrowseButton').val("첨부파일");
    }
    $('#pbtnUserListClose').click(function () {
        $('#pImportUserListWindow').jqxWindow('close');
    });
    //eml 넣기
    $('#pbtnUserListAdd').click(function () {

        $('#addUserFileUpload').jqxFileUpload({
            uploadUrl: ctxPath + '/file/addUserListUpload.do'
        });
        try {
            $('#addUserFileUpload').jqxFileUpload('uploadAll');
        } catch (e) {
            console.log(e);
        }
    });
    //양식 다운로드
    $('#pbtnUserListDownload').click(function () {
        //HmUtil.downloadUserList(ctxPath + '/file/accUserListDownload.do',{type:type});
    });

    $('#addUserFileUpload').on('select', function (event) {
        var fileName = event.args.file;
        _file = fileName
        $('#addUserFileUploadUploadButton').css('display', 'none');
        $('#addUserFileUploadCancelButton').css('display', 'none');
        $('.jqx-file-upload-buttons-container').css('display', 'none');
    });

    $('#addUserFileUpload').on('remove', function (event) {
        _file = null;
    });

    $('#addUserFileUpload').on('uploadEnd', function (event) {

        Server.get('/api/main/acc/accidentApply/importEml', {
            data: {},
            success: function (data) {

                $('#pImportUserListWindow').jqxWindow('close');
            }
        });
    });

</script>