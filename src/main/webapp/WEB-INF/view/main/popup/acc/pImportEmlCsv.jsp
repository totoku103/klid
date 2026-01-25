<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<div id="emlcsvFilePos">
	<div id="emlcsvFileUpload"/>
</div>
<div style="text-align:center; margin-top:10px;">
	<button id="pbtnEmlCsvAdd" type="button" class="p_btnPlus"></button>
	<button id="pbtnEmlCsvDownload" type="button" class="p_btnDwn" style="display: none;"></button>
	<button id="pbtnEmlCsvClose" type="button" class="p_btnClose"></button>
</div>

<script>
    var _file = null;
	var type = null;
    function pwindow_init(data) {
        type = data.type;
        if(type=="eml"){
            $('#pbtnEmlCsvDownload').css('display','none');
			$('#emlcsvFileUpload').jqxFileUpload({ width : '100%', fileInputName : 'emlcsvfileinput' ,accept:'.eml'});
			$('#emlcsvFileUploadBrowseButton').val("eml 첨부파일");
		}if(type=="csv"){
            $('#emlcsvFileUpload').jqxFileUpload({ width : '100%', fileInputName : 'emlcsvfileinput'});
            $('#emlcsvFileUploadBrowseButton').val("첨부파일");
        }
    }
    $('#pbtnEmlCsvClose').click(function() {
        $('#pImportEmlCsvWindow').jqxWindow('close');
    });
    //eml 넣기
    $('#pbtnEmlCsvAdd').click(function() {

			$('#emlcsvFileUpload').jqxFileUpload({
				uploadUrl : ctxPath + '/file/accEmlCsvUpload.do?type='+type
			});
        try{
            $('#emlcsvFileUpload').jqxFileUpload('uploadAll');
        }catch (e) {
            console.log(e);
        }
    });
    //양식 다운로드
    $('#pbtnEmlCsvDownload').click(function() {
        HmUtil.downloadEmlCsv(ctxPath + '/file/accEmlCsvDownload.do',{type:type});
    });

    $('#emlcsvFileUpload').on('select', function (event) {
        var fileName = event.args.file;
        _file = fileName
        $('#emlcsvFileUploadUploadButton').css('display','none');
        $('#emlcsvFileUploadCancelButton').css('display','none');
        $('.jqx-file-upload-buttons-container').css('display', 'none');
    });

    $('#emlcsvFileUpload').on('remove', function (event) { _file=null; });

    $('#emlcsvFileUpload').on('uploadEnd', function (event) {
        if(type=="eml"){
			Server.get('/api/main/acc/accidentApply/importEml', {
				 data: {},
				 success: function (data) {

                     $("#emlYN").val("Y");
                     $('#dclInstName').val('국가정보자원관리원');

                     if(data.resultData.inciDclCont!=undefined)
                     	$('#inciDclCont').val(data.resultData.inciDclCont);
                     if(data.resultData.inciDttNm!=undefined)
                     	$('#inciDttNm').val(data.resultData.inciDttNm);
                     if(data.resultData.inciTtl!=undefined)
                     	$('#inciTtl').val(data.resultData.inciTtl);
                     if(data.resultData.sAttIP!=undefined)
                     	$('#attIp').val(data.resultData.sAttIP);
                     if(data.resultData.sDepIp!=undefined)
                     	$('#dmgIp').val(data.resultData.sDepIp);
                     if(data.resultData.sDate!=undefined){
						 $('#inputinciDt').val(data.resultData.sDate);
						 $('#inciDt').jqxDateTimeInput('setDate', new Date(data.resultData.sDate.substring(0,4),data.resultData.sDate.substring(5,7)-1,data.resultData.sDate.substring(8,10)));
                     }
                     if(data.resultData.sHH!=undefined)
                     	$('#inciDt_HH').val(data.resultData.sHH);
                     if(data.resultData.sMM!=undefined)
                     	$('#inciDt_MM').val(data.resultData.sMM);
                     if(data.resultData.dclEmail!=undefined)
                     	$('#dclEmail').val(data.resultData.dclEmail);
                     if(data.resultData.dmgEmail!=undefined)
                     	$('#dmgEmail').val(data.resultData.dmgEmail);
                     $("#dmgInstCd").val(1500000);
                     $("#dmgInstCd").jqxTreeGrid('selectRow', 1500000);

                     if($('.p_btnMinus').length>0){
                         $('.p_btnMinus').parent().remove();
                     }

                     if(data.resultData.sDepIp!='')
                         $('#ipAdd').trigger('click');
                     if(data.resultData.sAttIP!='')
                         $('#attIpAdd').trigger('click');

                     //$("#accdTypCd").val(data.resultData.accdTypCd); //20190308 담당자 요청으로 eml접수 사고유형 기본(없음)으로 세팅

                     $('#pImportEmlCsvWindow').jqxWindow('close');
					 /**
					  * inciDclCont : 사고내용
					  * inciTtl : 제목
					  * sAttIP : 공격IP
					  * sDate : 사고일자
					  * sDepIp : 피해IP
					  * sHH : 시
					  * sMM : 분
					  */
				 }
			 });
		}else if(type=="csv"){
            Server.get('/api/main/acc/accidentApply/importExcel', {
                data: {},
                success: function (data) {

                    $("#emlYN").val("N");

                    if(data.resultData.fileType=="csv"||
                        data.resultData.fileType=="xls"||
                        data.resultData.fileType=="xlsx"
					){
                        if(data.resultData.inciDclCont!=undefined)
                        	$('#inciDclCont').val(data.resultData.inciDclCont);
                        if(data.resultData.inciTtl!=undefined)
                        	$('#inciTtl').val(data.resultData.inciTtl);
                        if(data.resultData.sIP!=undefined)
                        	$('#attIp').val(data.resultData.sIP);
                        if(data.resultData.dIP!=undefined)
                        	$('#dmgIp').val(data.resultData.dIP);
                        if(data.resultData.sDate!=undefined){
                        	$('#inputinciDt').val(data.resultData.sDate);
                        	$('#inciDt').jqxDateTimeInput('val', data.resultData.sDate);
                        }
                        if(data.resultData.sHH!=undefined)
                        	$('#inciDt_HH').val(data.resultData.sHH);
                        if(data.resultData.sMM!=undefined)
                        	$('#inciDt_MM').val(data.resultData.sMM);
                        if(data.resultData.inciDttNm!=undefined)
                        	$('#inciDttNm').val(data.resultData.inciDttNm);
                        if(data.resultData.dmgInstCd!=undefined){
                            $("#dmgInstCd").val(data.resultData.dmgInstCd);
                            $("#dmgInstCd").jqxTreeGrid('selectRow', data.resultData.dmgInstCd);
						}

                        if(data.resultData.esmSerNo!=undefined)
                        	$('#esmSerNo').val(data.resultData.esmSerNo);

                        if($('.p_btnMinus').length>0){
                            $('.p_btnMinus').parent().remove();
                        }

                        if(data.resultData.dIP!='')
                            $('#ipAdd').trigger('click');
                        if(data.resultData.sIP!='')
                            $('#attIpAdd').trigger('click');

                        if(data.resultData.accdTypCd!=undefined)
                        	$("#accdTypCd").val(data.resultData.accdTypCd);

                        $('#pImportEmlCsvWindow').jqxWindow('close');
					}else{
                        alert("지원하지 않는 파일 형식입니다.\n" +
							"※csv, xls, xlsx만 지원");

                        return;
					}
                }
            });
		}
    });

</script>